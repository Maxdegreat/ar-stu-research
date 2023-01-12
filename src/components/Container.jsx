import * as tf from "@tensorflow/tfjs";
import * as PoseNet from "@tensorflow-models/posenet";

import React, { useRef, useEffect, useState } from "react";
import { drawMesh } from "../utilitis.js";
import Webcam from "react-webcam";
import { UseUpdateTimeUseEffect } from "../pages/hooks/update_timer"
import nightSkyVidBg from "../assets/night_sky_bg.mp4";
import AttentionOutputs from "./AttentionOutputs";
import { increaseNose, increaseLeftEye, increaseRightEye, pointsSlice } from "../features/timer/pointsSlice.js";
import { useDispatch } from 'react-redux';
import "../pages/page.css";

const Container = () => {
  const [seconds, setSeconds] = useState(0); // 0
  const [minuets, setMinuets] = useState(1); // 10
  const [duration, setDuration] = useState("1:00"); // "1:00"
  const [isStart, setStart] = useState(false);
  const [isDone, setStatus] = useState(false); // false (not done) true (done)
  const [hasCalledOpenAi, callOpenAi] = useState(false);
  const [points, setPoints] = useState({});
  const vidRef = useRef(null);
  const dispatch = useDispatch();


  var infoT1;
  var infoT2;


  if (seconds === 0 && minuets === 0) {
    // infoT1 = "attention points - " + pos;
    // infoT2 = "non attentive points - " + neg;
  } else {
    infoT1 =
      "Hey, we will let you know how well your attention rate was at the";
    infoT2 = "at the end of the timer.";
  }

  const onStartTimer = (e) => {
    e.preventDefault();
    vidRef.current.pause();
    setStart(true);
    runPosenet();
  };

  var timer;
  var boundingBoxT;

  async function onSubmit() {
    const response = await fetch("../pages/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: "leftEye: 27, rightEye: 27, nose: 40" }),
    });
    const data = await response.json();
    console.log(data.result);
  }

  
  
  useEffect( () =>  {
    let isMounted = true;

    if (isStart) {
      setStatus(false);
      timer = setInterval(() => {
        

        if (isMounted) {
            if (!isDone) {
              if (seconds === 0 && minuets === 0) {
                return clearInterval(timer)
              } else {
                 runPosenet();
              }
              
                setSeconds(seconds - 1);

              if (seconds === 0) {
                
                  setMinuets(minuets - 1);
                  setSeconds(59);
                
            }
          }
        }
      
    }, 1000);
    return ( () => {
      clearInterval(timer);
      isMounted = false;
    })
  }
});



  useEffect(() => {
    let isMounted = true;
    if (isStart) {
      // setStatus(false);
      boundingBoxT = setInterval(() => {
        if (isMounted) {
          //
          if (!isDone) {
            if (seconds === 0 && minuets === 0) {
              if (!hasCalledOpenAi) {
                callOpenAi(true);
                onSubmit().then(() => { console.log("called the openAI api") })
              }
              return clearInterval(timer);
            } else {
              runPosenet();
            }
          }
        }
      }, 950);
      return () => {
        clearInterval(timer);
        isMounted = false;
      };
    }
  });

  const timer_restart = () => {
    setSeconds(0);
    setMinuets(20);
  };

  const timer_stop = () => {
    clearInterval(timer);
  };

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load posenet
  const runPosenet = async () => {
    
    PoseNet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.3,
    }).then((netPose) => {
      detect(netPose);
    }).catch((err) => {console.log(err)});
    
  };

  // Detect function
  const detect = async (netPose /*netFace*/) => {
    try {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // get vdeo properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // set the video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Make directions
        const pose = await netPose.estimateSinglePose(video);
        // face = await netFace.estimateFaces(video);

        drawCanvas(pose, /* face, */ video, videoWidth, videoHeight, canvasRef);
      }
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log("there was an error when running detect");
      console.log(error);
    }
  };

  // drawig on the canvas
  const drawCanvas = (
    pose,
    /* face, */ video,
    videoWidth,
    videoHeight,
    canvas
  ) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    //       ctx        x                                               y
    drawMesh(
      ctx,
      pose["keypoints"][1]["position"]["x"] + 20,
      pose["keypoints"][1]["position"]["y"] - 50,
      // right eye - left eye
      pose["keypoints"][2]["position"]["x"] -
        pose["keypoints"][1]["position"]["x"] -
        50,
      // the height
      150
    );

    if (pose["keypoints"][0]["score"] > 0.8)
      dispatch(increaseNose({}));
    else
      dispatch(logNonAtentiveTimeStamp({"keypoint":0}));
    if (pose["keypoints"][1]["score"] > 0.8)
      dispatch(increaseLeftEye({}));
    else
    dispatch(logNonAtentiveTimeStamp({"keypoint":0}));
    if (pose["keypoints"][2]["score"] > 0.8) 
      dispatch(increaseRightEye({}));
    else
    dispatch(logNonAtentiveTimeStamp({"keypoint":0}));

  };

  return (
    <div className="Pose">
      <div className="bg">
        <video ref={vidRef} src={nightSkyVidBg} muted autoPlay loop></video>
      </div>

      <div className="body">
        <div className="timer">
          <div className="container">
            <div className="timer_container">
              <h1>
                {minuets < 10 ? "0" + minuets : minuets} :{" "}
                {seconds < 10 ? "0" + seconds : seconds}
              </h1>
              <form>
                <label>Study Duration: </label>
                <select
                  style={{ color: "black" }}
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    if (e.target.value === "10:00") {
                      setMinuets(10);
                      setSeconds(0);
                    } else if (e.target.value === "20:00") {
                      setMinuets(20);
                      setSeconds(0);
                    } else if (e.target.value === "30:00") {
                      setMinuets(30);
                      setSeconds(0);
                    } else if (e.target.value === "40:00") {
                      setMinuets(40);
                      setSeconds(0);
                    }
                  }}
                >
                  <option value="10:00" className="formTxt">
                    {" "}
                    10:00{" "}
                  </option>
                  <option value="20:00" className="formTxt">
                    {" "}
                    20:00{" "}
                  </option>
                  <option value="30:00" className="formTxt">
                    {" "}
                    30:00{" "}
                  </option>
                  <option value="40:00" className="formTxt">
                    {" "}
                    40:00{" "}
                  </option>
                </select>
              </form>
                  
              <AttentionOutputs/>

              <div className="timerBtns">
                <button className="timerBtn" onClick={(e) => onStartTimer(e)}>
                  {" "}
                  Start{" "}
                </button>
                {"  "}
                <button className="timerBtn" onClick={timer_restart}>
                  {" "}
                  Restart{" "}
                </button>
                {"  "}
                <button className="timerBtn" onClick={timer_stop}>
                  {" "}
                  Stop{" "}
                </button>
              </div>

              <div className="infoSpan">
                <span> {infoT1}</span>
                <span> {infoT2} </span>
              </div>
            </div>
          </div>
        </div>
        {/* clock hook */}
        <header className="Pose-header">
          <Webcam
            ref={webcamRef}
            style={{
              borderRadius: "20",
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 440,
              height: 280,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              borderRadius: "20",
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 440,
              height: 280,
            }}
          />
        </header>
      </div>
    </div>
  );
}

export default Container;

// install dependicies # DONE ... the npm installs look at package.jason to find them
// import dependencies # DONE ... line 10 and so on
// set up web cam Done
// define references to those Done
// load posenet Done
// detect functcion
// draw utilities
// draw functions

import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import * as tf from "@tensorflow/tfjs";
import * as PoseNet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import './page.css';
import { drawMesh } from "../utilitis.js";
import { div, time } from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

function Pose() {
  
  const [seconds, setSeconds] = useState(5); // 0
  const [minuets, setMinuets] = useState(0); // 20
  const [duration, setDuration] = useState("00:05"); // "20:00"
  const [isStart, setStart] = useState(false);
  const [isDone, setStatus] = useState(false); // false (not done) true (done)
  const [neg, setNeg] = useState(0);
  const [pos, setPos] = useState(0);
  

  
  // this msg is used at the bottom of the view to 
  
  var infoT1;
  var infoT2;
  
  
  if (seconds === 0 && minuets ===0 ) {
    infoT1 = "attention points - " + pos;
    infoT2 = "non attentive points - " + neg;
  } else {
    infoT1 = "Hey, we will let you know how well your attention rate was at the"
    infoT2 = "at the end of the timer."
  } 
  
  const onStartTimer = (e) => {
    e.preventDefault();
    setStart(true);
    runPosenet();
  }
  
  var timer;
  var boundingBoxT;
  
  useEffect( () =>  {
    if (isStart) {
      setStatus(false);
      timer = setInterval(() => {
        if (!isDone) {
          if (seconds === 0 && minuets === 0) {
            return clearInterval(timer)
          } else {
            console.log("called run posenet in the else statment")
            // runPosenet();
          }
          setSeconds(seconds - 1);
          if (seconds === 0) {
            setMinuets(minuets - 1);
          setSeconds(59);
        }
      }
      
    }, 1000);
    return () => clearInterval(timer);
  }
});

useEffect( () =>  {
  if (isStart) {
    // setStatus(false);
    boundingBoxT = setInterval(() => {
      
      if (!isDone) {
        if (seconds === 0 && minuets === 0) {
          return clearInterval(timer)
        } else {
          runPosenet();
        }
 
    }
    
  }, 950);
  return () => clearInterval(timer);
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
  var netPose = await PoseNet.load({
    inputResolution: { width: 640, height: 480 },
    scale: 0.3,
  });

  // const netFace = await facemesh.load({
  //      inputResolution: { width: 640, height: 480 },
  //      scale: 0.2,
  //    });
  
  detect(netPose,/* netFace */);

};

// Detect function
const detect = async (netPose, /*netFace*/) => {
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
        
        drawCanvas(pose,/* face, */ video, videoWidth, videoHeight, canvasRef);
      }
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      console.log("there was an error when running detect")
      console.log("${error}")
    }
  };
  
  // drawig on the canvas
  const drawCanvas = (pose, /* face, */ video, videoWidth, videoHeight, canvas) => {
    console.log("in the draw canvas")
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    //       ctx        x                                               y         
    drawMesh(
      ctx, 
      pose["keypoints"][1]["position"]["x"] + 20, 
      pose["keypoints"][1]["position"]["y"] - 50,
      // right eye - left eye
      ( pose["keypoints"][2]["position"]["x"] - pose["keypoints"][1]["position"]["x"] ) - 50,
      // the height
      150
    );
    if (pose["keypoints"][0]["score"] < 0.8) {
      setNeg(neg + 1);
    } else {
      setPos(pos + 1);
    }
    
    // console.log(pose["keypoints"][0]["score"]); // there is a value of face["keypoints"][idx]["score"]
    // console.log(pose)
    // this is the left eye
    // console.log(pose["keypoints"][1]["position"]["x"] + " RIGHT EYE")
    // right eye
    // console.log(pose["keypoints"][2]["position"]["x"] + " LEFT EYE")
    
    
  };
  

  return (
    <div className="Pose">
      {/* clock hook */}
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
              <option value="10:00"> 10:00 </option>
              <option value="20:00"> 20:00 </option>
              <option value="30:00"> 30:00 </option>
              <option value="40:00"> 40:00 </option>
            </select>
          </form>
          
          <div className="timerBtns">
            <button className="timerBtn" onClick={(e) => onStartTimer(e)}> Start </button>
            <button className="timerBtn" onClick={timer_restart}> Restart </button>
            <button className="timerBtn" onClick={timer_stop}> Stop </button>
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
    
      <div className="infoSpan"> 
        <span> {infoT1}</span>
        <span> {infoT2} </span>
      </div>

    </div>
  );
}

export default Pose;

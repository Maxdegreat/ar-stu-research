// install dependicies # DONE ... the npm installs look at package.jason to find them
// import dependencies # DONE ... line 10 and so on
// set up web cam Done
// define references to those Done
// load posenet Done 
// detect functcion 
// draw utilities
// draw functions

import React, { useRef } from "react";
import '../App.css';
import * as tf from "@tensorflow/tfjs";
import * as PoseNet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import {drawMesh} from "../utilitis.js"


function Pose() {
  var rate = {"neg": 0, "pos": 0};
  const webcamRef = useRef(null);
  const canvasRef  = useRef(null);

  // Load posenet
  const runPosenet = async () => {
    const net = await PoseNet.load({
      inputResolution:{width:640, height:480},
      scale:0.5,
    });
    // set intervoal
    setInterval(()  => {

      detect(net)
    },5000)
  }

  // Detect function
  const detect = async (net) => {
    if (
        typeof webcamRef.current !== "undefined" 
        && webcamRef.current !== null 
        && webcamRef.current.video.readyState === 4
      ) {
      // get vdeo properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set the video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make directions
      const face = await net.estimateSinglePose(video);
 
      drawCanvas(face, video, videoWidth, videoHeight, canvasRef);
    }
  }
  
  // drawig on the canvas
  const drawCanvas = (face, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight
    if ( face["keypoints"][0]["score"] < 0.8 ) {
      rate["neg"] += 1;
      console.log(rate)
    } else {
      rate["pos"] += 1;
      console.log(rate)
    }
    console.log(face["keypoints"][0]["score"]); // there is a value of face["keypoints"][idx]["score"]
    drawMesh(face, ctx);
  }
  runPosenet();


  return (
    <div className="Pose">
      <header className="Pose-header">

       <Webcam 
       ref={webcamRef}
       style = {{
         position: "absolute", 
         marginLeft: "auto",
         marginRight: "auto",
         left: 0,
         right: 0,
         textAlign: "center",
         zIndex: 9,
         width: 640,
         height: 480,
      }}
    />

    <canvas 
    ref = {canvasRef}
    style = {{
         position: "absolute", 
         marginLeft: "auto",
         marginRight: "auto",
         left: 0,
         right: 0,
         textAlign: "center",
         zIndex: 9,
         width: 640,
         height: 480,
      }}
    />
    
      </header>
    </div>
  );
}

export default Pose;

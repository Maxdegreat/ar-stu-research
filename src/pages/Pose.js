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
import {drawKeypoints, drawSkeleton} from "../utilitis.js"
import rive from "@rive-app/webgl";


function Pose() {
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
    },200)
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
      const pose = await net.estimateSinglePose(video);
 
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  }
  
  // drawig on the canvas
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight

    // I have a map pose["keypoint"] -> which contains a map with key "nose" where key is nose i want the map positions and key vals x and y ... this is a graph lol
    var x_path = pose["keypoints"][1]["position"]["x"]
    var y_path = pose["keypoints"][1]["position"]["y"]
    ctx.fillRect(x_path, y_path, 100, 100);
    ctx.clearRect(x_path, y_path, 60, 60);
    ctx.strokeRect(x_path, y_path, 50, 50);
    
    //drawSkeleton(pose["keypoints"], 0.5, ctx)
    //drawKeypoints(pose["keypoints", 0.5, ctx])
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

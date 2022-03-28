// install dependicies # DONE ... the npm installs look at package.jason to find them
// import dependencies # DONE ... line 10 and so on
// set up web cam Done
// define references to those Done
// load posenet Done 
// detect functcion 
// draw utilities
// draw functions

import React, { useRef } from "react";
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as PoseNet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";


function App() {
  const webcamRef = useRef(null);
  const canvasRef  = useRef(null);

  // Load posenet
  const runPosenet = async () => {
    const net = await PoseNet.load({
      inputResolution:{width:640, height:480},
      scale:0.5,
    });
    // set intervoal
  }

  // Detect function
  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current != null && webcamRef.current.video.redyState === 4) {
      // get vdeo properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set the video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make directions
      const pose = await net.estimateSinglePost(video);
      console.log(pose)
    }
  }


  return (
    <div className="App">
      <header className="App-header">

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

export default App;

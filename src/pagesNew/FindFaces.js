import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import axios from 'axios';
import Card from "../components/card";



// need to wrap code lab in a node node express
// need to call node express from this UI
// awiat the imag data as bytes
// recieve the image data as bytes
// display a list of cropped faces

// add a research section and describe findings with similar models

export default function FindFaces() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(async () => {

  const imageSrc = webcamRef.current.getScreenshot();

  // Remove the data URL prefix
  const base64String = imageSrc.split(',')[1];
  // Decode the base64 string
  const binaryString = window.atob(base64String);
  // Convert the binary string to a byte array
  const len = binaryString.length;
  var imageBytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      imageBytes[i] = binaryString.charCodeAt(i);
  }
  console.log(imageBytes);

  try {
    const response = await axios.post('http://127.0.0.1:5000/find_faces', {
        image_bytes: imageBytes,
      });
      var res = await response.data;
      console.log("response: " + JSON.stringify(res));
  } catch (error) {
    console.error('Error calling the findFaces API:', error);
  }

          

// Encode the PNG image to base64
//   const base64Image = imageSrc.replace('data:image/png;base64,', '');
//   console.log(base64Image);
//   try {
//     // Call the findFaces Flask API with a POST request
//     const response = await axios.post('http://localhost:5000/findFaces', {
//       image: imageBytes
//     });
//     // Decode the response
//     const decodedResponse = atob(await response.data);
//     // Set the response
//     setImgSrc(decodedResponse);
//   } catch (error) {
//     console.error('Error calling the findFaces API:', error);
//   }
}, [webcamRef, setImgSrc]);

  const mainDivStyle = {
    padding: '8px'
  }

  const rightStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'spaceAround',
    alignItems: 'center'
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="mainDiv" style={mainDivStyle}>
      
      <div className="left">
        <>
        <p>Summary’s and research on deep fake detections as of 2023</p>
        <p>
          Face Detection is a key building block when it comes to deep fake
          detections, please view this short demo that will depict finding a face and facial features that could later be used for training data in a model.
        </p>


          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            style={{
              width: "200px",
              height: "200px",
            }}
          />
          

          <button
            onClick={capture}
            style={{
              borderRadius: "50px",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#008CBA" /* Blue */,
              color: "white",
              cursor: "pointer",
              outline: "none",
            }}
          >
            Capture photo
          </button> 

      </>
      </div>

      <h1> Below are links to articles explaining discoveries on deep fake detection</h1>

      <div className="right" style={rightStyle}>

        <Card
          title="Analyzing Convolutional Traces"
          summary="The introduction covers what is a deep fake and how they are used. This paper introduces a novel Deepfake detection method focused on human facial images. Using an Expectation Maximization (EM) algorithm, local features are extracted to model convolutional traces in images. Naive classifiers are then trained to distinguish between authentic and generated images from five realistic architectures (GDWCT, STARGAN, ATTGAN, STYLEGAN, STYLEGAN2). Experimental results show that the information modeled by EM is architecture-specific, providing explainability in detection and aiding forensic investigations such as camera model identification. The method is demonstrated to be effective and incomparable with current state-of-the-art techniques, tested on an almost-in-the-wild dataset with varying image sizes and multiple GAN techniques."
          URL="https://openaccess.thecvf.com/content_CVPRW_2020/papers/w39/Guarnera_DeepFake_Detection_by_Analyzing_Convolutional_Traces_CVPRW_2020_paper.pdf"
        />

        <Card
          title="Continual Deepfake Detection Benchmark"
          summary="This paper discusses the widespread use of deepfakes, generated by advanced models like autoencoders, GANs, and Glows, posing a threat to privacy, security, and democracy. To counter this, various deepfake detection datasets and techniques have been proposed. The paper focuses on extending deepfake detection from a stationary to a dynamic (continual) setting, where deepfakes appear over time. The authors introduce a Continual Deepfake Detection Benchmark (CDDB) that simulates real-world deepfake evolution, evaluating methods for incremental learning without catastrophic forgetting. The study makes three main contributions: proposing a realistic benchmark, comprehensively evaluating existing and adapted methods, and providing insights into continual deepfake detection essentials."
          URL="https://openaccess.thecvf.com/content/WACV2023/papers/Li_A_Continual_Deepfake_Detection_Benchmark_Dataset_Methods_and_Essentials_WACV_2023_paper.pdf"
        />

        <Card
          title="Audio-Visual Person-of-Interest DeepFake Detection"
          summary="This paper discusses the increasing threat posed by facial manipulations, including deepfakes, in various industries. The term deepfake has evolved beyond face-swapping to encompass a range of video manipulations, presenting challenges for current deepfake detectors. The paper highlights the limitations of supervised deep learning approaches, particularly in cross-dataset performance and under challenging scenarios like low-quality videos. The authors propose a novel person-of-interest (POI) deepfake detector, called POI-Forensics, which employs a multi-modal analysis, combining audio and video networks for contrastive learning. This approach aims for generalization, flexibility, and robustness, outperforming state-of-the-art methods, especially in challenging scenarios like compressed and adversarially attacked videos."
          URL="https://openaccess.thecvf.com/content/CVPR2023W/WMF/papers/Cozzolino_Audio-Visual_Person-of-Interest_DeepFake_Detection_CVPRW_2023_paper.pdf"
        />
      </div>
    </div>
    </div>
  );
}

import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;
      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i][0];
        const y = keypoints[0][i];
        ctx.beginPath();
        ctx.arc(x,y,1,0,3*Math.PI);
        ctx.fillStyle = "pink";
        ctx.fill();
      }
    })
  }
}
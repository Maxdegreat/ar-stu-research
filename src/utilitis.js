import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";



// export const drawMesh = (predictions, ctx) => {
//   if (predictions.length > 0) {
//     predictions.forEach((prediction) => {
//       const keypoints = prediction.scaledMesh;

//       //  Draw Triangles
//       for (let i = 0; i < TRIANGULATION.length / 3; i++) {
//         // Get sets of three keypoints for the triangle
//         const points = [
//           TRIANGULATION[i * 3],
//           TRIANGULATION[i * 3 + 1],
//           TRIANGULATION[i * 3 + 2],
//         ].map((index) => keypoints[index]);
//         //  Draw triangle
//         drawPath(ctx, points, true);
//       }

//       // Draw Dots
//       for (let i = 0; i < keypoints.length; i++) {
//         const x = keypoints[i][0];
//         const y = keypoints[i][1];

//         ctx.beginPath();
//         ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
//         ctx.fillStyle = "aqua";
//         ctx.fill();
//       }
//     });
//   }
// };

export const drawMesh = (predictions, ctx) => {
  console.log("the length of predictions: " + predictions.length)
  if (predictions.length > 0) {
    console.log("the predictions length is > than 0")
    predictions.forEach((prediction) => {
      console.log("in for loop")
      const keypoints = prediction.scaledMesh;
      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i][0];
        const y = keypoints[0][i];
        ctx.beginPath();
        ctx.arc(x,y,1,0,3*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    })
  }
}
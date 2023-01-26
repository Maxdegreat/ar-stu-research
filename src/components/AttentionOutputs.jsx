import React from 'react'
import { selectPoints } from "../features/timer/pointsSlice"
import { useSelector } from 'react-redux'
import '../pages/page.css'

const AttentionOutputs = () => {
    const points = useSelector(selectPoints)
    console.log(points)    
    const renderedPoints = 
    <div style={{boxSizing: "border-box", width: "50%", width: "300px", padding: "10px", color: "green"}}>
            <p> {points[0].id + ": " + points[0].amount[0]} </p>
            <p> {points[1].id + ": " + points[1].amount[0]} </p>
            <p> {points[2].id + ": " + points[2].amount[0]} </p>

            <p>~~------------------------------------------------~~</p>

            <p> {" Size of non-attentive timeStamps size: " + points[0].amount.length } </p>
            <br></br>
            <br></br>
            <p> Timestamps of when attention was lacked: </p>
            <p> { points[0].id + ": "}  </p>
        </div>

const nonAttentivePointsNose = (
    <div style={{boxSizing: "border-box", width: "50%", width: "300px", padding: "10px", color: "green", height: "200px", overflow: "scroll"}}>
      {points[0].amount.map((element, index) => {
        return element === points[0].amount[0] ? (
          <div key={index} />
        ) : (
          <p key={index}>{element}</p>
        );
      })}
    </div>
  );
  

    return (
        <section>
            {renderedPoints}
            {nonAttentivePointsNose}
        </section>
  )
}




export default AttentionOutputs
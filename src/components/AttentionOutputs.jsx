import React from 'react'
import { selectPoints } from "../features/timer/pointsSlice"
import { useSelector } from 'react-redux'

const AttentionOutputs = () => {

    
    const points = useSelector(selectPoints)
    console.log(points)    
    const renderedPoints = 
    <div>
            <p> {points[0].id + ": " + points[0].amount[0]} </p>
            <p> {points[1].id + ": " + points[1].amount[0]} </p>
            <p> {points[2].id + ": " + points[2].amount[0]} </p>

            <p>~~------------------------------------------------~~</p>

            <p> {" Size of non-attentive timeStamps size: " + points[0].amount.length } </p>
        </div>
    

    return (
        <section style={styles.section}>
        <h2 style={styles.title}>Points Outputs</h2>
        {renderedPoints}
    </section>
  )
}

const styles = {
    p: {
        color: "black",
        
    }
}

export default AttentionOutputs
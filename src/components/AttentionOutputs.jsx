import React from 'react'
import { selectPoints } from "../features/timer/pointsSlice"
import { useSelector } from 'react-redux'

const AttentionOutputs = () => {

    const styles = {
        p: {
            color: "black",
            
        }
    }

    const points = useSelector(selectPoints)

    const renderedPoints = 
        <div>
            <p> {points.nose} </p>
            <p> {points.leftEye} </p>
        </div>
    

  return (
    <section style={styles.section}>
        <h2 style={styles.title}>Points Outputs</h2>
        {renderedPoints}
    </section>
  )
}

export default AttentionOutputs
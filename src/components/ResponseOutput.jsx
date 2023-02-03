import React from 'react'
import { selectPoints } from "../features/timer/pointsSlice"
import { useSelector } from 'react-redux'
import '../pages/page.css'

const ResponseOutput = () => {
    // get points 
    const points = useSelector(selectPoints);

    // see the len of nonattentive output
    var lenOfNonAttentive = points[0].amount.length;

    // if len is greater than xi then give some feedback as a text
    var responseText;
    if (lenOfNonAttentive > 10) {
        responseText = "You did okay with paying attention to the while your study time was on. See the left side of the screen to view the timestamps of when you lost focus";
    } else if (lenOfNonAttentive >= 30) {
        responseText = "Because the timer was only set to 1 minute and you 30 non attentive points you did not do well when it comes to paying attention. For review of when you lost focus please view the left side of the screen."
    }

    return (
        <div>
          <h5>Your Review</h5>
          <p>{responseText}</p>
        </div>
      );
}

export default ResponseOutput
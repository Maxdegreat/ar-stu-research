import React, { Component, useEffect, useState } from "react";


const Clock = () => {
  const [seconds, setSeconds] = useState(0)
  const [minuets, setMinuets] = useState(0);
  var timer;
    useEffect(()=>{
      timer = setInterval(() => {
        setSeconds(seconds+1);
        if (seconds===59) {
          setMinuets(minuets+1);
          setSeconds(0)
        }
      }, 1000);
      return () => clearInterval(timer)
    })

    const timer_restart =()=> {
      setSeconds(0);
      setMinuets(0);
    }

    const timer_stop =()=> {
      clearInterval(timer)
    }

    return (
      <div className="timer">
        <div className="container">
          <div className="timer_container">
            <h1>
             {minuets < 10 ? "0" + minuets : minuets} : {seconds < 10 ? "0" + seconds : seconds}
            </h1>
            <button className="timer_start" onClick={timer_restart}> Restart </button>
            <button className="timer_stop" onClick={timer_stop}> Stop </button>
          </div>
        </div>
      </div>
    );
}

export default Clock

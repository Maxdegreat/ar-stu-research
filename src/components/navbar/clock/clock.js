import React, { Component, useEffect, useState } from "react";

const Clock = () => {
  const [seconds, setSeconds] = useState(59);
  const [minuets, setMinuets] = useState(20);
  const [duration, setDuration] = useState("20:00");
  const [isStart, setStart] = useState(false);

  const onStartTimer = (e) => {
    e.preventDefault();
    setStart(true);
  }

  var timer;
  useEffect(() => {
    if (isStart) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinuets(minuets - 1);
          setSeconds(59);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  const timer_restart = () => {
    setSeconds(59);
    setMinuets(20);
  };

  const timer_stop = () => {
    clearInterval(timer);
  };

  return (
    <div className="timer">
      <div className="container">
        <div className="timer_container">
          <h1>
            {minuets < 10 ? "0" + minuets : minuets} :{" "}
            {seconds < 10 ? "0" + seconds : seconds}
          </h1>
          <form>
            <label>Study Duration: </label>
            <select
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            >
              <option value="10:00"> 10:00 </option>
              <option value="20:00"> 20:00 </option>
              <option value="30:00"> 30:00 </option>
            </select>
          </form>
          
          <button className="timer_start" onClick={(e) => onStartTimer(e)}> Start </button>
          <button className="timer_restart" onClick={timer_restart}> Restart </button>
          <button className="timer_stop" onClick={timer_stop}> Stop </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;

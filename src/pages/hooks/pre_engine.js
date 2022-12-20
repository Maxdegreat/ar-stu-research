import React, { useRef, useEffect, useState } from "react";

export function UsepreEngine(isStart, isDone, boundingBoxT, timer, seconds, minuets, runPosenet) {
    
    useEffect( () =>  {
      let isMounted = true;
      if (isStart) {
        // setStatus(false);
        boundingBoxT = setInterval(() => {
          if (isMounted) {
    
          if (!isDone) {
            if (seconds === 0 && minuets === 0) {
              return clearInterval(timer)
            } else {
              runPosenet();
            }
        }
    
      }
        
      }, 950);
      return () => {
        clearInterval(timer);
        isMounted = false;
      }
    }
    });
}

export function updateTimeUseEffect() {

    useEffect( () =>  {
        let isMounted = true;
    
        if (isStart) {
          setStatus(false);
          timer = setInterval(() => {
            
    
            if (isMounted) {
                if (!isDone) {
                  if (seconds === 0 && minuets === 0) {
                    return clearInterval(timer)
                  } else {
                    console.log("called run posenet in the else statment")
                    // runPosenet();
                  }
                  
                    setSeconds(seconds - 1);
    
                  if (seconds === 0) {
                    
                      setMinuets(minuets - 1);
                      setSeconds(59);
                    
                }
              }
            }
          
        }, 1000);
        return ( () => {
          clearInterval(timer);
          isMounted = false;
        })
      }
    });
    
}
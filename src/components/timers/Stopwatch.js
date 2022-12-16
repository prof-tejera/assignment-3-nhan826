import {useState, useEffect, useContext} from "react";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import { TimerContext } from "../../context";
import { updateQueueItem } from "../../utils/helpers";
import PropTypes from 'prop-types';
import {calculateTotalTime} from "../../utils/helpers"



const Stopwatch = ({limit = 9, index, initialTime}) => {
    const context = useContext(TimerContext);
    const [timeElapsed, setTimeElapsed] = useState(initialTime - parseInt(limit));
    const [pause, setPause] = useState(true);

    useEffect(() => {
      if(index === 0){
        const localStoreTimerQueue = localStorage.getItem("timerQueue")
        if(localStoreTimerQueue){
          const parsedLocalStoreTimerQueue = JSON.parse(localStoreTimerQueue);
          const topQueueItem = parsedLocalStoreTimerQueue[0];
          if(topQueueItem){
            setTimeElapsed(topQueueItem.initialTime - parseInt(topQueueItem.limit))
          }
        }
      }
    },[]);

    useEffect(() => {
      if (context.timerRunningState && index === 0){
        setPause(!pause);
      } 
    }, [context.timerQueue]);

    useEffect(() => {
        // keeps incrementing timeElapsed by one if less than the limit and not paused
        if (timeElapsed < parseInt(initialTime) && !pause){
            const interval = setInterval(() => {
            setTimeElapsed(timeElapsed + 1);
            context.setTimerTotalTime(context.timerTotalTime - 1);
            const saveQueue = (queue) => {
              localStorage.setItem("timerQueue", JSON.stringify(queue))
            }
            updateQueueItem(context.timerQueue, saveQueue, {...context.timerQueue[index], limit: String(initialTime-timeElapsed)}, index)
            }, 1000);
            return () => clearInterval(interval);  // cleans up the interval when unmounts
        } else if (timeElapsed >= parseInt(initialTime)){
          context.deleteFromQueue(index);
          context.setTimerRunningState(true);
        }
      }, [timeElapsed, pause]);
    
      const reset = () => {
        setTimeElapsed(0);
        setPause(true);
        context.setTimerQueue(context.initialQueue);
        context.setTimerTotalTime(calculateTotalTime(context.initialQueue));
      }

      const fastForward = () => {
        setTimeElapsed(limit);
        context.setTimerRunningState(true);
        context.removeCurrentTimer();
      }

    return (
        <div>
            <DisplayTime index = {index} timeInSeconds={timeElapsed} />
            <Button type = {pause ? "green" : "white"} disabled = {timeElapsed === limit} onClick={() => setPause(!pause)} label={pause ? "Play" : "Pause"}></Button>
            <Button type = "blue" disabled = {!timeElapsed} onClick={reset} label="Reset"></Button>
            <Button type = "darkblue" disabled = {timeElapsed === limit}  onClick={fastForward} label="Fast Forward"></Button>
        </div>
    );
};


Stopwatch.propTypes = {
  limit: PropTypes.number,
  index: PropTypes.number,
  initialTime: PropTypes.number
};

export default Stopwatch;

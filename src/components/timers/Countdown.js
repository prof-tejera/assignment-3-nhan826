import {useState, useEffect, useContext} from "react";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import { TimerContext } from "../../context";
import PropTypes from 'prop-types';

const Countdown = ({startTime = 90, index}) => {
    const context = useContext(TimerContext);
    const [timeElapsed, setTimeElapsed] = useState(startTime);
    const [pause, setPause] = useState(true);

    useEffect(() => {
      if (context.timerRunningState && index === 0){
        setPause(!pause);
      } 
    }, [context.timerQueue]);

    useEffect(() => {
      // decrements timeElapsed by one if greater than 0 and not paused
        if (timeElapsed > 0 && !pause){
            const interval = setInterval(() => {
            setTimeElapsed(timeElapsed - 1);
            context.setTimerTotalTime(context.timerTotalTime - 1);
            }, 1000);
            return () => clearInterval(interval); // cleans up the interval when unmounts
        } else if (timeElapsed <= 0){
          context.deleteFromQueue(index);
          context.setTimerRunningState(true);
        }
      }, [timeElapsed, pause]);
    
      const reset = () => {
        setTimeElapsed(startTime);
        setPause(true);
        context.setTimerQueue(context.initialQueue)
      }

      const fastForward = () => {
        context.deleteFromQueue(index);
        context.setTimerRunningState(true);
      }

    return (
        <div>
            <DisplayTime timeInSeconds={timeElapsed} />
            <Button type = {pause ? "green" : "white"} disabled = {timeElapsed === 0} onClick={ () => setPause(!pause)} label={pause ? "Play" : "Pause"}></Button>
            <Button type = "blue" disabled = {timeElapsed === startTime} onClick={reset} label="Reset"></Button>
            <Button type = "darkblue" disabled = {timeElapsed === 0}  onClick={fastForward} label="Fast Forward"></Button>
        </div>
    );
};

Countdown.propTypes = {
  startTime: PropTypes.number,
  index: PropTypes.number
};

export default Countdown;

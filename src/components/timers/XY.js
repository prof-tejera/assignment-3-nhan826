import {useState, useEffect, useContext} from "react";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import DisplayRound from "../generic/DisplayRound";
import { TimerContext } from "../../context";
import PropTypes from 'prop-types';


const XY = ({timeLimit = 3, totalRounds=4, index}) => {
    const context = useContext(TimerContext);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [pause, setPause] = useState(true);
    const [round, setRound] = useState(1);

    useEffect(() => {
        if (context.timerRunningState && index === 0){
          setPause(!pause);
        } 
      }, [context.timerQueue]);

    useEffect(() => {
        if (timeElapsed < timeLimit && !pause && round <= totalRounds){
            const interval = setInterval(() => {
            setTimeElapsed(timeElapsed + 1);
            context.setTimerTotalTime(context.timerTotalTime - 1);
            }, 1000);
            return () => clearInterval(interval); // cleans up the interval when unmounts
        }else if(timeElapsed >= timeLimit){
            // resets timeElapsed and increments round
            setTimeElapsed(0);
            if (round < totalRounds){
                setRound(round + 1);
            }else{
                setTimeElapsed(timeLimit);
                setPause(true);
                context.deleteFromQueue(index);
                context.setTimerRunningState(true);
            }
        }
    }, [timeElapsed, pause]);

    const reset = () => {
        setTimeElapsed(0);
        setRound(1);
        setPause(true);
        context.setTimerQueue(context.initialQueue);
    }

    const fastForward = () => {
        setTimeElapsed(timeLimit);
        context.deleteFromQueue(index);
        context.setTimerRunningState(true);
        setRound(totalRounds);
        setPause(true);
    }

    return (
        <div>
            <DisplayRound rounds = {`${round} of ${totalRounds}` } ></DisplayRound>
            <DisplayTime timeInSeconds={timeLimit - timeElapsed} />
            <Button type = {pause ? "green" : "white"} disabled = {totalRounds === round && timeElapsed === timeLimit} onClick={ () => setPause(!pause)} label={pause ? "Play" : "Pause"}></Button>
            <Button type = "blue" disabled = {round === 0 && !timeElapsed} onClick={reset} label="Reset"></Button>
            <Button type = "darkblue" disabled = {totalRounds === round && timeElapsed === timeLimit}  onClick={fastForward} label="Fast Forward"></Button>
        </div>
    );
};

XY.propTypes = {
    timeLimit: PropTypes.number,
    totalRounds: PropTypes.number,
    index: PropTypes.number
};
    
export default XY;

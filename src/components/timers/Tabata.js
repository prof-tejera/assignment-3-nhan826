import {useState, useEffect, useContext} from "react";
import DisplayTime from "../generic/DisplayTime";
import Button from "../generic/Button";
import DisplayRound from "../generic/DisplayRound";
import { TimerContext } from "../../context";
import PropTypes from 'prop-types';


const Tabata = ({workLimit = 3, restLimit=2, totalFullRounds=2, index}) => {
    const context = useContext(TimerContext);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [halfRound, setHalfRound] = useState(0);
    const [pause, setPause] = useState(true);
    const [limit, setLimit] = useState(workLimit); 

    useEffect(() => {
        if (context.timerRunningState && index === 0){
          setPause(!pause);
        } 
      }, [context.timerQueue]);

    useEffect(() => {
        if (halfRound === totalFullRounds * 2){
            fastForward();
        }
        // keeps incrementing timeElapsed by one if less than the limit and not paused and rounds are incomplete
        else if (timeElapsed < limit && !pause && halfRound < totalFullRounds * 2){
            const interval = setInterval(() => {
            setTimeElapsed(timeElapsed + 1);
            context.setTimerTotalTime(context.timerTotalTime - 1);
            }, 1000);
            return () => clearInterval(interval); // cleans up the interval when unmounts
        }else if( timeElapsed >= limit){
            // switches limit, resets timeElapsed, and increments halfRound
            if (halfRound % 2 === 0){
                setLimit(restLimit);
            }else{
                setLimit(workLimit);
            }
            setTimeElapsed(0);
            if (halfRound !== totalFullRounds * 2){
                setHalfRound(halfRound + 1);
            }
        } 
    }, [timeElapsed, pause]);

    const reset = () => {
        setTimeElapsed(0);
        setLimit(workLimit);
        setHalfRound(0);
        setPause(true);
        context.setTimerQueue(context.initialQueue);
    }

    const fastForward = () => {
        context.deleteFromQueue(index);
        context.setTimerRunningState(true);
    }

    return (
        <div>
            <DisplayRound 
            rounds = {halfRound < totalFullRounds * 2 ?  `${Math.floor((halfRound * 0.5) + 1)} of ${totalFullRounds}` : `${totalFullRounds} of ${totalFullRounds}` } 
            period = {totalFullRounds * 2 === halfRound ? "Done" : halfRound % 2 === 0 ? "Work": halfRound % 2 === 1 ? "Rest": null} // uses ternary operators to show period and change color of display
            type = {totalFullRounds * 2 === halfRound ? "blue" : halfRound % 2 === 0 ? "green" : halfRound % 2 === 1 ? "tan": null}>  
            </DisplayRound>
            <DisplayTime timeInSeconds={limit - timeElapsed}/> 
            <Button type = {pause ? "green" : "white"} disabled = {totalFullRounds * 2 === halfRound} onClick={ () => setPause(!pause)} label={pause ? "Play" : "Pause"}></Button>
            <Button type = "blue" disabled = {halfRound === 0 && !timeElapsed} onClick={reset} label="Reset"></Button>
            <Button type = "darkblue" disabled = {totalFullRounds * 2 === halfRound}  onClick={fastForward} label="Fast Forward"></Button>
        </div>
    );

};

Tabata.propTypes = {
    workLimit: PropTypes.number,
    restLimit: PropTypes.number,
    totalFullRounds: PropTypes.number,
    index: PropTypes.number
};


export default Tabata;

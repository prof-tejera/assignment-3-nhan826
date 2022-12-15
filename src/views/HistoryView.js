import React, {useState, useContext} from "react";
import styled from "styled-components";
import { formattedTime } from "../utils/helpers";


const HistoryCard = styled.div`
    background-color: #303030;
    border-radius: 10px;
    margin: 20px;
    padding:20px;
    font-size: 110%;
    font-family: 'Poppins', sans-serif;
`;

const TimerTitle = styled.p`
    text-align: center;
    font-size: 110%;
    color: white;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
    line-height: 30px;
`;

const Default = styled.div`
    text-align: center;
    font-size: 110%;
    font-style: italic;
`;

const HistoryTitle = styled.p`
    text-align: center;
    font-size: 150%;
    font-family: 'Poppins', sans-serif;
`;

const TimerWrapper = styled.div`
    background-color: ${props => {
        if (props.type === "Stopwatch"){
            return "#BEAFA7"
        }
        if (props.type === "Countdown"){
            return "#899eb3"
        }
        if (props.type === "XY"){
            return "#BDD5EA"
        }
        if (props.type === "Tabata"){
            return "#64a193"
        }

    }};
    padding: 20px;
    margin: 30px;
    border-radius: 5px;
`;

const HistoryView = () => {
  const renderTimerInfo = (timers) => {
   return timers.map(timer => {
    return (
        <TimerWrapper type = {timer.timer_type} key={timer.id}>
            <p> Timer Name : {timer.timer_type} </p>
            {timer.limit && <p>Stopwatch Time: {timer.limit}</p>}
            {timer.startTime && <p>Countdown Time: {timer.startTime}</p>}
            {timer.timeLimit && <p>Round Time: {timer.timeLimit}</p>}
            {timer.totalRounds && <p>Total Rounds: {timer.totalRounds}</p>}
            {timer.workLimit && <p>Work Time: {timer.workLimit}</p>}
            {timer.restLimit && <p>Rest Time: {timer.restLimit}</p>}
            {timer.totalFullRounds && <p>Total Full Rounds: {timer.totalFullRounds}</p>}
        </TimerWrapper>
    )
   })
  }
  const renderWorkouts = () => {
    const storedWorkouts = localStorage.getItem("workouts")
    if (storedWorkouts){
        const parsedStoredWorkouts = JSON.parse(storedWorkouts)
        return parsedStoredWorkouts.map((workout, index) => {
            return(
                <HistoryCard key = {`workout-${index}`}>
                    <TimerTitle>Total Time: <br/>{formattedTime(workout.timerTotalTime)}</TimerTitle>
                    {renderTimerInfo(workout.workout)}
                </HistoryCard>
            )
        })
    }else{
        return (
            
            <div>
                <Default> No Workout History</Default>
            </div>
        )
    }
  }
  return (
    <div>
        <HistoryTitle>Timer History</HistoryTitle>
        {renderWorkouts()}
    </div>
  )
};

export default HistoryView;

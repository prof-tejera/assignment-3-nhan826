import React, {useState, useContext} from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import Panel from "../components/generic/Panel";
import DeleteBtn from "../components/generic/DeleteBtn";
import UpArrow from "../components/generic/UpArrow";
import DownArrow from "../components/generic/DownArrow";
import DisplayTotalTime from "../components/generic/DisplayTotalTime";
import {calculateTotalTime} from "../utils/helpers";
import EditForm from "../components/forms/EditForm";
import { TimerContext } from "../context";


const timerStateStyle = {
  active: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  disabled: {
    opacity: .4,
    pointerEvents: 'none'
  }
}

const TimerBody = styled.div`
  opacity:  ${props => timerStateStyle[props.timerStateStyle].opacity};
  pointer-events: ${props => timerStateStyle[props.timerStateStyle].pointerEvents};
`

TimerBody.defaultProps = {
  type: 'active'
}

const Timers = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Timer = styled.div`
  cursor: default !important;
  border: 7px double #d2d2d4;
  border-radius: 15px;
  padding: 20px;
  background-color: #19191a;
  color: white;
  letter-spacing: 2px;
  margin: 10px;
  font-size: 1.25rem;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  width: 90%;
  text-align: center;
  @media (max-width: 760px) {
    width: 80%;
    text-align: center;
  }
`;

const TimerTitle = styled.div`
`;

const Description = styled.p`
    font-family: 'Poppins', sans-serif;
    color: #b0b0b0;
`;

const EditButton = styled.button`
  background-color: #194E41;
  border: none;
  padding: 10px 20px;
  margin-top: 30px;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 90%;
  }
`

const TimersView = () => {
  const context = useContext(TimerContext);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  }

  const renderTimer = (timer, index) => {
    if(timer.timer_type === "Stopwatch") {
      return <Stopwatch handleShowDelete={handleShowDelete} {...timer} index={index} />
    }else if(timer.timer_type === "Countdown") {
      return <Countdown  handleShowDelete={handleShowDelete} {...timer} index={index} />
    }else if(timer.timer_type === "XY") {
      return <XY handleShowDelete={handleShowDelete} {...timer} index={index} />
    }else if(timer.timer_type === "Tabata") {
      return <Tabata handleShowDelete={handleShowDelete} {...timer} index={index} />
    }
  }

  const renderTimerQueue = () => {

    const getFormInputs = (timer, index) => {
      if (timer.timer_type === "Stopwatch"){
        return <EditForm 

        key = "stopwatch" 
        index = {index}
        timerSelect={"Stopwatch"} 
        inputs={{limit: timer.limit}}
        calculateTotalTime = {(formState) => parseInt(formState.limit)}
        totalTime = {timer.limit}
        description
  
        />
      }
      if (timer.timer_type === "Countdown"){
        return <EditForm 
        key = "countdown"
        index = {index}
        timerSelect={"Countdown"}
        inputs={{startTime: "60"}}
        calculateTotalTime = {(formState) => parseInt(formState.startTime)}
        totalTime = {timer.startTime}
        description
        />
      }
      if (timer.timer_type === "XY"){
        return <EditForm 
        key = "xy"
        index = {index}
        timerSelect={"XY"}
        inputs={{timeLimit: "10", totalRounds: "3"}}
        calculateTotalTime = {(formState) => parseInt(formState.timeLimit) * parseInt(formState.totalRounds)}
        totalTime = {30}
        description
        />
      }
      if (timer.timer_type === "Tabata"){
        return <EditForm 
        key = "tabata"
        index = {index}
        timerSelect={"Tabata"}
        inputs={{restLimit: "4", workLimit: "8", totalFullRounds: "4"}}
        calculateTotalTime = {(formState) => (parseInt(formState.restLimit) + parseInt(formState.workLimit)) * parseInt(formState.totalFullRounds)}
        totalTime = {48}
        description
        />
      }
    }
    return context.timerQueue.map(((timer, index) => {
    return (
    <Panel key={`timer-${timer.id}`}>
      <Timer>
        <UpArrow type={calculateTotalTime(context.initialQueue) === context.timerTotalTime ? "active" : "disabled"} index={index}/>
        <DownArrow type={calculateTotalTime(context.initialQueue) === context.timerTotalTime ? "active" : "disabled"}  index={index}/>
        <DeleteBtn type = {showDelete ? "disabled" : "active"} index = {index}/>
        <TimerTitle>{timer.timer_type}</TimerTitle>
        <TimerBody timerStateStyle = {index > 0 ? "disabled" : "active"} >{renderTimer(timer, index)}</TimerBody>
        <EditButton>Edit Timer</EditButton>
        {/* {getFormInputs(timer, index)} */}
        <Description>{timer.description}</Description> 
      </Timer>
    </Panel>)
    }))
  }
  return (
    <Timers>
      <DisplayTotalTime initialTime = {calculateTotalTime(context.initialQueue)} timeInSeconds={context.timerTotalTime} />
      {renderTimerQueue()}
    </Timers>
  );
};

export default TimersView;

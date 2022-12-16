import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {useState} from "react";
import { TimerContext } from "../../context";

const InputDiv = styled.div`
display: flex;
flex-direction:column;
align-items: center;
font-size: 100%;
`

const FormInput = styled.input`
text-align: center;
margin-top: 20px;
margin-bottom: 20px;
margin-left: 40px;
margin-right: 40px;
font-family: 'Poppins', sans-serif;
border: none;
border-radius: 20px;
padding-left: 10px;
padding-right: 10px;
padding-top: 5px;
padding-bottom: 5px;
width: 200px;
font-size: 100%;
`

const DescInput = styled.input`
text-align: left;
margin-top: 20px;
margin-bottom: 20px;
margin-left: 40px;
margin-right: 40px;
font-family: 'Poppins', sans-serif;
border: none;
border-radius: 5px;
padding: 15px 20px;
width: 500px;
font-size: 100%;
`

const SubmitButton = styled.button`
background-color: #2D7967;
color: white;
margin-top: 20px;
margin-bottom: 30px;
padding-top: 5px;
padding-bottom: 5px;
width: 200px;
border: none;
border-radius: 20px;
font-size: 100%;
transition: all .1s ease-out;
&:hover {
opacity: 90%;
}
&:active {
  background-color: #575757;
  opacity: 100%;
}
`

const EditForm = (props) => { 

    const context = useContext(TimerContext);
    const defaultFormState = props.inputs;
    const [formState, setFormState] = useState(defaultFormState);
    const [totalTime, setTotalTime] = useState(props.totalTime);

    useEffect(() => {
      setTotalTime(props.calculateTotalTime(formState))
    },[formState]);

    const handleInputChange = (event) => { 
        setFormState({ 
          ...formState, 
          [event.target.name]: event.target.value
        })
    }

    const renderTimerOptions = () => {
        if (props.timerSelect === "Stopwatch") {

          return (
            <>
            <InputDiv>
              <label>Total Time (seconds)</label>
              <FormInput type="number" name="limit" min="0" value={formState.limit} onChange={(event) => handleInputChange(event)}/>
              <label>Timer Description</label>
              <DescInput type="text" name="description" value={formState.description} onChange={(event) => handleInputChange(event)}/>
            </InputDiv>
            </>
          )
        }
        if (props.timerSelect === "Countdown"){
          return (
            <InputDiv>
              <label>Countdown Time (seconds)</label>
              <FormInput type="number" name="startTime" min="0" value={formState.startTime} onChange={handleInputChange}/>
              <label>Timer Description</label>
              <DescInput type="text" name="description" value={formState.description} onChange={(event) => handleInputChange(event)}/>
            </InputDiv>
          )
        }
        if (props.timerSelect === "XY"){
          return (
            <InputDiv>
              <label>Total Time (seconds)</label>
              <FormInput type="number" name="timeLimit" min="0" value={formState.timeLimit} onChange={handleInputChange}/>
              <label>Number of Rounds</label>
              <FormInput type="number" name="totalRounds" min="0" value={formState.totalRounds} onChange={handleInputChange}/>
              <label>Timer Description</label>
              <DescInput type="text" name="description" value={formState.description} onChange={(event) => handleInputChange(event)}/>
            </InputDiv>
          )
        }
        if (props.timerSelect === "Tabata"){
          return (
            <InputDiv>
              <label>Rest Time (seconds)</label>
              <FormInput type="number" name="restLimit" min="0" value={formState.restLimit} onChange={handleInputChange}/>
              <label>Work Time (seconds)</label>
              <FormInput type="number" name="workLimit" min="0" value={formState.workLimit} onChange={handleInputChange}/>
              <label>Number of Rounds</label>
              <FormInput type="number" name="totalFullRounds" min="0" value={formState.totalFullRounds} onChange={handleInputChange}/>
              <label>Timer Description</label>
              <DescInput type="text" name="description" value={formState.description} onChange={(event) => handleInputChange(event)}/>
            </InputDiv>
          )
        }
      }
      const handleFormSubmit = (event) => {
        const newQueueItem = {...formState,
           initialTime : totalTime,
             timer_type : props.timerSelect,
              totalTime,
               id:Date.now()}
        context.updateQueue(newQueueItem, props.index);
      }
      return (
        <>
        {renderTimerOptions()}
        <div>
            <SubmitButton onClick = {handleFormSubmit} type="submit">Edit</SubmitButton>
        </div>
        </>
      )
};
export default EditForm;
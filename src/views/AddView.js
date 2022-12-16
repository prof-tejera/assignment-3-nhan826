import React, {useContext} from "react";
import styled from "styled-components";
import {useState} from "react";
import AddForm from "../components/forms/AddForm";

const AddFormDiv = styled.div`
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 104%;
`

const FormSelect = styled.select`
  margin-top: 40px;
  background-color: #194E41;
  color: white;
  margin-bottom: 40px;
  margin-left: 40px;
  margin-right: 40px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Poppins', sans-serif;
  border: none;
  border-radius: 20px;
  border-right: 16px solid transparent;
  width: 200px;
  font-size: 100%;
  &:focus{
    border: 2px solid gray;
  }
  &:active{
    border: 2px solid gray;
  }
`

const FormHr = styled.hr`
  width: 70%;
  border: 1px solid gray;
  opacity: 40%;
  border-radius: 5px;
  margin-bottom: 20px;
`

const AddView = () => {

  const defaultFormState = {
    timerSelect: "stopwatch"
  }

  const [formState, setFormState] = useState(defaultFormState);  // defines state for the form

  const handleInputChange = (event) => {   // event listener for when input changes
    setFormState({  
      timerSelect: event.target.value
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  const getFormInputs = (timer) => {
    if (formState.timerSelect === "stopwatch"){
      return <AddForm 
      key = "stopwatch" 
      timerSelect={"Stopwatch"} 
      inputs={{limit: "60"}}
      calculateTotalTime = {(formState) => parseInt(formState.limit)}
      totalTime = {60}
      description

      />
    }
    if (formState.timerSelect === "countdown"){
      return <AddForm 
      key = "countdown"
      timerSelect={"Countdown"}
      inputs={{startTime: "60"}}
      calculateTotalTime = {(formState) => parseInt(formState.startTime)}
      totalTime = {60}
      description
      />
    }
    if (formState.timerSelect === "xy"){
      return <AddForm 
      key = "xy"
      timerSelect={"XY"}
      inputs={{timeLimit: "10", totalRounds: "3"}}
      calculateTotalTime = {(formState) => parseInt(formState.timeLimit) * parseInt(formState.totalRounds)}
      totalTime = {30}
      description
      />
    }
    if (formState.timerSelect === "tabata"){
      return <AddForm 
      key = "tabata"
      timerSelect={"Tabata"}
      inputs={{restLimit: "4", workLimit: "8", totalFullRounds: "4"}}
      calculateTotalTime = {(formState) => (parseInt(formState.restLimit) + parseInt(formState.workLimit)) * parseInt(formState.totalFullRounds)}
      totalTime = {48}
      description
      />
    }
  }

  return (
    <AddFormDiv>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label>
                Add Timer
                </label>
                <FormSelect name="timerSelect" value={formState.timerSelect} onChange={handleInputChange}>
                  <option value="stopwatch">Stopwatch</option>
                  <option value="countdown">Countdown</option>
                  <option value="xy">XY</option>
                  <option value="tabata">Tabata</option>
                </FormSelect>
                <FormHr/>
            </div>
            {getFormInputs()}
        </form>
    </AddFormDiv>
  );
};

export default AddView;

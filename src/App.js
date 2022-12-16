import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";
import HistoryView from "./views/HistoryView";
import EditView from "./views/EditView";
import logo from './logo.svg';
import Nav from './components/generic/Nav'
import { enqueue, dequeue, removeFromQueue, encodeJsonUrl, decodeJsonUrl, updateQueueItem } from "./utils/helpers";
import queryString from "query-string";
import {ErrorBoundary} from "react-error-boundary";


import {TimerContext} from "./context";

const Container = styled.div`
  background: #d2d2d4;
  height: 100vh;
  overflow: auto;
`;

const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: #8a3a3a;
  text-align: center;
  font-size: 110%;
  padding: 50px;
  font-family: "Poppins", sans-serif;
`

const ErrorBtn = styled.button`
  background-color: #2D7967;
  color: white;
  margin-top: 30px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  &:hover {
    opacity: 90%;
  }
`
//https://prof-tejera.github.io/assignment-3-nhan826'
const baseUrl = 'https://prof-tejera.github.io/assignment-3-nhan826';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <ErrorMessage role="alert">
    <p>Something went wrong with the Fitness Timer App</p>
    <pre>{error.message}</pre>
    <ErrorBtn onClick={resetErrorBoundary}>Try again</ErrorBtn>
  </ErrorMessage>
);

const App = () => {
  const [timerQueue, setTimerQueue] = useState([]);
  const [timerRunningState, setTimerRunningState] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [timerTotalTime, setTimerTotalTime] = useState(0);
  const [initialQueue, setInitialQueue] = useState([]);
  const [workOutsComplete, setWorkOutsComplete] = useState([]);
  const [timerUrl,setTimerUrl] = useState("");

  useEffect(() => {
    const localStoredWorkouts = localStorage.getItem("workouts");
    if(localStoredWorkouts){
      const parsedLocalStoredWorkouts = JSON.parse(localStoredWorkouts);
      setWorkOutsComplete(parsedLocalStoredWorkouts);
    }
    const localStoreTimerQueue = localStorage.getItem("timerQueue")
    if(localStoreTimerQueue){
      const parsedLocalStoreTimerQueue = JSON.parse(localStoreTimerQueue)
      if(parsedLocalStoreTimerQueue.length > 0){
        setInitialQueue(parsedLocalStoreTimerQueue);
        setTimerQueue(parsedLocalStoreTimerQueue);
      }
    }else{
      const urlParams = window.location;
      const timerQuery = (queryString.parse(urlParams.search).timerQueue)
      if (timerQuery){
        const decodedQueue = decodeJsonUrl(timerQuery);
        setInitialQueue(decodedQueue);
        setTimerQueue(decodedQueue);
        localStorage.setItem("timerQueue", JSON.stringify(timerQueue));
      }
      else{
        localStorage.setItem("timerQueue", JSON.stringify([]));
      }
    }
  }, []);
  

  useEffect(() => {
    if(timerQueue.length < 1 && initialQueue.length > 0){
      const timerTotalTime = initialQueue.reduce((total, timer) => {
        return total + timer.totalTime 
      }, 0)
      setWorkOutsComplete([...workOutsComplete, {timerTotalTime, workout:initialQueue}])
      localStorage.setItem("workouts", JSON.stringify([...workOutsComplete, {timerTotalTime, workout:initialQueue}]));
      setInitialQueue([]);
    }

    const jsonUrl = encodeJsonUrl(timerQueue)
    const nextUrl = `${baseUrl}?timerQueue=${jsonUrl}`
    
    if(timerQueue.length > 0){
      window.history.pushState(null, null, nextUrl);
    } else{
      window.history.pushState(null, null, baseUrl);
    }

    const timerTotalTime = timerQueue.reduce((total, timer) => {
      return total + timer.totalTime 
    }, 0)

    setTimerTotalTime(timerTotalTime);
    localStorage.setItem("timerQueue", JSON.stringify(timerQueue));
  }, [timerQueue]);

  
  const updateQueue = (updatedTimer, index) => {
    updateQueueItem(timerQueue, setTimerQueue, updatedTimer, index)
  }

  const addToQueue = (newTimer) => {
    enqueue(timerQueue, setTimerQueue, newTimer);
    setInitialQueue([...initialQueue, newTimer]);
  }

  const deleteFromQueue = (index) => {
    removeFromQueue(timerQueue, setTimerQueue, index);
  }

  const removeCurrentTimer = () => {
    dequeue(timerQueue, setTimerQueue);
  }

  return (
    <TimerContext.Provider value={{timerQueue,
     initialQueue,
      setInitialQueue,
       setTimerQueue,
        addToQueue,
         deleteFromQueue,
          removeCurrentTimer,
            timerRunningState,
             setTimerRunningState,
              totalTime,
               setTotalTime,
               timerUrl,
               setTimerUrl,
               updateQueue,
               timerTotalTime,
               setTimerTotalTime
               }}> 
      <Container>
        <Router basename="/fitnesstimers">
          <Nav />
          <Logo src= {logo} alt="Logo"/>
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/" element={<TimersView />} />
            <Route path="/add" element={<AddView />} />
            <Route path="/history" element={<HistoryView />} />
            <Route path="/edit" element={<EditView />} />
          </Routes>
        </Router>
      </Container>
    </TimerContext.Provider>
  );
};

const Wrapped = () => {
  return <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error, errorInfo) => {
  }}>
    <App />
  </ErrorBoundary>;
}

export default Wrapped;

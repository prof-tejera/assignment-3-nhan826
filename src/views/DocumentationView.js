import React from "react";
import styled from "styled-components";
import DocumentComponent from "../components/documentation/DocumentComponent";
import Button from "../components/generic/Button";
import DisplayTime from "../components/generic/DisplayTime";
import DisplayRound from "../components/generic/DisplayRound";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import DeleteBtn from "../components/generic/DeleteBtn";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-left: 30px;
`;

const SmallerComponent = styled.div`
    transform: scale(0.5);
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    border: 3px double #d2d2d4;
    font-family: 'Orbitron', sans-serif;
    padding: 10px;
`

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>

        <DocumentComponent
          title="Button"
          component={<Button label={"Button"}/>}
          propDocs={[
            {
              prop: "onClick",
              description: "Takes function (ex. reset, or fastForward)",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "label",
              description: "Text inside the button",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "activeState",
              description: "Sets the disabled attribute of the button",
              type: "bool",
              defaultValue: "none",
            },
            {
              prop: "theme",
              description: "Sets the theme/style of the button",
              type: "string",
              defaultValue: "green",
            },
          ]}
        />
        <DocumentComponent
          title="DisplayTime "
          component={<DisplayTime timeInSeconds={90}/>}
          propDocs={[
            {
              prop: "timeInSeconds",
              description: "Takes time in seconds",
              type: "number",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="DisplayRound "
          component={<DisplayRound rounds={4} period = "Work" theme = "green"/>}
          propDocs={[
            {
              prop: "rounds",
              description: "Takes number of rounds",
              type: "number",
              defaultValue: "none",
            },
            {
              prop: "period",
              description: "Takes a string (ex. 'Workout', 'Rest')",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "theme",
              description: "Sets the color of the period display",
              type: "string",
              defaultValue: "green",
            },
          ]}
        />
        <DocumentComponent
          title="DeleteBtn "
          component={<DeleteBtn/>}
          propDocs={[
            {
              prop: "index",
              description: "Takes index to delete particular timer",
              type: "number"
            },
            {
              prop: "type",
              description: "Takes state of button — active or disabled",
              type: "string",
              default: "active"
            }

          ]}
        />
        <DocumentComponent
          title="Stopwatch"
          component={<SmallerComponent><Stopwatch/></SmallerComponent>}
          propDocs={[
            {
              prop: "limit",
              description: "Time that stopwatch will run to",
              type: "number",
              defaultValue: "90"
            },
            {
              prop: "index",
              description: "Index of timer in queue",
              type: "number",
            }
          ]}
        />
        <DocumentComponent
          title="Countdown"
          component={<SmallerComponent><Countdown/></SmallerComponent>}
          propDocs={[
            {
              prop: "startTime",
              description: "Time that countdown timer will start from",
              type: "number",
              defaultValue: "90"
            },
            {
              prop: "index",
              description: "Index of timer in queue",
              type: "number",
            }
          ]}
        />
        <DocumentComponent
          title="XY"
          component={<SmallerComponent><XY/></SmallerComponent>}
          propDocs={[
            {
              prop: "timeLimit",
              description: "Amount of time for each round",
              type: "number",
              defaultValue: "3"
            },
            {
              prop: "totalRounds",
              description: "Time that timer will count down to",
              type: "number",
              defaultValue: "4"
            },
            {
              prop: "index",
              description: "Index of timer in queue",
              type: "number",
            }
          ]}
        />
        <DocumentComponent
          title="Tabata"
          component={<SmallerComponent><Tabata/></SmallerComponent>}
          propDocs={[
            {
              prop: "workLimit",
              description: "Amount of time for each work round",
              type: "number",
              defaultValue: "3"
            },
            {
              prop: "restLimit",
              description: "Amount of time for each rest round",
              type: "number",
              defaultValue: "2"
            },
            {
              prop: "totalRounds",
              description: "Number of full rounds (work + rest) for the timer",
              type: "number",
              defaultValue: "2"
            },
            {
              prop: "index",
              description: "Index of timer in queue",
              type: "number",
            }
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;

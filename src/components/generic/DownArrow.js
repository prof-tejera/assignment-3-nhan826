import {useContext} from "react";
import styled from "styled-components";
import down from '../../down.svg'
import { TimerContext } from "../../context";

const type = {
    // active and disabled styles
    active: {
        opacity: 1,
        pointerEvents: 'auto'
    },
    disabled: {
        opacity: 0.1,
        pointerEvents: 'none'
    }
}

const DownBtn = styled.div`
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    opacity: 70%;
    opacity: ${props => type[props.type].opacity};
    pointer-events: ${props => type[props.type].pointerEvents};
    &:hover {
    opacity: 100%;
  }
`;

const DownIcon = styled.img`
    position: absolute;
    top: 35px;
    left: 0px;
`;

DownBtn.defaultProps = {
    type: 'active'
  }

const DownArrow= ({index, type}) => {
    const context = useContext(TimerContext);

    const handleDownArrowClick = () => {
         const timerQueuelength = context.timerQueue.length;
         const currentQueueItem = context.timerQueue[index];
         const initialQueueItem = context.initialQueue.find((item)=>item.id === currentQueueItem.id);

         if (index === timerQueuelength - 1) {
             context.setTimerQueue([initialQueueItem, ...context.timerQueue.slice(0,timerQueuelength - 1)])
         }else{
             const copiedTimerQueue = context.timerQueue;
             const temp = initialQueueItem;
             copiedTimerQueue[index] = copiedTimerQueue[index+1];
             copiedTimerQueue[index + 1] = temp;
             context.setTimerQueue([...copiedTimerQueue]);
         }
     }

    return (
    <DownBtn type={type} onClick = {handleDownArrowClick}>
        <DownIcon width="35" src= {down} alt="Down Icon"/>
    </DownBtn>
    );
};
  
export default DownArrow;
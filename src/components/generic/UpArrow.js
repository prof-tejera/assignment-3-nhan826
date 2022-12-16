import {useContext} from "react";
import styled from "styled-components";
import up from '../../up.svg'
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

const UpBtn = styled.div`
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

const UpIcon = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
`;

UpBtn.defaultProps = {
    type: 'active'
}
  
const UpArrow= ({index, type}) => {
   const context = useContext(TimerContext);

   const handleUpArrowClick = () => {
        if (index === 0) {
            context.setTimerQueue([...context.timerQueue.slice(1), context.timerQueue[0]])
        }else{
            const copiedTimerQueue = context.timerQueue;
            const temp = copiedTimerQueue[index-1];
            copiedTimerQueue[index-1] = copiedTimerQueue[index];
            copiedTimerQueue[index] = temp;
            context.setTimerQueue([...copiedTimerQueue]);
        }
    }

    return (
    <UpBtn type={type} onClick = {handleUpArrowClick}>
        <UpIcon width="35" src= {up} alt="Up Icon"/>
    </UpBtn>
    );
};
  
export default UpArrow;
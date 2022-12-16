import {useContext} from "react";
import styled from "styled-components";
import trash from '../../trash.svg'
import { TimerContext } from "../../context";
import PropTypes from 'prop-types';


const type = {
    // active and disabled styles
    active: {
        opacity: 1,
        pointerEvents: 'auto'
    },
    disabled: {
        opacity: 0,
        pointerEvents: 'none'
    }
}

const TrashBtn = styled.div`
    opacity: ${props => type[props.type].opacity};
    pointer-events: ${props => type[props.type].pointerEvents};
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    &:hover {
    opacity: 90%;
  }
`;

TrashBtn.defaultProps = {
    type: 'active'
  }
  
const Icon = styled.img`
    position: absolute;
    top: 0px;
    right: 0px;
`;

const DeleteBtn= ({index, type}) => {
    const context = useContext(TimerContext);
    const handleClick = (index) => {
        context.deleteFromQueue(index);
        if (context.timerQueue.length <= 1){ 
            context.setInitialQueue([]);
        } 
    }
    return (
    <TrashBtn type = {type} onClick = {() => handleClick(index)}>
        <Icon width="45" src= {trash} alt="Logo"/>
    </TrashBtn>
    );
};

DeleteBtn.propTypes = {
    index: PropTypes.number,
    type: PropTypes.string
}
  
export default DeleteBtn;
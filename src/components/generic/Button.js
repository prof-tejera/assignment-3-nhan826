import styled from "styled-components";
import PropTypes from 'prop-types';


// reference for theme toggle: https://www.youtube.com/watch?v=gP8nQVlrwc0&t=552s&ab_channel=react.school
const type = {
  green: {
    default: "#2B7967",
    hover: "#378a77",
    color: "#ffffff",
  },
  white: {
    default: "#949494",
    color: "#ffffff",
    hover: "#858585",
  },
  blue: {
    default: "#3454D1",
    color: "#ffffff",
    hover: "#344db3",
  },
  darkblue: {
    default: "#0E34A0",
    color: "#ffffff",
    hover: "#0f2f87",
  }
}

const TimerButton = styled.button`
  cursor: pointer;
  color: ${props => type[props.type].color};
  width: 200px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${props => type[props.type].default};
  border:none;
  border-radius: 10px;
  margin: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 90%;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => type[props.type].hover};
    color: ${props => type[props.type].color};
  }
  &:disabled {
    opacity: 20%;
    cursor: default;
  }
`;

TimerButton.defaultProps = {
  type: 'green'
}


const Button= ({onClick, label, disabled, type}) => {
  return (
  <TimerButton type = {type} disabled = {disabled} onClick = {onClick}>
      {label}
  </TimerButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string
}

export default Button;
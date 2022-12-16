import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formattedTime } from "../../utils/helpers";

const TimeDisplayed = styled.div`
  margin-top: 5px;
  font-size: 140%;
  font-family: 'Orbitron', sans-serif;
  color: #194E41;
`;

const DisplayTotalTime= ({timeInSeconds, initialTime}) => {
    return (
      <TimeDisplayed>
        <p>{formattedTime(Math.abs(initialTime - timeInSeconds))} of  {formattedTime(initialTime)}</p>
      </TimeDisplayed>
    );
  };

DisplayTotalTime.propTypes = {
    timeInSeconds: PropTypes.number,
    initialTime: PropTypes.number
};

export default DisplayTotalTime;
import PropTypes from 'prop-types';
import { formattedTime } from "../../utils/helpers";

const DisplayTime= ({timeInSeconds}) => {
    return <p>{formattedTime(timeInSeconds)}</p>;
};

DisplayTime.propTypes = {
    timeInSeconds: PropTypes.number
};

export default DisplayTime;
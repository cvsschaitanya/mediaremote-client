import './Mouse.css';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Mouse({
    server
}) {
    const sendRequest = (endpoint) =>
        () => axios.get(`${server}/${endpoint}`)
            .then(() => {
                console.log(`Request sent to ${endpoint}`);
            })
            .catch((err) => {
                console.error('Request failed', err);
            });

    return (
        <div className='mouse'>
            
        </div>
    )
};

Mouse.propTypes = {
    server: PropTypes.string.isRequired,
};


import './Keyboard.css';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Keyboard({
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
        <>
            {/* <div className='text-title'>Remote Controller</div> */}
            <div className='text-title'>Remote Controller</div>
            <div className="controller">
                <div className="arrows">
                    <div className="arrow-buttons">
                        <button className="arrow-button" onClick={sendRequest('/up')}>↑</button>
                    </div>
                    <div className="arrow-buttons">
                        <button className="arrow-button" onClick={sendRequest('/left')}>←</button>
                        <button className="arrow-button" onClick={sendRequest('/right')}>→</button>
                    </div>
                    <div className="arrow-buttons">
                        <button className="arrow-button" onClick={sendRequest('/down')}>↓</button>
                    </div>
                </div>
                <button className="spacebar-button" onClick={sendRequest('/play_pause')}>␣</button>
            </div>
        </>
    )
};

Keyboard.propTypes = {
    server: PropTypes.string.isRequired,
};


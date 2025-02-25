import './Home.css'
import PropTypes from 'prop-types';
import Keyboard from './Keyboard';
import Mouse from './Mouse';
import { useState } from 'react';

export default function Home({
    config,
}) {

    const [mode, setMode] = useState('keyboard');

    const toggleMode = (newMode) => {
        setMode(newMode);
    };

    return (
        <div className='home'>
            <div className="top-bar">
                <div className={`top-bar-half ${mode === 'keyboard' ? 'active' : ''}`} onClick={() => toggleMode('keyboard')}>
                    Keyboard
                </div>
                <div className={`top-bar-half ${mode === 'mouse' ? 'active' : ''}`} onClick={() => toggleMode('mouse')}>
                    Mouse
                </div>
            </div>
            <div className='panel'>
                {mode === 'keyboard' ? <Keyboard server={`${config.server}/keyboard`} /> : <Mouse server={`${config.server}/mouse`} />}
            </div>
        </div>
    );
    // return <Keyboard />;
};

Home.propTypes = {
    config: PropTypes.shape({
        server: PropTypes.string.isRequired,
    }).isRequired,
};


import './Home.css'
import PropTypes from 'prop-types';
import Keyboard from './Keyboard';

export default function Home({
    config,
}) {
    
    return <Keyboard server={config.server}/>;
};

Home.propTypes = {
    config: PropTypes.shape({
        server: PropTypes.string.isRequired,
    }).isRequired,
};


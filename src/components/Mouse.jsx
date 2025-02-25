import './Mouse.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';

const getX = event => event.touches[0].clientX;
const getY = event => event.touches[0].clientY;

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
            
    const [requestQueue, setRequestQueue] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const touchStartRef = useRef({ x: 0, y: 0 });
    const clockRef = useRef(0);
    const radix = 10;

    const onTouchStart = event => {
        touchStartRef.current = { x: getX(event), y: getY(event), timestamp: Date.now() };
    };

    const onTouchMove = event => {
        const dur = Date.now() - touchStartRef.current.timestamp;
        
        // clockRef.current = (clockRef.current + 1) % radix;
        // if (clockRef.current !== 0) return;

        const deltaX = getX(event) - touchStartRef.current.x;
        const deltaY = getY(event) - touchStartRef.current.y;
        console.log(`Moved: ${deltaX}px horizontally, ${deltaY}px vertically in ${dur}ms`);
        // console.log(`Clock: ${clockRef.current}`);
                
        queueRequest(deltaX, deltaY, dur);
    };

    const queueRequest = (dx, dy, dur) => {
        setRequestQueue(prevQueue => [...prevQueue, {dx, dy, dur}]);
    };

    useEffect(() => {
        const processQueue = async () => {
            if (isProcessing || requestQueue.length === 0) return;

            setIsProcessing(true);
            const {dx, dy, dur} = requestQueue[0];

            try {
                const response = await axios.get(`${server}/move?x=${dx}&y=${dy}&dur=${dur}`);
                // console.log(`${server}/move?x=${dx}&y=${dy}&dur=${dur}`);
                console.log(`Response: `, response.data);
            } catch (err) {
                console.error('Request failed', err);
            } finally {
                setRequestQueue(prevQueue => prevQueue.slice(1));
                setIsProcessing(false);
            }
        };

        processQueue();
    }, [requestQueue, isProcessing, server]);

    
    return (
        <div className='mouse' onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
            
        </div> 
        
    )
};

Mouse.propTypes = {
    server: PropTypes.string.isRequired,
};


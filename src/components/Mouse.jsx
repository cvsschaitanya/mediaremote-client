import './Mouse.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function Mouse({ server }) {
    const socket = useRef(null);
    const lastTouch = useRef({ x: null, y: null });

    useEffect(() => {
        // socket.current = io(`ws://${server}`);
        socket.current = io("ws://192.168.0.103:9000");
        return () => {
            socket.current.disconnect();
        };
    }, [server]);

    const onTouchStart = (event) => {
        const touch = event.touches[0];
        lastTouch.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchMove = (event) => {
        const touch = event.touches[0];
        if (lastTouch.current.x !== null && lastTouch.current.y !== null) {
            const dx = touch.clientX - lastTouch.current.x;
            const dy = touch.clientY - lastTouch.current.y;
            socket.current.emit('mouse_move', { dx, dy });
        }
        lastTouch.current = { x: touch.clientX, y: touch.clientY };
    };

    return (
        <div className='mouse' onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
        </div>
    );
}

Mouse.propTypes = {
    server: PropTypes.string.isRequired,
};

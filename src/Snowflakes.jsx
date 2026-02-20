import React, { useEffect, useState } from 'react';
import './Snowflakes.css';

const Snowflakes = () => {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random().toString(36).substr(2, 9);
            const flake = {
                id,
                left: Math.random() * 100 + 'vw',
                fontSize: Math.random() * 10 + 10 + 'px',
                opacity: Math.random(),
                duration: Math.random() * 3 + 2 + 's'
            };

            setFlakes(prev => [...prev, flake]);

            setTimeout(() => {
                setFlakes(prev => prev.filter(f => f.id !== id));
            }, parseFloat(flake.duration) * 1000);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="snow-container">
            {flakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        fontSize: flake.fontSize,
                        opacity: flake.opacity,
                        animationDuration: flake.duration
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};

export default Snowflakes;

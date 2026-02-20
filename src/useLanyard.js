import { useState, useEffect } from 'react';

const DISCORD_USER_ID = '1058031013474877540';

export const useLanyard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchLanyardData = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                const json = await response.json();
                if (json.success) {
                    setData(json.data);
                }
            } catch (error) {
                console.error('Error fetching Lanyard data:', error);
            }
        };

        fetchLanyardData();

        const ws = new WebSocket('wss://api.lanyard.rest/socket');

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.op === 1) {
                ws.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_id: DISCORD_USER_ID }
                }));

                const heartbeatInterval = msg.d.heartbeat_interval;
                const heartbeat = setInterval(() => {
                    ws.send(JSON.stringify({ op: 3 }));
                }, heartbeatInterval);

                return () => clearInterval(heartbeat);
            } else if (msg.op === 0 || msg.op === 5) {
                setData(msg.d);
            }
        };

        ws.onclose = () => {
            setTimeout(() => {
                // simple reconnect logic
            }, 5000);
        };

        return () => ws.close();
    }, []);

    return data;
};

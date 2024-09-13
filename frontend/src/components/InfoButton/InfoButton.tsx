import React, { useState } from 'react';

const InfoButton: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>(null); // Specificeer het type indien nodig
    const [error, setError] = useState<string | null>(null); // error kan een string of null zijn

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('/api/user_info');
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            const data = await response.json();
            setUserInfo(data);
            setError(null); // Reset error als de fetch succesvol is
        } catch (err) {
            // Controleer of err een Error is en gebruik de message
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };

    return (
        <div>
            <button onClick={fetchUserInfo}>Info</button>
            {userInfo && (
                <div>
                    <h3>User Info:</h3>
                    <pre>{JSON.stringify(userInfo, null, 2)}</pre>
                </div>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default InfoButton;
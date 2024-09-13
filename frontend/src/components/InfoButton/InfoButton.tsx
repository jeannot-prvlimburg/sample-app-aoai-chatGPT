import React, { useState } from 'react';

const InfoButton: React.FC = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('/api/user_info');
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            const data = await response.json();
            setUserInfo(data);
        } catch (err) {
            setError(error.message);
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
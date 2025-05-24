import { useState } from 'react';
import './FriendCard.css';

const FriendCard = ({ name, photoUrl }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleFriendRequest = () => {
    setRequestSent(true);
  };

  return (
    <div className="friend-card">
      <div className="friend-photo">
        <img src={photoUrl} alt={name} />
      </div>
      <div className="friend-info">
        <h3>{name}</h3>
        <button 
          className={`friend-request-btn ${requestSent ? 'sent' : ''}`}
          onClick={handleFriendRequest}
          disabled={requestSent}
        >
          {requestSent ? 'Request Sent' : 'Add Friend'}
        </button>
      </div>
    </div>
  );
};

export default FriendCard; 
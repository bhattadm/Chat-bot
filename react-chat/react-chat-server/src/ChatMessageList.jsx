const ChatMessageList = ({ messageList }) => {
  return (
    <div class = "column right">
    <h3 class = "subtitle">Messages:</h3>
    <ul>
      {Object.values(messageList).map( message => (
        <li>
          <div className="messages">
            <span className = "messagetext">{message.sender}:{message.text}</span>
            <p>{message.timestamp}</p>
          </div>
      </li> ) ) }
    </ul>
    </div>
  );
};
  
export default ChatMessageList;
const ChatUserList = ({ userList }) => {
  return (
    <div class = "column left" >
      <h3 class = "subtitle">Users:</h3>
      <ul>
        {Object.values(userList).map( user => (
          <li>
            <div className="user">
            <span className="username">{user.username}</span>
            </div>
          </li> ) ) }
      </ul>
    </div>
  );
};

export default ChatUserList;
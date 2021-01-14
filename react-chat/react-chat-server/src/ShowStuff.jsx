import { useEffect, useState } from 'react';
import { fetchGetChat} from './services';
import ChatUserList from './ChatUserList';
import ChatMessageList from './ChatMessageList';
import ChatOutgoing from './ChatOutgoing';

const ShowStuff = ({ username }) => {

  const [userList, setUserList] = useState('');
  const [messageList, setMessageList] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    renderChat({setMessageList});
    const intervalId = setInterval(() => {
      renderChat({setMessageList});
    }, 5000);
    return function cleanup() {
      clearInterval(intervalId);
    };
  },[]);
  
  const renderChat = ({setMessageList}) => {
    fetchGetChat()
    .then((chatList)=>{
      setUserList(chatList.userList)
      setMessageList(chatList.messageList)
    })
    .catch((err) => {
      setStatus(err.error);
  });
}

const usercontent   = <ChatUserList userList = {userList}/>;
const messagecontent = <ChatMessageList messageList = {messageList}/>;
const outgoingcontent = <ChatOutgoing username = {username} renderChat={renderChat} setMessageList={setMessageList}/>;

  return (
    <div class = "display-panel">
    { status && <div class="status">{status}</div>}
    <div class = "row">
    {usercontent}
    {messagecontent}
    </div>
    {outgoingcontent}
    </div>
  );
};

export default ShowStuff;
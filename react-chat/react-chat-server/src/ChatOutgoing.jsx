import { useState} from 'react';
import {fetchSendMessage} from './services';

const ChatOutgoing = ({username,renderChat,setMessageList}) => {
  
  const [text, setText] = useState('');
  const [isGreyedout, setisGreyedout] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [statusmsg, setstatusmsg] = useState('');

  const onChange = (e) => {
    setstatusmsg('');
    setText(e.target.value);
    setisGreyedout(!e.target.value);
  };
    
  const sendmessage= ()=> {
    setisLoading(true);
    fetchSendMessage({username ,text})
    .then( chatList => {
      setMessageList(chatList.messageList)
      setText('');
      setisGreyedout(true);
      setstatusmsg('');
      setisLoading(false);
      renderChat({setMessageList});    
    })
    .catch( err => {
      setText('');
      setisGreyedout(true);
      setstatusmsg(err.error);
      setisLoading(false);
    });
  };

  return (
    <div> 
      { statusmsg && <div className="status">{statusmsg}</div>}
      <div className = "send-form">
      <label>
        Send Message:
        <input disabled={isLoading} onChange={onChange} value={text} />
      </label>
      <button onClick={sendmessage} disabled={isGreyedout || isLoading} >{ isLoading ? "..." : "Send"}</button>
      </div>
    </div>
  );
};
  
export default ChatOutgoing;
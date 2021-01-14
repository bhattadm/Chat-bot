const uuid = require('uuid').v4;
const sessions = {};
let chat = {};
const userList = [];
const messageList = [];

const isValidSession = function(sid) {
  return sessions[sid];
};

const isValidUsername = function( username ) {
  const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
  if(!username) {
    return false;
  }
  else if(username !== cleanUsername) {
    return false;
  }
  return true;
};

const create = function({ username }) {
  if(!username) {
    return { error: 'username-required' };
  }
  if(!isValidUsername(username)) {
    return { error: 'username-invalid' };
  }
  
  const sid = uuid();
  addUser(username);

  sessions[sid] = {
    username,
  };
  return { sid };
};
  
const addMessage= function({sender, timestamp, text }) {
  messageList.push({ sender, timestamp, text });
}

const addUser= function(username) {
  userList.push({username});
}

const remove = function(sid) {
  delete sessions[sid];
};

const getChat = function() {
  chat = {
    userList:userList,
    messageList:messageList
  }
  return chat;
}

module.exports = {
  details: sessions,
  isValidSession,
  create,
  remove,
  addMessage,
  getChat,
};
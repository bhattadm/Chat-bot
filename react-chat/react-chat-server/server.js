const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = 5000;
const app = express();
const session = require('./session');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;  
  if(!sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  else if(!session.isValidSession(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  res.json(session.details[sid]);
});

app.post('/api/session', (req, res) => {
  const username = req.body.username;
  const { sid, error } = session.create({ username });
  if(error) {
    res.status(400).json({error});
    return;
  }
  else if (/\s/.test(username) || username.toLowerCase()=== 'dog') {
    res.status(404).json({ error: `Bad Login: ${username}`});
    return;
  }
    res.cookie('sid', sid);
    res.status(200).json(session.details[sid]);
});

app.get('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  if(!sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  if(!session.isValidSession(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  let chat = session.getChat();
  res.status(200).json(chat);
});

app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const sender = req.body.username;
  const text   = req.body.text;
  if (text=== null || text.match(/^ *$/)) {
    res.status(401).json({ error: 'text-required' });
    return;
  }

  session.addMessage({sender,timestamp:new Date(),text});
  let chat = session.getChat();
  res.status(200).json(chat);
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  session.remove(sid);
  res.clearCookie('sid');
  res.json({ sid, status: 'removed' });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
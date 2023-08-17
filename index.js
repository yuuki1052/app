const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const receivedMessages = [];

app.use(bodyParser.json());

app.post('/api/messages', (req, res) => {
  if (req.body.from) {
    const senderName = req.body.from.name;
    const message = req.body.text;
    const timestamp = new Date();

    console.log(`Sender: ${senderName}`);
    console.log(`Message: ${message}`);



    receivedMessages.push({ senderName, message , timestamp});

    res.send({}); 
  } else {
    console.log('fromプロパティが存在しません。');
  }
});

app.get('/messages', (req, res) => {
  const messagesHTML = receivedMessages.map(msg => `<p><strong>${msg.senderName} (${msg.timestamp}):</strong> ${msg.message}</p>`).join('');
  const html = `<html><body>${messagesHTML}</body></html>`;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Bot endpoint listening at http://localhost:${port}/api/messages`);
});

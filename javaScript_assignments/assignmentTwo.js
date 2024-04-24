const express = require("express");
const PORT = 5000;
const app = express();

let messages = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My home page");
});

app.get("/about", (req, res) => {
  res.send(
    "I am learning backend development in the African Agility Girls In Tech Bootcamp, It promises to be interesting"
  );
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/contact", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.json(newMessage);
});

app.put('/contact/:id', (req, res) => {
    const messageId = req.params.id;
    const updatedMessage = req.body;
    const messageIndex = messages.findIndex(p => p.id === messageId);
    if (messageIndex !== -1) {
      messages[messageIndex] = updatedMessage;
      res.json(updatedMessage);
    } else {
      res.status(404).send('Message not found');
    }
  });
  
  // PATCH partially update a product by ID
  app.patch('/contact/:id', (req, res) => {
    const messageId = req.params.id;
    const updates = req.body;
    const messageIndex = messages.findIndex(p => p.id === messageId);
    if (messageIndex !== -1) {
      messages[messageIndex] = { ...messages[messageIndex], ...updates };
      res.json(messages[messageIndex]);
    } else {
      res.status(404).send('message not found');
    }
  });
  
  // DELETE a product by ID
  app.delete('/contact/:id', (req, res) => {
    const messageId = req.params.id;
    const messageIndex = messages.findIndex(p => p.id === messageId);
    if (messageIndex !== -1) {
      messages.splice(messageIndex, 1);
      res.send('message deleted');
    } else {
      res.status(404).send('message not found');
    }
  });
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

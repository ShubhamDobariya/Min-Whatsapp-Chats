const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// Create Route
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;

  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      "chat was saved";
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Edit Route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { message: newMessage } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
});

// Destroy Route

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/", (req, res) => {
  res.send("successful");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

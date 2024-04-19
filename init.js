const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "shubham",
    to: "pujan",
    message: "Can I call you later?",
    created_at: new Date(),
  },
  {
    from: "parth",
    to: "Dishant",
    message: "give me OTP",
    created_at: new Date(),
  },
  {
    from: "kishan",
    to: "bhavy",
    message: "I will be there!",
    created_at: new Date(),
  },
  {
    from: "hasu",
    to: "rishit",
    message: "send me marvels movies",
    created_at: new Date(),
  },
  {
    from: "Ankush",
    to: "mitu",
    message: "Are you free?",
    created_at: new Date(),
  },
  {
    from: "Tirth",
    to: "harsh",
    message: "send me Maths Tutorial",
    created_at: new Date(),
  },
  {
    from: "riyanshi",
    to: "yashvi",
    message: "Today is holiday",
    created_at: new Date(),
  },
  {
    from: "kushi",
    to: "vanshi",
    message: "I am busy!",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);

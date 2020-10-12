const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://carrot:Shadowjbh1!@boilerplate.y98ay.mongodb.net/boilerplate?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

/*
    mongoose Clusters > Networks Access > IP Address 현재 접속 IP로 수정
*/

app.get("/", (req, res) => {
  res.send("Hello node & express");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

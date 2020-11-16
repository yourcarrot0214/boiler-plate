const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

/*
    mongoose Clusters > Networks Access > IP Address 현재 접속 IP로 수정
    nodemon :: 소스의 변경된 부분을 감지하여 자동으로 서버를 재시작해주는 모듈
    $ npm install nodemon --save-dev
*/

app.get("/", (req, res) => {
  res.send("Hello node & express & nodemon");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  // 1. 데이터베이스에 요청된 이메일이 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "데이터베이스에 없는 이메일 입니다.",
      });
    }
  });

  // 2. 있다면 비밀번호가 맞는지 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
  });

  // 3. 둘다 맞다면 토큰을 생성.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// #10. Bcrypt로 비밀번호 암호화 하기
// $ npm install bcrypt --save

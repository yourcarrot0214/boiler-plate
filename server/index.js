const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get("/", (req, res) => res.send("Hello node & express & nodemon"));

app.get("/api/hello", (req, res) => res.send("Axios & proxy setting"));

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  // 1. 데이터베이스에 요청된 이메일이 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "데이터베이스에 없는 이메일 입니다.",
      });
    }
    // 2. 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      // 3. 둘다 맞다면 토큰을 생성.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // token을 저장.(cookies, local storage 등)
        res
          .cookie("X_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// login route
app.get("/api/users/auth", auth, (req, res) => {
  // 미들웨어를 통과함 => Authentication === True
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// #10. Bcrypt로 비밀번호 암호화 하기
// $ npm install bcrypt --save

// #12. jsonwebtoken으로 토큰 생성하기
// $ npm install jsonwebtoken --save
// Cookies에 token값을 저장하기 위한 cookie-parser 라이브러리 설치
// $ npm install cookie-parser --save

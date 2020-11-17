if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
/*
    1. 소스코드를 git에 올릴시 비밀 정보들을 보호하기 위함.
    2. 비밀 정보들을 한 파일에 저장한 뒤 .gitignore 파일에 넣어준다.
    3. 개발환경이 로컬인지 배포인지 여부에 대해서도 설정해준다.(현재 key.js)
*/

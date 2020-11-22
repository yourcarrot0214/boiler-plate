# boiler-plate

> infren 강의 : 따라하면서 배우는 노드, 리액트 시리즈 - 기본 강의

## Front-end(React)

- modules
  - axios : HTTP 통신 라이브러리.
  - antd : CSS 라이브러리.
  - http-proxy-middleware : node + express 연동 프록시 설정.

## Back-end(Node & MongoDB)

- modules

  - express
    - web application framework. HTTP 통신 요청(request: GET, POST etc)에 대한 핸들러를 만들어 사용.
  - body-parser
    - express middleware.
    - HTTP POST, PUT 요청시 request body 에 들어오는 데이터값을 읽을 수 있는 구문으로 파싱함과 동시에 req.body 로 입력해주어 응답 과정에서 요청에 body 프로퍼티를 새롭게 쓸 수 있게 해주는 미들웨어.
  - cookie-parser
    - 요청된 cookie를 쉽게 추출할 수 있도록 도와주는 middleware.
    - express의 request 객체에 cookies 속성이 부여됨.
  - mongoose

    - MongoDB ODM(Object Document Mapping).
    - 자바스크립트의 객체(Object)와 몽고DB의 문서(Document)를 매칭해준다. 즉, 문서를 DB에서 조회할 때 자바스크립트 객체로 바꿔주는 역할을 한다.

  - bcrypt
    - 암호화 모듈.
  - jsonwebtoken
    - 토큰 기반 인증시스템.

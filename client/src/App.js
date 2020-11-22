import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

/*
  1. react-router-dom 설치
  $ npm install react-router-dom --save

  2. 필요한 모듈을 react-router-dom에서 import
  - import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

  3. Route 안에 component 프로퍼티를 활용하여 한줄처리 할 수 있다.
  4. exact path는 Router의 path값이 부분적으로만 닮아도 같은 것으로 인식하는 경우를 제어하기 위함이다.
*/

export default App;

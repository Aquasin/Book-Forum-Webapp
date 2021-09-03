import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import Details from "./pages/Details/Details";
import Create from "./pages/Create/Create";
import UserMain from "./pages/UserMain/UserMain";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/register" component={Register}></Route>
					<Route exact path="/" component={Main}></Route>
					<Route
						exact
						path="/details/:id"
						component={Details}
					></Route>
					<Route exact path="/create" component={Create}></Route>
					<Route exact path="/:id" component={UserMain}></Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

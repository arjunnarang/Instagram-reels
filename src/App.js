import UseEffect from "./components/UseEffect.jsx";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Feeds from "./components/Feeds.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile";
import Header from "./components/Header"
import { AuthContext, AuthProvider } from "./context/AuthProvider.jsx";
import { useContext } from "react";
import IntersectionObserver from "./IntersectionObserver/IntersectionDemo.jsx";
function App() {
  return (
	  <AuthProvider>

		<Router>

			<div className="App">
				<Header></Header>
				<Switch>
					<Route path="/login" component={Login} exact></Route>
					<Route path="/signup" component={Signup} exact></Route>
					<Privateroute path="/" comp={Feeds}></Privateroute>
					<Privateroute path="/profile" comp={Profile}></Privateroute>
				</Switch>
			</div>
		</Router>
	  </AuthProvider>
	// <IntersectionObserver></IntersectionObserver>
  );
}

function Privateroute(props){
	let {comp: Component, path} = props;

	let {currentUser} = useContext(AuthContext);
	

	return currentUser ? (
		<Route path={path} component={Component}></Route>
	): (
		<Redirect to="/login"></Redirect>
	);
}

export default App;

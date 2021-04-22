import "./App.css";
import SidePanel from "./components/Sidepanel";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Remove from "./pages/Remove";
import Users from "./pages/Users";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="w-full">
        <SidePanel />
        <div className="ml-60 bg-gradient-to-r from-indigo-100 to-green-50 flex-auto min-h-full ">
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/remove">
              <Remove />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import SidePanel from "./components/Sidepanel";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Remove from "./pages/Remove";
import Users from "./pages/Users";
import PasswordInput from "./components/PasswordInput";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    let storedPassword = window.localStorage.getItem("password");
    if (storedPassword && storedPassword.length > 0) {
      setHasPassword(true);
    }
  }, [setHasPassword]);

  return (
    <Router>
      {!hasPassword && <PasswordInput setHasPassword={setHasPassword} />}
      {hasPassword && (
        <div className="w-full">
          <SidePanel setHasPassword={setHasPassword} />
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
      )}
    </Router>
  );
}

export default App;

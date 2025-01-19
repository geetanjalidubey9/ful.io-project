import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginPage from "./Components/Assets/LoginForm/LoginPage";
import TablePage from "./Components/Assets/TableData/GoogleDataSheet";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // This function can be triggered from LoginPage after successful login
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Router>
    <Routes>
      <Route
        exact 
        path='/'
       element={<LoginPage/>}
      ></Route>

      <Route
        exact 
        path='/table'
       element={<TablePage/>}
      ></Route>
    </Routes>
  </Router>
        
     
    </div>
  );
}

export default App;

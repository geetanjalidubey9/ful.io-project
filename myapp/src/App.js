import React, { useState } from "react";
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
  
        <LoginPage/>
        <TablePage />
     
    </div>
  );
}

export default App;

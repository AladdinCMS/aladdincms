import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/login/auth/signin.jsx";
import SignUp from "./pages/login/auth/signup.jsx";

import HomePage from "./pages/home/home.jsx";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;

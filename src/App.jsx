import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/login/auth/signin.jsx";
import SignUp from "./pages/login/auth/signup.jsx";

import HomePage from "./pages/home/home.jsx";

import Volunteer from "./pages/volunteer/volunteer";
import Contact from "./pages/external/contact/contact.jsx";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;

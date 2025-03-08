import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Volunteer from "./pages/volunteer/volunteer";
import Contact from "./pages/external/page";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
       
          <Routes>
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


import { Header } from "./components/Header";
import './App.css'
import SignUp from "./components/sign-Up";
import SignIn from "./components/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/Forgotpass";


function App() {
  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/get" element={<Header/>} />
        <Route path="/forgot" element={<ForgetPassword/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;

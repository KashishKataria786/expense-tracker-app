import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import NoInternet from './components/NoInternet.jsx'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
// import {AuthProvider} from './context/AuthContext.js'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ToastContainer/>
  <AuthProvider>
  <NoInternet/>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
  </BrowserRouter>
);

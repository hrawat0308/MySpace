import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Welcome from "./components/WelcomeContainer/Welcome";
import './App.css';
import { Fragment } from "react";

function App() {
  return (
    <div className="app">
      <Header />
      <Welcome />
      <Footer />
    </div>
  );
}

export default App;

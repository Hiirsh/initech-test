import React, { useEffect } from "react";
import "./styles/App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  useEffect(() => {
    // TEST API, it might be removed
    fetch("http://localhost:8080/live")
      .then((res) => res.json())
      .then((res) => {
        console.log("API CONNECTION IS OK");
      })
      .catch((e) =>
        console.error(
          "API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN"
        )
      );
  }, []);

  return (
    <div className="main">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

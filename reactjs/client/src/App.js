import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import axios from "axios";

const App = ()=> {
  const [data, setData] = React.useState([]);
  console.log(process.env.REACT_APP_BACK_END_HOST)
  React.useEffect(() => {
    axios
      .get("/api/hello")
      .then((data) => setData(data.data.message));
    fetchData();
  }, []);

  const fetchData = async()=> {
    try {
      var f = new FormData();
      f.append("email", "quangminh15201111@gmail.com");
      f.append("password", "123");
      let response = await axios.post("/account/api-login", {
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: f
      });
      console.log(response)
      setData(null)
    } catch (err) {

      console.log(err)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : JSON.stringify(data)}</p>
      </header>
    </div>
  );
}

export default App;

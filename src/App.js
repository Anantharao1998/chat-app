import "./App.css";
import socketIOClient from "socket.io-client";
import React from "react";

function App() {
  const socket = socketIOClient("http://192.168.100.188:5000");
  let [name, setName] = React.useState("");
  let [message, setMessage] = React.useState("");
  const [message_list, setMessageList] = React.useState([]);

  const sendMessage = () => {
    socket.emit("chat", {
      username: name,
      message: message,
    });
  };

  React.useEffect(() => {
    socket.on("chat", function (data) {
      setMessageList((current) => [...current, data]);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>BeSquare Chatroom</h1>
      </header>
      <body>
        <div className="container">
          <div className="chats">
            {message_list.map((msg, index) => {
              return (
                <p>
                  {msg.username} : {msg.message}
                </p>
              );
            })}
          </div>
        </div>
        <p id="label">Name:</p>
        <input onChange={(event) => setName(event.target.value)}></input>
        <p id="label">Message:</p>
        <input onChange={(event) => setMessage(event.target.value)}></input>
        <button onClick={sendMessage}>Send</button>
      </body>
    </div>
  );
}

export default App;

import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Join from "./components/Join";
import Chat from "./components/Chat";

const App = () => {

  const socket = io("http://localhost:8000", { transports: ["websocket"] });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/create" element={<Create socket={socket} />} />
        <Route path="/join" element={<Join socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

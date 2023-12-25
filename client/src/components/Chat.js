import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import querystring from "query-string";

const Chat = ({ socket }) => {

    const navigate = useNavigate();

    const { name, room } = querystring.parse(window.location.search);

    // Use State For Input Elements
    const [message, setMessage] = useState("");
    const [listMessages, setListMessages] = useState([]);

    // Handler For Send Button
    const handlerForSend = () => {
        if (message.trim().length < 1) {
            window.alert("Please enter some message value");
        } else {
            const data = {
                name: name,
                room: room,
                message: message,
                createdAt: new Date().getTime()
            };
            // Emit Event Send Message
            socket.emit("send-message", data);
            setMessage("");
        }
    };

    // Handler For Logout
    const handlerForLogout = () => {
        socket.disconnect();
        navigate("/");
    };

    useEffect(() => {
        // Event For Receive Message
        socket.on("receive-message", (newMessage) => {
            setListMessages((prevMessage) => [...prevMessage, newMessage])
        });
        return () => {
            socket.off("receive-message");
        }
    }, [socket]);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border border-1 p-5">
                    <div className="text-center">
                        <h1 className="h6 display-6">CHAT ROOM</h1>
                    </div>
                    <div className="d-flex justify-content-between border border-1 p-1 mt-1">
                        <span>User: {name}</span>
                        <button type="button" onClick={handlerForLogout}>Logout</button>
                    </div>
                    <div className="mt-3 border border-1 p-3">
                        <ul className="list-unstyled">
                            {listMessages && listMessages.length > 0 &&
                                listMessages.map((value, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                value.name === name ?
                                                    "bg-primary text-light word-break rounded mb-1 p-1" : "bg-dark text-light word-break rounded mb-1 p-1"
                                            }
                                        >
                                            <span className="h6 mx-1">{value.name}:</span>
                                            {value.message}
                                        </li>

                                    )
                                })}
                        </ul>
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                        <div>
                            <input
                                type="text"
                                name="message"
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></input>
                            <button
                                type="button"
                                onClick={handlerForSend}
                            >Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Chat;

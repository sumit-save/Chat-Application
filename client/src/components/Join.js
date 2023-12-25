import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = ({ socket }) => {

    const navigate = useNavigate();

    // Use State For Input Elements
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    // Handler For Join Button
    const handlerForJoin = () => {
        if (name.trim().length < 1) {
            window.alert("Please enter name");
        } else if (room.trim().length < 1) {
            window.alert("Please enter room");
        } else {
            // Emit Event For Join Room
            socket.emit("join-room", { name, room });
        }
    };

    // Handler For Reset Button
    const handlerForReset = () => {
        setName("");
        setRoom("");
    };

    useEffect(() => {
        const handleJoinRoomResponse = ({ name, room, message, status }) => {
            if (status === "FAILURE") {
                window.alert(message);
            } else {
                window.alert(message);
                navigate(`/chat?name=${name}&room=${room}`);
            }
        };
        // Create Event Room Join Response
        socket.once("join-room-response", handleJoinRoomResponse);
        return () => {
            socket.off("join-room-response", handleJoinRoomResponse);
        }
    }, [socket, navigate]);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border border-1 p-5">
                    <div className="text-center">
                        <h1 className="h3 display-3">JOIN</h1>
                    </div>
                    <div className="mt-3">
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="room">Room: </label>
                            <input
                                type="text"
                                name="room"
                                id="room"
                                className="form-control"
                                required
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <button type="button" className="btn btn-outline btn-outline-primary mx-1" onClick={handlerForJoin}>Join</button>
                        <button type="button" className="btn btn-outline btn-outline-primary mx-1" onClick={handlerForReset}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Join;

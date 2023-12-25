import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border border-1 p-5">
                    <div className="text-center">
                        <h1 className="h3 display-3">HOME</h1>
                    </div>
                    <div className="mt-3 text-center">
                        <Link to="/create" className="btn btn-outline btn-outline-primary mx-1">Create Room</Link>
                        <Link to="/join" className="btn btn-outline btn-outline-primary mx-1">Join Room</Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;

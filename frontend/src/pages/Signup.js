import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        {
          username,
          password,
        }
      );

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {

      alert(
        error.response.data.error
      );

    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card p-4 shadow">

            <h2 className="text-center mb-4">
              Signup
            </h2>

            <input
              type="text"
              placeholder="Username"
              className="form-control mb-3"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              className="btn btn-success"
              onClick={handleSignup}
            >
              Signup
            </button>

            <p className="mt-3 text-center">

              Already have account?

              <Link to="/login">
                {" "}Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;
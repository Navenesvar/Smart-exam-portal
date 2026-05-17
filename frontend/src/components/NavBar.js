import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user =
    localStorage.getItem("loggedInUser");

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    alert("Logged out successfully");

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-dark bg-dark p-3">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          Smart Exam Portal
        </Link>

        <div>

          <Link
            className="btn btn-info me-2"
            to="/leaderboard"
          >
            Leaderboard
          </Link>

          {user ? (

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>

          ) : (

            <>
              <Link
                className="btn btn-primary me-2"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-success"
                to="/signup"
              >
                Signup
              </Link>
            </>

          )}

        </div>

      </div>

    </nav>

  );
}

export default Navbar;
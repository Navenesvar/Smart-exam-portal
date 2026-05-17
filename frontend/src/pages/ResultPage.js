import { useLocation, Link } from "react-router-dom";

function ResultPage() {

  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  const percentage =
    total > 0
      ? ((score / total) * 100).toFixed(2)
      : 0;

  return (
    <div className="container mt-5">

      <div className="card p-5 text-center shadow">

        <h1 className="mb-4">
          Exam Submitted Successfully
        </h1>

        <h2>
          Score: {score} / {total}
        </h2>

        <h3 className="mt-3">
          Percentage: {percentage}%
        </h3>

        <div className="mt-4">

          <Link
            to="/"
            className="btn btn-primary me-3"
          >
            Go Home
          </Link>

          <Link
            to="/leaderboard"
            className="btn btn-success"
          >
            View Leaderboard
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResultPage;
import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {

  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  // Fetch exams for dropdown
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/exams/")
      .then((res) => {
        setExams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Fetch leaderboard (changes when exam changes)
  useEffect(() => {

    const url = selectedExam
      ? `http://127.0.0.1:8000/api/leaderboard/?exam_id=${selectedExam}`
      : `http://127.0.0.1:8000/api/leaderboard/`;

    axios
      .get(url)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [selectedExam]);

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h1 className="text-center mb-4">
          Leaderboard
        </h1>

        {/* 🔥 EXAM DROPDOWN */}
        <div className="mb-3">

          <select
            className="form-select"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >

            <option value="">
              All Exams
            </option>

            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}

          </select>

        </div>

        {/* TABLE */}
        <table className="table table-bordered table-striped">

          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Score</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {results.length > 0 ? (

              results.map((result, index) => (

                <tr key={result.id}>
                  <td>{index + 1}</td>
                  <td>{result.student}</td>
                  <td>{result.score}</td>
                  <td>{result.total}</td>
                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="4" className="text-center">
                  No Results Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Leaderboard;
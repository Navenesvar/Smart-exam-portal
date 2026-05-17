import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {

  const [availableExams,
    setAvailableExams] =
      useState([]);

  useEffect(() => {

    const fetchExams =
      async () => {

        try {

          const res =
            await axios.get(
              "http://127.0.0.1:8000/api/exams/"
            );

          const currentUser =
            localStorage.getItem(
              "loggedInUser"
            );

          const completedExams =
            JSON.parse(
              localStorage.getItem(
                "completedExams"
              )
            ) || [];

          console.log(
            completedExams
          );

          // FILTER COMPLETED EXAMS
          const filteredExams =
            res.data.filter(
              (exam) => {

                const alreadyTaken =
                  completedExams.some(
                    (item) =>
                      item.user ===
                        currentUser &&
                      Number(
                        item.examId
                      ) ===
                        Number(
                          exam.id
                        )
                  );

                return !alreadyTaken;

              }
            );

          setAvailableExams(
            filteredExams
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchExams();

  }, []);

  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        Smart Exam Portal
      </h1>

      {availableExams.length === 0 ? (

        <div className="alert alert-success">

          <h4>
            You have completed all quizzes.
          </h4>

        </div>

      ) : (

        <div className="row">

          {availableExams.map(
            (exam) => (

              <div
                className="col-md-4"
                key={exam.id}
              >

                <div className="card p-4 mt-3 shadow">

                  <h3>
                    {exam.title}
                  </h3>

                  <p>
                    {exam.description}
                  </p>

                  <p>

                    Duration:
                    {" "}
                    {exam.duration}
                    {" "}
                    mins

                  </p>

                  <Link
                    to={`/exam/${exam.id}`}
                    className="btn btn-primary"
                  >

                    Start Exam

                  </Link>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}

export default Home;
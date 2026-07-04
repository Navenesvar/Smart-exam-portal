import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ExamPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(300);

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [warningCount, setWarningCount] =
    useState(0);

  // Check login
useEffect(() => {

  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    alert("Please login first");
    navigate("/login");
    return;   // Stop here
  }

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  enterFullscreen();

}, [navigate]);

  // Fetch questions
  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:8000/api/questions/${id}/`
      )
      .then((res) => {

        setQuestions(res.data);

        setLoading(false);

      })
      .catch((err) => {

        console.log(err);

        setLoading(false);

      });

  }, [id]);

  // Timer
  useEffect(() => {

    if (submitted || loading) return;

    const timer = setInterval(() => {

      setTime((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          submitExam();

          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [submitted, loading]);

  // Warning handler
  const handleViolation = () => {

  if (submitted) return;

  const newCount = warningCount + 1;

  setWarningCount(newCount);

  // Auto submit after 2 violations
  if (newCount >= 2) {

    alert(
      "Exam terminated due to multiple violations."
    );

    submitExam();

    return;
  }

  alert(
    `Warning ${newCount}/2: Do not exit fullscreen or switch tabs.`
  );

  // Re-enter fullscreen
  if (
    document.documentElement.requestFullscreen
  ) {

    document.documentElement.requestFullscreen();

  }

};

  // Detect fullscreen exit
useEffect(() => {

  const fullscreenHandler = () => {

    if (!document.fullscreenElement) {

      handleViolation();

    }
  };

  document.addEventListener(
    "fullscreenchange",
    fullscreenHandler
  );

  return () => {

    document.removeEventListener(
      "fullscreenchange",
      fullscreenHandler
    );

  };

}, [warningCount]);

  // Detect tab switch
useEffect(() => {

  const visibilityHandler = () => {

    if (document.hidden) {

      handleViolation();

    }
  };

  document.addEventListener(
    "visibilitychange",
    visibilityHandler
  );

  return () => {

    document.removeEventListener(
      "visibilitychange",
      visibilityHandler
    );

  };

}, [warningCount]);

  // Store answers
  const handleAnswer = (qid, option) => {

    setAnswers((prev) => ({
      ...prev,
      [qid]: option,
    }));

  };

  // Submit exam
 const submitExam = async () => {

  if (submitted) return;

  setSubmitted(true);

  let score = 0;

  questions.forEach((q) => {

    if (
      answers[q.id] === q.correct_option
    ) {

      score++;

    }

  });

  try {

    await axios.post(
      "http://127.0.0.1:8000/api/save-result/",
      {
        student:
          localStorage.getItem(
            "loggedInUser"
          ),

        exam: id,

        score: score,

        total: questions.length,
      }
    );

    // SAVE COMPLETED EXAM
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

    const alreadyExists =
      completedExams.some(
        (item) =>
          item.user === currentUser &&
          item.examId === Number(id)
      );

    if (!alreadyExists) {

      completedExams.push({

        user: currentUser,

        examId: Number(id),

      });

      localStorage.setItem(

        "completedExams",

        JSON.stringify(
          completedExams
        )

      );

    }

    // Exit fullscreen
    if (
      document.fullscreenElement
    ) {

      document.exitFullscreen();

    }

    navigate("/result", {

      state: {
        score,
        total: questions.length,
      },

    });

  } catch (error) {

    console.log(error);

    alert("Failed to submit exam");

  }

};
  // Loading
  if (loading) {

    return (
      <div className="container mt-5">
        <h3>Loading Questions...</h3>
      </div>
    );

  }

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between">

        <h2>Exam Portal</h2>

        <h4 className="text-danger">
          Time Left: {time} sec
        </h4>

      </div>

      <div className="alert alert-warning mt-3">

        Warnings:
        {" "}
        {warningCount}/2

      </div>

      {questions.map((q, index) => (

        <div
          key={q.id}
          className="card p-4 mt-4 shadow"
        >

          <h5>
            {index + 1}.
            {" "}
            {q.question_text}
          </h5>

          {[1, 2, 3, 4].map((num) => (

            <div
              key={num}
              className="form-check mt-3"
            >

              <input
                className="form-check-input"
                type="radio"
                name={`question-${q.id}`}
                checked={
                  answers[q.id] === num
                }
                onChange={() =>
                  handleAnswer(q.id, num)
                }
              />

              <label className="form-check-label">

                {q[`option${num}`]}

              </label>

            </div>

          ))}

        </div>

      ))}

      <div className="text-center">

        <button
          className="btn btn-success btn-lg mt-5"
          onClick={submitExam}
          disabled={submitted}
        >

          {submitted
            ? "Submitting..."
            : "Submit Exam"}

        </button>

      </div>

    </div>
  );
}

export default ExamPage;
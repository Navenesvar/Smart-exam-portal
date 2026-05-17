import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import Leaderboard from "./pages/Leaderboard";
import NavBar from "./components/NavBar";
function App() {

  return (

    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/exam/:id"
          element={<ExamPage />}
        />

        <Route
          path="/result"
          element={<ResultPage />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
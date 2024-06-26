import "./App.css";
// import bootstrap.min.css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
//
import { Route, Routes,Navigate } from "react-router-dom";
// import components
import Navigation from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Footer from "./components/Footer";
import ProblemList from "./pages/publication/ProblemList";
import Problem from "./pages/publication/Problem";
import HomePage from "./components/HomePage.js";
import Profile from "./pages/user/Profile";
import { useState } from "react";
import ProblemDescription from "./pages/publication/ProblemDescription";
function App() {
  const [currentId, setcurrentId] = useState(null);
  console.log(currentId);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
       
        <Route
          path="*"
          element={
            <div className="main ">
              <Navigation />
              <div>
                {" "}
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />}></Route>
                  </Route>
                  <Route element={<PrivateRoute />}>
                    <Route
                      path="/problems"
                      element={
                        <ProblemList
                          currentId={currentId}
                          setcurrentId={setcurrentId}
                        />
                      }
                    ></Route>
                    <Route
                      path="/problem/details"
                      element={<ProblemDescription currentId={currentId} />}
                    ></Route>
                    <Route
                      path="/profile"
                      element={
                        <Profile
                          currentId={currentId}
                          setcurrentId={setcurrentId}
                        />
                      }
                    ></Route>
                  </Route>
                  <Route
                    path="/add/problem"
                    element={
                      <Problem
                        currentId={currentId}
                        setcurrentId={setcurrentId}
                      />
                    }
                  ></Route>
                  <Route path="*" element={<Navigate to="/" replace/>}></Route>
                </Routes>{" "}
              </div>
              <Footer />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
//import from react-bootstrap
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import actions
import { getProblemDetails } from "../../redux/actions/problem";

//
function ProblemDescription({ currentId }) {
  const dispatch = useDispatch();
  const { problem } = useSelector((state) => state.problem);
  const [titre, settitle] = useState("");
  const author = problem && problem.user.username;
  const [description, setdescription] = useState("");
  const problem_date = problem && problem.problem.problem_date;
const {token}=useSelector(state=>state.user)
  useEffect(() => {
    dispatch(getProblemDetails({id:currentId,token}));
    problem && settitle(problem.problem.problem_titre);
    problem && setdescription(problem.problem.problem_description);
  }, [dispatch, currentId, problem]);

  return (
    <div className="d-flex justify-content-center">
      <div className="problem_description    ">
        <div className=" mt-3 d-flex justify-content-center align-items-center fs-3 ">
          <div className="d-flex justify-content-center">
            {" "}
            {titre}{" "}
            <p>
              {" "}
              posted by : {author} the : {problem && problem_date.slice(0, 10)}{" "}
              at {problem && problem_date.slice(11, 16)}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <hr className="line"></hr>
        </div>
        <div className=" mt-1 d-flex justify-content-center  align-items-center fs-3 ">
          {description}
        </div>
        <div className="d-flex justify-content-center">
          <hr className="line"></hr>
        </div>
        <div className=" mt-1 d-flex justify-content-center">
          {" "}
          Tags :{" "}
          {problem &&
            problem.tags.map((el) => {
              return (
                <div className="tag shadow">{el.tag_name.toLowerCase()}</div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;

import React from "react";
import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import actions
import { addProblem } from "../../redux/actions/problem";
import { Reset_Message } from "../../redux/reducer/problem";
// import components
import Success from "../../components/Success";
import "./style.css";
import { useEffect } from "react";
function ProblemForm({ setshowForm, currentId, handleUpdateProblem }) {
  const idUser = JSON.parse(localStorage.getItem("userInfo")).id;
  const dispatch = useDispatch();
  const problem_date = new Date();
  const [problem_titre, settitle] = useState("");
  const [problem_description, setdescription] = useState("");
  const { message } = useSelector((state) => state.problem);
  const problem = useSelector((state) =>
    currentId
      ? state.problem.problems.filter((el) => el.id === currentId)
      : null
  );
  // functions
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(currentId);
    try {
      if (currentId) {
        handleUpdateProblem({
          id: currentId,
          data: { problem_titre, problem_description },
        });
      } else {
        dispatch(
          addProblem({
            data: { problem_titre, problem_description, problem_date },
            idUser,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (currentId) {
      settitle(problem[0].problem_titre);
      setdescription(problem[0].problem_description);
    }
  }, []);
  useEffect(() => {
    dispatch(Reset_Message());
  }, [dispatch]);
  return (
    <div>
      <Card className="problem_form shadow black">
        <Card.Header className="form_header list_title ">
          {currentId ? "Edit Problem" : "Add new Problem"}
          <Button className="close_btn" onClick={(e) => setshowForm(false)}>
            close
          </Button>
        </Card.Header>
        <Card.Body>
          {" "}
          <Form onSubmit={HandleSubmit}>
            <Form.Group className="form_group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="form_control"
                name="problem_titre"
                defaultValue={problem_titre}
                type="text"
                onChange={(e) => settitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form_group">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="problem_description"
                as="textarea"
                defaultValue={problem_description}
                rows={7}
                onChange={(e) => setdescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center">
              {" "}
              <Button className="add_btn mt-3" type="submit">
                {currentId ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
          <div className=" d-flex justify-content-center mt-4">
            {message && <Success message={message} />}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProblemForm;

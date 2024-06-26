import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
// import actions
import { addProblem, getProblemDetails } from "../../redux/actions/problem";
import { addSolution } from "../../redux/actions/solution";
import { addTag } from "../../redux/actions/tag";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import components
import Success from "../../components/Success";
import { Reset_Message } from "../../redux/reducer/problem";
import { Reset_Tag_Message } from "../../redux/reducer/tag";
function Problem({ currentId }) {
  const dispatch = useDispatch();
  const [problem_titre, setproblem_titre] = useState("");
  const [problem_description, setproblem_description] = useState("");
  const problemMessage = useSelector((state) => state.problem.message);
  const solutionMessage = useSelector((state) => state.solution.message);
  const tagMessage = useSelector((state) => state.tag.message);
  const problem = useSelector((state) =>
    currentId
      ? state.problem.problems.filter((el) => el.id === currentId)
      : null
  );
  const solution = useSelector((state) =>
    currentId
      ? state.solution.solutions.filter((el) => el.id_problem === currentId)
      : null
  );

  const problemTags = useSelector((state) => state.problem.tags);
  const {token}=useSelector(state=>state.user)
  console.log(token)
  const [tags, settags] = useState([]);
  const [content, setcontent] = useState("");
  const [showAddSolution, setshowAddSolution] = useState(false);
  const [showAddTags, setshowAddTags] = useState(false);
  const [today, settoday] = useState(new Date());
  const idUser = JSON.parse(localStorage.getItem("userInfo")).id;
  const id_problem =
    localStorage.getItem("problem") &&
    JSON.parse(localStorage.getItem("problem")).id;
  const handleTagsChange = (e) => {
    const data = e.target.value.replace(/\s/g, "").toUpperCase().split(",");
    settags(data);
  };
  const handleshowAddSolution = () => {
    setshowAddSolution(true);
    dispatch(
      addProblem({
        idUser,
        data: { problem_titre, problem_description, problem_date: today },
        token
      })
    );
  };
  const handleshowAddTags = (e) => {
    setshowAddTags(true);
    dispatch(
      addSolution({
        id_problem,
        idUser,
        data: { content, solution_date: today },
        token
      })
    );
  };
  const handleAddTag = (e) => {
    e.preventDefault();
    dispatch(addTag({ id: id_problem, data: { tags },token }));
  };

  useEffect(() => {
    problem && dispatch(getProblemDetails({id:problem[0].id,token}));
  }, [dispatch, problem]);
  useEffect(() => {
    dispatch(Reset_Message());
    dispatch(Reset_Tag_Message());
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="add_problem">
        <Row className="d-flex justify-content-center fs-2  list_title  text-black">
          {" "}
          {currentId
            ? `Problem:${problem[0].problem_titre}`
            : "Add New Problem"}
        </Row>
        <Row className="d-flex justify-content-center m-3">
          <Col md={7}>
            <Form className="" onSubmit={handleAddTag}>
              <Form.Group className=" m-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="input"
                  defaultValue={problem && problem[0].problem_titre}
                  placeholder="add problem title"
                  onChange={(e) => setproblem_titre(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="input"
                  placeholder="add problem  description"
                  defaultValue={problem && problem[0].problem_description}
                  as="textarea"
                  rows={5}
                  onChange={(e) => setproblem_description(e.target.value)}
                ></Form.Control>
                <div className=" mt-2 d-flex justify-content-end">
                  {!currentId && (
                    <Button
                      className="next_btn"
                      onClick={handleshowAddSolution}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </Form.Group>
              {(showAddSolution || currentId) && (
                <>
                  <Form.Group className="m-3">
                    <Form.Label>Solution</Form.Label>
                    <Form.Control
                      className="input"
                      placeholder="add   solution"
                      as="textarea"
                      rows={10}
                      defaultValue={solution && solution[0].content}
                      onChange={(e) => setcontent(e.target.value)}
                    ></Form.Control>
                    {!currentId && (
                      <div className=" mt-2 d-flex justify-content-end">
                        <Button
                          className="next_btn"
                          onClick={handleshowAddTags}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </Form.Group>
                  {(showAddTags || currentId) && (
                    <>
                      <Form.Group className="m-3">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                          className="input"
                          placeholder="add , between tags "
                          as="textarea"
                          rows={5}
                          onChange={handleTagsChange}
                          defaultValue={
                            problemTags &&
                            problemTags.map((el) => {
                              return el.tag_name;
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                      {!currentId && (
                        <Form.Group>
                          <Button className="  m-3 add_btn" type="submit">
                            Add
                          </Button>
                        </Form.Group>
                      )}
                    </>
                  )}
                </>
              )}
            </Form>
          </Col>
        </Row>
        {problemMessage && solutionMessage && tagMessage && (
          <div className="d-flex justify-content-center m-2">
            <Success message="Problem  has been added successfully" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Problem;

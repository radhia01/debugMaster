import React from "react";
import "./style.css";
import { Row, Button, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import actions
import { getProblems, getProblemsByTag } from "../../redux/actions/problem";
import { deleteProblem } from "../../redux/actions/problem";
import { getTags } from "../../redux/actions/tag";
//import components
import ProblemForm from "./ProblemForm";
import Success from "../../components/Success";
// import icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Reset_Message } from "../../redux/reducer/problem";
import { Reset_Tag_Message } from "../../redux/reducer/tag";
function ProblemList({ currentId, setcurrentId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchItem, setsearchItem] = useState("");
  const {token}=useSelector(state=>state.user)
  const [showForm, setshowForm] = useState(false);
  const [idProblem, setidProblem] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tags = useSelector((state) => state.tag.tags);
  useEffect(() => {
    dispatch(getTags(token));
  }, [dispatch, tags]);
  const problemsPerPage = 3;
  useEffect(() => {
    dispatch(getProblems(token));
    dispatch(Reset_Message());
  }, [dispatch]);

  const { problems, message } = useSelector((state) => state.problem);
  // functions
  const handleFormShow = () => {
    dispatch(Reset_Message());
    dispatch(Reset_Tag_Message());
    navigate("/add/problem");
    setcurrentId(null);
  };

  const handleDeleteProblem = () => {
    dispatch(deleteProblem({id:idProblem,token}));
    dispatch(getProblems());
    dispatch(getTags());
    setshowDeleteModal(false);
    document.getElementById("problems_list").style.opacity = 1;
  };
  const handleShowDeleteModal = (id) => {
    setshowDeleteModal(true);
    setidProblem(id);
    document.getElementById("problems_list").style.opacity = 0.3;
  };
  const handleShowProblem = (id) => {
    setcurrentId(id);
    navigate("/problem/details");
  };

  const handleTagChange = async (id) => {
    try {
      await dispatch(getProblemsByTag({id,token}));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProblems = async () => {
    try {
      await dispatch(getProblems(token));
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setshowDeleteModal(false);
    document.getElementById("problems_list").style.opacity = 1;
  };

  const filteredProblems = problems.filter((element) =>
    element.problem_titre.toUpperCase().includes(searchItem.toUpperCase())
  );

  const totalPageCount = Math.ceil(filteredProblems.length / problemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * problemsPerPage;
  const endIndex = startIndex + problemsPerPage;
  const displayedProblems = filteredProblems.slice(startIndex, endIndex);

  return (
    
      <div className="d-flex justify-content-center  ">
        <div className="problems_list  " id="problems_list">
          <Row
            className="tilte d-flex justify-content-center fw-bold   fs-2  text-Black"
            style={{ height: 80 }}
          >
            Problems List
          </Row>

          <Row className="search_part">
            {" "}
            <Col md={9}>
              <Form>
                <Form.Control
                  className="search_form "
                  placeholder="Search a problem"
                  onChange={(e) => setsearchItem(e.target.value)}
                ></Form.Control>
              </Form>
            </Col>
            <Col className="d-flex justify-content-end mt-4">
              <Button className="add_problem_btn" onClick={handleFormShow}>
                Add new problem <AddCircleOutlineIcon />
              </Button>
            </Col>
          </Row>

          <Row className="d-flex list">
            <Col md={8}>
              {displayedProblems &&
                displayedProblems.map((el) => {
                  return (
                    <Col
                      md={8}
                      className="d-flex problem_item  justify-content-between shadow  "
                    >
                      <Col className="d-flex justify-content-between ">
                        {el.problem_titre}
                        {/* <Button
                          className="delete_btn"
                          onClick={() => handleShowDeleteModal(el.id)}
                        >
                          <HighlightOffIcon />
                        </Button> */}
                        <Button
                          className="btn_detail"
                          onClick={() => handleShowProblem(el.id)}
                        >
                          showDetails
                        </Button>
                      </Col>
                    </Col>
                  );
                })}
              {totalPageCount > 1 && (
                <Row className="d-flex justify-content-center m-4">
                  <Button
                    className="prev_btn"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    className="next_btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPageCount}
                  >
                    Next
                  </Button>
                </Row>
              )}

              <Col md={5} className="   d-flex justify-content-end">
                {message && <Success message={message} />}
              </Col>
            </Col>

            <Col
              md={4}
              className="text-white border "
              style={{ minHeight: 200 }}
            >
              <Row className="text-black fs-5 fw-bold p-2">Tags</Row>
              <Row className="tags_list">
                <Col className="m-2" md={3}>
                  <Button className="tag" onClick={getAllProblems}>
                    All
                  </Button>
                </Col>
                {tags &&
                  tags.map((el) => {
                    return (
                      <Col key={el.id} className="m-2" md={3}>
                        <Button
                          className="tag"
                          onClick={() => handleTagChange(el.id)}
                        >
                          {el.tag_name}
                        </Button>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </div>

        {showForm && (
          <ProblemForm
            setshowForm={setshowForm}
            setshowEditForm={setshowEditForm}
            currentId={currentId}
            setcurrentId={setcurrentId}
          />
        )}
        {showDeleteModal && (
          <div
            className="shodow modal"
            style={{ display: "block", position: "fixed", top: 150 }}
          >
            <Modal.Dialog>
              <Modal.Header closeButton onClick={closeModal}>
                Do you want to delete this problem?
              </Modal.Header>
              <Modal.Body className="d-flex">
                <Button className="yes_btn" onClick={handleDeleteProblem}>
                  Yes
                </Button>
                <Button className="no_btn" onClick={closeModal}>
                  No
                </Button>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        )}
      </div>
   
  );
}

export default ProblemList;

import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Button,Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import components
import Success from "../../components/Success";
import Error from "../../components/Error";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./UpdateModal";
// import actions
import { updateUser } from "../../redux/actions/user";
import { Reset_Message, Reset_Error } from "../../redux/reducer/user";
import { getPostedProblems } from "../../redux/actions/user";
import { getProblems } from "../../redux/actions/problem";
import { deleteProblem } from "../../redux/actions/problem";
//
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function Profile({ setcurrentId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const [idProblem, setidProblem] = useState(null);
  const { message, error, problems } = useSelector((state) => state.user);
  const [showSettings, setshowSettings] = useState(false);
  const [showUpdatePassword, setshowUpdatePassword] = useState(false);
  const [showProfile, setshowProfile] = useState(true);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showPostedProblems, setshowPostedProblems] = useState(false);
  const [showDetails, setshowDetails] = useState(false);
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const {token}=useSelector(state=>state.user)

  const handleshowSettings = () => {
    setshowSettings(true);
    setshowUpdatePassword(false);
    setshowProfile(false);
    setshowPostedProblems(false);
    setshowDetails(false);
    dispatch(Reset_Message());
    dispatch(Reset_Error());
  };

  const handleShowUpdatePassword = () => {
    setshowUpdatePassword(true);
    setshowProfile(false);
    setshowSettings(false);
    setshowDetails(false);
    setshowPostedProblems(false);
    dispatch(Reset_Message());
    dispatch(Reset_Error());
  };
  const handleShowPostedProblems = () => {
    setshowProfile(false);
    setshowPostedProblems(true);
    setshowProfile(false);
    setshowSettings(false);
    setshowDetails(false);
    setshowUpdatePassword(false);
    dispatch(Reset_Message());
    dispatch(Reset_Error());
  };
  const handleShowDetails = (id) => {
    setshowDetails(true);
    setcurrentId(id);
    navigate("/problem/details");
  };
  const handleShowDeleteModal = (id) => {
    setshowDeleteModal(true);
    setidProblem(id);

  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id: user.id, data: user ,token}));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    dispatch(Reset_Error());
    dispatch(Reset_Message());
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDeleteProblem = async () => {
    try {
      console.log(idProblem)
      dispatch(deleteProblem({id:idProblem,token}));
      dispatch(getPostedProblems({id:user.id,token}));
      setshowDeleteModal(false);
    } catch (error) {}
  };
  
  useEffect(() => {
    dispatch(getProblems(token));
    dispatch(getPostedProblems({id:user.id,token}));
    dispatch(Reset_Message());
    dispatch(Reset_Error());

  }, [dispatch]);

  const closeModal = () => {
    setshowDeleteModal(false);

  };
  const PostedProblemsModel = () => {
    return (
      <Row className="d-flex justify-content-start">
        <div className="d-flex justify-content-center list_title m-4 fs-4">
          Posted Problems
        </div>
        {problems.length === 0 && (
          <div className="d-flex justify-content-center">
            <p className="fs-4">You don't posted anything yet</p>
          </div>
        )}

        {problems &&
          problems.map((el) => {
            return (
              <>
                <Col
                  md={4}
                  key={el.id}
                  className="d-flex problem_item justify-content-between shadow"
                >
                  <Col className="d-flex justify-content-between " md={12}>
                    {el.problem_titre}
                    <Button
                      className="delete_btn"
                      onClick={() => handleShowDeleteModal(el.id)}
                    >
                      <HighlightOffIcon />
                    </Button>
                    <Button
                      className="btn_detail"
                      onClick={() => handleShowDetails(el.id)}
                    >
                      showDetails
                    </Button>
                  </Col>
                </Col>
              </>
            );
          })}
      </Row>
    );
  };
  return (
    <div className="d-flex justify-content-center ">
      <div className="problems_list ">
        <div className="header   d-flex justify-content-center list_title fs-4">
          Welcome <span className=" m-1 fs-5"> {user.username}</span>
        </div>
        <div className=" p-3 d-flex justify-content-center"> </div>
        <Row className="m-3   border p-3 profile_bar shadow bg-white text-white   d-flex justify-content-center">
          {" "}
          <Button className="bar_btn" onClick={handleshowSettings}>
            Profile
          </Button>
          <Button className="bar_btn" onClick={handleShowUpdatePassword}>
            Change Password
          </Button>
          <Button className="bar_btn" onClick={handleShowPostedProblems}>
            Posted Problems
          </Button>
        </Row>{" "}
        {(showSettings || showUpdatePassword) && (
          <>
            <SettingsModal
              user={user}
              handleChange={handleChange}
              handleUpdateUser={handleUpdateUser}
              UpdatePassword={showUpdatePassword}
            />
          </>
        )}
        {showPostedProblems && (
          <>
            <PostedProblemsModel />
          </>
        )}
        <Col className="d-flex justify-content-center">
          {" "}
          <div className="m-3">
            {message && <Success message={message} />}
            {error && <Error message={error} />}
          </div>
        </Col>
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
    </div>
  );
}

export default Profile;

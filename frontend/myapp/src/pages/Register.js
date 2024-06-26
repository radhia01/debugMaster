import React, { useEffect } from "react";
import { Container, Navbar, Form, Nav, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/user";
import "./style.css";
// import actions
import { addUser } from "../redux/actions/user";
import { Reset_Message, Reset_Error } from "../redux/reducer/user";
//import components
import Error from "../components/Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error, success } = useSelector((state) => state.user);
  console.log(error);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(Reset_Message());
    dispatch(Reset_Error());
  }, [dispatch]);

  const [userDetails, setuserDetails] = useState({
    username: "",
    user_email: "",
    user_password: "",
  });
  // function to handle input change
  const handleChange = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  // function to add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(Reset_Error());
    try {
      await dispatch(addUser(userDetails));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (success) navigate("/");
  }, [success]);
  return (
    <div className="register">
      <div className="navbar">
        <Navbar>
          <Container>
            <Navbar.Brand className="title fs-3">
              Debugging Masters 
            </Navbar.Brand>
            <Navbar.Toggle />
          </Container>
        </Navbar>
      </div>
      <div className=" d-flex justify-content-center ">
        <Card className="card shadow">
          <Card.Header className="d-flex justify-content-center">
            Create an account
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="m-3">
                <Form.Control
                  className="m-2 resgiter_input"
                  placeholder="name"
                  type="text"
                  name="username"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Control
                  className="m-2 resgiter_input"
                  placeholder="email"
                  type="email"
                  name="user_email"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Control
                  className="m-2 resgiter_input"
                  placeholder="password"
                  type="password"
                  name="user_password"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <div className="d-flex justify-content-center p-3">
                <Button className="register_btn" type="submit">
                  Create
                </Button>
              </div>
            </Form>
            <div className="m-3 d-flex justify-content-center">
              {error && <Error message={error} />}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Register;

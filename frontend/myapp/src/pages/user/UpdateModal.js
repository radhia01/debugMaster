import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import actions
import { Reset_Message, Reset_Error } from "../../redux/reducer/user";
import { updateUserPassword } from "../../redux/actions/user";
import { updateUser } from "../../redux/actions/user";
const SettingsModel = ({ user, handleChange, UpdatePassword }) => {
  const dispatch = useDispatch();
  const [localUser, setLocalUser] = useState(user);
  const { token } = useSelector((state) => state.user);
  const [newPassword, setnewPassword] = useState("");
  const [confirmedNewPassword, setconfirmedNewPassword] = useState("");
  const handleLocalChange = (e) => {
    setLocalUser({ ...localUser, [e.target.name]: e.target.value });
    handleChange(e);
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(Reset_Error());
    dispatch(Reset_Message());
    try {
      if (UpdatePassword) {
        dispatch(
          updateUserPassword({
            id: user.id,
            data: { newPassword, confirmedNewPassword },
            token
          })
        );
      } else {
        dispatch(updateUser({ id: user.id, data: user,token }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col md={4}>
        <div className="header  d-flex justify-content-center list_title fs-4 m-4">
          {UpdatePassword ? "Update Password" : "Settings"}
        </div>
        <div className="body p-3">
          <Form onSubmit={handleUpdate}>
            {UpdatePassword ? (
              <>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    className="profile_input"
                    type="password"
                    onChange={(e) => setnewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    className="profile_input"
                    type="password"
                    onChange={(e) => setconfirmedNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Username</Form.Label> <br></br>
                  <Form.Control
                    className="profile_input"
                    type="text"
                    defaultValue={localUser.username}
                    name="username"
                    onChange={handleLocalChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Email</Form.Label> <br></br>
                  <Form.Control
                    className="profile_input"
                    value={localUser.user_email}
                    name="user_email"
                    onChange={handleLocalChange}
                  ></Form.Control>
                </Form.Group>
              </>
            )}

            <Button className="profile_save_btn" type="submit">
              Save
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default SettingsModel;

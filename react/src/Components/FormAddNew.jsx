import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { addNewUser, fetchAllUsers } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function FormAddNew() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const defaultValueInput = {
    email: "",
    password: "",
    username: "",
  };
  const [inforUser, setInforUser] = useState(defaultValueInput);

  const handleShow = () => {
    setShow(true);
  };

  const handleAddNewUser = async () => {
    let response = await dispatch(
      addNewUser({
        email: inforUser.email,
        password: inforUser.password,
        username: inforUser.username,
      })
    );
    console.log(response);
    await dispatch(fetchAllUsers());
    if (response.payload.errCode === 0) {
      toast.success(response.payload.message);
    } else {
      toast.error(response.payload.message);
    }
    setInforUser("");
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    setInforUser("");
  };

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow()}>
        Add new user
      </Button>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={inforUser.email}
                onChange={(event) =>
                  setInforUser({ ...inforUser, email: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={inforUser.password}
                onChange={(event) =>
                  setInforUser({ ...inforUser, password: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={inforUser.username}
                onChange={(event) =>
                  setInforUser({ ...inforUser, username: event.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={() => handleAddNewUser()}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

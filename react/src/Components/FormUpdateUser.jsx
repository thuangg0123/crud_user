import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import { updateUser, fetchAllUsers } from "../features/userSlice";

const FormUpdateUser = ({
  showModalUpdate,
  handleCloseModalUpdate,
  handleShowModalUpdate,
  selectedUserForUpdate,
}) => {
  const defaultValueInput = {
    id: "",
    email: "",
    username: "",
  };
  const [inforUser, setInforUser] = useState(defaultValueInput);
  const dispatch = useDispatch();

  const handleConfirmUpdate = async () => {
    await dispatch(
      updateUser({
        id: selectedUserForUpdate.id,
        email: inforUser.email,
        username: inforUser.username,
      })
    );
    dispatch(fetchAllUsers());
    handleCloseModalUpdate();
  };

  useEffect(() => {
    if (selectedUserForUpdate) {
      setInforUser({
        id: selectedUserForUpdate.id,
        email: selectedUserForUpdate.email,
        username: selectedUserForUpdate.username,
      });
    }
  }, [selectedUserForUpdate]);

  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={handleCloseModalUpdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Identification</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Id"
                value={inforUser.id}
                onChange={(event) =>
                  setInforUser({ ...inforUser, id: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUpdate()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormUpdateUser;

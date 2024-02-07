import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, deleteUser } from "../features/userSlice";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Table() {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    setSelectedUser(user);
  };

  const dispatch = useDispatch();
  const listUsers = useSelector((state) => {
    return state.user.listUsers;
  });
  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });
  const isError = useSelector((state) => {
    return state.user.isError;
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUser.id));
    dispatch(fetchAllUsers());
    handleClose();
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading === false && isError === true ? (
            <tr>
              <td colSpan={4} className="text-white text-center">
                Something wrong, please try again!
              </td>
            </tr>
          ) : isLoading === true && isError === false ? (
            <tr>
              <td colSpan={4} className="text-white text-center">
                Data is loading ....
              </td>
            </tr>
          ) : (
            listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => (
              <tr key={`user-${index}`}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShow(user)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning">Update</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() => handleDeleteUser()}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Table;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, deleteUser } from "../features/userSlice";
import FormUpdateUser from "./FormUpdateUser";

import InputSort from "./InputSort";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Table() {
  const [show, setShow] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState("");
  const [sortedListUsers, setSortedListUsers] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    setSelectedUser(user);
  };

  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = (user) => {
    setShowModalUpdate(true);
    setSelectedUserForUpdate(user);
  };

  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setSortedListUsers(listUsers);
  }, [listUsers]);

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUser.id));
    handleClose();
  };

  const handleSortedListUsers = (sortedList) => {
    setSortedListUsers(sortedList);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Actions</th>
            <th scope="col">
              <InputSort handleSortedListUsers={handleSortedListUsers} />
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && !isError ? (
            <tr>
              <td colSpan={4} className="text-center">
                Data is loading ....
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={4} className="text-center">
                Something wrong, please try again!
              </td>
            </tr>
          ) : (
            sortedListUsers &&
            sortedListUsers.length > 0 &&
            sortedListUsers.map((user, index) => (
              <tr key={`user-${index}`}>
                <th>{index + 1}</th>
                <th>{user.id}</th>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => handleShow(user)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowModalUpdate(user)}
                  >
                    Update
                  </button>
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
          <Button
            className="btn btn-primary"
            onClick={() => handleDeleteUser()}
          >
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <FormUpdateUser
        showModalUpdate={showModalUpdate}
        handleCloseModalUpdate={handleCloseModalUpdate}
        handleShowModalUpdate={handleShowModalUpdate}
        selectedUserForUpdate={selectedUserForUpdate}
      />
    </div>
  );
}

export default Table;

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, clearUserData } from "../features/userSlice";
import { useDebounce } from "../hooks/useDebounce";

import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SearchUser() {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const debouncedUserId = useDebounce(userId, 500);

  const handleClose = () => {
    dispatch(clearUserData());
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  const userData = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (userId.trim() !== "") {
      setUserId("");
      handleShow();
      dispatch(fetchUserById(userId));
    } else {
      toast.error("Please enter a user ID.");
    }
  };

  useEffect(() => {
    if (debouncedUserId.trim() !== "") {
      handleSearch();
    }
  }, [debouncedUserId]);

  return (
    <div className="text-white">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Information user by id</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <p>Loading...</p>}
          {error && error.errorMessage && <p>{error.errorMessage}</p>}
          {!loading && !error && !userData && <p>User not found</p>}
          {userData && (
            <div>
              <p>
                <span className="fw-bold">User ID:</span> {userData.user.id}
              </p>
              <p>
                <span className="fw-bold">Email:</span> {userData.user.email}
              </p>
              <p>
                <span className="fw-bold">Username:</span>{" "}
                {userData.user.username}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchUser;

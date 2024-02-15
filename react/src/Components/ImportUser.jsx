import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { importUserFileCSV, fetchAllUsers } from "../features/userSlice";

const ImportUserModal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileSelect = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await dispatch(importUserFileCSV(formData));
      if (response.payload.data.errCode === 0) {
        toast.success(response.payload.data.message);
      } else {
        if (response.payload.status === 422) {
          toast.error("CSV file is not formatted correctly");
        } else if (response.payload.data.errorCode === 1) {
          toast.error("The email is already exist");
        } else {
          toast.error(response.payload.data.message);
        }
      }
      handleCloseModal();
    } catch (error) {
      toast.error("CSV file is not formatted correctly");
      handleCloseModal();
    }
    dispatch(fetchAllUsers());
    setSelectedFile("");
  };

  return (
    <>
      <Button className="me-2 mb-2 btn btn-secondary" onClick={handleShowModal}>
        Import user
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Import user from CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!selectedFile || isLoading}
            onClick={handleFileSelect}
          >
            {isLoading ? "Importing..." : "Submit"}
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportUserModal;

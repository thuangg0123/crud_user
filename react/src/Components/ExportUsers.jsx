import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { exportFileUsers } from "../features/userSlice";
import { toast } from "react-toastify";

export default function ExportUsers() {
  const dispatch = useDispatch();
  const handleExportUsers = () => {
    dispatch(exportFileUsers());
    toast.success("Export file users successfully !!!");
  };
  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleExportUsers()}>
        Export file users
      </Button>
    </>
  );
}

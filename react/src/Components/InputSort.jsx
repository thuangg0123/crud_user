import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { sortUserById } from "../features/userSlice";

function InputSort(props) {
  const dispatch = useDispatch();

  const handleSortChange = async (event) => {
    const sortByValue = event.target.value;
    if (sortByValue === "sortById") {
      try {
        const resultAction = await dispatch(sortUserById());
        if (sortUserById.fulfilled.match(resultAction)) {
          props.handleSortedListUsers(resultAction.payload);
          toast.success("Users sorted by id successfully");
        } else {
          console.error("Error sorting users:", resultAction.error.message);
          toast.error(resultAction.error.message);
        }
      } catch (error) {
        console.error("Error sorting users:", error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={handleSortChange}
    >
      <option>Select option</option>
      <option value="sortById">Sort user by id</option>
    </Form.Select>
  );
}

export default InputSort;

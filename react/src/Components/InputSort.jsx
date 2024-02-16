import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { fetchAllUsers, sortUser } from "../features/userSlice";

function InputSort(props) {
  const dispatch = useDispatch();

  const handleSortChange = async (event) => {
    const sortByValue = event.target.value;
    if (
      sortByValue === "id" ||
      sortByValue === "username" ||
      sortByValue === "email"
    ) {
      try {
        const response = await dispatch(sortUser(sortByValue));
        console.log(response);
        if (response.payload.errCode === 0) {
          props.handleSortedListUsers(response.payload.data.data);
          toast.success(`Users sorted by ${sortByValue} successfully`);
        } else {
          toast.error(`Sort list users by ${sortByValue} failed`);
        }
      } catch (error) {
        console.error(`Error sorting users by ${sortByValue}:`, error.message);
        toast.error(`Sort list users by ${sortByValue} failed`);
      }
    } else {
      await dispatch(fetchAllUsers());
    }
  };

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={handleSortChange}
    >
      <option>Select option</option>
      <option value="id">Sort user by id</option>
      <option value="username">Sort user by username</option>
      <option value="email">Sort user by email</option>
    </Form.Select>
  );
}

export default InputSort;

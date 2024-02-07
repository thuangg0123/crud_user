import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    listUsers: [],
    isLoading: false,
    isError: false
}

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        try {
            let response = await axios.get('http://localhost:8080/users/all')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        try {
            let response = await axios.post(`http://localhost:8080/users/delete/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const addNewUser = createAsyncThunk(
    'user/addNewUser',
    async ({ email, password, username }) => {
        try {
            let response = await axios.post(`http://localhost:8080/users/create`, {
                email: email,
                password: password,
                username: username
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        // fetching all users
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listUsers = action.payload
            state.isError = false;
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isError = action.error;
        })
        // delete user
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.listUsers = state.listUsers.filter(user => user.id !== action.meta.arg)
        })
        // add new user
        builder.addCase(addNewUser.fulfilled, (state, action) => {
            state.listUsers = state.listUsers.push(action.payload)
        })
    }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
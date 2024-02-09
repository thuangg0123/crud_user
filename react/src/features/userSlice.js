import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    listUsers: [],
    isLoading: false,
    isError: false,
    userData: null
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

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ email, username, id }, thunkAPI) => {
        try {
            let response = await axios.put(`http://localhost:8080/users/update/${id}`, { email, username, id })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (userId, thunkAPI) => {
        if (!userId) {
            throw new Error("User ID is required");
        }
        try {
            let response = await axios.get(`http://localhost:8080/users/${userId}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)

export const sortUserById = createAsyncThunk(
    'user/sortUserById',
    async (thunkAPI) => {
        try {
            let response = await axios.get(`http://localhost:8080/users/sort-by-id`)
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)

export const clearUserIdData = createAction('user/clearUserData')

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            state.push(action.payload);
        },
        clearUserData(state, action) {
            state.userData = null
        },
        setSortedUsers(state, action) {
            state.listUsers = action.payload;
        }
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
        })
        // delete user
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.listUsers = state.listUsers.filter(user => user.id !== action.meta.arg)
        })
        // add new user
        builder.addCase(addNewUser.fulfilled, (state, action) => {
            state.listUsers = state.listUsers.concat(action.payload);
        })
        // search user by id
        builder.addCase(fetchUserById.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload
            state.isError = false;
        })
        builder.addCase(fetchUserById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        // sort user
        builder.addCase(sortUserById.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(sortUserById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listUsers = action.payload;
            state.isError = false;
        })
        builder.addCase(sortUserById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const { addUser, clearUserData, setSortedUsers } = userSlice.actions
export default userSlice.reducer
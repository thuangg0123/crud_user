import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isUserLogin: {
        isAuthenticated: false,
    },
    listUsers: [],
    isLoading: false,
    isError: false,
    userData: null
}

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No JWT token found in localStorage');
    }
    return token;
};

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        try {
            const token = getToken();
            const response = await axios.get('http://localhost:8080/users/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        try {
            const token = getToken();
            let response = await axios.post(`http://localhost:8080/users/delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const addNewUser = createAsyncThunk(
    'user/addNewUser',
    async ({ email, password, username }) => {
        try {
            const token = getToken();
            let response = await axios.post(`http://localhost:8080/users/create`, {
                email: email,
                password: password,
                username: username
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ email, username, id }, thunkAPI) => {
        try {
            const token = getToken();
            let response = await axios.put(`http://localhost:8080/users/update/${id}`,
                { email, username, id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
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
            const token = getToken();
            let response = await axios.get(`http://localhost:8080/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)

export const sortUser = createAsyncThunk(
    'user/sortUser',
    async (sortBy, thunkAPI) => {
        try {
            const token = getToken();
            let response = await axios.get(`http://localhost:8080/users/sort-list-users?sortBy=${sortBy}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)

export const importUserFileCSV = createAsyncThunk(
    'user/importUserFileCSV',
    async (formData, thunkAPI) => {
        try {
            const token = getToken();
            let response = await axios.post(`http://localhost:8080/users/import-csv`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)

export const exportFileUsers = createAsyncThunk(
    'user/exportFileUsers',
    async (thunkAPI) => {
        try {
            const token = getToken();
            const response = await axios.get(`http://localhost:8080/users/export-csv`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob' // Chỉ định kiểu dữ liệu của response là blob
            });

            const url = window.URL.createObjectURL(new Blob([response.data])); // Tạo URL từ blob response
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.csv'); // Thiết lập tên tập tin và download
            document.body.appendChild(link);
            link.click(); // Kích hoạt sự kiện click trên link để tải xuống file
            link.parentNode.removeChild(link); // Xóa link sau khi tải xuống
        } catch (error) {
            console.error('Error exporting file:', error);
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let response = await axios.post(`http://localhost:8080/users/login`, { email, password })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const clearUserIdData = createAction('user/clearUserData')
export const loadUserDataFromLocalStorage = createAction('user/loadUserDataFromLocalStorage')
export const logoutUser = createAction('user/logoutUser')

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
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.userData = action.payload
        })
        // sort user
        builder.addCase(sortUser.pending, (state, action) => {
            state.listUsers = [];
        })
        builder.addCase(sortUser.fulfilled, (state, action) => {
            state.listUsers = action.payload;
        })
        builder.addCase(sortUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        // user login
        builder.addCase(userLogin.pending, (state, action) => {
            state.isAuthenticated = false
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isUserLogin = action.payload;
            state.isUserLogin.isAuthenticated = true

            localStorage.setItem("token", action.payload.data.access_token);
            localStorage.setItem("email", action.payload.data.email);
            localStorage.setItem("username", action.payload.data.username);
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isUserLogin.isAuthenticated = false
        })
        //load data from localStorage
        builder.addCase(loadUserDataFromLocalStorage, (state, action) => {
            const access_token = localStorage.getItem("token");
            const username = localStorage.getItem("username");
            const email = localStorage.getItem("email");
            if (access_token && username && email) {
                state.isUserLogin = {
                    isAuthenticated: true,
                    data: {
                        access_token: access_token,
                        username: username,
                        email: email
                    }
                };
            }
        });
        //log out
        builder.addCase(logoutUser, (state, action) => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");

            state.isUserLogin = {
                isAuthenticated: false
            };
        });
        // import user from file csv
        builder.addCase(importUserFileCSV.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(importUserFileCSV.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listUsers = action.payload;
            state.isError = false;
        })
        builder.addCase(importUserFileCSV.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const { addUser, clearUserData, setSortedUsers } = userSlice.actions
export default userSlice.reducer
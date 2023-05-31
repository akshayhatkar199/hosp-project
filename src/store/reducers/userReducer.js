import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

//check user password and username
// this the Action of  checkLogin
export const checkLogin = createAsyncThunk('login/checkLogin', async (payload, thunkApi) => {
    console.log('reduxtoken', payload);
    var userInfoData = {};
    // var decoded = jwt_decode(token);
    //  console.log("decoded",decoded)
    // console.log('id', id);
    // this api for get data of user by user id
    try {
        await axios.get(`http://localhost:3000/api/Users/${payload.userId}?access_token=${payload.token}`).then((res) => {
            console.log('resredux--', res);
            userInfoData.info = res.data;
        });
    } catch (error) {
        console.log('err', error);
    }
    console.log('-----r');
    return userInfoData;
});
// this is login reducers / loginSlice
const loginSlice = createSlice({
    name: 'login',
    initialState: { userinfo: {} },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            // Add user to the state array

            state.userinfo = action.payload.info;
        });
    }
});

export default loginSlice.reducer;

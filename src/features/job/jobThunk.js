import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { clearValue } from './jobSlice';

export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.post(url, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValue());
    return response.data;
  } catch (error) {
    // logout user
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

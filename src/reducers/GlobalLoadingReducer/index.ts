import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState: LoadingState = {
  loading: false,
};

export const globalLoadingSlice = createSlice({
  name: 'globalLoading',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {showLoading} = globalLoadingSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectLoading = (state: RootState) => state.loading;

export default globalLoadingSlice.reducer;

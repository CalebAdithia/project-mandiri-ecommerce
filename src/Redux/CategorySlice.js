import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'counter',
  initialState: {
    categoryStatus : 'idle'
  },
  reducers: {

  },
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.categoryStatus = "loading"
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.categoryStatus = "succeeded"
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.categoryStatus = "failed"
        if (action.error?.message) state.error = action.error.message
      })
  }
})

// export const { increment, decrement, incrementByAmount } = categorySlice.actions

export default categorySlice.reducer

export const fetchAllCategory = createAsyncThunk('fetchAllCategory', async () => {
    try{
        const response = await fetch('https://fakestoreapi.com/products/categories').then(res=>res.json())
        return response
    }
    catch(err){
        throw new err
    }
})
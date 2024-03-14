import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'counter',
  initialState: {
    cartStatus : 'idle'
  },
  reducers: {

  },
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAllCart.pending, (state) => {
        state.cartStatus = "loading"
      })
      .addCase(fetchAllCart.fulfilled, (state, action) => {
        state.cartStatus = "succeeded"
      })
      .addCase(fetchAllCart.rejected, (state, action) => {
        state.cartStatus = "failed"
        if (action.error?.message) state.error = action.error.message
      })
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer

export const fetchAllCart = createAsyncThunk('fetchAllCart', async () => {
    try{
        const response = await fetch('https://fakestoreapi.com/carts/user/1').then(res => res.json());
        
        const allData = await Promise.all(response.map(async (cart) => {
            const products = await Promise.all(cart.products.map(async (product) => {
                const productData = await fetch(`https://fakestoreapi.com/products/${product.productId}`).then(res => res.json());
                return {
                  'productCheck' : false,
                    ...product,
                    data: productData
                };
            }));
            return {
              'checked' : false,
              ...cart,
              products
            };
        }));
        return allData;
    }
    catch(err){
        throw new err
    }
})
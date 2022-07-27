import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchByIdStatus',
    async (params, thunkAPI) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get(`https://62b0204ae460b79df03d82b6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)

        if(data.length === 0){
            return thunkAPI.rejectWithValue('pizzas is empty')
        }

        return thunkAPI.fulfillWithValue(data);
    }
)

const initialState = {
    items: [],
    status: 'loading'
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload

        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items  = action.payload
            state.status = 'success'
            console.log(fetchPizzas.fulfilled.toString())
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = "error";
            state.items = []
        }
    }
})

export const selectPizzaData = (state) => state.pizza

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer
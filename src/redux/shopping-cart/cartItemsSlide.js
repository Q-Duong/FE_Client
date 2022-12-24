import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    value: items,
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            console.log(state.value)
            const duplicated = state.value.find(item => item._id === newItem._id)
            if(duplicated) {
                duplicated.quantity += newItem.quantity;
            } else {
                state.value.unshift(newItem)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a._id > b._id ? 1 : (a._id < b._id ? -1 : 0))))
        },
        updateItem: (state, action) => {
            if(action.payload.quantity <= 0)
                state.value = state.value.filter(item => item._id !== action.payload._id)
            else
                state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        },
        removeItem: (state, action) => {
            state.value = state.value.filter(item => item._id !== action.payload._id)
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        },
        removeAll: (state, action) => {
            console.log('remove all')
            state.value = []
            localStorage.removeItem('cartItems')
        }
    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, removeAll } = cartItemsSlice.actions

export default cartItemsSlice.reducer
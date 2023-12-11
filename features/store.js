import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user/authSlice'
import favoriteSlice from './favorite/favoriteSlice'
import { combineReducers } from 'redux'

const reducer = combineReducers({

    favorite: favoriteSlice
})

export const store = configureStore({
    reducer
});
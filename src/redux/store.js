import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import { PersistGate } from 'redux-persist/integration/react'
// import videoReducer from "./videoSlice";


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer=combineReducers({
    user:userReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

        // const createUser = (user) => {
        //     setLoading(true)
        //     fetch("http://localhost:7000/users/signup", {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json",
        //         },
        //         body: JSON.stringify(user)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             setUser(data)
        //             setLoading(false)
        //         })
        // }
    
        // const logIn = (user) => {
        //     setLoading(true)
        //     fetch("http://localhost:7000/users/signin", {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json",
        //         },
        //         body: JSON.stringify(user)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log(data)
        //             setUser(data)
        //             setLoading(false)
        //         })
        // }
        // const logOut = () => {
        //     setLoading(true)
        //     return
        // }

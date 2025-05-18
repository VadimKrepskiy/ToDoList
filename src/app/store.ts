import {configureStore} from '@reduxjs/toolkit'
import {todolistsReducer, todolistsSlice} from '@/features/todolists/model/todolists-slice.ts'
import {tasksReducer, tasksSlice} from '@/features/todolists/model/tasks-slice.ts'
import {appReducer, appSlice} from '@/app/app-slice.ts'

export const store = configureStore({
    reducer: {
        [todolistsSlice.name]: todolistsReducer,
        [tasksSlice.name]: tasksReducer,
        [appSlice.name]: appReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store
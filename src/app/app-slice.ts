import {createSlice} from '@reduxjs/toolkit'
import {RequestStatus} from '@/common/types'

export const appSlice = createSlice({
    name:'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        status: 'idle' as RequestStatus,
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
        selectStatus: state => state.status,
    },
    reducers: create => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        })
    }),
})

export type ThemeMode = 'light' | 'dark'

export const {changeThemeModeAC, setAppStatusAC} = appSlice.actions

export const appReducer = appSlice.reducer

export const {selectThemeMode, selectStatus} = appSlice.selectors
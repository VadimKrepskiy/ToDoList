import {createSlice, isFulfilled, isPending, isRejected} from '@reduxjs/toolkit'
import {RequestStatus} from '@/common/types'
import {todolistsApi} from '@/features/todolists/api/_todolistsApi.ts'
import {tasksApi} from '@/features/todolists/api/_tasksApi.ts'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as string | null,
        isLoggedIn: false,
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
        selectStatus: state => state.status,
        selectError: state => state.error,
        selectIsLoggedIn: state => state.isLoggedIn,
    },
    extraReducers: builder => {
        builder.addMatcher(isPending, (state, action) => {
                if (todolistsApi.endpoints.getTodolists.matchPending(action) || tasksApi.endpoints.getTasks.matchPending(action)) {
                    return
                }
                state.status = 'loading'
            }
        )
            .addMatcher(isFulfilled, (state) => {
                    state.status = 'succeeded'
                }
            )
            .addMatcher(isRejected, (state) => {
                    state.status = 'failed'
                }
            )
    },
    reducers: create => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }),
})

export type ThemeMode = 'light' | 'dark'

export const {changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC} = appSlice.actions

export const appReducer = appSlice.reducer

export const {selectThemeMode, selectStatus, selectError, selectIsLoggedIn} = appSlice.selectors
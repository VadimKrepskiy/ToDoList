import {authApi} from '@/features/auth/api/authApi'
import {Inputs} from '@/features/auth/lib/schemas'
import {setAppStatusAC} from '@/app/app-slice'
import {ResultCode} from '@/common/enums'
import {handleServerAppError} from '@/common/utils/handleServerAppError'
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError'
import {AUTH_TOKEN} from '@/common/constants'
import {createAppSlice} from '@/common/utils'

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    selectors: {
      selectIsLoggedIn: state => state.isLoggedIn
    },
    reducers: create => ({
        loginTC: create.asyncThunk(
            async (data: Inputs, {dispatch, rejectWithValue})=> {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await authApi.login(data)
                    if(res.data.resultCode === ResultCode.Success){
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        return {isLoggedIn: true}
                    }
                    else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                }catch (error){
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        logoutTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                try{
                    dispatch(setAppStatusAC({status: 'loading'}))
                    const res = await authApi.logout()
                    if(res.data.resultCode){
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        localStorage.removeItem(AUTH_TOKEN)
                        return { isLoggedIn: false }
                    }
                    else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                }catch (error){
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        initializeAppTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                try{
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await authApi.me()
                    if(res.data.resultCode === ResultCode.Success){
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { isLoggedIn: true }
                    }
                    else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                }catch (error){
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            }
        )
    })
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
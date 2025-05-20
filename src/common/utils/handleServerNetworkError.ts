import {Dispatch} from '@reduxjs/toolkit'
import axios from 'axios'
import {setAppErrorAC, setAppStatusAC} from '@/app/app-slice'

export const handleServerNetworkError  = (dispatch: Dispatch, error: unknown) => {
    let errorMessage

    if(axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message
    } else if(error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }

    dispatch(setAppErrorAC({error: errorMessage}))
    dispatch(setAppStatusAC({ status: 'failed' }))
}
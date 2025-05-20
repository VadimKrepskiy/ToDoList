import {SyntheticEvent, useState} from 'react'
import {Alert, Snackbar} from '@mui/material'
import {useSelector} from 'react-redux'
import {selectError} from '@/app/app-slice'

export const ErrorSnackbar = () => {
    const error = useSelector(selectError)
    const [open, setOpen] = useState(error !== null)

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
            <Alert onClose={handleClose} severity='error' variant='filled' sx={{ width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
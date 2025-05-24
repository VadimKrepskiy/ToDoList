import styles from './App.module.css'
import {CircularProgress, CssBaseline, ThemeProvider} from '@mui/material'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {getTheme} from '@/common/theme/theme'
import {selectThemeMode, setIsLoggedInAC} from '@/app/app-slice'
import {Header} from '@/common/components/Header/Header'
import {ErrorSnackbar} from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import {Routing} from '@/common/routing/Routing'
import {useAppDispatch} from '@/common/hooks'
import {useEffect, useState} from 'react'
import {useMeQuery} from '@/features/auth/api/authApi.ts'
import {ResultCode} from '@/common/enums'

export const App = ()=> {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const [isInitialized, setIsInitialized] = useState(false)

    const {data, isLoading} = useMeQuery()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoading) return
        setIsInitialized(true)
        if(data?.resultCode === ResultCode.Success){
            dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        }
    }, [isLoading])

    if (!isInitialized) {
        return (
            <div className={styles.circularProgressContainer}>
                <CircularProgress size={150} thickness={3}/>
            </div>
        )
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.app}>
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}

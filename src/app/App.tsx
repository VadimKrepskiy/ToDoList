import styles from './App.module.css'
import {CircularProgress, CssBaseline, ThemeProvider} from '@mui/material'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {getTheme} from '@/common/theme/theme'
import {selectThemeMode} from '@/app/app-slice'
import {Header} from '@/common/components/Header/Header'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts'
import {ErrorSnackbar} from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import {Routing} from '@/common/routing/Routing'
import {useAppDispatch} from '@/common/hooks'
import {useEffect, useState} from 'react'
import {initializeAppTC} from '@/features/auth/model/auth-slice'


export type TasksState = Record<string, DomainTask[]>

function App() {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)
    
    const dispatch = useAppDispatch()

    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        dispatch(initializeAppTC()).finally(() => setIsInitialized(true))
    },[])
    if(!isInitialized){
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
                <Routing />
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}

export default App

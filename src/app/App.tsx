import './App.css'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {getTheme} from '@/common/theme/theme'
import {selectThemeMode} from '@/app/app-slice'
import {Header} from '@/common/components/Header/Header'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts'
import {ErrorSnackbar} from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import {Routing} from '@/common/routing/Routing'


export type TasksState = Record<string, DomainTask[]>

function App() {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline/>
                <Header/>
                <Routing />
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}

export default App

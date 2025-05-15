import './App.css'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {useAppSelector} from './hooks/useAppSelector'
import {getTheme} from '@/common/theme/theme'
import {selectThemeMode} from '@/app/app-selectors'
import {Header} from '@/common/components/Header/Header'
import { Main } from '@/app/Main'


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

function App() {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}

export default App

import './App.css'
import {TodolistItem, FilterValues} from './TodolistItem.tsx'
import {useReducer, useState} from 'react';
import {CreateItemForm} from './CreateItemForm';
import {AppBar, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider, Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from './TodolistItem.styles.ts';
import {NavButton} from './NavButton.ts';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
    todolistsReducer
} from './model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from './model/tasks-reducer.ts';

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

type ThemeMode = 'dark' | 'light'

function App() {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC({todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{ mb: '30px' }}>
                    <Toolbar>
                        <Container maxWidth="lg" sx={containerSx}>
                            <IconButton color={'inherit'}>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container sx={{ mb: '30px '}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            let filteredTasks = tasks[todolist.id]

                            if (todolist.filter === 'active') {
                                filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                            } else if (todolist.filter === 'completed') {
                                filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                            }
                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{ p: '0 20px 20px 20px' }}>
                                        <TodolistItem key={todolist.id}
                                                      todolist={todolist}
                                                      tasks={filteredTasks}
                                                      createTask={createTask}
                                                      deleteTask={deleteTask}
                                                      changeTodolistTitle={changeTodolistTitle}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTaskStatus={changeTaskStatus}
                                                      changeFilter={changeFilter}
                                                      deleteTodolist={deleteTodolist}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App

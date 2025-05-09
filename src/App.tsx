import './App.css'
import {TodolistItem, FilterValues, Todolist} from './TodolistItem.tsx'
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm';
import {AppBar, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider, Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from './TodolistItem.styles.ts';
import {NavButton} from './NavButton.ts';

export type TasksState = {
    id: string
    title: string
    isDone: boolean
}

type ThemeMode = 'dark' | 'light'

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<Record<string, TasksState[]>>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

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
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }
    const createTodolist = (title: string) => {
        const newTodolist: Todolist = {id: v1(), title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
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

import './App.css'
import {TodolistItem, FilterValues, Todolist} from './TodolistItem.tsx'
import {useState} from 'react';
import {v1} from 'uuid';

export type TasksState = {
    id: string
    title: string
    isDone: boolean
}

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

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    return (
        <div className="app">
            {todolists.map(todolist => {
                    let filteredTasks = tasks[todolist.id]

                    if (todolist.filter === 'active') {
                        filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                    } else if (todolist.filter === 'completed') {
                        filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                    }
                    return (
                        <TodolistItem
                            todolist={todolist}
                            tasks={filteredTasks}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            changeTaskStatus={changeTaskStatus}
                            changeFilter={changeFilter}
                        />
                    )
                }
            )}

        </div>
    )
}

export default App

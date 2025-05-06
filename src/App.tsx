import './App.css'
import {TodolistItem, Task, FilterValues} from './TodolistItem.tsx'
import {useState} from 'react';
import {v1} from 'uuid';

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValues>('all')

    const createTask = (title: string) => {
        const newTask = { id: v1(), title, isDone: false }
        setTasks([newTask,...tasks])
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task))
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    let filteredTasks = tasks

    if(filter === 'active'){
        filteredTasks = tasks.filter((task) => !task.isDone)
    }
    else if(filter === 'completed'){
        filteredTasks = tasks.filter((task) => task.isDone)
    }

    return (
        <div className="app">
            <TodolistItem
                title={'What to learn'}
                tasks={filteredTasks}
                createTask={createTask}
                deleteTask={deleteTask}
                changeTaskStatus={changeTaskStatus}
                changeFilter={changeFilter}
                filter={filter}
            />
        </div>
    )
}

export default App

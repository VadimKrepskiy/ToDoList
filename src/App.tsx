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

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }
    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const createTask = (title: string) => {
        const newTask = { id: v1(), title, isDone: false }
        setTasks([newTask,...tasks])
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
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
            />
        </div>
    )
}

export default App

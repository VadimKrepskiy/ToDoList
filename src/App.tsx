import './App.css'
import {TodolistItem, Task, FilterValues} from './TodolistItem.tsx'
import {useState} from 'react';

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValues>('all')

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id))
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
                title={'What tot learn'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App

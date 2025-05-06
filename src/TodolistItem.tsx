import {Button} from './Button.tsx';
import {ChangeEvent, type KeyboardEvent, useState} from 'react';

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    todolist: Todolist
    tasks: Task[]
    createTask: (todolistId: string, title: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
}

export const TodolistItem = (
    {
        todolist: {id, title, filter},
        tasks,
        createTask,
        deleteTask,
        changeTaskStatus,
        changeFilter,
    }: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={taskTitle} onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasks.length === 0 ? <p>Тасок нет</p> : (
                <ul>
                    {tasks.map((task) => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}
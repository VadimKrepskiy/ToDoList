import {Button} from './Button.tsx';
import {ChangeEvent, type KeyboardEvent, useState} from 'react';

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    title: string
    tasks: Task[]
    createTask: (title: string) => void
    deleteTask: (id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeFilter: (filter: FilterValues) => void
    filter: FilterValues
}

export const TodolistItem = (
    {
        title,
        tasks,
        createTask,
        deleteTask,
        changeTaskStatus,
        changeFilter,
        filter,
    }: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if(trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        }
        else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler} />
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasks.length === 0 ? <p>Тасок нет</p> : (
                <ul>
                    {tasks.map((task) => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilter('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilter('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
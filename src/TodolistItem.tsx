import {Button} from './Button.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (
    {
        todolist: {id, title, filter},
        tasks,
        createTask,
        deleteTask,
        changeTodolistTitle,
        changeTaskTitle,
        changeTaskStatus,
        changeFilter,
        deleteTodolist,
    }: Props) => {
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? <p>Тасок нет</p> : (
                <ul>
                    {tasks.map((task) => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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
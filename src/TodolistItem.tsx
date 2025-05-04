import {Button} from './Button.tsx';

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (id: number) => void
    changeFilter: (filter: FilterValues) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? <p>Тасок нет</p> : (
                <ul>
                    {tasks.map((task) => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
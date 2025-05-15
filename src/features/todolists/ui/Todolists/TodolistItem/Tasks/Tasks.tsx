import {List} from '@mui/material'
import {useAppSelector} from '@/app/hooks/useAppSelector'
import {selectTasks} from '@/features/todolists/model/tasks-selectors'
import {Todolist} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem'
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem'

type Props = {
    todolist: Todolist
}
export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }
    return (
        <>
            {filteredTasks.length === 0 ? <p>Тасок нет</p> : (
                <List>
                    {filteredTasks.map((task) => {
                        return (
                            <TaskItem task={task} todolistId={todolist.id}/>
                        )
                    })}
                </List>
            )}
        </>
    )
}
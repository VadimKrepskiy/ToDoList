import {List} from '@mui/material'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {fetchTasksTC, selectTasks} from '@/features/todolists/model'
import {Todolist} from '@/features/todolists/ui'
import {TaskItem} from '@/features/todolists/ui'
import {useEffect} from 'react'
import { TaskStatus } from '@/common/enums'

type Props = {
    todolist: Todolist
}
export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => task.status === TaskStatus.New)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.status === TaskStatus.Completed)
    }
    return (
        <>
            {filteredTasks?.length === 0 ? <p>Тасок нет</p> : (
                <List>
                    {filteredTasks?.map((task) => {
                        return (
                            <TaskItem key={task.id} task={task} todolistId={todolist.id}/>
                        )
                    })}
                </List>
            )}
        </>
    )
}
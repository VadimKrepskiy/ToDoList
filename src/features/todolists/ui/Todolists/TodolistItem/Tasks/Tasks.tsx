import {List} from '@mui/material'
import {Todolist} from '@/features/todolists/ui'
import {TaskItem} from '@/features/todolists/ui'
import { TaskStatus } from '@/common/enums'
import {useGetTasksQuery} from '@/features/todolists/api/_tasksApi.ts'
import {TasksSkeleton} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import {useAppDispatch} from '@/common/hooks'
import {setAppErrorAC} from '@/app/app-slice.ts'
import {useEffect} from 'react'

type Props = {
    todolist: Todolist
}
export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const { data, isLoading, error } = useGetTasksQuery(id)

    const dispatch = useAppDispatch()

    if (isLoading) {
        return <TasksSkeleton />
    }

    useEffect(() => {
        if(!error) return
        if('status' in error) {
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
            dispatch(setAppErrorAC({error: errMsg}))
        }
        else {
            dispatch(setAppErrorAC({error: error.message || 'Some error occurred'}))
        }
    }, [error])

    let filteredTasks = data?.items
    if (filter === 'active') {
        filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.New)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.Completed)
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
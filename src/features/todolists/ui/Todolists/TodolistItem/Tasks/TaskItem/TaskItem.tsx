import {Checkbox, ListItem} from '@mui/material'

import {EditableSpan} from '@/common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from '@/features/todolists/model/tasks-slice.ts'
import {ChangeEvent} from 'react'
import {useAppDispatch} from '@/common/hooks'
import {getListItemSx} from './TaskItem.styles'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId: todolistId, taskId: task.id}))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId: todolistId, taskId: task.id, title}))
    }
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({todolistId: todolistId, taskId: task.id, isDone: event.currentTarget.checked}))
    }
    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
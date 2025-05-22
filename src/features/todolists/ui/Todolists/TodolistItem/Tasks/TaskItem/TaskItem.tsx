import {Checkbox, ListItem} from '@mui/material'

import {EditableSpan} from '@/common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {updateTaskTC, deleteTaskTC} from '@/features/todolists/model/tasks-slice.ts'
import {ChangeEvent} from 'react'
import {useAppDispatch} from '@/common/hooks'
import {getListItemSx} from './TaskItem.styles'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts'
import {TaskStatus} from '@/common/enums'


type Props = {
    task: DomainTask
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskTC({todolistId: todolistId, taskId: task.id}))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC({todolistId: todolistId, taskId: task.id, domainModel: {title}}))
    }
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = event.currentTarget.checked
        dispatch(updateTaskTC({todolistId, taskId: task.id, domainModel: {status: newStatusValue ? TaskStatus.Completed : TaskStatus.New}}))
    }

    const isTaskCompleted = task.status === TaskStatus.Completed
    return (
        <ListItem key={task.id}
                  sx={getListItemSx(isTaskCompleted)}
        >
            <div>
                <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <span>{new Date(task.addedDate).toLocaleDateString()}</span>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
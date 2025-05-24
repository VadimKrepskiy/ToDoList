import {Checkbox, ListItem} from '@mui/material'
import {EditableSpan} from '@/common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {ChangeEvent} from 'react'
import {getListItemSx} from './TaskItem.styles'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts'
import {TaskStatus} from '@/common/enums'
import {useRemoveTaskMutation, useUpdateTaskMutation} from '@/features/todolists/api/_tasksApi.ts'
import {createTaskModel} from '@/features/todolists/lib/utils/createTaskModel.ts'


type Props = {
    task: DomainTask
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const deleteTask = () => {
        removeTask({todolistId, taskId: task.id})
    }
    const changeTaskTitle = (title: string) => {
        const model = createTaskModel(task, { title })
        updateTask({todolistId, taskId: task.id, model})
    }
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const status = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const model = createTaskModel(task, { status })
        updateTask({todolistId, taskId: task.id, model})
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
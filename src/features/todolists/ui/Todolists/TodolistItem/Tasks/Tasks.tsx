import {List} from '@mui/material'
import {Todolist} from '@/features/todolists/ui'
import {TaskItem} from '@/features/todolists/ui'
import { TaskStatus } from '@/common/enums'
import {useGetTasksQuery} from '@/features/todolists/api/_tasksApi.ts'

type Props = {
    todolist: Todolist
}
export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const { data } = useGetTasksQuery(id)


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
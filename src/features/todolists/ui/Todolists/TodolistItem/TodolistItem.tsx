import {CreateItemForm} from '@/common/components'
import {TodolistTitle, FilterButtons, Tasks} from '@/features/todolists/ui'
import {useAddTaskMutation} from '@/features/todolists/api/tasksApi.ts'
import {DomainTodolist} from '@/features/todolists/lib/types'

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {
    const {id} = todolist

    const [addTask] = useAddTaskMutation()

    const createTask = (title: string) => {
        addTask({todolistId: id, title})
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
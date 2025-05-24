import {CreateItemForm} from '@/common/components'
import {TodolistTitle, FilterButtons, Tasks} from '@/features/todolists/ui'
import {useAddTaskMutation} from '@/features/todolists/api/_tasksApi.ts'
import {DomainTodolist, FilterValues} from '@/features/todolists/lib/types'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

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
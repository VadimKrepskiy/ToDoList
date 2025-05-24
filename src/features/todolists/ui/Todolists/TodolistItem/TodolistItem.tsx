import {CreateItemForm} from '@/common/components'
import {DomainTodolist} from '@/features/todolists/model'
import {TodolistTitle, FilterButtons, Tasks} from '@/features/todolists/ui'
import {useAddTaskMutation} from '@/features/todolists/api/_tasksApi.ts'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

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
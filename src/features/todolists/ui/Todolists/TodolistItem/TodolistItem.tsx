import {CreateItemForm} from '@/common/components'
import {createTaskTC, DomainTodolist} from '@/features/todolists/model'
import {useAppDispatch} from '@/common/hooks'
import {TodolistTitle, FilterButtons, Tasks} from '@/features/todolists/ui'

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



    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskTC({todolistId: id, title}))
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
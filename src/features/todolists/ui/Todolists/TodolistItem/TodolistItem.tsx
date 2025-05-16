import {CreateItemForm} from '@/common/components'
import {createTaskAC} from '@/features/todolists/model'
import {useAppDispatch} from '@/common/hooks'
import {TodolistTitle, FilterButtons, Tasks} from '@/features/todolists/ui'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const {id} = todolist



    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
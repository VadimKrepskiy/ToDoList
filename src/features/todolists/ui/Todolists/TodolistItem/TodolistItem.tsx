import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {createTaskAC} from '@/features/todolists/model/tasks-reducer'
import { useAppDispatch } from '@/app/hooks/useAppDispatch'
import {TodolistTitle} from './TodolistTitle/TodolistTitle'
import {Tasks} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks'
import {FilterButtons} from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons'

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
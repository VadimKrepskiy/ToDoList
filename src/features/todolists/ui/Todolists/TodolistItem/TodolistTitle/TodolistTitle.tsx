import {EditableSpan} from '@/common/components'
import IconButton from '@mui/material/IconButton'

import DeleteIcon from '@mui/icons-material/Delete'
import styles from './TodolistTitle.module.css'
import {
    todolistsApi,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} from '@/features/todolists/api/todolistsApi.ts'
import {RequestStatus} from '@/common/types'
import {useAppDispatch} from '@/common/hooks'
import {DomainTodolist} from '@/features/todolists/lib/types'

type Props = {
    todolist: DomainTodolist
}
export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist

    const disabled = entityStatus === "loading"

    const [removeTodolist] = useRemoveTodolistMutation()

    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const dispatch = useAppDispatch()

    const changeTodolistStatus= (entityStatus: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData('getTodolists',undefined, (state) => {
                const todolist = state.find(t => t.id === id)
                if(todolist){
                    todolist.entityStatus = entityStatus
                }
            })
        )
    }

    const changeTodolistTitle = (title: string) => {
        updateTodolistTitle({id, title})
    }

    const deleteTodolist = () => {
        changeTodolistStatus('loading')
        removeTodolist(id)
            .unwrap()
            .catch(() => {
                changeTodolistStatus('idle')
            })
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} disabled={disabled}/>
            </h3>
            <IconButton onClick={deleteTodolist} disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
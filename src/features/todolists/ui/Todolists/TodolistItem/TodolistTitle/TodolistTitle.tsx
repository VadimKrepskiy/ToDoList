import {EditableSpan} from '@/common/components'
import IconButton from '@mui/material/IconButton'
import {DomainTodolist} from '@/features/todolists/model'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './TodolistTitle.module.css'
import {useRemoveTodolistMutation, useUpdateTodolistTitleMutation} from '@/features/todolists/api/_todolistsApi.ts'

type Props = {
    todolist: DomainTodolist
}
export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist

    const disabled = entityStatus === "loading"

    const [removeTodolist] = useRemoveTodolistMutation()

    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const changeTodolistTitle = (title: string) => {
        updateTodolistTitle({id, title})
    }

    const deleteTodolist = () => {
        removeTodolist(id)
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
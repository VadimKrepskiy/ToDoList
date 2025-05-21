import {EditableSpan} from '@/common/components'
import IconButton from '@mui/material/IconButton'
import {changeTodolistTitleTC, deleteTodolistTC, DomainTodolist} from '@/features/todolists/model'
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppDispatch} from '@/common/hooks'
import styles from './TodolistTitle.module.css'

type Props = {
    todolist: DomainTodolist
}
export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist

    const disabled = entityStatus === "loading"

    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC({id, title}))
    }

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistTC(id))
    }
    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} disabled={disabled}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler} disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
import {EditableSpan} from '@/common/components'
import {Todolist} from '@/features/todolists/ui'
import IconButton from '@mui/material/IconButton'
import {changeTodolistTitleAC, deleteTodolistAC} from '@/features/todolists/model'
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppDispatch} from '@/common/hooks'
import styles from './TodolistTitle.module.css'

type Props = {
    todolist: Todolist
}
export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }
    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
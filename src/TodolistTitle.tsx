import {EditableSpan} from '@/EditableSpan';
import {Todolist} from '@/TodolistItem';
import IconButton from '@mui/material/IconButton';
import {changeTodolistTitleAC, deleteTodolistAC} from '@/model/todolists-reducer';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from '@/app/hooks/useAppDispatch';

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
        <div className={'container'}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
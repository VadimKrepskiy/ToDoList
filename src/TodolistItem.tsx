import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {ChangeEvent} from 'react';
import {CreateItemForm} from './common/components/CreateItemForm/CreateItemForm';
import {EditableSpan} from './EditableSpan';
import {Box, Checkbox, List, ListItem} from '@mui/material';
import {containerSx, getListItemSx} from './TodolistItem.styles.ts';
import {useAppSelector} from '@/app/hooks/useAppSelector';
import {selectTasks} from '@/model/tasks-selectors';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/model/tasks-reducer';
import { useAppDispatch } from './app/hooks/useAppDispatch.ts';
import {changeTodolistFilterAC} from '@/model/todolists-reducer';
import {TodolistTitle} from './TodolistTitle'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const tasks = useAppSelector(selectTasks)
    const {id, filter} = todolist
    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }



    const changeTodolistFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            {filteredTasks.length === 0 ? <p>Тасок нет</p> : (
                <List>
                    {filteredTasks.map((task) => {
                        const deleteTask = () => {
                            dispatch(deleteTaskAC({todolistId:id, taskId: task.id}))
                        }
                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                        }
                        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: event.currentTarget.checked}))
                        }
                        return (
                            <ListItem key={task.id}
                                        sx={getListItemSx(task.isDone)}
                            >
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                                </div>
                                <IconButton onClick={deleteTask}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Box sx={containerSx}>
                    <Button variant={filter === 'all' ? 'outlined' : 'text'}
                            color='inherit'
                            onClick={() => changeTodolistFilter('all')}>
                        All
                    </Button>
                    <Button variant={filter === 'active' ? 'outlined' : 'text'}
                            color='primary'
                            onClick={() => changeTodolistFilter('active')}>
                        Active
                    </Button>
                    <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                            color='secondary'
                            onClick={() => changeTodolistFilter('completed')}>
                        Completed
                    </Button>
                </Box>
            </div>
        </div>
    )
}
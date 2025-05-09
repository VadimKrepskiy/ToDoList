import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm';
import {EditableSpan} from './EditableSpan';
import {Box, Checkbox, List, ListItem} from '@mui/material';
import {containerSx, getListItemSx} from './TodolistItem.styles.ts';

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
    tasks: Task[]
    createTask: (todolistId: string, title: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (
    {
        todolist: {id, title, filter},
        tasks,
        createTask,
        deleteTask,
        changeTodolistTitle,
        changeTaskTitle,
        changeTaskStatus,
        changeFilter,
        deleteTodolist,
    }: Props) => {
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? <p>Тасок нет</p> : (
                <List>
                    {tasks.map((task) => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, event.currentTarget.checked)
                        }
                        return (
                            <ListItem key={task.id}
                                        sx={getListItemSx(task.isDone)}
                            >
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
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
                            onClick={() => changeFilterHandler('all')}>
                        All
                    </Button>
                    <Button variant={filter === 'active' ? 'outlined' : 'text'}
                            color='primary'
                            onClick={() => changeFilterHandler('active')}>
                        Active
                    </Button>
                    <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                            color='secondary'
                            onClick={() => changeFilterHandler('completed')}>
                        Completed
                    </Button>
                </Box>
            </div>
        </div>
    )
}
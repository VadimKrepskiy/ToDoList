import {Box} from '@mui/material'
import Button from '@mui/material/Button'
import {FilterValues, Todolist} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem'
import {changeTodolistFilterAC} from '@/features/todolists/model/todolists-reducer'
import {useDispatch} from 'react-redux'
import { containerSx } from '@/common/styles/container.styles'

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useDispatch()

    const changeTodolistFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }
    return (
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
    )
}
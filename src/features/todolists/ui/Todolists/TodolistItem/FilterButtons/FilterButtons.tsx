import {Box} from '@mui/material'
import Button from '@mui/material/Button'
import { containerSx } from '@/common/styles'
import {todolistsApi} from '@/features/todolists/api/todolistsApi.ts'
import {useAppDispatch} from '@/common/hooks'
import {DomainTodolist, FilterValues} from '@/features/todolists/lib/types'

type Props = {
    todolist: DomainTodolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(
            todolistsApi.util.updateQueryData(
                // название эндпоинта, в котором нужно обновить кэш
                "getTodolists",
                // аргументы для эндпоинта
                undefined,
                // `updateRecipe` - коллбэк для обновления закэшированного стейта мутабельным образом
                (state) => {
                    const todolist = state.find((todolist) => todolist.id === id)
                    if (todolist) {
                        todolist.filter = filter
                    }
                }),
        )
    }
    return (
        <div>
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color='inherit'
                        onClick={() => changeFilter('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color='primary'
                        onClick={() => changeFilter('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color='secondary'
                        onClick={() => changeFilter('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
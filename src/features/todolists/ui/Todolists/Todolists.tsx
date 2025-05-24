import {Grid, Paper} from '@mui/material'
import {TodolistItem} from '@/features/todolists/ui'
import {useLazyGetTodolistsQuery} from '@/features/todolists/api/_todolistsApi.ts'

export const Todolists = () => {

    const [trigger, { data: todolists }] = useLazyGetTodolistsQuery()

    const fetchTodolists = () => {
        trigger()
    }

    return (
            <>
                <div>
                    <button onClick={fetchTodolists}>Download todolists</button>
                </div>
                {todolists?.map(todolist => {
                    return (
                        <Grid key={todolist.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <TodolistItem key={todolist.id} todolist={todolist}/>
                            </Paper>
                        </Grid>
                    )
                })}
            </>
    )
}
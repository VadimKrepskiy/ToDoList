import {Box, Grid, Paper} from '@mui/material'
import {TodolistItem} from '@/features/todolists/ui'
import {useGetTodolistsQuery} from '@/features/todolists/api/todolistsApi.ts'
import {containerSx} from '@/common/styles'
import {TodolistSkeleton} from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx'

export const Todolists = () => {

    const { data: todolists, isLoading } = useGetTodolistsQuery(undefined,{
        pollingInterval: 3000,
        skipPollingIfUnfocused: true
    })

    if(isLoading) {
        return (
            <Box sx={containerSx} style={{ gap: '32px' }}>
                {Array(3)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </Box>
        )
    }
    return (
            <>
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
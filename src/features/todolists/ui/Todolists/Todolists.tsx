import {Grid, Paper} from '@mui/material'
import {TodolistItem} from '@/features/todolists/ui'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {fetchTodolistsTC, selectTodolists} from '@/features/todolists/model'
import {useEffect} from 'react'

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    return (
            <>
                {todolists.map(todolist => {
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
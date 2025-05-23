import {Container, Grid} from '@mui/material'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {createTodolistTC} from '@/features/todolists/model/todolists-slice.ts'
import {useAppDispatch} from '@/common/hooks/useAppDispatch'
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists'
import {selectIsLoggedIn} from '@/features/auth/model/auth-slice'
import {useAppSelector} from '@/common/hooks'
import {Navigate} from 'react-router'
import {Path} from '@/common/routing'

export const Main = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const createTodolist = (title: string) => {
        dispatch(createTodolistTC(title))
    }

    if(!isLoggedIn) {
        return <Navigate to={Path.Login}/>
    }
    return (
        <Container maxWidth="lg">
            <Grid container sx={{mb: '30px '}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
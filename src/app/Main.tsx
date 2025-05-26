import {Container, Grid} from '@mui/material'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists'
import {useAppSelector} from '@/common/hooks'
import {Navigate} from 'react-router'
import {Path} from '@/common/routing'
import {useAddTodolistMutation} from '@/features/todolists/api/todolistsApi.ts'
import {selectIsLoggedIn} from '@/app/app-slice.ts'

export const Main = () => {
    const [addTodolist] = useAddTodolistMutation()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if(!isLoggedIn) {
        return <Navigate to={Path.Login}/>
    }
    return (
        <Container maxWidth="lg">
            <Grid container sx={{mb: '30px '}}>
                <CreateItemForm onCreateItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
import {AppBar, Container, LinearProgress, Switch, Toolbar} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from '@/common/components'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC} from '@/app/app-slice'
import {getTheme} from '@/common/theme'
import {containerSx} from '@/common/styles'
import {useLogoutMutation} from '@/features/auth/api/authApi.ts'
import {ResultCode} from '@/common/enums'
import {AUTH_TOKEN} from '@/common/constants'
import {baseApi} from '@/app/baseApi.ts'


export const Header = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const themeMode = useAppSelector(selectThemeMode)
    const status = useAppSelector(selectStatus)

    const theme = getTheme(themeMode)

    const [logout] = useLogoutMutation()

    const dispatch = useAppDispatch()

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    const logoutHandler = () => {
        logout().then(res => {
            if(res.data?.resultCode === ResultCode.Success){
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                localStorage.removeItem(AUTH_TOKEN)
            }
        })
            .then(() => {
                dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
            })
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth="lg" sx={containerSx}>
                    <IconButton color={'inherit'}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
            {status === 'loading' && <LinearProgress />}
        </AppBar>
    )
}
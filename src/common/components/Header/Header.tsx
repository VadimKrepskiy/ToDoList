import {AppBar, Container, LinearProgress, Switch, Toolbar} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from '@/common/components'
import {useAppSelector} from '@/common/hooks'
import {selectStatus, selectThemeMode} from '@/app'
import {getTheme} from '@/common/theme'
import {changeThemeModeAC} from '@/app'
import {useAppDispatch} from '@/common/hooks'
import {containerSx} from '@/common/styles'


export const Header = () => {
    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)
    const status = useAppSelector(selectStatus)

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth="lg" sx={containerSx}>
                    <IconButton color={'inherit'}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
            {
                status === 'loading' && <LinearProgress />
            }
        </AppBar>
    )
}
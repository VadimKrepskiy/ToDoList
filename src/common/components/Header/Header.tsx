import {AppBar, Container, Switch, Toolbar} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from '@/common/components/NavButton/NavButton'
import {useAppSelector} from '@/app/hooks/useAppSelector'
import {selectThemeMode} from '@/app/app-selectors'
import {getTheme} from '@/common/theme/theme'
import {changeThemeModeAC} from '@/app/app-reducer'
import {useAppDispatch} from '@/app/hooks/useAppDispatch'
import {containerSx} from '@/common/styles/container.styles'


export const Header = () => {
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)

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
        </AppBar>
    )
}
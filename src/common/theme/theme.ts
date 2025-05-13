import {ThemeMode} from '@/app/app-reducer';
import {createTheme} from '@mui/material';

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
}
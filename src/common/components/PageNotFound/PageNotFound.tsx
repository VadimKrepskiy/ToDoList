import { Link } from 'react-router'
import styles from './PageNotFound.module.css'
import Button from '@mui/material/Button'
import {Path} from '@/common/routing'

export const PageNotFound = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>page not found</h2>
        <Button variant={'contained'} component={Link} to={Path.Main} sx={{ width:'300px', maxWidth:'100%' }}>вернуться на главную</Button>
    </div>
)
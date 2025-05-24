import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material'
import {getTheme} from '@/common/theme'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {selectThemeMode, setIsLoggedInAC} from '@/app/app-slice'
import Button from '@mui/material/Button'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import styles from './Login.module.css'
import {zodResolver} from '@hookform/resolvers/zod'
import {Inputs, loginSchema} from '@/features/auth/lib/schemas'
import {useLoginMutation} from '@/features/auth/api/authApi.ts'
import {ResultCode} from '@/common/enums'
import {AUTH_TOKEN} from '@/common/constants'

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const [login] = useLoginMutation()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false }
    })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Inputs> = data => {
        login(data).then(res => {
            if(res.data?.resultCode === ResultCode.Success){
                dispatch(setIsLoggedInAC({ isLoggedIn: true }))
                localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                reset()
            }
        })
    }
    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To login get registered
                            <a
                                style={{color: theme.palette.primary.main, marginLeft: '5px'}}
                                href='https://social-network.samuraijs.com'
                                target='_blank'
                                rel='noreferrer'
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin='normal'
                            error={!!errors.email}
                            {...register('email')} />
                        {errors.email && (<span className={styles.errorMessage}>{errors.email.message}</span>)}
                        <TextField type='password'
                                   label='Password'
                                   margin='normal'
                                   {...register('password')}/>
                        {errors.password && (<span className={styles.errorMessage}>{errors.password.message}</span>)}
                        <FormControlLabel
                            label='Remember me'
                            control={
                                <Controller
                                    name={'rememberMe'}
                                    control={control}
                                    render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                                />
                            }
                            />
                        <Button type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    )
}
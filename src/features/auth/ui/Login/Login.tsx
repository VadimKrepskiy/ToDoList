import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material'
import {getTheme} from '@/common/theme'
import {useAppSelector} from '@/common/hooks'
import {selectThemeMode} from '@/app/app-slice'
import Button from '@mui/material/Button'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import styles from './Login.module.css'

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false } })

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        reset()
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
                            {...register('email',{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,4}$/,
                                    message: 'Incorrect email address',
                                },
                            })} />
                        {errors.email && (<span className={styles.errorMessage}>{errors.email.message}</span>)}
                        <TextField type='password' label='Password' margin='normal' {...register('password')}/>
                        <FormControlLabel
                            label='Remember me'
                            control={
                                <Controller
                                    name={'rememberMe'}
                                    control={control}
                                    render={({ field: { value, onChange}}) => (
                                        <Checkbox onChange={e => onChange(e.target.value)} checked={value} />
                                    )}
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

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}
import {ChangeEvent, useState} from 'react'
import {TextField} from '@mui/material'

type Props = {
    value: string
    onChange: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = ({value, onChange, disabled}: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <>
            {isEditMode ? (
                <TextField variant={'outlined'}
                           value={title}
                           size={'small'}
                           onBlur={turnOffEditMode}
                           onChange={changeTitle}
                           autoFocus
                           disabled={disabled}/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>)
            }
        </>
    )
}
import {IconButton, TextField} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import {ChangeEvent, type KeyboardEvent, useState} from 'react';

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    const onCreateItemHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
        } else {
            setError('Title is required');
        }
    }
    const createItemTitleOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onCreateItemHandler()
        }
    }

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={title}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemTitleOnEnterHandler}/>
            <IconButton onClick={onCreateItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}
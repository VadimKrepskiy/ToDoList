import {Button} from './Button';
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
            <input className={error ? 'error' : ''} value={title} onChange={changeItemTitleHandler}
                   onKeyDown={createItemTitleOnEnterHandler}/>
            <Button title={'+'} onClick={onCreateItemHandler}/>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}
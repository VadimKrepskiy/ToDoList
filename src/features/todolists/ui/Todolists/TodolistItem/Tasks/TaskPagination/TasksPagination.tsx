import {Pagination, Typography} from '@mui/material'
import {ChangeEvent} from 'react'
import {PAGE_SIZE} from '@/common/constants'
import styles from './TasksPagination.module.css'

type Props = {
    totalCount: number
    page: number
    setPage: (page: number) => void
}

export const TasksPagination = ({totalCount, page, setPage}: Props) => {
    const changePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <>
            <Pagination
                count={Math.ceil(totalCount / PAGE_SIZE)}
                page={page}
                onChange={changePage}
                shape='rounded'
                color='primary'
                className={styles.pagination}
            />
            <div className={styles.totalCount}>
                <Typography variant='caption'>Total: {totalCount}</Typography>
            </div>
        </>
    )
}
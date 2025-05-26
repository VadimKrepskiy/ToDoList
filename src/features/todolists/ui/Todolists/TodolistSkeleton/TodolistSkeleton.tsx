import {Box, Paper, Skeleton} from '@mui/material'
import styles from './TodolistSkeleton.module.css'
import {containerSx} from '@/common/styles'

export const TodolistSkeleton = () => (
    <Paper className={styles.container}>
        <div className={styles.title}>
            <Skeleton width={150} height={150} />
            <Skeleton width={20} height={40} />
        </div>
        <div className={styles.createItemForm}>
            <Skeleton width={230} height={60} />
            <Skeleton width={20} height={20} />
        </div>
        {Array(4)
            .fill(null)
            .map((_, id) => (
                <Box key={id} sx={containerSx}>
                    <div className={styles.tasks}>
                        <Skeleton width={20} height={40}/>
                        <Skeleton width={150} height={40}/>
                    </div>
                    <Skeleton width={20} height={40} />
                </Box>
            ))}
        <Box sx={containerSx}>
            {Array(3)
                .fill(null)
                .map((_, id) => (
                    <Skeleton key={id} width={80} height={60} />
                ))}
        </Box>
    </Paper>
)
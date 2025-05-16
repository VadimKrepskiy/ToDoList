import {RootState} from '@/app'
import {TasksState} from '@/app'

export const selectTasks = (state: RootState): TasksState => state.tasks
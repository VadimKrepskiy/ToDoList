import {RootState} from '@/app/store/store'
import {TasksState} from '@/app/App'

export const selectTasks = (state: RootState): TasksState => state.tasks
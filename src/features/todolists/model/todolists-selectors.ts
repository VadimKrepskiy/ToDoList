import {RootState} from '@/app/store'
import {Todolist} from '@/features/todolists/ui'

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
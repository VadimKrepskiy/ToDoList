import {RootState} from '@/app/store/store'
import {Todolist} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem'

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
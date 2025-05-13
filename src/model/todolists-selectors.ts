import {RootState} from '@/app/store/store'
import {Todolist} from '@/TodolistItem';

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
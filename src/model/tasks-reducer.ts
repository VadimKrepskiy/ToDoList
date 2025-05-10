import {Task, TasksState} from '../App.tsx';
import {CreateTodolistAction, DeleteTodolistAction} from './todolists-reducer.ts';
import {v1} from 'uuid';

const intiialState: TasksState = {}

export const tasksReducer = (state: TasksState = intiialState, action: Actions) : TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = state
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
        }
        case 'create_task': {
            const newTask: Task = { id: action.payload.id, title: action.payload.title, isDone: false }
            return {...state, [action.payload.todolistId]: [newTask,...state[action.payload.todolistId]]}
        }
        case 'change_task_status': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)}
        }
        case 'change_task_title': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        }
        default: {
            return state
        }
    }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return { type: 'delete_task', payload: {...payload } } as const
}

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
    return { type: 'create_task', payload: {...payload, id: v1()} } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return { type: 'change_task_status', payload: {...payload}} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return { type: 'change_task_title', payload: {...payload}} as const
}

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

type CreateTaskAction = ReturnType<typeof createTaskAC>

type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction
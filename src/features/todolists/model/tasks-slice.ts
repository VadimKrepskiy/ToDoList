import {TasksState} from '@/app'
import {createSlice, nanoid} from '@reduxjs/toolkit'
import {createTodolistTC, deleteTodolistTC} from '@/features/todolists/model'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    selectors: {
        selectTasks: state => state,
    },
    extraReducers: builder => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
    reducers: create => ({
        createTaskAC: create.reducer<{todolistId: string, title: string}>((state, action) => {
            const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        }),
        deleteTaskAC: create.reducer<{todolistId: string, taskId: string}>((state, action)=>{
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if(index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        }),
        changeTaskTitleAC: create.reducer<{todolistId: string, taskId: string, title: string}>((state, action)=>{
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if(task){
                task.title = action.payload.title
            }
        }),
        changeTaskStatusAC: create.reducer<{todolistId: string, taskId: string, isDone: boolean}>((state, action)=>{
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if(task){
                task.isDone = action.payload.isDone
            }
        }),
    }),
})

export const {createTaskAC,deleteTaskAC,changeTaskTitleAC,changeTaskStatusAC} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors
import {RootState, setAppStatusAC, TasksState} from '@/app'
import {createTodolistTC, deleteTodolistTC} from '@/features/todolists/model'
import {createAppSlice} from '@/common/utils'
import {tasksApi} from '@/features/todolists/api/tasksApi.ts'
import {UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts'
import {TaskStatus} from '@/common/enums'

export const tasksSlice = createAppSlice({
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
            fetchTasksTC: create.asyncThunk(
                async (todolistId: string, { dispatch, rejectWithValue }) => {
                    try {
                        dispatch(setAppStatusAC({ status: 'loading' }))
                        const res = await tasksApi.getTasks(todolistId)
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return {todolistId, tasks: res.data.items}
                    } catch (error) {
                        dispatch(setAppStatusAC({ status: 'failed' }))
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todolistId] = action.payload.tasks
                    }
                }
            ),
            createTaskTC: create.asyncThunk(
                async (payload: { todolistId: string; title: string }, thunkAPI) => {
                    try {
                        const res = await tasksApi.createTask(payload)
                        return { task: res.data.data.item }
                    } catch (error) {
                        return thunkAPI.rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.task.todoListId].unshift(action.payload.task)
                    },
                }
            ),
            deleteTaskTC: create.asyncThunk(
                async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
                    try {
                        dispatch(setAppStatusAC({ status: 'loading' }))
                        await tasksApi.deleteTask(payload)
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return payload
                    } catch (error) {
                        dispatch(setAppStatusAC({ status: 'failed' }))
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const tasks = state[action.payload.todolistId]
                        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                        if (index !== -1) {
                            tasks.splice(index, 1)
                        }
                    },
                }
            ),
            changeTaskStatusTC: create.asyncThunk(
                async (payload: { todolistId: string; taskId: string, status: TaskStatus }, { getState, dispatch, rejectWithValue }) => {
                    const {todolistId, taskId, status} = payload

                    const allTodolistTasks = (getState() as RootState).tasks[todolistId]
                    const task = allTodolistTasks.find(task => task.id === taskId)

                    if (!task) {
                        dispatch(setAppStatusAC({ status: 'failed' }))
                        return rejectWithValue(null)
                    }

                    const model: UpdateTaskModel = {
                        description: task.description,
                        title: task.title,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                        status,
                    }

                    try {
                        dispatch(setAppStatusAC({ status: 'loading' }))
                        const res = await tasksApi.updateTask({todolistId, taskId, model})
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { task: res.data.data.item }
                    } catch (error) {
                        dispatch(setAppStatusAC({ status: 'failed' }))
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                        if (task) {
                            task.status = action.payload.task.status
                        }
                    },
                }
            ),
            changeTaskTitleTC: create.asyncThunk(
                async (payload: { todolistId: string; taskId: string, title: string }, { getState, dispatch, rejectWithValue }) => {
                    const {todolistId, taskId, title} = payload

                    const allTodolistTasks = (getState() as RootState).tasks[todolistId]
                    const task = allTodolistTasks.find(task => task.id === taskId)

                    if (!task) {
                        dispatch(setAppStatusAC({ status: 'failed' }))
                        return rejectWithValue(null)
                    }

                    const model: UpdateTaskModel = {
                        description: task.description,
                        status: task.status,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                        title,
                    }

                    try {
                        dispatch(setAppStatusAC({ status: 'loading' }))
                        const res = await tasksApi.updateTask({todolistId, taskId, model})
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { task: res.data.data.item }
                    } catch (error) {
                        dispatch(setAppStatusAC({ status: 'failed' }))
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                        if (task) {
                            task.title = action.payload.task.title
                        }
                    },
                }
            ),
        }),
    }
)

export const {fetchTasksTC, createTaskTC, deleteTaskTC, changeTaskTitleTC, changeTaskStatusTC} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors
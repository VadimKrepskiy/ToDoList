import {RootState} from '@/app/store'
import {setAppStatusAC} from '@/app/app-slice'
import {TasksState} from '@/app/App'
import {createTodolistTC, deleteTodolistTC} from '@/features/todolists/model'
import {createAppSlice} from '@/common/utils'
import {tasksApi} from '@/features/todolists/api/tasksApi.ts'
import {DomainTaskSchema, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts'
import {ResultCode} from '@/common/enums'
import {handleServerAppError} from '@/common/utils/handleServerAppError'
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError'


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
                        const tasks = DomainTaskSchema.array().parse(res.data.items)
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return {todolistId, tasks}
                    } catch (error) {
                        console.log(error)
                        handleServerNetworkError(dispatch, error)
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
                async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
                    try {
                        dispatch(setAppStatusAC({ status: 'loading' }))
                        const res = await tasksApi.createTask(payload)
                        if(res.data.resultCode === ResultCode.Success)
                        {
                            dispatch(setAppStatusAC({ status: 'succeeded' }))
                            return { task: res.data.data.item }
                        }
                        else {
                            handleServerAppError(res.data,dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch,error)
                        return rejectWithValue(null)
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
                        const res = await tasksApi.deleteTask(payload)
                        if(res.data.resultCode === ResultCode.Success){
                            dispatch(setAppStatusAC({ status: 'succeeded' }))
                            return payload
                        } else {
                            handleServerAppError(res.data,dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
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
            updateTaskTC: create.asyncThunk(
                async (payload: {todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel>},
                       {getState, dispatch, rejectWithValue}) => {
                    const {todolistId, taskId, domainModel} = payload

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
                        status: task.status,
                        ...domainModel,
                    }
                    try {
                        dispatch(setAppStatusAC({status: 'loading'}))
                        const res = await tasksApi.updateTask({todolistId, taskId, model})
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(setAppStatusAC({status: 'succeeded'}))
                            return {task: res.data.data.item}
                        }
                        else {
                            handleServerAppError(res.data,dispatch)
                            return rejectWithValue(null)
                        }
                    }catch (error){
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const {todoListId, id} = action.payload.task
                        const taskIndex = state[todoListId].findIndex(t => t.id === id)
                        if(taskIndex !== -1) {
                            state[todoListId][taskIndex] = action.payload.task
                        }
                    }
                },
            ),
        }),
    }
)

export const {fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors
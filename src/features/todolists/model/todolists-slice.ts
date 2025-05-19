import {FilterValues} from '@/features/todolists/ui'
import {Todolist, todolistsApi} from '@/features/todolists/api'
import {createAppSlice} from '@/common/utils'
import {setAppStatusAC} from '@/app/app-slice'

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: state => state,
    },
    reducers: create => ({
        fetchTodolistsTC: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.getTodolists()
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return {todolists: res.data}
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload?.todolists.forEach(todolist => {
                        state.push({...todolist, filter: 'all'})
                    })
                }
            },
        ),
        createTodolistTC: create.asyncThunk(
            async (title: string, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.createTodolist(title)
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return {todolist: res.data.data.item}
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({...action.payload.todolist, filter: 'all'})
                }
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.deleteTodolist(id)
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { id }
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex(todolist => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                }
            },
        ),
        changeTodolistFilterTC: create.asyncThunk(
            async (payload: {id: string; filter: FilterValues}, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.changeTodolistFilter(payload)
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return payload
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const todolist = state.find(todolist => todolist.id === action.payload.id)
                    if (todolist) {
                        todolist.filter = action.payload.filter
                    }
                }
            },
        ),
        changeTodolistTitleTC: create.asyncThunk(
            async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.changeTodolistTitle(payload)
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return payload
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const todolist = state.find(todolist => todolist.id === action.payload.id)
                    if (todolist) {
                        todolist.title = action.payload.title
                    }
                }
            },
        )
    }),
})

export type DomainTodolist = Todolist & {
    filter: FilterValues,
}

export const {fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistFilterTC, changeTodolistTitleTC} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const {selectTodolists} = todolistsSlice.selectors

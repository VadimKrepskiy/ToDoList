import {FilterValues} from '@/features/todolists/ui'
import {Todolist, todolistsApi} from '@/features/todolists/api'
import {createAppSlice} from '@/common/utils'
import {setAppStatusAC} from '@/app/app-slice'
import {RequestStatus} from '@/common/types'

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
                        state.push({...todolist, filter: 'all', entityStatus: 'idle'})
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
                    state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
                }
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    dispatch(changeTodolistStatusAC({id, entityStatus: 'loading'}))
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
        ),
        changeTodolistStatusAC: create.reducer<{id: string; entityStatus: RequestStatus}>((state, action) => {
            const todolist = state.find(t => t.id === action.payload.id)
            if(todolist){
                todolist.entityStatus = action.payload.entityStatus
            }
        })
    }),
})

export type DomainTodolist = Todolist & {
    filter: FilterValues,
    entityStatus: RequestStatus,
}

export const {fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistFilterTC, changeTodolistTitleTC, changeTodolistStatusAC} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const {selectTodolists} = todolistsSlice.selectors

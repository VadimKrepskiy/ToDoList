import {FilterValues} from '@/features/todolists/ui'
import {Todolist, todolistsApi} from '@/features/todolists/api'
import {createAppSlice} from '@/common/utils'
import {setAppStatusAC} from '@/app'

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
            async (title: string, thunkAPI) => {
                try {
                    const res = await todolistsApi.createTodolist(title)
                    return {todolist: res.data.data.item}
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.push({...action.payload.todolist, filter: 'all'})
                }
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, thunkAPI) => {
                try {
                    await todolistsApi.deleteTodolist(id)
                    return { id }
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
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
            async (payload: {id: string; filter: FilterValues}, thunkAPI) => {
                try {
                    await todolistsApi.changeTodolistFilter(payload)
                    return payload
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
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
            async (payload: { id: string; title: string }, thunkAPI) => {
                try {
                    await todolistsApi.changeTodolistTitle(payload)
                    return payload
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
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

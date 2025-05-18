import {FilterValues} from '@/features/todolists/ui'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Todolist, todolistsApi} from '@/features/todolists/api'

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: state => state,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(todolist => {
                    return {...todolist, filter: 'all', entityStatus: 'idle'}
                })
            })
            .addCase(fetchTodolistsTC.rejected, (state, action) => {

            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.push({...action.payload.todolist, filter: 'all'})
            })
            .addCase(createTodolistTC.rejected, (state, action) => {

            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(deleteTodolistTC.rejected, (state, action) => {

            })
            .addCase(changeTodolistFilterTC.fulfilled, (state, action) => {
                const todolist = state.find(todolist => todolist.id === action.payload.id)
                if (todolist) {
                    todolist.filter = action.payload.filter
                }
            })
            .addCase(changeTodolistFilterTC.rejected, (state, action) => {

            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const todolist = state.find(todolist => todolist.id === action.payload.id)
                if (todolist) {
                    todolist.title = action.payload.title
                }
            })
            .addCase(changeTodolistTitleTC.rejected, (state, action) => {

            })
    },
    reducers: create => ({
    }),
})

export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_, thunkAPI) => {
        try {
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (title: string, thunkAPI) => {
        try {
            const res = await todolistsApi.createTodolist(title)
            return {todolist: res.data.data.item}
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (id: string, thunkAPI) => {
        try {
            await todolistsApi.deleteTodolist(id)
            return { id }
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export const changeTodolistFilterTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistFilterTC`,
    async (payload: {id: string; filter: FilterValues}, thunkAPI) => {
        try {
            await todolistsApi.changeTodolistFilter(payload)
            return payload
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (payload: { id: string; title: string }, thunkAPI) => {
        try {
            await todolistsApi.changeTodolistTitle(payload)
            return payload
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export type DomainTodolist = Todolist & {
    filter: FilterValues,
}

export const todolistsReducer = todolistsSlice.reducer

export const {selectTodolists} = todolistsSlice.selectors

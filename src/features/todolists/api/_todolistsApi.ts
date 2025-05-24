import {instance} from '@/common/instance/instance'
import {Todolist} from '@/features/todolists/api/todolistsApi.types'
import {BaseResponse} from '@/common/types'


import {baseApi} from '@/app/baseApi.ts'
import {DomainTodolist, FilterValues} from '@/features/todolists/lib/types'

export const _todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{item: Todolist}>>('/todo-lists', {title})
    },
    deleteTodolist(id: string){
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    changeTodolistTitle(payload: {id: string, title: string}) {
        const { id, title } = payload
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    },
    changeTodolistFilter(payload: {id: string, filter: FilterValues}) {
        const { id, filter } = payload
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {filter})
    }
}

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
                todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'})),
            providesTags: ['Todolist']
        }),
        addTodolist: build.mutation<BaseResponse<{ item: Todolist}>, string>({
            query: (title) => ({
                url: 'todo-lists',
                method: 'POST',
                body: { title }
            }),
            invalidatesTags: ['Todolist']
        }),
        removeTodolist: build.mutation<BaseResponse, string>({
            query: (id) => ({
                url: `todo-lists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTodolistTitle: build.mutation<BaseResponse, {id: string; title: string}>({
            query: ({ id, title }) => ({
                url: `todo-lists/${id}`,
                method: 'PUT',
                body: { title },
            }),
            invalidatesTags: ['Todolist']
        })
    })
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} = todolistsApi
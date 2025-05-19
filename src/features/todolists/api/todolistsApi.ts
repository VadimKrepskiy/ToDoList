import {instance} from '@/common/instance/instance'
import {Todolist} from '@/features/todolists/api/todolistsApi.types'
import {BaseResponse} from '@/common/types'
import {FilterValues} from '@/features/todolists/ui'

export const todolistsApi = {
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
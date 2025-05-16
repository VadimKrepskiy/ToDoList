import {instance} from '@/common/instance'
import {DomainTask, GetTasksResponse} from '@/features/todolists/api/tasksApi.types'
import {BaseResponse} from '@/common/types'

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: {todolistId: string, title: string}){
        const {todolistId, title} = payload
        return instance.post<BaseResponse<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: {todolistId: string, taskId: string}){
        const {todolistId, taskId} = payload
        return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

}
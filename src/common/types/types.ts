export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<T = {}> = {
    data: T
    fieldsErrors: FieldError[]
    message: string[]
    resultCode: number
}
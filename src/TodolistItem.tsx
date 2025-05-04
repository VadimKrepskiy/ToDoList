export type Task = {
    id: number
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: Task[]
    date?: string
}

export const TodolistItem = ({title, tasks, date}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? <p>Тасок нет</p> : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{date}</div>
        </div>
    )
}
import { useEffect, useState } from 'react'

import TaskListItem from './task-list-item'
import styles from './tasks-list.module.css'

type TaskStatus = {
  id: string
  name: string
}

type Task = {
  id: string
  description: string
  createdAt: Date
  updatedAt: Date
  status: TaskStatus
}

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleLoadTasks = async () => {
    const response = await fetch('http://localhost:8080/task', {
      headers: {
        Accept: "application/json",
      },
    }) 
    const body = await response.json()
    const tasks = body.tasks.map((task: any) => ({
      id: task.id,
      description: task.description,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      status: {
        id: task.status.id,
        name: task.status.name,
      }
    }))
    setTasks(tasks)
  }

  useEffect(() => {
    handleLoadTasks()
  }, [])
  
  return (
    <ul className={styles.container}>
      {
        tasks.map((task: Task) => (
          <TaskListItem
            key={task.id} 
            task={task} />
        ))
      }
    </ul>
  )
}

export default TasksList
'use client'

import { useEffect, useState } from "react"

import styles from './page.module.css'

import TaskItem from './task-item'

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

const ListTasks = () => {
  
  const [tasks, setTasks] = useState<Task[]>([])

  const handleLoadTasks = async () => {
    const response = await fetch('http://localhost:8080/task', {
      headers: {
        Accept: "application/json",
      },
    }) 
    const body = await response.json()
    const tasks = body.tasks
    setTasks(tasks)
    console.log(tasks);
    
  }

  useEffect(() => {
    (async () => {
      await handleLoadTasks()
    })()
  }, [])
  
  return (
    <div className={styles.container}>
      <ul  className={styles.tasks_list}>
        {
          tasks.map((task: Task) => (
            <TaskItem
              key={task.id} 
              task={task} />
          ))
        }
      </ul>
    </div>
  )
}

export default ListTasks
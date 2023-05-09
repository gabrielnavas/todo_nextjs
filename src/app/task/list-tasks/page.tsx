'use client'

import { useEffect, useState } from "react"

type TaskStatus = {
  id: string
  name: string
}

type Task = {
  id: string
  description: string
  creadtedAt: Date
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
  }

  useEffect(() => {
    (async () => {
      await handleLoadTasks()
    })()
  }, [])
  
  return (
    <div>
      <ul>
        {
          tasks.map((task: Task) => <li key={task.id}>{task.description}</li>)
        }
      </ul>
    </div>
  )
}

export default ListTasks
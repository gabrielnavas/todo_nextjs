'use client'
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './page.module.css'

export const statusTypeName = {
	TASK_STATUS_TODO: "todo",
	TASK_STATUS_DOING: "doing",
	TASK_STATUS_FINISH: "finish"
}

export type Status = {
  id: string
  name: string
}

export type Task = {
  id: string 
  description: string 
  createdAt: Date 
  updatedAt: Date 
  status: Status 
}

const NewTask = () => {
  const [taskName, setTaskName] = useState("")
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null)
  const router = useRouter();

  useEffect(() => {
    const taskStr = localStorage.getItem('task')
    if(taskStr) {
      setTaskToUpdate(JSON.parse(taskStr))
    }
  }, [])

  const handleCreateTask = async () => {
    const payload = {
      description: taskName
    }
    const response = await fetch('http://localhost:8080/task', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },  
      body: JSON.stringify(payload),
    })
    if(response.status >= 200 && response.status < 299) {
      router.back()    
    }
    else if(response.status >= 400 && response.status <= 499) {
      const body = await response.json()
      alert(body.message)
    }   
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Descrição</label>
            <textarea className={styles.form_description} value={taskName} onChange={e => setTaskName(e.target.value)}></textarea>
          </div>
          <button type="button" className={`${styles.form_button} ${styles.form_button_confirm}`} onClick={handleCreateTask}>Adicionar task</button>
          <button type="button" className={`${styles.form_button} ${styles.form_button_cancel}`} onClick={() => router.back()}>Voltar</button>
        </form>
      </div>
    </div>
  )
}

export default NewTask
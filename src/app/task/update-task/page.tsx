'use client'
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './page.module.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { AiOutlineArrowUp, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

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

const UpdateTask = () => {
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null)
  const router = useRouter();

  const [statusColor, setStatusColor] = useState("")

  let iconStatus: JSX.Element | null = null

  useEffect(() => {
    const taskStr = localStorage.getItem('task')
    if(taskStr) {
      setTaskToUpdate(JSON.parse(taskStr))
      if(taskToUpdate?.status.name == statusTypeName.TASK_STATUS_TODO) {
        setStatusColor('#2cae53')
        iconStatus = <AiOutlineArrowUp color='#2cae53' />
      }
      if(taskToUpdate?.status.name == statusTypeName.TASK_STATUS_DOING) {
        setStatusColor('#db2a2a')
        iconStatus = <AiOutlineCheckCircle color='#db2a2a' />
      }
      if(taskToUpdate?.status.name == statusTypeName.TASK_STATUS_FINISH) {
        setStatusColor('#7C7C7C')
        iconStatus = <AiOutlineCloseCircle color='#7C7C7C' />
      }
    }
  }, [])

  const handleCreateTask = async () => {
    const payload = {
      description: taskToUpdate?.description
    }
    const response = await fetch('http://localhost:8080/task', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },  
      body: JSON.stringify(payload),
    })
    router.back()    
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.title}>
          Atualizar a tarefa
        </div>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Descrição</label>
            <textarea 
              className={styles.form_description} 
              value={taskToUpdate?.description} 
              onChange={e => setTaskToUpdate(taskToUpdate && {...taskToUpdate, description: e.target.value})}></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Alterar status</label>
            <div className={styles.button_status_container}>
              <button className={styles.button_status}>
                <span className={styles.button_status_icon}>
                  {iconStatus}
                </span>
                <span className={styles.button_status_text} style={{
                  color: statusColor
                }}>
                  {taskToUpdate?.status.name}
                </span>
              </button>
            </div>
          </div>
          <div className={styles.left_dates}>
            <span className={styles.date}>
              Criado em {formatDistanceToNow(new Date(Date.now() - 50000))}
            </span>
            <span className={styles.date}>
              Atualizado em {formatDistanceToNow(new Date(Date.now() - 50000))}
            </span>
          </div>
          <button type="button" className={`${styles.form_button} ${styles.form_button_confirm}`} onClick={handleCreateTask}>Adicionar task</button>
          <button type="button" className={`${styles.form_button} ${styles.form_button_cancel}`} onClick={() => router.back()}>Voltar</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask
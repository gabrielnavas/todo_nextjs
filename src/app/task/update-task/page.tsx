'use client'
import { useEffect, useState } from 'react';

import { ptBR } from 'date-fns/locale';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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

type StatusSelected = "now" | "toUpdate"

export type Task = {
  id: string 
  description: string 
  createdAt: Date 
  updatedAt: Date 
  status: Status 
}

const UpdateTask = () => {
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null)

  const [description, setDescription] = useState("")

  const [statusSelected, setStatusSelected] = useState<StatusSelected>("now")

  const [statusToUpdate, setStatusToUpdate] = useState<string>("")
  const [statusNow, setStatusNow] = useState<string>("")

  const [statusNowRender, setStatusNowRender] = useState<string>("")
  const [statusToUpdateRender, setStatusToUpdateRender] = useState<string>("")


  
  const router = useRouter();

  useEffect(() => {

    const taskStr = localStorage.getItem('task')
    
    if(!taskStr) {
      return
    }
    const task: Task = JSON.parse(taskStr)
    task.createdAt = new Date(task.createdAt)
    task.updatedAt = new Date(task.updatedAt)

    setTaskToUpdate(task)
    setDescription(task.description)

    if(task.status.name === statusTypeName.TASK_STATUS_TODO) {
      setStatusNowRender("A fazer")
      setStatusToUpdateRender("Fazendo")
      setStatusToUpdate(statusTypeName.TASK_STATUS_DOING)
      setStatusNow(statusTypeName.TASK_STATUS_TODO)
    }
    else if(task.status.name === statusTypeName.TASK_STATUS_DOING) {
      setStatusNowRender("Fazendo")
      setStatusToUpdateRender("Finalizado")
      setStatusToUpdate(statusTypeName.TASK_STATUS_FINISH)
      setStatusNow(statusTypeName.TASK_STATUS_DOING)
    }
    else if(task.status.name === statusTypeName.TASK_STATUS_FINISH) {
      setStatusNowRender("Finalizado")
      setStatusToUpdateRender("Fazendo")
      setStatusToUpdate(statusTypeName.TASK_STATUS_DOING)
      setStatusNow(statusTypeName.TASK_STATUS_FINISH)
    }
  }, [])

  const handleUpdateTask = async () => {

    const payload = {
      description,
      status: {
        name: statusSelected === "now" ? statusNow : statusToUpdate 
      }
    }
    const response = await fetch(`http://localhost:8080/task/${taskToUpdate.id}`, {
      method: 'PUT',
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
        <div className={styles.title}>
          Atualizar a tarefa
        </div>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Descrição</label>
            <textarea 
              id="description"
              className={styles.form_description} 
              value={description} 
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
          <label className={styles.form_label}>Status</label>
          <div className={styles.status_container}>
            <div className={styles.radio_group}>
              <input type='radio' name="status" value="status_now" className={styles.status_container_radio} checked={statusSelected === "now"} onChange={() => setStatusSelected("now")} />
              <label htmlFor='status_now' className={styles.status_container_label} onClick={() => setStatusSelected("now")}>Status atual: {statusNowRender}</label>
            </div>
            <div className={styles.radio_group}>
              <input type='radio' name="status" value="status_to_update" className={styles.status_container_radio} checked={statusSelected === "toUpdate"} onChange={() => setStatusSelected("toUpdate")} />
              <label htmlFor="status_to_update" className={styles.status_container_label} onClick={() => setStatusSelected("toUpdate")}>Alterar para: {statusToUpdateRender}</label>
            </div>
          </div>
          </div>
          <div className={styles.left_dates}>
            <span className={styles.date}>
              Criado em { taskToUpdate && formatDistanceToNow(taskToUpdate.createdAt, { locale: ptBR }) }
            </span>
            <span className={styles.date}>
              Atualizado em { taskToUpdate && formatDistanceToNow(taskToUpdate.updatedAt, { locale: ptBR }) }
            </span>
          </div>
          <button type="button" className={`${styles.form_button} ${styles.form_button_confirm}`} onClick={handleUpdateTask}>Atualizar</button>
          <button type="button" className={`${styles.form_button} ${styles.form_button_cancel}`} onClick={() => router.back()}>Voltar</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask
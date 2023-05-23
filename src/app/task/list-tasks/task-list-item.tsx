import { useState } from 'react'

import { useRouter } from 'next/navigation';

import { ptBR } from 'date-fns/locale';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { AiOutlineClose } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr'

import styles from './task-list-item.module.css'

import ModalDeleteItemList from './modal-delete-list-item';

const statusTypeName = {
	TASK_STATUS_TODO: "todo",
	TASK_STATUS_DOING: "doing",
	TASK_STATUS_FINISH: "finish"
}

type Status = {
  id: string
  name: string
}

type Task = {
  id: string 
  description: string 
  createdAt: Date 
  updatedAt: Date 
  status: Status 
}

type Props = {
  task: Task
  handleLoadTasks: () => void
}

const TaskListItem = (props: Props) => {
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false)

  const router = useRouter();

  const handleClickOnButtonEditItem = () => {
    localStorage.setItem('task', JSON.stringify(props.task))
    router.push('/task/update-task')
  }

  const handleRequestOnDeleteItem = async () => {
    const response = await fetch(`http://localhost:8080/task/${props.task.id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
      },
    }) 
    if(response.status >= 200 && response.status <= 299) {
      return null
    }
    const body = await response.json()
    return body.message
  }

  const handleToggleModal = () => setModalRemoveIsOpen(!modalRemoveIsOpen)

  const handleConfirmDeleteItem = async () => {
    const errorMessage = await handleRequestOnDeleteItem()
    if(errorMessage) {
      alert(errorMessage)
      return
    } 
    props.handleLoadTasks()
    handleToggleModal()
  }

  const handleCancelDeleteItem = () => {
    handleToggleModal()
  }

  return (
    <li className={styles.container}>
      <div className={styles.left}>
      <span className={styles.description}>{props.task.description}</span>
      <div className={styles.left_dates}>
        <span className={styles.date}>
          Criado há {formatDistanceToNow(props.task.createdAt, { locale: ptBR })}
        </span>
        <span className={styles.date}>
          Atualizado há {formatDistanceToNow(props.task.updatedAt, { locale: ptBR })}
        </span>
      </div>
      </div>
      <div className={styles.right}>
        <button 
          className={`${styles.button} ${styles.button_update}`} 
          onClick={() => handleClickOnButtonEditItem()}>
          <GrUpdate />
        </button>
        <button className={`${styles.button} ${styles.button_delete}`} onClick={handleToggleModal}>
          <span className={styles.button_icon}>
            <AiOutlineClose color='#db2a2a'/>
          </span>
          <span className={styles.button_delete_text}>
            Remover
          </span>
        </button>
        <ModalDeleteItemList 
          isOpen={modalRemoveIsOpen}
          onRequestClose={handleToggleModal}
          cancelDeleteItem={handleCancelDeleteItem}
          confirmDeleteItem={handleConfirmDeleteItem}
        />
      </div>
    </li>
  )
}

export default TaskListItem
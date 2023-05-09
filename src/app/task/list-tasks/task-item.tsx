import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';

import styles from './task-item.module.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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


type Props = {
  task: Task
}

const TaskItem = (props: Props) => {
  
  const [statusColor, setStatusColor] = useState("")
  const router = useRouter();

  let iconStatus: JSX.Element | null = null

  useEffect(() => {
    if(props.task.status.name == statusTypeName.TASK_STATUS_TODO) {
      setStatusColor('#2cae53')
      iconStatus = <AiOutlineArrowUp color='#2cae53' />
    }
    if(props.task.status.name == statusTypeName.TASK_STATUS_DOING) {
      setStatusColor('#db2a2a')
      iconStatus = <AiOutlineCheckCircle color='#db2a2a' />
    }
    if(props.task.status.name == statusTypeName.TASK_STATUS_FINISH) {
      setStatusColor('#7C7C7C')
      iconStatus = <AiOutlineCloseCircle color='#7C7C7C' />
    }
  }, [])

  const handlerClickOnItem = () => {
    console.log(JSON.stringify(props.task));
    localStorage.setItem('task', JSON.stringify(props.task))
    router.push('/task/update-task')
  }


  return (
    <li className={styles.container} 
      onClick={() => handlerClickOnItem()}>
      <div className={styles.left}>
      <span className={styles.description}>{props.task.description}</span>
      <div className={styles.left_dates}>
        <span className={styles.date}>
          Criado em {formatDistanceToNow(new Date(Date.now() - 50000))}
        </span>
        <span className={styles.date}>
          Atualizado em {formatDistanceToNow(new Date(Date.now() - 50000))}
        </span>
      </div>
      </div>
      <div className={styles.right}>
        <button className={styles.button}>
          <span className={styles.button_icon}>
            <AiOutlineArrowUp color={statusColor} />
          </span>
          <span className={styles.button_text} style={{
            color: statusColor
          }}>
            {props.task.status.name}
          </span>
        </button>
      </div>
    </li>
  )
}

export default TaskItem
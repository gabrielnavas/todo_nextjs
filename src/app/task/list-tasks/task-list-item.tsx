import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';

import styles from './task-list-item.module.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ptBR } from 'date-fns/locale';

import { 
  AiOutlineArrowUp, 
  AiOutlineCheckCircle, 
  AiOutlineCloseCircle,
  AiOutlineClose
} from 'react-icons/ai';

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

const TaskListItem = (props: Props) => {
  
  const [statusColor, setStatusColor] = useState("")
  const [iconStatus, setIconStatus] = useState<JSX.Element | null>(null)
  
  const router = useRouter();

  useEffect(() => {
    if(props.task.status.name == statusTypeName.TASK_STATUS_TODO) {
      setStatusColor('#2cae53')
      setIconStatus(<AiOutlineArrowUp color='#2cae53' />)
    }
    if(props.task.status.name == statusTypeName.TASK_STATUS_DOING) {
      setStatusColor('#db2a2a')
      setIconStatus(<AiOutlineCheckCircle color='#db2a2a' />)
    }
    if(props.task.status.name == statusTypeName.TASK_STATUS_FINISH) {
      setStatusColor('#7C7C7C')
      setIconStatus(<AiOutlineCloseCircle color='#7C7C7C' />)
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
          Criado há {formatDistanceToNow(props.task.createdAt, { locale: ptBR })}
        </span>
        <span className={styles.date}>
          Atualizado há {formatDistanceToNow(props.task.updatedAt, { locale: ptBR })}
        </span>
      </div>
      </div>
      <div className={styles.right}>
        <button className={styles.button} style={{}}>
          <span className={styles.button_icon}>
            {iconStatus}
          </span>
          <span className={styles.button_text} style={{
            color: statusColor
          }}>
            {props.task.status.name}
          </span>
        </button>
        <button className={`${styles.button} ${styles.button_delete}`}>
          <span className={styles.button_icon}>
            <AiOutlineClose color='#db2a2a'/>
          </span>
          <span className={styles.button_delete_text}>
            Remover
          </span>
        </button>
      </div>
    </li>
  )
}

export default TaskListItem
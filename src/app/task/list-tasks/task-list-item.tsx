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

  const handleClickOnButtonEditItem = () => {
    localStorage.setItem('task', JSON.stringify(props.task))
    router.push('/task/update-task')
  }

  const handleOnClickButtonDeleteItem = async () => {
    const response = await fetch(`http://localhost:8080/task/${props.task.id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
      },
    }) 
    if(response.status >= 200 && response.status <= 299) {
      props.handleLoadTasks()
      return
    }
    const body = await response.json()
    alert(body.message)
  }

  return (
    <li className={styles.container}>
      <div className={styles.left} onClick={() => handleClickOnButtonEditItem()}>
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
        <button className={`${styles.button} ${styles.button_delete}`} onClick={handleOnClickButtonDeleteItem}>
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
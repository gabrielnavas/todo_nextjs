import styles from './task-list-item-empty.module.css'


const TaskListItemEmpty = () => {
  return (
    <li className={styles.container}>
      <div className={styles.left}>
        <span className={styles.description}>Nenhuma tarefa encontrada</span>
      </div>
    </li>
  )
}

export default TaskListItemEmpty
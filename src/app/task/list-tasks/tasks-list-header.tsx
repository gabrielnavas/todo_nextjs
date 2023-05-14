import ButtonNewTask from './button-new-task'
import styles from './tasks-list-header.module.css'

const TasksListHeader = () => {
  return (
    <div className={styles.container}>
      <ButtonNewTask />
    </div>
  )
}

export default TasksListHeader
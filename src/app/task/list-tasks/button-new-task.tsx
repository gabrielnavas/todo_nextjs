import Link from 'next/link'
import styles from './button-new-task.module.css'

const ButtonNewTask = () => {
  return (
    <Link href='task/new-task'>
      <button className={styles.container}>Nova Task</button>
    </Link>
  )
}

export default ButtonNewTask
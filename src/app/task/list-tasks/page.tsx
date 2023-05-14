'use client'

import styles from './page.module.css'

import TasksList from "./tasks-list"
import TasksListHeader from "./tasks-list-header"



const ListTasks = () => {
  
 
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <TasksListHeader />
        <TasksList />
      </div>
    </div>
  )
}

export default ListTasks
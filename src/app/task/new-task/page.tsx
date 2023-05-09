'use client'

import { useRouter } from 'next/navigation';

import styles from './page.module.css'
import { useState } from 'react';

const NewTask = () => {
  const [taskName, setTaskName] = useState("")

  const router = useRouter();

  const handleCreateTask = async () => {
    const payload = {
      description: taskName
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
    <section className={styles.page}>
      <div className={styles.card}>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Descrição</label>
            <textarea className={styles.form_description} value={taskName} onChange={e => setTaskName(e.target.value)}></textarea>
          </div>
          <button type="button" className={`${styles.form_button} ${styles.form_button_confirm}`} onClick={handleCreateTask}>Adicionar task</button>
          <button type="button" className={`${styles.form_button} ${styles.form_button_cancel}`} onClick={() => router.back()}>Voltar</button>
        </form>
      </div>
    </section>
  )
}

export default NewTask
'use client'

import { useRouter } from 'next/navigation';

import styles from './page.module.css'

const NewTask = () => {
  const router = useRouter();

  const handleCreateTask = () => {

  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Descrição</label>
            <textarea className={styles.form_description}></textarea>
          </div>
          <button type="button" className={`${styles.form_button} ${styles.form_button_confirm}`} onClick={handleCreateTask}>Adicionar task</button>
          <button type="button" className={`${styles.form_button} ${styles.form_button_cancel}`} onClick={() => router.back()}>Voltar</button>
        </form>
      </div>
    </section>
  )
}

export default NewTask
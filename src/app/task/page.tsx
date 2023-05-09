'use client'

import { useRouter } from 'next/navigation';

import styles from './page.module.css'

const Page = () => {
  const router = useRouter();

  return (
    <section >
      <header>
        <ul>
          <li>
          <button onClick={() => router.push('/task/new-task')} >Adicionar</button>
          </li>
        </ul>
      </header>
      <body>
      </body>
    </section>
  )
}

export default Page
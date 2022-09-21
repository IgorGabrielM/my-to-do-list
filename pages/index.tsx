import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from "next/link";

const Home: NextPage = () => {
  return (
      <div>
          <div className={styles.header}>
              <div className={styles.buttons}>
                  <div className={styles.buttonHeader}>
                      <Link href='/auth' className={styles.buttonHeader}>
                          <a>Login</a>
                      </Link>
                  </div>
                  <div className={styles.buttonHeader}>
                      <Link href='/auth/createUser' className={styles.buttonHeader}>
                          <a>Criar conta</a>
                      </Link>
                  </div>
              </div>
          </div>
          <div className='flex justify-start ml-10 mt-10'>
              <h1 className="text-3xl font-bold underline">
                  Bem vindo, ao seu site de produtividade
              </h1>
              <div className={styles.backImage}>
                  <img src="/images/task-amico.png" alt="imagem de tarefas" className={styles.image}/>
              </div>
          </div>
      </div>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

const Home: NextPage = () => {
  return (
      <div>
          <h1 className="text-3xl font-bold underline">
            Hello world!
          </h1>
          <div className='w-14 text-center bg-indigo-500 rounded-md '>
              <Link href='/auth'>
                  <a>Login</a>
              </Link>
          </div>
      </div>
  )
}

export default Home

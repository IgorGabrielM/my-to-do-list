import styles from '../../styles/auth/login.module.css'
import {useForm} from "react-hook-form";
import {AuthModel} from "./models/auth.model";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Login(){
    const { register, handleSubmit } = useForm()
    const { signIn } = useContext(AuthContext)

    async function handleSignIn(data){
        await signIn(data)
        console.log(data)
    }

    return (
        <div className='flex h-screen w-screen'>
            <div className={styles.cardImageLogin}>
                <img src="/images/scrum-board-amico.png" alt="Imagem de scrum" className={styles.imageLogin} />
            </div>
            <div className={styles.cardLogin}>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className='flex justify-center mt-80'>
                        <input
                            { ...register('email') }
                            className={styles.inputLogin}
                            type="text"
                            name='email'
                            placeholder='Email'
                            autoComplete='email'
                            required
                        />
                    </div>
                    <div className='flex justify-center my-5'>
                        <input
                            { ...register('password') }
                            className={styles.inputLogin}
                            type="password"
                            name='password'
                            placeholder='Password'
                            autoComplete='password'
                            required
                        />
                    </div>
                    <div className='flex justify-center my-5'>
                        <button type='submit' className={styles.buttonSend}>Enviar</button>
                    </div>
                    <div className="flex justify-center my-5">
                        <Link href='auth/createUser'>
                            <a>Criar sua conta</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

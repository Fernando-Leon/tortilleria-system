'use server'
import { redirect } from 'next/navigation'

export const login = async (formData: FormData) => {

    const userNameCorrect = 'admin';
    const passwordCorrect = '123456';

    const userName = formData.get('username');
    const password = formData.get('password');

    console.log("userName", userName);
    console.log("password", password);

    if (!userName || !password) {
        return { error: 'Todos los campos son obligatorios.' };
    }

    if (userName === userNameCorrect && password === passwordCorrect) {
        redirect('/dashboard');
    }

    return { error: 'Usuario o contraseña incorrectos.' };
}
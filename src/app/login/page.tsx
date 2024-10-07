'use client'
import AlertComponent from "@/components/AlertComponent";
import ButtonLink from "@/components/ButtonLink";
import Navbar from "@/components/Navbar";
import { Alert, AlertIcon, AlertTitle, Container, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("O email é obrigatorio")
        .email("O email precisa ser válido"),
    password: Yup.string()
        .required("A senha é necessaria")
})

interface LoginInputs {
    email: string
    password: string
}

export default function Login() {
    const {register, handleSubmit, formState: {errors}}  = useForm<LoginInputs>({resolver: yupResolver(validationSchema)})
    const [error, setError] = useState("")
    const router = useRouter()

    const PostLogin = async (data: LoginInputs) => {
        try{
            const response = await fetch('https://ecoletar-backend.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            })

            const responseLogin = await response.json()
            sessionStorage.setItem('token', responseLogin.token)

            if (responseLogin.error) {
                setError("Email ou senha incorretos")
                return false
            }

            return true

        } catch (error) {
            console.error('Erro ao fazer login:', error)
        }
    }


    const onSubmit = async (data: LoginInputs) => {
        const responseLogin = await PostLogin(data)
        if (responseLogin === true) {
            router.push("/first-login")
        }
    }

    return (
        <main>
            <Navbar/>
            <header className="w-full h-[calc(100vh-80px)] flex items-center justify-center ">
               <Container className="relative">
               {Object.values(errors).reverse().map((error) => (
                    <Alert status="error" key={error.message} className="absolute -top-16 w-[95%] rounded-md">
                        <AlertIcon />
                        <AlertTitle>{error.message}</AlertTitle>
                    </Alert>
                ))}
                <AlertComponent text={error} type="error"/>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <Input {...register("email")} placeholder="Email" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("password")} type="password" placeholder="Senha" focusBorderColor="green.100" size="lg"/>
                        <ButtonLink type="submit">Enviar</ButtonLink>
                    </form>
                </Container> 
            </header>
        </main>
    )
}
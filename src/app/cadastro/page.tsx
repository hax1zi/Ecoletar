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
    name: Yup.string()
        .required("O nome é obrigatorio"),
    lastname: Yup.string()
        .required("O sobrenome é obrigatorio"),
    company_name: Yup.string()
        .required("O nome da empresa é obrigatorio "),
    email: Yup.string()
        .required("O email é obrigatorio")
        .email('O email precisa ser válido'),
    phone_number: Yup.string()
        .required("O número de telefone é obrigatorio")
        .min(11, "Formato do numero de telefone: DDD+número")
        .max(11, "o número de telefone ultrapassa a quantidade de caracteres"),
    password: Yup.string()
        .required('A senha é obrigatória')
        .min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    confirm_password: Yup.string()
        .required('A confirmação da senha é obrigatoria')
})

interface FormInputs {
    name: string
    lastname: string
    company_name: string
    email: string
    phone_number: string
    password: string
    confirm_password: string
}

export default function Cadastro() {
    const router = useRouter()
    const [successMessage, setSuccessMessage] = useState("")
    const [aditionalError, setAditionalError] = useState<string>("")
    const {register, handleSubmit, formState: { errors }} = useForm<FormInputs>({resolver: yupResolver(validationSchema)})

    const postForm = async (data: FormInputs) => {
        try {
            const response = await fetch('https://ecoletar-backend.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const responseForm = await response.json()
            
            if (responseForm.error === "Email ja cadastrado" ) {
                setAditionalError(responseForm.error)
                return false
            }
            
            setSuccessMessage(responseForm.message)
            return true
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error)
        }
    }

    const onSubmit = async (data: FormInputs) => {
        if (data.password != data.confirm_password) {
            setAditionalError("Senhas não são iguais")
        } else {
            setAditionalError("")
            const responseForm = await postForm(data)

            if (responseForm) {
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
            }
        }
        console.log(data)
    }

    return (
        <div>
            <Navbar/>
            <header className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
                <Container className="relative">
                {Object.values(errors).reverse().map((error) => (
                    <Alert status="error" key={error.message} className="absolute -top-16 w-[95%] rounded-md">
                        <AlertIcon />
                        <AlertTitle>{error.message}</AlertTitle> {/* Aqui estava ok */}
                    </Alert>
                ))}
                
                    <AlertComponent text={aditionalError} type="error"/>
                    <AlertComponent text={successMessage} type="success"/>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <Input {...register("name")} placeholder="Nome" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("lastname")} placeholder="Sobrenome" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("company_name")} placeholder="Nome da empresa" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("email")} placeholder="Email" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("phone_number")} placeholder="Telefone" type="number" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("password")} placeholder="Senha" focusBorderColor="green.100" size="lg"/>
                        <Input {...register("confirm_password")} placeholder="Confirmar senha" focusBorderColor="green.100" size="lg"/>
                        <ButtonLink type="submit">Enviar</ButtonLink>
                    </form>
                </Container>
            </header>
        </div>
    )
}

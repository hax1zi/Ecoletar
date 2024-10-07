/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ButtonLink from "@/components/ButtonLink"
import { Card, Heading, Stack, Text, Image, CardFooter, CardBody, Select, Input } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function FirstLogin() {
    const [confirmation, setConfirmation] = useState<boolean>()
    const [availability, setAvailability] = useState<any[]>([])
    const [typeTrash, setTypeTrash] = useState("")
    const [city, setCity] = useState("")
    const [dayState, setDayState] = useState("")
    const [hour, setHour] = useState("")
    const [street, setStreet] = useState("")
    const route = useRouter()

    const sendInfosFirstLogin = async () => {
        try {

            const token = sessionStorage.getItem('token')

            const data = {
                scheduled_days: dayState,
                scheduled_time: hour,
                types_of_garbage: typeTrash,
                city,
                street,
                first_login: false
            }

            await fetch('https://ecoletar-backend.vercel.app/confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            route.push("/")
            
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error)
        }
    }

    const fetchFirstLoginResponse = async (token: string | null) => {
        const response = await fetch('https://ecoletar-backend.vercel.app/first-login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        const responseFirstLogin = await response.json()
        setConfirmation(responseFirstLogin.response)
        return responseFirstLogin.response
        
    } 

    const fetchEcoletarInfos = async () => {
        const response = await fetch('https://ecoletar-backend.vercel.app/info/availability', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const responseInfos = await response.json()
        setAvailability(responseInfos.data)
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        const getCofirmation = async () => {
            const response = await fetchFirstLoginResponse(token)
            return response
        }
        const response = getCofirmation()
        fetchEcoletarInfos()
        if (!response) {
            route.push("/")
        }
    }, [route])

    if (confirmation) {
        return (
            <main className="w-screen h-screen flex items-center justify-center flex-col gap-8">
                <h2 className="text-2xl font-bold">Agende a nossa visita à sua empresa</h2>
                <div className="flex gap-12 w-full justify-center">
                    {availability[1]?.["types-of-garbage"][4]?.['types'].map((type: any, index: number) => {
                        return (
                            <Card key={index} className={` max-w-[18vw] ${type.name === typeTrash && "border border-primary"}`}>
                                <CardBody>

                                <Image src={type.img} alt="" borderRadius="lg" className="mb-8"/>
                                <Stack>
                                    <Heading size="md">{type.name}</Heading>
                                    <Text>{type.description}</Text>
                                </Stack>
                                </CardBody>
                                <CardFooter className="flex w-full justify-center">

                                <ButtonLink onClick={() => setTypeTrash(type.name)}>{type.name === typeTrash ? "Selecionado" : "Selecionar"} </ButtonLink>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
                <div className="flex gap-8 w-[50vw]">
                    <Select onChange={(e) => setCity(e.target.value)} placeholder="Selecionar cidade">
                        <option value={availability[0]?.city}>{availability[0]?.city}</option>
                    </Select>
                    <Select onChange={(e) => setDayState(e.target.value)} placeholder="Selecionar Dia" disabled={city === ""}>
                        {availability[0]?.["days"] && Object.keys(availability[0]?.["days"]).map((day: string, index:number) => {       
                                return (
                                    <option value={day} key={index}>{day}</option>
                                )
                            })}
                    </Select>
                    <Select onChange={(e) => setHour(e.target.value)} placeholder="Horario" disabled={dayState === ""}>
                            {availability[0]?.['days']?.[dayState]?.map((hour: string, index: number) => 
                                <option value={hour} key={index}>{hour}</option>
                            )}
                    </Select>
                </div>
                <div>
                    <Input placeholder="Rua" className="w-[50vw]" onChange={(e) => setStreet(e.target.value)}/>
                </div>
                <div>
                    {(typeTrash !== "" && hour !== "" && street !== "") && (<ButtonLink onClick={() => sendInfosFirstLogin()}>Continuar</ButtonLink>)}
                </div>
            </main>
        )
    }
}
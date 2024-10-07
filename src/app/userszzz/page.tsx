/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const [data, setData] = useState<any[]>([])
    const getInfosUsers = async () => {
        const response = await fetch('https://ecoletar-backend.vercel.app/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const responseInfos = await response.json()
        setData(responseInfos)
    }

    useEffect(() => {
        getInfosUsers()
    }, [])

    return (
        <main>
            {Array.isArray(data) && data.map((user: any) => {
                return (
                    <Card className="mb-4 p-4 bg-neutral-200" key={user.id} direction={{ base: 'column', sm: 'row' }}>
                        <div>
                            <h3>{user.name} {user.lastname}</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Telefone:</strong> {user.phone_number}</p>
                            <p><strong>Dia Agendado:</strong> {user.scheduled_days || "N/A"}</p>
                            <p><strong>Hora Agendada:</strong> {user.scheduled_time || "N/A"}</p>
                            <p><strong>Tipo de Lixo:</strong> {user.types_of_garbage || "N/A"}</p>
                            <p><strong>Empresa:</strong> {user.company_name || "N/A"}</p>
                            <p><strong>Cidade:</strong> {user.city || "N/A"}</p>
                        </div>
                    </Card>
                );
            })}
        </main>
    )
}
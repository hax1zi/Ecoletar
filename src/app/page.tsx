'use client'
import { CircularProgress, CircularProgressLabel, Container, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import cursor from "../app/public/assets/svgs/cursor.svg"
import ButtonLink from "@/components/ButtonLink";
import Navbar from "@/components/Navbar";

export default function Home() {
  const[position, setPosition] = useState(0)
  const[isMoved, setIsMoved] = useState(false)
  
  const slidePorcent = () => {
    if (position === 1) {
      return 33
    } else if (position === 2) {
      return 66
    } else if (position === 3) {
      return 99
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMoved(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [position])

  const slide = () => {
    if (position === 0) {
      return ( 
      <Container className="bg-primary flex flex-col items-center justify-center rounded-md text-center gap-8" minH="55vh" minW="45vw">
        <p className="text-3xl">Deseja saber como nosso projeto funciona?
        Então <b>inicie</b> nosso <b>slide</b></p>
        <ButtonLink onClick={() => setPosition(position + 1)}>Iniciar</ButtonLink>
      </Container>)
    } else if (position === 1) {
      return (
        <Container className="border-primary overflow-hidden border-4 flex flex-col items-center justify-center relative rounded-md text-center gap-8" minH="55vh" minW="45vw">
           <p className="text-3xl">Primeiro você deve se cadastrar no nosso site</p>
           <div className="w-[35%] h-[35%] bg-neutral-200 rounded-md">
            <div className="w-full h-[70%] bg-primary flex justify-center items-center">
              <div className={`p-4 text-4xl bg-Button rounded-md text-white transition-colors ${isMoved && "delay-700 duration-300 bg-ButtonHover"}`}>
                  Cadastro
              </div>
            </div>
           </div>
           <div className={`absolute duration-1000 transition ${isMoved  ? "-translate-y-[0vh] opacity-100" : "translate-y-[25vh] opacity-0 translate-x-[10vw]"} `}>
           <Image src={cursor} alt="" width={64} height={64}/>
           </div>
           <ButtonLink onClick={() => setPosition(position + 1)}>Proximo</ButtonLink>
        </Container>
      )
    } else if (position === 2) {
      return (
        <Container className="border-primary overflow-hidden border-4 flex flex-col items-center justify-center relative rounded-md text-center gap-8" minH="55vh" minW="45vw">
          <p className="text-3xl">Após o preenchimento do formulário a nossa equipe de coleta irá até a sua empresa no horário selecionado</p>
          <ButtonLink onClick={() => setPosition(position + 1)}>Proximo</ButtonLink>
        </Container>
      )
    } else if (position === 3) {
      return (
      <Container className="border-primary overflow-hidden border-4 flex flex-col items-center justify-center relative rounded-md text-center gap-8" minH="55vh" minW="45vw">
          <p className="text-3xl">Após a coleta dos resíduos selecionaremos ele e enviaremos ele para se transformar em energia renovável</p>
          <p className="text-2xl mt-4"> E o que está esperando, insira a Ecoletar na sua empresa/industria</p>
          <ButtonLink link="/cadastro">Cadastro</ButtonLink>
        </Container>
      )
    }
  }
  return (
    <main>
      <Navbar/>
      <header className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8">
        <h1 className="text-5xl text-ButtonHover font-bold">Bem-vindo ao Projeto Ecolletar</h1>
        <VStack className="relative">
          {position > 0 && (
          <CircularProgress className="absolute right-4 top-4" value={slidePorcent()} color='green.400'>
            <CircularProgressLabel>{slidePorcent()}%</CircularProgressLabel>
          </CircularProgress>
          )}
          {slide()}
        </VStack>
      </header>
    </main>
  )
}

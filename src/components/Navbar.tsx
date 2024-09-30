import { Link } from "@chakra-ui/react";

export default function Navbar() {
    return (
        <nav className="bg-primary text-white flex justify-around items-center w-full h-20 py-4">
            <h2 className="text-4xl font-bold">Ecoletar</h2>
            <ul className="text-2xl font-medium flex gap-4">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/cadastro" _hover={"none"} colorScheme="orange" className="bg-[#733F2C] p-3 rounded-md hover:bg-ButtonHover">Cadastro</Link></li>
            </ul>
      </nav>
    )
}
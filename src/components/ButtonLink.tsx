/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Link } from "@chakra-ui/react";
import React from "react";

interface ButtonLinkProps {
    children: React.ReactNode;
    onClick?: () => any
    link?: string
    type?: string
  }

export default function ButtonLink({children, onClick, link, type}: ButtonLinkProps) {
    if (link !== undefined) {
        return (
            <Link href={link} className="bg-[#733F2C] uppercase p-4 rounded-md hover:bg-ButtonHover text-white text-2xl">{children}</Link>
        )
    }
    if (type === "submit") {    
        return (
            <Button onClick={onClick} type={type} className="bg-[#733F2C] p-5 py-8 rounded-md hover:bg-ButtonHover uppercase text-white text-2xl">{children}</Button>
        )
    }

    return (
        <Button onClick={onClick} className="bg-[#733F2C] uppercase p-5 py-8 rounded-md hover:bg-ButtonHover text-white text-2xl">{children}</Button>
    )
}
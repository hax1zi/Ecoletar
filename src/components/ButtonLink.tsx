/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Link } from "@chakra-ui/react";
import React from "react";

interface ButtonLinkProps {
    children: React.ReactNode;
    onClick?: () => any
    link?: string
  }

export default function ButtonLink({children, onClick, link}: ButtonLinkProps) {
    if (link !== undefined) {
        return (
            <Link href={link} className="bg-[#733F2C] p-4 rounded-md hover:bg-ButtonHover text-white text-2xl">{children}</Link>
        )
    }

    return (
        <Button onClick={onClick} className="bg-[#733F2C] p-5 py-8 rounded-md hover:bg-ButtonHover text-white text-2xl">{children}</Button>
    )
}
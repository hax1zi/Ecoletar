import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react"

interface AlertComponentProps {
    type: "success" | "warning" | "error"
    text: string
}

export default function AlertComponent({ type, text }: AlertComponentProps) {
    return (
        <>
            {text !== "" && (
                <Alert status={type} className="absolute -top-16 w-[95%] rounded-sm">
                    <AlertIcon />
                    <AlertTitle>{text}</AlertTitle>
                </Alert>
            )}
        </>
    )
}
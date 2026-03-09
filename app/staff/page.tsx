"use client"

import { useEffect, useState, useRef } from "react"
import PatientCard from "@/components/PatientCard"
import { Patient } from "@/types/patient"
import { connectWebSocket } from "@/services/websocket"
import { PatientStatus } from "@/types/status"

export default function StaffPage() {
    const [patient, setPatient] = useState<Patient>({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        preferredLanguage: "",
        nationality: "",
        emergencyContact: "",
        religion: "",
    })

    const [status, setStatus] = useState<PatientStatus>("INACTIVE")
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null)
    const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED")

    useEffect(() => {
        const socket = connectWebSocket()

        socket.onopen = () => {
            setConnectionStatus("CONNECTED")
        }

        socket.onclose = () => {
            setConnectionStatus("DISCONNECTED")
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)

            if (message.type === "FORM_UPDATE") {
                setPatient(message.payload)
                setStatus("ACTIVE")

                // reset inactivity timer
                if (inactivityTimer.current) {
                    clearTimeout(inactivityTimer.current)
                }

                inactivityTimer.current = setTimeout(() => {
                    setStatus("INACTIVE")
                }, 5000)
            }

            if (message.type === "FORM_SUBMIT") {
                setStatus("SUBMITTED")
            }
        }
    }, [])

    return (
        <div className="max-w-5xl mx-auto p-10">
            <h1 className="text-3xl font-bold mb-6">
                Staff Dashboard
            </h1>

            <PatientCard patient={patient} status={status} />

            <p className="my-4 text-sm text-gray-600">
                WebSocket: {connectionStatus}
            </p>
        </div>
    )
}
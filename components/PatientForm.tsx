"use client"

import { useState, useEffect } from "react"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import { Patient } from "@/types/patient"
import { connectWebSocket } from "@/services/websocket"
import { isValidEmail, isValidPhone } from "@/utils/validation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"

export default function PatientForm() {
    const [formData, setFormData] = useState<Patient>({
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

    const [dob, setDob] = useState<Date | null>(null)
    const [error, setError] = useState("")
    const socket = connectWebSocket()

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target

        setError("") // clear error when user edits

        const updatedData = {
            ...formData,
            [name]: value,
        }

        setFormData(updatedData)

        socket?.send(
            JSON.stringify({
                type: "FORM_UPDATE",
                payload: updatedData,
            })
        )
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address")
            return
        }

        if (!isValidPhone(formData.phone)) {
            setError("Please enter a valid phone number")
            return
        }

        setError("")

        socket?.send(
            JSON.stringify({
                type: "FORM_SUBMIT",
                payload: formData,
            })
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

            <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Middle Name"
                name="middleName"
                value={formData.middleName || ""}
                onChange={handleChange}
            />

            <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    Date of Birth *
                </label>

                <DatePicker
                    selected={dob}
                    onChange={(date: Date | null) => {
                        setDob(date)

                        const formatted = date
                            ? format(date, "dd MMM yyyy")
                            : ""

                        const updatedData = {
                            ...formData,
                            dateOfBirth: formatted,
                        }

                        setFormData(updatedData)

                        socket?.send(
                            JSON.stringify({
                                type: "FORM_UPDATE",
                                payload: updatedData,
                            })
                        )
                    }}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select date"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxDate={new Date()}
                    //minDate={new Date("1900-01-01")}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                />
            </div>

            <FormSelect
                label="Gender"
                name="gender"
                value={formData.gender}
                options={["Male", "Female", "Other", "Prefer not to say"]}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Preferred Language"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
            />

            <FormInput
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
            />

            <FormInput
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
            />

            {/* Error Message */}
            {error && (
                <p className="col-span-full text-red-500 text-sm">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="col-span-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
                Submit
            </button>

        </form>
    )
}
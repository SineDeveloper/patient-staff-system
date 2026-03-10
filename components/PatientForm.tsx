"use client"

import { useState } from "react"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import FormDate from "./FormDate"
import FormTel from "./FormTel"

import { Patient } from "@/types/patient"
import { sendMessage } from "@/services/websocket"
import { isValidEmail, isValidPhone } from "@/utils/validation"

import "react-datepicker/dist/react-datepicker.css"

import { format } from "date-fns"
import { getNames } from "country-list"

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
        emergencyContactName: "",
        emergencyContactRelationship: "",
    })

    const [error, setError] = useState("")
    const countries = getNames().sort()

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target
        updateField(name, value)
    }

    function updateField(name: string, value: string) {

        setError("")

        const updatedData = {
            ...formData,
            [name]: value,
        }

        setFormData(updatedData)

        sendMessage(
            JSON.stringify({
                type: "FORM_UPDATE",
                payload: updatedData,
            })
        )
    }

    function updateDatePicker(name: string, value: Date | null) {

        const formattedDate = value
            ? format(value, "yyyy-MM-dd")
            : ""

        updateField(name, formattedDate)
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

        sendMessage(
            JSON.stringify({
                type: "FORM_SUBMIT",
                payload: formData,
            })
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="patient-form-container space-y-8"
        >

            {/* PATIENT INFORMATION */}
            <div className="border rounded-xl p-6 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Patient Information
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormDate
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={
                                formData.dateOfBirth
                                    ? new Date(formData.dateOfBirth)
                                    : null
                            }
                            required
                            onChange={updateDatePicker}
                        />
                        <FormSelect
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            options={[
                                "Male",
                                "Female",
                                "Other",
                                "Prefer not to say",
                            ]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>


            {/* CONTACT INFORMATION */}
            <div className="border rounded-xl p-6 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Contact Information
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <FormTel
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            required
                            onChange={updateField}
                        />

                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">

                        <FormInput
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <FormSelect
                            label="Preferred Language"
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            options={[
                                "Thai",
                                "English",
                                "Chinese",
                                "Malay",
                                "Other",
                            ]}
                            onChange={handleChange}
                            required
                        />

                        <FormSelect
                            label="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            options={countries}
                            onChange={handleChange}
                            required
                        />

                        <FormInput
                            label="Religion"
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                        />

                    </div>
                </div>
            </div>


            {/* EMERGENCY INFORMATION */}
            <div className="border rounded-xl p-6 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Emergency Information
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 gap-4">

                        <FormInput
                            label="Emergency Contact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                        />

                    </div>

                    {formData.emergencyContact && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <FormInput
                                label="Contact Name"
                                name="emergencyContactName"
                                value={formData.emergencyContactName || ""}
                                onChange={handleChange}
                            />
                            <FormInput
                                label="Contact Relationship"
                                name="emergencyContactRelationship"
                                value={formData.emergencyContactRelationship || ""}
                                onChange={handleChange}
                            />

                        </div>
                    )}
                </div>
            </div>



            {/* ERROR */}
            {
                error && (
                    <p className="text-red-500 dark:text-red-400 text-sm">
                        {error}
                    </p>
                )
            }

            {/* SUBMIT */}
            <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
                Submit
            </button>

        </form >
    )
}
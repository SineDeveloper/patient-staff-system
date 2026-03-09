"use client"

import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"


type Props = {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  required?: boolean
}

export default function FormPhoneInput({
  label,
  name,
  value,
  onChange,
  required,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>

      <PhoneInput
        defaultCountry="th"
        value={value}
        onChange={(phone) => onChange(name, phone)}
        inputClassName="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
    </div>
  )
}
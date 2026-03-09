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
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && "*"}
      </label>

      <PhoneInput
        defaultCountry="th"
        value={value}
        onChange={(phone) => onChange(name, phone)}
        inputClassName="!h-[50px] !w-full !text-base !bg-white dark:!bg-slate-700 !text-gray-900 dark:!text-white !border-gray-300 dark:!border-slate-600 !rounded-r-lg !border-l-0 focus:!ring-0 focus:!outline-none"
        countrySelectorStyleProps={{
          buttonClassName: "!h-[50px] !bg-white dark:!bg-slate-700 !border-gray-300 dark:!border-slate-600 !rounded-l-lg !border-r-0 !px-3",
          flagStyle: { transform: 'scale(1.2)' }
        }}
      />

    </div>
  )
}
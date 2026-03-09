"use client"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
  label: string
  name: string
  value: Date | null
  onChange: (name: string, value: Date | null) => void
  required?: boolean
}

export default function FormDatePicker({
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

      <DatePicker
        selected={value}
        onChange={(date) => onChange(name, date)}
        dateFormat="dd MMM yyyy"
        placeholderText="Select date"
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxDate={new Date()}
        minDate={new Date("1900-01-01")}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
    </div>
  )
}
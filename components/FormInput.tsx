type Props = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && "*"}
      </label>

      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 dark:border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      />
    </div>
  )
}
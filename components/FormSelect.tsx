type Props = {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    required?: boolean
    options: []
}

export default function FormInput({
    label,
    name,
    value,
    onChange,
    required,
    options,
}: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label} {required && "*"}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select {name}</option>
                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
}
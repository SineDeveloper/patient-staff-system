import PatientForm from "@/components/PatientForm"

export default function PatientPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">
          Patient Information Form
        </h1>

        <PatientForm />
      </div>
    </div>
  )
}
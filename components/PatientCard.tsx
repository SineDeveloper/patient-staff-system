import { Patient } from "@/types/patient"
import { PatientStatus } from "@/types/status"

type Props = {
  patient: Patient
  status: PatientStatus
}

function getStatusColor(status: string) {
  if (status === "ACTIVE") return "bg-green-100 text-green-700"
  if (status === "INACTIVE") return "bg-gray-200 text-gray-700"
  if (status === "SUBMITTED") return "bg-blue-100 text-blue-700"

  return ""
}

export default function PatientCard({ patient, status }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-2">
        Current Patient Information
      </h2>

      <span className={`mb-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
        {status}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p><strong>First Name:</strong> {patient.firstName || "N/A"}</p>
        <p><strong>Middle Name:</strong> {patient.middleName || "N/A"}</p>
        <p><strong>Last Name:</strong> {patient.lastName || "N/A"}</p>
        <p><strong>Date of Birth:</strong> {patient.dateOfBirth || "N/A"}</p>
        <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
        <p><strong>Phone:</strong> {patient.phone || "N/A"}</p>
        <p><strong>Email:</strong> {patient.email || "N/A"}</p>
        <p><strong>Address:</strong> {patient.address || "N/A"}</p>
        <p><strong>Language:</strong> {patient.preferredLanguage || "N/A"}</p>
        <p><strong>Nationality:</strong> {patient.nationality || "N/A"}</p>
        <p><strong>Emergency Contact:</strong> {patient.emergencyContact || "N/A"}</p>
        <p><strong>Religion:</strong> {patient.religion || "N/A"}</p>
      </div>
    </div >
  )
}
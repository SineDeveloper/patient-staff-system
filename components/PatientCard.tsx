import { Patient } from "@/types/patient"
import { PatientStatus } from "@/types/status"
import { format, parseISO } from "date-fns"

type Props = {
  patient: Patient
  status: PatientStatus
}

function getStatusColor(status: string) {
  if (status === "ACTIVE") return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
  if (status === "INACTIVE") return "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
  if (status === "SUBMITTED") return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"

  return ""
}

export default function PatientCard({ patient, status }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Current Patient Information
      </h2>

      <span className={`mb-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
        {status}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p><strong>First Name:</strong> {patient.firstName}</p>
        <p><strong>Middle Name:</strong> {patient.middleName}</p>
        <p><strong>Last Name:</strong> {patient.lastName}</p>
        <p><strong>Date of Birth:</strong> {patient.dateOfBirth ? format(parseISO(patient.dateOfBirth), 'dd MMM yyyy') : ''}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Language:</strong> {patient.preferredLanguage}</p>
        <p><strong>Nationality:</strong> {patient.nationality}</p>
        <p><strong>Emergency Contact:</strong> {patient.emergencyContact || "N/A"}
          {patient.emergencyContact && patient.emergencyContactName && (
            <> ({patient.emergencyContactName}
              {patient.emergencyContactRelationship && ` - ${patient.emergencyContactRelationship}`})
            </>
          )}
        </p>
        <p><strong>Religion:</strong> {patient.religion || "N/A"}</p>
      </div>
    </div >
  )
}
import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios.js"
import { Button } from "../ui/button.tsx"
import { Link,useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import "jspdf-autotable"

export default function EmployerList() {
  const [employers, setEmployers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
const navigate=useNavigate()
  // Fonction pour charger les employeurs
  const exportToPDF = () => {
  const doc = new jsPDF()
  doc.text("Liste des Employés", 14, 10)

  const tableColumn = ["Prénom", "Nom", "Email", "Poste", "Téléphone", "Date d'embauche", "Salaire"]
  const tableRows = []

  employers.forEach((emp) => {
    const rowData = [
      emp.first_name,
      emp.last_name,
      emp.email,
      emp.position,
      emp.phone,
      emp.hire_date,
      emp.salary,
    ]
    tableRows.push(rowData)
  })

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  })

  doc.save("employes.pdf")
}

  const fetchEmployers = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get("/api/employers")
      setEmployers(response.data)
    } catch (err) {
      setError("Erreur lors du chargement des employeurs.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployers()
  }, [])

  // Fonction de suppression
  const onDelete = async (id) => {
        await axiosClient.delete(`/api/employers/${id}`)
        fetchEmployers()
  }
   const onEdit = (id) => {
  navigate(`/editEmployer/${id}`)
}


  if (loading) return <p>Chargement en cours...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="overflow-x-auto mt-4">
      <Link to="/creatEmployer" className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Ajouter Employé
      </Link>
      <Button
  onClick={exportToPDF}
  className="mb-4 ml-4 bg-green-600 hover:bg-green-700 text-white"
>
  Exporter en PDF
</Button>

      <h2 className="text-xl font-bold mb-4">Liste des Employés</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
           
            <th className="px-4 py-2 border-b">Prénom</th>
            <th className="px-4 py-2 border-b">Nom</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Poste</th>
            <th className="px-4 py-2 border-b">Téléphone</th>
            <th className="px-4 py-2 border-b">date d'embauche</th>
            <th className="px-4 py-2 border-b">Salaire</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {employers.map((employer) => (
            <tr key={employer.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{employer.first_name}</td>
              <td className="px-4 py-2 border-b">{employer.last_name}</td>
              <td className="px-4 py-2 border-b">{employer.email}</td>
              <td className="px-4 py-2 border-b">{employer.position}</td>
              <td className="px-4 py-2 border-b">{employer.phone}</td>
              <td className="px-4 py-2 border-b">{employer.hire_date}</td>
                   <td className="px-4 py-2 border-b">{employer.salary}</td>
              <td className="px-4 py-2 border-b">
                <Button onClick={() => onEdit(employer.id)} className="bg-blue-600 hover:bg-red-700 text-white">
                  Editer
                </Button>
                <Button onClick={() => onDelete(employer.id)} className="bg-red-600 hover:bg-red-700 text-white">
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

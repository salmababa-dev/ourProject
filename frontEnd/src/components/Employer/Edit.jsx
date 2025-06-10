import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage
} from "../ui/form.tsx"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input.tsx"
import { Button } from "../ui/button.tsx"
import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios.js"
import { useNavigate, useParams } from "react-router-dom"

const formSchema = z.object({
   first_name: z.string().min(2, "Nom requis").max(50),
  last_name: z.string().min(2, "Prénom requis").max(50),
   email: z.string().email("Email invalide"),

  phone: z.string().min(6, "Téléphone invalide"),
  hire_date: z.string(), // peut être un z.coerce.date() si tu préfères
  position: z.string().min(2, "Poste requis").max(80),
  salary: z.coerce.number().min(0, "Salaire invalide"),
})

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
       first_name: "",
      last_name: "",
      email: "",
      phone: "",
      hire_date: "",
      position: "",
      salary: 0,
    },
  })

  // Charger les données de l'employé
  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await axiosClient.get(`/api/employers/${id}`)
        form.reset({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
      email: response.data.email,
      phone: response.data.phone,
      hire_date:response.data.hire_date,
      position: response.data.position,
      salary: response.data.salary,
        })
      } catch (error) {
        console.error("Erreur lors du chargement de l'employé", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployer()
  }, [id, form])

  const onSubmit = async (values) => {
    try {
      await axiosClient.put(`/api/employers/${id}`, values)
      navigate('/list') // Redirection vers la liste après update
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error)
    }
  }

  if (loading) return <p>Chargement...</p>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** PRENOM */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@exemple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** TÉLÉPHONE */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+212..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** DATE D'EMBAUCHE */}
        <FormField
          control={form.control}
          name="hire_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'embauche</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** POSTE */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poste</FormLabel>
              <FormControl>
                <Input placeholder="Poste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** SALAIRE */}
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salaire</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Enregistrer
        </Button>
      </form>
    </Form>
  )
}

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button.tsx"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form.tsx"
import { Input } from "../ui/input.tsx"
import { axiosClient } from "../../api/axios.js"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  first_name: z.string().min(2, "Nom requis").max(50),
  last_name: z.string().min(2, "Prénom requis").max(50),
  email: z.string(),
  phone: z.string().min(6, "Téléphone invalide"),
  hire_date: z.string(), // peut être un z.coerce.date() si tu préfères
  position: z.string().min(2, "Poste requis").max(30),
  salary: z.coerce.number().min(0, "Salaire invalide"),
})

export default function Create() {
  const navigate = useNavigate()

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

  const onSubmit = async (values) => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie")
      const { data } = await axiosClient.post("api/employers", values)
      console.log("Enregistré :", data)
      navigate("/list")
    } catch (error) {
      console.error("Erreur :", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/** NOM */}
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
          Ajouter
        </Button>
      </form>
    </Form>
  )
}

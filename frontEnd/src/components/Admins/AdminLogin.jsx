import { useForm } from "react-hook-form"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from "../ui/button.tsx"
import {Loader2} from "lucide-react"
import {Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form.tsx"
import { Input } from "../ui/input.tsx"
import axios from "axios"
import { axiosClient } from "../../api/axios.js"
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
  email: z.string().min(2).max(50),
   password: z.string().min(8).max(30),
})
export default function AdminLogin(){
  const navigate=useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema), 
       defaultValues: {
      email: "test@example.com",
      password:"password",
    },
  })

  
 const onSubmit = async (values) => {
  try {
    const csrf = await axiosClient.get('/sanctum/csrf-cookie')
     const data = await axiosClient.post('/login',values)
    console.log("CSRF OK", data)
if(data.status === 204){
navigate('/dashboard')
}
    // tu peux ensuite envoyer la requête login ici
  } catch (error) {
    console.error("Erreur CSRF :", error)
  }
}

    return(
        <>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input  type="password" placeholder="password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />
       <Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? (
    <Loader2 className="animate-spin mr-2" size={20} />
  ) : null}
  {form.formState.isSubmitting ? "Connexion..." : "Se connecter"}
</Button>

      </form>
    </Form>
        </>
    )
}
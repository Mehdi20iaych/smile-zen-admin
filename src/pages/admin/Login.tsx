import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/storage/localDb";
import { useToast } from "@/hooks/use-toast";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type FormValues = z.infer<typeof Schema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = (data: FormValues) => {
    const res = db.loginAdmin(data.email, data.password);
    if (res.ok) {
      toast({ title: "Connexion réussie" });
      navigate("/admin");
    } else {
      toast({ title: "Échec de connexion", description: res.error, variant: "destructive" });
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center py-16">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Connexion Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">Utilisez admin@clinic.test / admin</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">Email invalide</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-sm text-destructive">Mot de passe requis</p>}
          </div>
          <Button type="submit" variant="default" className="w-full">Se connecter</Button>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SERVICES, Service } from "@/types";
import { db } from "@/storage/localDb";
import { useToast } from "@/hooks/use-toast";

const Schema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z.string().min(8, "Numéro de téléphone invalide."),
  service: z.string().min(1, "Choisissez un service."),
  date: z.string().min(10, "Date requise."),
  time: z.string().regex(/^\d{2}:([03]0|00)$/u, "Heure invalide (intervalles de 30 minutes)."),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

const BookingForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { service: "" },
  });

  const onSubmit = (data: FormValues) => {
    const slot = `${data.date}T${data.time}`;
    const patient = db.upsertPatient(data.name, data.email, data.phone);
    const result = db.createAppointment(patient.id, data.service as Service, slot, data.notes);
    if (result.ok) {
      toast({ title: "Rendez-vous enregistré", description: "Nous vous contacterons pour confirmation." });
      reset();
    } else {
      const { error } = result as { ok: false; error: string };
      toast({ title: "Créneau indisponible", description: error, variant: "destructive" });
    }
  };

  return (
    <section id="reserver" className="scroll-mt-24">
      <div className="container mx-auto py-12 md:py-16">
        <h2 className="text-3xl font-semibold">Réserver un rendez-vous</h2>
        <p className="mt-2 text-muted-foreground">Sélectionnez un créneau (:00 ou :30). Vous recevrez une confirmation par e-mail.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" {...register("name")} placeholder="Ex: Sara El Amrani" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="vous@exemple.com" />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" {...register("phone")} placeholder="+212 6 12 34 56 78" />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Service</Label>
            <Select onValueChange={(v) => setValue("service", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un service" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && <p className="text-sm text-destructive">{errors.service.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register("date")} />
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Heure</Label>
            <Input id="time" type="time" step={1800} {...register("time")} />
            {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea id="notes" rows={4} {...register("notes")} placeholder="Votre message…" />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" variant="hero" className="w-full md:w-auto">Envoyer la demande</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;

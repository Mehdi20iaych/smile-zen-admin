import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/storage/localDb";
import { Button } from "@/components/ui/button";
import ScheduleGrid from "@/components/admin/ScheduleGrid";

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(todayStr());
  const appts = useMemo(() => db.appointmentsForDate(date), [date]);

  useEffect(() => {
    if (!db.isAdminAuthed()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <main className="container mx-auto space-y-8 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Planning du jour</h1>
          <p className="text-muted-foreground">Vue des créneaux de 30 minutes</p>
        </div>
        <div className="flex items-center gap-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border bg-background px-3 py-2" />
          <Button variant="outline" onClick={() => { db.logoutAdmin(); navigate("/admin/login"); }}>Se déconnecter</Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Créneaux</h2>
        <ScheduleGrid date={date} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Rendez-vous</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Heure</th>
                <th className="p-3">Service</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appts.length === 0 && (
                <tr>
                  <td className="p-3 text-muted-foreground" colSpan={4}>Aucun rendez-vous pour cette date.</td>
                </tr>
              )}
              {appts.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.slot.split("T")[1]}</td>
                  <td className="p-3">{a.service}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => { db.updateAppointmentStatus(a.id, "Confirmed"); location.reload(); }}>Confirmer</Button>
                      <Button size="sm" variant="destructive" onClick={() => { db.deleteAppointment(a.id); location.reload(); }}>Supprimer</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;

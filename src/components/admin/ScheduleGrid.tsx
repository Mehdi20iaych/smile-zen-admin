import { db, generateHalfHourSlots } from "@/storage/localDb";
import { useMemo } from "react";
import type { Appointment } from "@/types";
interface Props {
  date: string; // yyyy-mm-dd
}

const ScheduleGrid = ({ date }: Props) => {
  const slots = useMemo(() => generateHalfHourSlots(date), [date]);
  const appts = useMemo(() => db.appointmentsForDate(date), [date]);

  const bySlot = new Map<string, Appointment>(appts.map((a) => [a.slot, a] as const));

  if (slots.length === 0) {
    return (
      <div className="rounded-md border p-4 text-muted-foreground">La clinique est fermée ce jour.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {slots.map((s) => {
        const a = bySlot.get(s);
        const time = s.split("T")[1];
        const isBooked = !!a && a.status !== "Cancelled";
        return (
          <div key={s} className={`rounded-md border p-3 ${isBooked ? "bg-secondary" : "bg-card"}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{time}</span>
              <span className={`text-xs ${isBooked ? "text-primary" : "text-muted-foreground"}`}>
                {isBooked ? a!.service : "Libre"}
              </span>
            </div>
            {isBooked && (
              <div className="mt-2 text-sm text-muted-foreground">
                {a?.notes ? <p className="line-clamp-2">{a.notes}</p> : <p>Réservé</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleGrid;

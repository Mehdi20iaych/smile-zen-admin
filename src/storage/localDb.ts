import { Appointment, AppointmentStatus, Patient, Service, SERVICES } from "@/types";

const KEYS = {
  PATIENTS: "smilezen_patients",
  APPOINTMENTS: "smilezen_appointments",
  ADMIN_SESSION: "smilezen_admin_session",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function genId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const db = {
  // Patients
  getPatients(): Patient[] {
    return read<Patient[]>(KEYS.PATIENTS, []);
  },
  savePatients(list: Patient[]) {
    write(KEYS.PATIENTS, list);
  },
  findPatientByEmail(email: string) {
    const em = email.trim().toLowerCase();
    return this.getPatients().find((p) => p.email.toLowerCase() === em);
  },
  upsertPatient(name: string, email: string, phone: string): Patient {
    const existing = this.findPatientByEmail(email);
    if (existing) {
      // Optionally update name/phone if empty
      const updated: Patient = { ...existing, name, phone };
      const patients = this.getPatients().map((p) => (p.id === existing.id ? updated : p));
      this.savePatients(patients);
      return updated;
    }
    const newPatient: Patient = {
      id: genId("pat"),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };
    const patients = this.getPatients();
    patients.push(newPatient);
    this.savePatients(patients);
    return newPatient;
  },

  // Appointments
  getAppointments(): Appointment[] {
    return read<Appointment[]>(KEYS.APPOINTMENTS, []);
  },
  saveAppointments(list: Appointment[]) {
    write(KEYS.APPOINTMENTS, list);
  },
  isSlotBooked(slot: string): boolean {
    return this.getAppointments().some((a) => a.slot === slot && a.status !== "Cancelled");
  },
  createAppointment(
    patientId: string,
    service: Service,
    slot: string,
    notes?: string
  ): { ok: true; appointment: Appointment } | { ok: false; error: string } {
    if (!SERVICES.includes(service)) {
      return { ok: false, error: "Service invalide." };
    }
    if (this.isSlotBooked(slot)) {
      return { ok: false, error: "Ce créneau est déjà réservé." };
    }
    const appt: Appointment = {
      id: genId("apt"),
      patientId,
      service,
      slot,
      notes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const list = this.getAppointments();
    list.push(appt);
    this.saveAppointments(list);
    return { ok: true, appointment: appt };
  },
  updateAppointmentStatus(id: string, status: AppointmentStatus) {
    const list = this.getAppointments().map((a) => (a.id === id ? { ...a, status } : a));
    this.saveAppointments(list);
  },
  deleteAppointment(id: string) {
    const list = this.getAppointments().filter((a) => a.id !== id);
    this.saveAppointments(list);
  },
  appointmentsForDate(dateStr: string) {
    return this.getAppointments().filter((a) => a.slot.startsWith(`${dateStr}T`));
  },

  // Admin demo auth
  loginAdmin(email: string, password: string): { ok: boolean; error?: string } {
    if (email.trim().toLowerCase() === "admin@clinic.test" && password === "admin") {
      write(KEYS.ADMIN_SESSION, { email: "admin@clinic.test", t: Date.now() });
      return { ok: true };
    }
    return { ok: false, error: "Identifiants invalides." };
  },
  logoutAdmin() {
    localStorage.removeItem(KEYS.ADMIN_SESSION);
  },
  isAdminAuthed(): boolean {
    return !!localStorage.getItem(KEYS.ADMIN_SESSION);
  },
};

export function formatTimeFR(date: Date) {
  return new Intl.DateTimeFormat("fr-MA", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

export function slotRangeForDay(dateStr: string): { open: string; close: string; isClosed: boolean } {
  const d = new Date(dateStr + "T00:00");
  const day = d.getDay(); // 0=Sun
  if (day === 0) return { open: "00:00", close: "00:00", isClosed: true };
  if (day === 6) return { open: "09:00", close: "14:00", isClosed: false };
  return { open: "08:00", close: "18:00", isClosed: false };
}

export function generateHalfHourSlots(dateStr: string): string[] {
  const { open, close, isClosed } = slotRangeForDay(dateStr);
  if (isClosed) return [];
  const toMins = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const start = toMins(open);
  const end = toMins(close);
  const slots: string[] = [];
  for (let t = start; t < end; t += 30) {
    const h = Math.floor(t / 60).toString().padStart(2, "0");
    const m = (t % 60).toString().padStart(2, "0");
    slots.push(`${dateStr}T${h}:${m}`);
  }
  return slots;
}

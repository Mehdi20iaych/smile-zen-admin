export type Service =
  | "Détartrage"
  | "Plombage"
  | "Orthodontie"
  | "Blanchiment"
  | "Esthétique dentaire"
  | "Traitement canalaire";

export const SERVICES: Service[] = [
  "Détartrage",
  "Plombage",
  "Orthodontie",
  "Blanchiment",
  "Esthétique dentaire",
  "Traitement canalaire",
];

export type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string; // ISO
}

export interface Appointment {
  id: string;
  patientId: string;
  service: Service;
  slot: string; // e.g. 2025-08-10T10:30 (local slot key)
  notes?: string;
  status: AppointmentStatus;
  createdAt: string; // ISO
}

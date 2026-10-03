import { prisma } from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
} from "./patients.js";
import {
  createDoctor,
  listDoctorsBySpecialty,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
} from "./appointments.js";

async function main() {
  console.log("── Patients ──────────────────────────");

  const patient = await createPatient({
    name: "Test Patient",
    email: "test.patient@example.com",
    phone: "9999999999",
  });
  console.log("Created:", patient.name, patient.id);

  const found = await getPatient(patient.id);
  console.log("Found:", found.name);

  const updated = await updatePatientPhone(
    patient.id,
    "8888888888",
  );
  console.log("Updated phone:", updated.phone);

  const results = await searchPatients("Test");
  console.log("Search results:", results.length);

  console.log("── Doctors ───────────────────────────");

  const doctor = await createDoctor({
    name: "Dr. Test",
    specialty: "General Medicine",
    email: "dr.test@hospital.io",
  });
  console.log("Created:", doctor.name, doctor.id);

  const specialists = await listDoctorsBySpecialty("General Medicine");
  console.log(
    "General Medicine doctors:",
    specialists.length,
  );

  console.log("── Appointments ──────────────────────");

  const appt = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date("2024-09-01T09:00:00"),
    notes: "Initial consultation",
  });
  console.log("Booked:", appt.id, "for patient", appt.patientId);

  const full = await getAppointmentFull(appt.id);
  console.log(
    "Full fetch:",
    full.patient.name,
    "with",
    full.doctor.name,
  );

  const schedule = await getDoctorUpcomingAppointments(
    doctor.id,
  );
  console.log(
    "Doctor schedule:",
    schedule.length,
    "appointment(s)",
  );

  const cancelled = await setAppointmentStatus(
    appt.id,
    "cancelled",
  );
  console.log("Status updated to:", cancelled.status);

  console.log("── Cleanup ───────────────────────────");

  await prisma.appointment.delete({
    where: { id: appt.id },
  });

  await prisma.patient.delete({
    where: { id: patient.id },
  });

  await prisma.doctor.delete({
    where: { id: doctor.id },
  });

  console.log("Test data cleaned up.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
import { prisma } from "./lib/prisma.js";

// Create an appointment
export async function bookAppointment(data: {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
  notes?: string;
}) {
  return prisma.appointment.create({
    data: {
  appointmentDate: data.appointmentDate,
  ...(data.notes !== undefined && { notes: data.notes }),
  patient: {
    connect: { id: data.patientId },
  },
  doctor: {
    connect: { id: data.doctorId },
  },
},
  });
}

// Get an appointment with full patient + doctor details
export async function getAppointmentFull(id: number) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (appointment === null) {
    throw new Error("Appointment not found");
  }

  return appointment;
}

// Get upcoming appointments for a doctor
export async function getDoctorUpcomingAppointments(doctorId: number) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      appointmentDate: "asc",
    },
    include: {
      patient: true,
    },
  });
}

// Change appointment status
export async function setAppointmentStatus(
  id: number,
  status: string,
) {
  return prisma.appointment.update({
    where: { id },
    data: { status },
  });
}

// Cancel all appointments for a patient
export async function cancelAllPatientAppointments(patientId: number) {
  return prisma.appointment.updateMany({
    where: {
      patientId,
      status: "scheduled",
    },
    data: {
      status: "cancelled",
    },
  });
}

// Delete an appointment
export async function deleteAppointment(id: number) {
  return prisma.appointment.delete({
    where: { id },
  });
}
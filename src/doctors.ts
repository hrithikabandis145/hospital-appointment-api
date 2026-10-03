import { prisma } from "./lib/prisma.js";

// Create
export async function createDoctor(data: {
  name: string;
  specialty: string;
  email: string;
}) {
  return prisma.doctor.create({ data });
}

// Read one
export async function getDoctor(id: number) {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
  });

  if (doctor === null) {
    throw new Error("Doctor not found");
  }

  return doctor;
}

// Read many — filter by specialty
export async function listDoctorsBySpecialty(specialty: string) {
  return prisma.doctor.findMany({
    where: { specialty },
    orderBy: { name: "asc" },
  });
}

// Delete
export async function deleteDoctor(id: number) {
  return prisma.doctor.delete({
    where: { id },
  });
}
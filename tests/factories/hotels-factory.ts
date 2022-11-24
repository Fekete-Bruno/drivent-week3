import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.city(),
      updatedAt: new Date()
    }
  });
}

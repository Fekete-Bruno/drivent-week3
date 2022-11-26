import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId
    },
    include: {
      Hotel: true
    }
  });
}

const hotelRepository = {
  findHotels,
  findHotelRooms
};

export default hotelRepository;

import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

async function getHotels() {
  const hotelData = await hotelRepository.findHotels();

  if(!hotelData) {
    throw notFoundError();
  }
  return hotelData;
}

async function getHotelRooms(hotelId: number) {
  if(isNaN(hotelId)) {
    throw notFoundError();
  }
  const roomData = await hotelRepository.findHotelRooms(hotelId);
  return roomData;
}

const hotelService = {
  getHotels,
  getHotelRooms
};

export default hotelService;

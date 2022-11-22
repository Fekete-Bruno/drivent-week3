import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

async function getHotels() {
  const hotelData = await hotelRepository.findHotels();

  if(!hotelData) {
    throw notFoundError();
  }
  return hotelData;
}

const hotelService = {
  getHotels
};

export default hotelService;

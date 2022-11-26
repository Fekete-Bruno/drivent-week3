import { notFoundError, requestError, forbiddenError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(ticket.status===TicketStatus.RESERVED) {
    throw forbiddenError();
  }
  if(ticket.TicketType.isRemote===true) {
    throw forbiddenError();
  }
  if(ticket.TicketType.includesHotel===false) {
    throw forbiddenError();
  }
  
  const hotelData = await hotelRepository.findHotels();
  if(!hotelData) {
    throw notFoundError();
  }
  return hotelData;
}

async function getHotelRooms(hotelId: number, userId: number) {
  if(isNaN(hotelId)) {
    throw requestError(httpStatus.BAD_REQUEST, "BAD REQUEST");
  }

  const roomData = await hotelRepository.findHotelRooms(hotelId);
  
  if(roomData.length===0) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(ticket.status===TicketStatus.RESERVED) {
    throw forbiddenError();
  }
  if(ticket.TicketType.isRemote===true) {
    throw forbiddenError();
  }
  if(ticket.TicketType.includesHotel===false) {
    throw forbiddenError();
  }

  return roomData;
}

const hotelService = {
  getHotels,
  getHotelRooms
};

export default hotelService;

import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(_req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  try {
    const rooms = await hotelService.getHotelRooms(Number(hotelId));
    return res.status(httpStatus.OK).send(rooms);
  } catch (error) { 
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

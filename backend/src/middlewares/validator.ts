import { MyEvent } from "../models/eventModel";

export function isEventValid(event: MyEvent): boolean {
  // Check if all required fields are present
  if (!event.description || !event.price || !event.start || !event.end) {
    return false;
  }

  // Check if price is a positive number
  if (typeof event.price !== "number" || event.price <= 0) {
    return false;
  }

  // Check if start date is before end date
  if (event.start >= event.end) {
    return false;
  }

  // Add more validation rules as needed

  return true;
}

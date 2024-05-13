import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyEvent } from "../types";
import BigCalendarRednerer from "./bigCalendarRednerer";
import {
  EventDeleteHandler,
  SaveEventHandler,
} from "../Handlers/handlerCalendar";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS
import "./containers.css"; // Import CSS

/**
 * BigCalendar component renders the main calendar view and handles event management.
 */
const BigCalendar: React.FC = () => {
  // Select events from Redux store
  const myEvents: MyEvent[] = useSelector((state: any) => state.event.events);
  const dispatch = useDispatch();

  // Effect hook to perform actions after render
  useEffect(() => {
    // Add dependencies to prevent unnecessary renders
  }, [dispatch, myEvents]);

  // State variables to manage modals
  const [openNewEventPortal, setOpenNewEventPortal] = useState(false);
  const [openEditEventPortal, setOpenEditEventPortal] = useState(false);
  const [event, setEvent] = useState<any>();

  // Close modal handler
  const handleClose = () => {
    setOpenNewEventPortal(false);
    setOpenEditEventPortal(false);
  };

  // Delete event handler
  const handleDelete = () => {
    EventDeleteHandler(event, dispatch, handleClose);
  };

  // Save event handler
  const handleSaveEvent = (newEvent: any) => {
    SaveEventHandler(newEvent, myEvents, dispatch, handleClose);
  };

  // Open new event modal handler
  const OpenNewEventPortal = () => {
    setOpenNewEventPortal(true);
  };

  // Open edit event modal handler
  const OpenEditEventPortal = () => {
    setOpenEditEventPortal(true);
  };

  return (
    <>
      {/* Render the BigCalendarRednerer component */}
      <BigCalendarRednerer
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSaveEvent={handleSaveEvent}
        OpenEditEventPortal={OpenEditEventPortal}
        OpenNewEventPortal={OpenNewEventPortal}
        openEditEventPortal={openEditEventPortal}
        openNewEventPortal={openNewEventPortal}
        event={event}
        setEvent={setEvent}
      />
    </>
  );
};

export default BigCalendar;

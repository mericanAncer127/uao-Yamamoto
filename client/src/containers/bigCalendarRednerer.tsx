import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime, Settings } from "luxon";
import moment from "moment";

import {
  Calendar,
  Views,
  Event,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { updateEvent } from "../store/eventSlice";
import { sendUpdateEventRequest } from "../store/request";
import { MyEvent } from "../types";

import EventPortal from "../components/Calendar/eventPortal";

const defaultTZ = DateTime.local().zoneName;

const DnDCalendar = withDragAndDrop<Event>(
  Calendar as React.ComponentType<CalendarProps<Event>>
);

// Set up the localizer to use moment.js for date formatting
moment.locale("en");
const mylocalizer = momentLocalizer(moment);

interface BigCalendarRednererProps {
  handleClose: () => void;
  handleDelete: () => void;
  handleSaveEvent: (newEvent: any) => void;
  OpenNewEventPortal: () => void;
  OpenEditEventPortal: () => void;
  openNewEventPortal: boolean;
  openEditEventPortal: boolean;
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>; // Define the type of setEvent setter function
}
const BigCalendarRednerer: React.FC<BigCalendarRednererProps> = (props) => {
  const {
    handleClose,
    handleDelete,
    handleSaveEvent,
    OpenNewEventPortal,
    OpenEditEventPortal,
    event,
    setEvent,
    openNewEventPortal,
    openEditEventPortal,
  } = props;
  const myEvents: MyEvent[] = useSelector((state: any) => state.event.events);
  const dispatch = useDispatch();

  const [timezone] = useState(defaultTZ);

  const { localizer, scrollToTime, getNow } = useMemo(() => {
    Settings.defaultZone = timezone;
    return {
      localizer: mylocalizer,
      scrollToTime: DateTime.local().toJSDate(),
      getNow: () => DateTime.local().toJSDate(),
    };
  }, [timezone]);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }: any) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      sendUpdateEventRequest(event.id, { ...event, start: start, end: end })
        .then((res) => res.data)
        .then((updatedEvent) => {
          dispatch(updateEvent({ ...event, start: start, end: end }));
        });
    },
    [dispatch]
  );

  const newEvent = useCallback(
    (event: Event) => {
      // Assuming setMyEvents is a state setter function for your events
      setEvent(event);
      OpenNewEventPortal();
    },
    [dispatch]
  );

  const resizeEvent = useCallback(
    ({ event, start, end } : any) => {
      // Assuming setMyEvents is a state setter function for your events
      sendUpdateEventRequest(event.id, { ...event, start: start, end: end })
        .then((res) => res.data)
        .then((updatedEvent) => {
          dispatch(updateEvent({ ...event, start: start, end: end }));
        });
    },
    [dispatch]
  );

  const onSelectEvent = useCallback(
    (event : any) => {
      setEvent(event);
      OpenEditEventPortal();
    },
    [dispatch]
  );

  return (
    <div className="App">
      {myEvents && (
        <DnDCalendar
          events={myEvents}
          style={{
            height: "calc(100vh - 130px)",
            width: "100%",
            padding: "20px",
          }}
          defaultView={Views.WEEK}
          defaultDate={new Date()}
          scrollToTime={scrollToTime}
          localizer={localizer}
          getNow={getNow}
          timeslots={12}
          step={5}
          dayLayoutAlgorithm="no-overlap"
          draggableAccessor={() => true}
          resizableAccessor={() => true}
          selectable
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={newEvent}
          onSelectEvent={onSelectEvent}
        />
      )}
      {/* New Event Portal */}
      <EventPortal
        id=""
        title="Create New Event"
        open={openNewEventPortal}
        baseDescription={""}
        basePrice={event?.price}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSave={handleSaveEvent}
        start={event?.start || new Date()}
        end={event?.end || new Date()}
      />
      {/* Edit Event Portal */}
      <EventPortal
        id={event?.id || ""}
        title="Edit Event"
        open={openEditEventPortal}
        baseDescription={event?.description}
        basePrice={event?.price}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSave={handleSaveEvent}
        start={event?.start || new Date()}
        end={event?.end || new Date()}
      />
    </div>
  );
};

export default BigCalendarRednerer;

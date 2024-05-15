import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { MyEvent } from "../types";
import { formatDateToYYYYMMDDHHMMSS } from "../utils/common";

interface EventListItemProps {
  event: MyEvent;
}
/**
 * EventListItem component renders a single event item in the list
 * It displays the start and end date/time, description, and price of the event
 */
const EventListItem: React.FC<EventListItemProps> = (props) => {
  const { event } = props;

  return (
    <ListItem component="div" disablePadding>
      <ListItemButton>
        <ListItemText
          primary={`${formatDateToYYYYMMDDHHMMSS(
            event.start
          )} ~ ${formatDateToYYYYMMDDHHMMSS(event.end)} - ${
            event.description
          } Price ${event.price}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

interface EventListProps {
  events: MyEvent[];
}

const EventList: React.FC<EventListProps> = (props) => {
  const { events } = props;

  return (
    <div>{events.map((event: MyEvent) => EventListItem({ event: event }))}</div>
  );
};

export default EventList;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";

import { MyEvent } from "../types";
import EventList from "./eventsList";
import MyDateRangePicker from "../components/Calendar/myDateRangePicker";
import styled from "styled-components";
import { Box } from "@mui/material";

const Layout = styled(Box)({});

const EventSearch: React.FC = () => {
  const dispatch = useDispatch();
  const myEvents = useSelector((state: any) => state.event.events);

  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    dayjs(new Date()),
    dayjs(new Date()),
  ]);
  // const [end, setEnd] = useState(new Date());

  const filterEvents = (events: MyEvent[]) => {
    const [startDate, endDate] = dateRange;
    const r_startDate = new Date(
      startDate?.year() || 0,
      startDate?.month() || 0,
      startDate?.date() || 0
    );
    const r_endDate = new Date(
      endDate?.year() || 0,
      endDate?.month() || 0,
      endDate?.date() || 0,
      23,
      59,
      59
    );

    return events.filter(
      (event: MyEvent) =>
        (dayjs(event.start).isAfter(r_startDate) ||
          dayjs(event.start).isSame(r_startDate)) &&
        (dayjs(event.end).isBefore(r_endDate) ||
          dayjs(event.end).isSame(r_endDate))
    );
  };

  useEffect(() => {
    // dispatch(readEvents());
  }, [dispatch]);

  // const handleDateChange = (newRange: DateRange<Date>) => {};

  return (
    <Layout>
      <MyDateRangePicker
        handleDateChange={setDateRange}
        selectedRange={dateRange}
      />
      {myEvents ? (
        <EventList events={filterEvents(myEvents)} />
      ) : (
        <div>No Events During this Period</div>
      )}
    </Layout>
  );
};

export default EventSearch;

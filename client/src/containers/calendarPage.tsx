import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import BigCalendar from "./bigCalendar";
import EventSearch from "./eventSearch";

// Styled components for layout
const Layout = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-around",
});

const FlexItem = styled(Box)({
  margin: 30,
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "space-around",
});

/**
 * CalendarPage component displays the main layout of the calendar page
 * It contains the BigCalendar component and the EventSearch component
 */
const CalendarPage: React.FC = () => {
  return (
    <Layout>
      {/* BigCalendar component */}
      <FlexItem>
        <BigCalendar />
      </FlexItem>
      {/* EventSearch component */}
      <FlexItem>
        <EventSearch />
      </FlexItem>
    </Layout>
  );
};

export default CalendarPage;

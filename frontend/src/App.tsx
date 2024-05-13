import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import "./App.css";

import { useDispatch } from "react-redux";
import { sendGetAllEventsRequest } from "./store/request";
import { readEvents } from "./store/eventSlice";
import CalendarPage from "./containers/calendarPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    sendGetAllEventsRequest()
      .then((res) => res.data)
      .then((events) => {
        const myEvents: any = events.map((event) => ({
          id: event._id,
          description: event.description,
          title: event.description,
          price: event.price,
          start: new Date(event.start),
          end: new Date(event.end),
          allDay: false,
        }));
        dispatch(readEvents(myEvents));
      })
      .catch((err) => {
        console.log("Error in App init", err);
      });
  }, [dispatch]);

  return (
    <Router>
      <React.Fragment>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/webapp" />} />
            <Route path="/webapp" element={<CalendarPage />} />
          </Routes>
          {/* <CalendarPage /> */}
          {/* </Route> */}
        </main>
      </React.Fragment>
    </Router>
  );
}

export default App;

"use client";


import { Car } from "@/interfaces/Car";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useEffect, useState } from "react";
export default function Page() {

  const [cards, setCards] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setCards([])
    fetchEventSource('/api/cars/streaming', {
      onmessage(ev: EventSourceMessage) {
        console.log(ev.event)
        if (ev.event === 'car') {
          setCards(c => [...c, JSON.parse(ev.data)])
        } else if (ev.event === 'close') {
          setLoading(false)
        }
      }
    });

  }, []);

  const [colDefs, setColDefs] = useState<any[]>([
    { field: "make" },
    { field: "model" },
    { field: "year" },
    { field: "color" }
  ]);

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }}
    >
      <AgGridReact
        rowData={cards}
        columnDefs={colDefs}
      />
    </div>
  );
}

"use client";
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';

import { Card } from "@/components/Cards";
import { Car } from "@/interfaces/Car";
import { useEffect, useState } from "react";
import { useAuth } from 'oidc-react';

export default function Page() {
  const [cards, setCards] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = useAuth();

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

  
  return !auth.isLoading ? (
    <div className="h-full min-h-96">
      <h1 className="text-center h-8 align-middle	">Cars</h1>
      <div>        { auth.userData?.access_token }     </div>
      <div className="flex flex-wrap justify-center space-x-4">
      
        {cards.map((card) => (
          <Card
            key={card.id}
            imageSrc={"https://tecdn.b-cdn.net/img/new/standard/nature/182.webp"}
            title={card.model}
            description={card.make}
          />
        ))}

        {loading &&
          Array.from({ length: 3 - cards.length }).map((_, index) => (
            <Card key={`m-${index}`} />
          ))
        }
      </div>
    </div>
  ) : (<></>);
}

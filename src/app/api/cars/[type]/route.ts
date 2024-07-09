import { Car } from "@/interfaces/Car";
import { NextRequest, NextResponse } from "next/server";

// Sample data
const cars: Car[] = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020, color: 'blue', mileage: 15000, price: 20000 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, color: 'black', mileage: 20000, price: 18000 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021, color: 'red', mileage: 5000, price: 30000 },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest, { params }: { params: { type: string } }): Promise<NextResponse> {
    const { type } = params
    if (type.toLocaleLowerCase() === "streaming") {
        const stream = new ReadableStream({
            async start(controller) {
                for (let i = 0; i < cars.length; i++) {
                    const car = cars[i];
                    const eventId = i + 1; // Event ID starts from 1
                    const eventType = 'car';
                    const data = `id: ${eventId}\nevent: ${eventType}\ndata: ${JSON.stringify(car)}\n\n`;
                    controller.enqueue(new TextEncoder().encode(data));
                    await sleep(1000); // Sleep for 1 second between each car
                }
                const data = `event: close\ndata: success\n\n`;
                controller.enqueue(new TextEncoder().encode(data));

                controller.close();
            }
        });
        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
            status: 200,
        });
    } else {
        return NextResponse.json(cars, { status: 200 })
    }

}
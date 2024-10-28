"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from '@/components/ui/button'
import Link from "next/link";
import {useEffect, useState} from "react";
// import { useEffect, useState } from 'react';
// import {sleep} from '@/lib/utils'


type ParkingSpace = {
    lot_id: string;
    is_reserved: boolean;
    id: string;
    space_no: string;
    type: string;
    status: string;
};

const limit = 5;

export default function ParkingAvailability() {
    const [spaces, setSpaces] = useState<ParkingSpace[]>([]);
    const [cursor, setCursor] = useState<string | null>(
        typeof window !== 'undefined' ? localStorage.getItem("cursor") : null
    );

    useEffect(() => {
        const fetchSpaces = async () => {
            const response = await fetch(`url.com-spaces?limit=${limit}&cursor=${cursor}`);
            const res = await response.json();

            if (typeof window !== 'undefined') {
                localStorage.setItem("cursor", res.cursor);
                setCursor(res.cursor);
            }

            setSpaces(res.items || []);
        };

        fetchSpaces();
    }, [cursor]);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Available Parking Spaces</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space) => (
                    <Card key={space.id} className={space.status === 'available' ? 'border-green-500' : ''}>
                        <CardHeader>
                            <CardTitle>{space.space_no}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="capitalize mb-4">{space.status}</p>
                            {space.status === 'available' && (
                                <Link href={"/reserve"}>
                                    <Button>Reserve</Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}















// const spaces = [
//     { id: 'A1', status: 'available' },
//     { id: 'A2', status: 'occupied' },
//     { id: 'B1', status: 'available' },
//     { id: 'B2', status: 'reserved' },
//     { id: 'C1', status: 'available' },
//     { id: 'C2', status: 'maintenance' },
// ]
// let spaces, cursor;
//
// const limit = 5;
// const cursor = typeof window !== 'undefined' ? localStorage.getItem("cursor") || null : null;
//
// const fetchSpaces = async () => {
//     const response = await fetch(`https://8nfkxjqve1.execute-api.us-east-1.amazonaws.com/dev/available-spaces?limit=${limit}&cursor=${cursor}`);
//     const res = await response.json();
//
//     if (typeof window !== 'undefined') {
//         localStorage.setItem("cursor", res.cursor);
//     }
//
//     return res.items || [];
// };
//
// const  spaces = await fetchSpaces();
//
//
//
// export default async function ParkingAvailability() {
//     // await sleep(2000)
//
//     return (
//         <div className="container mx-auto px-4 py-16">
//             <h1 className="text-3xl font-bold mb-8">Available Parking Spaces</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {spaces.map((space) => (
//                     <Card key={space.space_no} className={space.status === 'available' ? 'border-green-500' : ''}>
//                         <CardHeader>
//                             <CardTitle>{space.space_no}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="capitalize mb-4">{space.status}</p>
//                             {space.status === 'available' && (
//                                 <Link href={"/reserve"}>
//                                     <Button>Reserve</Button>
//                                 </Link>
//                             )}
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     )
// }

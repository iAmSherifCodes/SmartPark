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

    const [selectedTab, setSelectedTab] = useState<"available" | "all">("available");

    useEffect(() => {

        const fetchSpaces = async () => {
            const baseUrl = "https://kfxzkm0nzl.execute-api.us-east-1.amazonaws.com/webhook";
            const url =
                selectedTab === "available"
                    ? `${baseUrl}/available-spaces?limit=${limit}?cursor=${cursor}`
                    : `${baseUrl}/all-spaces?limit=${limit}?cursor=${cursor}`;

            // const response = await fetch(`https://kfxzkm0nzl.execute-api.us-east-1.amazonaws.com/webhook/available-spaces?limit=${limit}?cursor=${cursor}`, {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.error('Error:', error));

            console.log("RESPONSE:: ", response);
            const res = await response.json();

            // const res = {
            //     items: [
            //         {
            //             "reserved": false,
            //             "is_reserved": false,
            //             "space_no": "A0",
            //             "status": "available",
            //             "type": "regular"
            //         },
            //         {
            //             "reserved": false,
            //             "is_reserved": false,
            //             "space_no": "A9",
            //             "status": "available",
            //             "type": "regular"
            //         },
            //         {
            //             "reserved": false,
            //             "is_reserved": false,
            //             "space_no": "B5",
            //             "status": "available",
            //             "type": "regular"
            //         },
            //         {
            //             "reserved": true,
            //             "is_reserved": true,
            //             "space_no": "D1",
            //             "status": "unavailable",
            //             "type": "regular"
            //         },
            //         {
            //             "reserved": false,
            //             "is_reserved": false,
            //             "space_no": "A1",
            //             "status": "available",
            //             "type": "regular"
            //         },
            //         {
            //             "reserved": false,
            //             "is_reserved": false,
            //             "space_no": "A8",
            //             "status": "available",
            //             "type": "regular"
            //         },
            //         {
            //             "reserved": true,
            //             "is_reserved": true,
            //             "space_no": "D2",
            //             "status": "unavailable",
            //             "type": "regular"
            //         }, 
            //         {
            //             "reserved": true,
            //             "is_reserved": true,
            //             "space_no": "D3",
            //             "status": "unavailable",
            //             "type": "regular"
            //         },
            //     ],
            //     count: 3,
            //     cursor: "%7B%22space_no%22%3A%22A1%22%7D"
            // }

            if (typeof window !== 'undefined') {

                localStorage.setItem("cursor", res.cursor);

                setCursor(res.cursor);
            }

            setSpaces(res.items || []);
        };

        fetchSpaces();
    }, [cursor, selectedTab]);
    // }, [cursor]);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Parking Spaces</h1>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setSelectedTab("available")}
                    className={`px-4 py-2 rounded-md ${
                        selectedTab === "available" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    Available Spaces
                </button>
                <button
                    onClick={() => setSelectedTab("all")}
                    className={`px-4 py-2 rounded-md ${
                        selectedTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    All Spaces
                </button>
            </div>


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

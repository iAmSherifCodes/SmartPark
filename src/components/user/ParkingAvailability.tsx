// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
//
// const parkingSpaces = [
//     { id: "A1", status: "available" },
//     { id: "A2", status: "occupied" },
//     { id: "B1", status: "available" },
//     { id: "B2", status: "reserved" },
//     { id: "C1", status: "available" },
//     { id: "C2", status: "occupied" },
// ]
//
// export default function ParkingAvailability() {
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-4xl font-bold mb-8">Parking Space Availability</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {parkingSpaces.map((space) => (
//                     <Card key={space.id} className={space.status === "available" ? "bg-green-100" : space.status === "reserved" ? "bg-yellow-100" : "bg-red-100"}>
//                         <CardHeader>
//                             <CardTitle>Space {space.id}</CardTitle>
//                             <CardDescription>{space.status.charAt(0).toUpperCase() + space.status.slice(1)}</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="text-sm">
//                                 {space.status === "available"
//                                     ? "Ready for parking"
//                                     : space.status === "reserved"
//                                         ? "Reserved for future use"
//                                         : "Currently occupied"}
//                             </p>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     )
// }

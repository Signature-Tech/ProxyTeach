"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import schoolImage1 from "@/images/school-image-1.jpg"
import schoolImage2 from "@/images/school-image-2.jpg"
import schoolImage3 from "@/images/school-image-3.jpg"
import about from "@/images/about.jpg"

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { findProxy } from "@/app/action";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface ProxyTeacher {
    id: string | null;
    name: string | null;
    email: string | null;
}

interface ProxyResult {
    period: number | null;
    potentialProxies: ProxyTeacher[];
}

export function ProxyLayout() {

    const [potentialProxies, setPotentialProxies] = useState<ProxyResult[]>([])
    const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

    const handleDaySelect = (value: string) => {
        setSelectedDay(value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const result = await findProxy(formData, selectedDay);

        setPotentialProxies(result);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="w-full col-span-2">
                    <CardHeader>
                        <CardTitle>Teacher Search</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-row gap-4">
                                <Input
                                    name="ID"
                                    type="text"
                                    placeholder="Enter Teacher ID"
                                    className="w-full"
                                />
                                <Select onValueChange={(value) => handleDaySelect(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sunday">Sunday</SelectItem>
                                        <SelectItem value="Monday">Monday</SelectItem>
                                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                                        <SelectItem value="Thursday">Thursday</SelectItem>
                                        <SelectItem value="Friday">Friday</SelectItem>
                                        <SelectItem value="Saturday">Friday</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                                <Button type="submit" className="w-full">
                                    Search
                                </Button>
                        </form>
                        <div className="mt-6">
                            {potentialProxies.length > 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {potentialProxies.map((proxy, index) => (
                                        <Card key={index} className="overflow-hidden shadow-lg">
                                            <CardHeader className="bg-primary/10 pb-2">
                                                <CardTitle className="text-lg">Period: {proxy.period}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-4">
                                                {proxy.potentialProxies.map((teacher, teacherIndex) => (
                                                    <div key={teacherIndex} className="mb-4 last:mb-0">
                                                        <div className="flex items-center space-x-3">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${teacher.name}`} alt={teacher.name || ''} />
                                                                <AvatarFallback>{teacher.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h3 className="font-semibold">{teacher.name}</h3>
                                                                <p className="text-sm text-muted-foreground">{teacher.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No potential proxies found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-1 row-span-1">
                    <CardHeader>
                        <CardTitle>School Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Carousel className="w-full">
                            <CarouselContent>
                                {[1, 2, 3].map((index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={index === 1 ? schoolImage1 : index === 2 ? schoolImage2 : schoolImage3}
                                                alt={`School Image ${index}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </CardContent>
                </Card>
            </div>
            <footer className="mt-12 rounded-lg overflow-hidden">
                <div className="relative h-64 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <Image
                        src={about}
                        alt="Our School"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-6 text-center">
                    <p className="">© 2024 Our School. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
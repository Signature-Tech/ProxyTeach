"use client"

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import logo from '@/images/person.png'
import { ModeToggle } from './Toggle'

export default function Navbar({name} : {name : string}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="shadow-xl p-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 md:hidden">
                            <Image src={logo} alt="logo" width={50} height={50} />
                        </div>
                        <div className="hidden md:block">
                            <div className=" flex justify-between text-2xl font-semibold">
                                <Image src={logo} alt="logo" width={60} height={40} className='rounded-lg' />
                                <h1 className='pl-5 pt-6'>{name}</h1>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center ml-[300px]">
                            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium">
                                <Button variant={"secondary"}>Home</Button>
                            </Link>
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium">
                                <Button variant={"secondary"}>About</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center">
                            <ModeToggle />
                            {/* Add Sign Out Button */}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <div className="mr-2">
                            <ModeToggle />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden self-center">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium">
                            About
                        </Link>
                        {/* Add Sign Out Button */}
                    </div>
                </div>
            )}
        </nav>
    )
}
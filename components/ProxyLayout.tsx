"use client";

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ProxyLayout({ content }: { content: React.ReactNode }) {
  const getID = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (form) {
      const formData = new FormData(form);
      const ID = formData.get('ID');
      // Handle the ID as needed
      console.log(ID);
      
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-evenly md:flex-row">
        <div className="space-y-6">
          <form onSubmit={getID}>
            <Input
              name="ID"
              type="text"
              placeholder="Enter ID"
              className="w-full max-w-lg mb-4"
            />
            <Button type="submit">
              Search
            </Button>
          </form>
          <Card>
            <CardHeader>
              <CardTitle>Teacher Details</CardTitle>
            </CardHeader>
            <CardContent>
              {content}
            </CardContent>
          </Card>
        </div>
        <div>
          <Table className="md:w-[50rem]">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  Hello
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
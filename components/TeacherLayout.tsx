import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

export default function Teacher({name, picture} : { name: string, picture: StaticImageData }) {
  return (
    <Card className="max-w-[300px] p-2 m-9">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={picture} alt="Picture of the author" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button><Link href="/proxy">Find Proxy</Link></Button>
      </CardFooter>
    </Card>
  )
}

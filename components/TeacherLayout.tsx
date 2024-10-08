import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image, { StaticImageData } from "next/image"

export default function Teacher({ name, picture }: { name : string, picture: StaticImageData }) {
  return (
    <Card className="w-full max-w-[300px] mx-auto m-7">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video">
          <Image
            src={picture}
            alt="Card image"
            layout="fill"
            objectFit="scale-down"
            className="rounded-md"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-between">
        <Button className="w-full sm:w-auto">Find Proxy</Button>
      </CardFooter>
    </Card>
  )
}
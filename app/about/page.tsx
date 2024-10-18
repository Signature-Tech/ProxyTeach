import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Lightbulb, Target } from "lucide-react"
import placeholder from "@/images/placeholder.jpg"
import about from "@/images/about.jpg"
import NavbarComponent from "@/components/Navbar"

export default function Component() {
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">About ProxyTeach Hub</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Revolutionizing education continuity at BAF SEMC
            </p>
            <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
              <Image
                src={placeholder}
                alt="Students in a classroom"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl sm:text-2xl font-bold">Empowering Education</h2>
                <p className="text-sm sm:text-base">Ensuring every class, every day</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    Ensure uninterrupted, high-quality learning experiences for every student, every day.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Target className="mr-2 h-5 w-5" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    To create a world where education never stops, empowering students with continuous learning opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  How ProxyTeach Hub Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">1. Swift Response</h3>
                  <p className="text-sm sm:text-base">Our system instantly identifies classes affected by teacher absences.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">2. Expert Assignment</h3>
                  <p className="text-sm sm:text-base">We deploy qualified proxy teachers to seamlessly take over the class.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">3. Curriculum Continuity</h3>
                  <p className="text-sm sm:text-base">Proxy teachers collaborate with department heads to maintain educational flow.</p>
                </div>
                <div className="relative h-32 sm:h-40 rounded-lg overflow-hidden mt-4">
                  <Image
                    src={about}
                    alt="Teacher in action"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Innovation in Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm sm:text-base">
                  At ProxyTeacher Hub, 
                  <br /> we&apos;re pioneering new ways to ensure educational continuity . . .
                  <br /> Join us in shaping the future of education, where learning knows no boundaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
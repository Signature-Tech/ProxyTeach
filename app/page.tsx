
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import NavbarComponent from '@/components/Navbar'
import schoolImage1 from "@/images/about.jpg"
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {

  const session = await auth()

  if (!session) {
    redirect('api/auth/signin')
  }

  return (
    <div>
      <NavbarComponent />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-cover bg-center" style={{ backgroundImage: `url(${schoolImage1.src})` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 dark:from-background to-transparent z-10"></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 md:ml-16">Find Your Perfect Proxy Teacher</h1>
                <p className="text-xl mb-6 md:ml-16">Seamlessly connect with qualified educators for your classroom needs.</p>
                <Button size="lg" className="md:ml-16"><Link href="#cta">Get Started</Link></Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Quick Matching", description: "Find the right teacher in minutes", icon: "⚡" },
                { title: "Verified Professionals", description: "All teachers are screened and certified", icon: "✅" },
                { title: "Flexible Scheduling", description: "Book teachers when you need them", icon: "🗓️" }
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="text-center p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              {[
                { step: 1, title: "Create a Request", description: "Specify your needs and schedule" },
                { step: 2, title: "Get Matched", description: "We'll find the perfect teacher for you" },
                { step: 3, title: "Confirm Booking", description: "Approve and finalize the arrangement" }
              ].map((item, index) => (
                <div key={index} className="text-center mb-8 md:mb-0">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Proxy Teacher?</h2>
            <Link href="/proxy"><Button size="lg" variant="secondary">Find Proxy</Button></Link>
          </div>
        </section>
      </div>
    </div>
  )
}

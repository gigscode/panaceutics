import { Button } from "@/components/ui/button"
import { MessageCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { WHATSAPP_NUMBER } from "@/lib/config"

export function BookCall() {
  const message = "Hi, I'd like to learn more about your products and solutions."
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div>
              <img
                src="/herbthree.jpg"
                alt="Product consultation"
                className="w-full h-[500px] object-cover rounded-2xl shadow-md"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-medium text-foreground">
                  Need More Details About Panaceutics?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Speak directly with our experts to find the perfect plant-based solutions for your needs.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Personalized product matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Usage instructions & benefits</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Science-backed recommendations</span>
                </div>
              </div>

              <Link href={whatsappUrl} target="_blank">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold transition-all duration-300"
                >
                  Book an Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// app/about/page.jsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Microscope, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Nature First",
      description: "We believe the most elegant solutions already exist in nature. Our role is to understand and harness them responsibly."
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Scientific Rigor",
      description: "Every botanical formulation undergoes rigorous testing and validation through advanced laboratory technologies."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "We're committed to making proven plant-based medicines accessible and affordable worldwide."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Patient Centered",
      description: "Our research always begins and ends with the people we serve. Their health outcomes drive our innovation."
    }
  ]

  const milestones = [
    { year: "2018", event: "Panaceutics Founded", description: "Established with a vision to bridge traditional plant wisdom and modern science" },
    { year: "2019", event: "Research Facility", description: "Opened state-of-the-art phytochemistry laboratory" },
    { year: "2020", event: "Malaria Breakthrough", description: "Published groundbreaking research on Artemisia synergy" },
    { year: "2021", event: "Global Expansion", description: "Began operations in 15+ countries across Africa and Asia" },
    { year: "2022", event: "Clinical Trials", description: "Initiated Phase II trials for botanical anti-malarial formulation" },
    { year: "2023", event: "25,000+ Lives", description: "Reached milestone of improving lives across 25 countries" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dsaqsxtup/image/upload/v1760820525/8926_i3ygvk.jpg')" }}>
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wide">
            ABOUT US
          </h1>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Founding Principle
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                For millennia, nature has been humanity's most profound pharmacy. From the willow bark that eased pain to the Artemisia plant that tames malaria, the Earth has always provided the blueprints for healing.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Panaceutics was founded on a radical return to this first principle. We believe that the solutions to some of our most persistent diseases are growing in the world around us, waiting to be understood through both traditional wisdom and modern science.
              </p>
              <div className="bg-green-700/200 border-l-4 border-green-900 p-6 rounded-r-lg">
                <p className="text-green-800 font-medium italic">
                  "Where the cure is natural, but the proof is scientific. For a disease whose treatment exists in nature, no human should die needlessly."
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a world where plant-based medicines are rigorously validated, widely accessible, and integrated into mainstream healthcare systems worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary text-white p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold mb-2">25K+</div>
                  <div className="text-sm opacity-90">Lives Improved</div>
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold mb-2">25+</div>
                  <div className="text-sm opacity-90">Countries Served</div>
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold mb-2">100+</div>
                  <div className="text-sm opacity-90">Research Studies</div>
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl text-center">
                  <div className="text-2xl font-bold mb-2">98%</div>
                  <div className="text-sm opacity-90">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide every discovery, formulation, and partnership at Panaceutics
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From a simple idea to a global mission of healing through nature
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-800 h-full"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-primary font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                    
                    {/* Spacer */}
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Revolutionizing Healthcare
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Whether you're a researcher, partner, or supporter, there's a place for you in our mission to bring nature's cures to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             {/* <Link href="/careers">
                <Button size="lg" className="bg-white text-primary hover:bg-green-50">
                  Explore Careers
                </Button>
              </Link>
              <Link href="/partnerships">
                <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10">
                  Become a Partner
                </Button>
              </Link>*/}
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
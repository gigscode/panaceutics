// components/mission-section.jsx
export function MissionSection() {
  return (
    <section className="py-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/herbthree.jpg')" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">
            Where Ancient Wisdom Meets Modern Science
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            For millennia, nature has been humanity's most profound pharmacy. From the willow bark that eased pain to the Artemisia plant that tames malaria, the Earth has always provided the blueprints for healing. Yet, in our modern world, this ancient wisdom is often overlooked.
          </p>
          <p className="text-lg text-gray-200 mb-8">
            Panaceutics was founded on a radical return to this first principle. We are a new kind of healthcare company, built on the conviction that the solutions to some of our most persistent diseases—like the recrudescence of malaria with its hidden tissue reservoirs—are growing in the world around us.
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-6 text-left">
            <p className="text-green-800 font-semibold italic">
              "Where the cure is natural, but the proof is scientific. For a disease whose treatment exists in nature, no human should die needlessly."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
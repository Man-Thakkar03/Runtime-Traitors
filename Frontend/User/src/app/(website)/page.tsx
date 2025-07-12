import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0f2d] to-[#1e2455] min-h-screen w-full flex flex-col">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl flex-grow flex flex-col items-center justify-center pt-10 pb-10">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8">
          Transform Your<br />Instagram Engagement<br />with Slide
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12">
          Slide revolutionizes how you connect with your audience on Instagram. Automate 
          responses and boost engagement effortlessly, turning interactions into valuable business
          opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 h-auto text-lg rounded-md"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            className="bg-white text-slate-900 hover:bg-gray-100 font-medium px-8 py-6 h-auto text-lg rounded-md border-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}


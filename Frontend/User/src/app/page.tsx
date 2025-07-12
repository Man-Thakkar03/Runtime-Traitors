'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Zap, Users, BarChart, MessageSquare, Star, ChevronRight, Calendar, Play, Heart, Shield, Gift, Sparkles, ArrowUpRight, Globe, ExternalLink, Award, Rocket } from 'lucide-react';
import { LogoSmallTransparent } from '@/svgs/logo-small-transparent';
import { LogoSmall } from '@/svgs/logo-small';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const features = [
  {
    name: 'Real-time Collaboration',
    description: 'Connect your team with instant messaging, media sharing, and interactive reactions for seamless communication.',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Event & Calendar Management',
    description: 'Plan, organize and track events with integrated scheduling, RSVPs, reminders and calendar sync.',
    icon: Calendar,
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Data-driven Insights',
    description: 'Gather valuable feedback and make informed decisions with interactive polls, surveys and visualized results.',
    icon: BarChart,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    name: 'Community Forums',
    description: 'Build knowledge bases with organized discussions, upvoting, and expert verification features.',
    icon: Users,
    color: 'from-amber-500 to-amber-600'
  },

  {
    name: 'Third-party Integrations',
    description: 'Boost productivity by seamlessly connecting with your favorite tools and existing workflows.',
    icon: Zap,
    color: 'from-cyan-500 to-cyan-600'
  },
];

// Testimonials removed as requested

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#101010] text-white">
      {/* Navigation */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg px-4 sm:px-6 lg:px-8 border-b",
        isScrolled ? "py-2 bg-[#0A0A0A]/95 border-[#1F1F1F]" : "py-4 bg-transparent border-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center group z-50">
            <div className="h-10 w-32 sm:h-11 sm:w-36 transition-all duration-300 transform group-hover:scale-105">
              <LogoSmallTransparent />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="#features" 
              className="px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
            >
              How it works
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <SignedIn>
              <UserButton />
              <Button 
                onClick={() => router.push('/dashboard')} 
                className="h-10 px-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 text-sm font-medium"
              >
                Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignedIn>
            <SignedOut>
              <Button 
                variant="outline" 
                onClick={() => router.push('/sign-in')}
                className="h-10 px-5 text-gray-300 border-gray-700 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push('/dashboard')}
                className="h-10 px-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 text-sm font-medium"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/3 -left-64 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="ml-3 text-sm font-medium text-white">New Feature: Interactive Polls with Live Results</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Connect, Engage,<br className="hidden md:block" /> Grow Together
            </h1>
            <p className="text-lg sm:text-xl text-gray-300/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Your all-in-one platform for community building, event management, and seamless team collaboration. Join thousands of thriving communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-purple-500/20 transition-all duration-200 hover:-translate-y-1"
                onClick={() => router.push(isSignedIn ? '/dashboard' : '/sign-up')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-gray-700 text-white hover:bg-white/5 rounded-full transition-all group duration-200"
              >
                <Play className="mr-2 h-5 w-5 text-purple-400 group-hover:text-white" />
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 sm:mt-16">
              <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/10 via-blue-800/10 to-transparent"></div>
                <Image
                  src="/image.png"
                  alt="Dashboard Preview"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-40"></div>
              </div>
            </div>
            
            <div className="mt-10 sm:mt-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-[#0F0F0F] flex items-center justify-center font-medium text-xs"
                    >
                      {['A', 'B', 'C', 'D', 'E'][i-1]}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" fill="#facc15" />
                    ))}
                  </div>
                  <span className="text-gray-300">
                    <span className="font-medium text-white">4.9/5</span> from <span className="font-medium text-white">10,000+</span> reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Everything Your Community Needs
            </h2>
            <p className="text-lg text-gray-300/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed to boost engagement, streamline management, and foster meaningful connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card 
                key={i} 
                className="h-full p-8 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 overflow-hidden group relative"
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 group-hover:scale-150 transition-transform duration-700"></div>
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color}/20 flex items-center justify-center mb-5 relative`}>
                  <feature.icon className={`h-6 w-6 text-white`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.name}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button 
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full py-3 px-7 transition-all hover:border-white/30"
              onClick={() => router.push('/sign-up')}
            >
              Explore All Features
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#080808] to-[#101010] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2C2C2C_0%,_transparent_70%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Getting Started Is <span className="text-blue-400">Easy</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to engage your community and start collaborating effectively.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 hidden md:block -translate-y-1/2"></div>
            
            {[
              {
                step: '1',
                title: 'Create Your Space',
                description: 'Set up your community space in minutes with our intuitive dashboard and customization options.',
                icon: Rocket
              },
              {
                step: '2',
                title: 'Invite Your Team',
                description: 'Bring your community together with simple invitation tools and secure onboarding.',
                icon: Users
              },
              {
                step: '3',
                title: 'Engage & Grow',
                description: 'Foster engagement with our comprehensive toolkit and watch your community thrive.',
                icon: Award
              }
            ].map((item, i) => (
              <div key={i} className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 card-hover">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center z-10 shadow-lg">
                  <span className="font-bold text-white">{item.step}</span>
                </div>
                <div className="mt-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-white/5 mx-auto flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-purple-500/20 transition-all duration-200 hover:-translate-y-1"
              onClick={() => router.push(isSignedIn ? '/dashboard' : '/sign-up')}
            >
              Start Your Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-y border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to build your community?</h2>
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            Join thousands of teams already using Slice to connect, engage, and grow their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-purple-500/20 transition-all duration-200 hover:-translate-y-1"
              onClick={() => router.push(isSignedIn ? '/dashboard' : '/sign-up')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-700 text-white hover:bg-white/5 text-lg px-8 py-6 rounded-full transition-all"
              onClick={() => router.push('/dashboard')}
            >
              Try as Guest
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-[#080808] border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto border-t border-[#1F1F1F]">
          <div className="flex flex-row justify-between items-center flex-wrap gap-4 pt-8">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Slice. All rights reserved.</p>
            <ul className="flex space-x-6">
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm hover:underline">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm hover:underline">Cookie Policy</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm hover:underline">Accessibility</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

     
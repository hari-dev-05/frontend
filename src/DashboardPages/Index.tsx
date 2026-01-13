import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Curriculum from "@/components/Curriculum";
import Features from "@/components/Features";
import CreateWithAI from "@/components/CreateWithAI";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";

import WebinarRegistration from "@/components/WebinarRegistration";
import NextSession from "@/components/NextSession";
import Trainers from "@/components/Trainers";
import JoinBanner from "@/components/JoinBanner";
import Footer from "@/components/Footer";
import GennyChatWidget from "@/components/GennyChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <NextSession />
      <section id="about">
        <About />
      </section>
      <section id="curriculum">
        <Curriculum />
      </section>
      <Features />
      <section id="trainers">
        <Trainers />
      </section>
      <CreateWithAI />
      <section id="webinar">
        <WebinarRegistration />
      </section>
      <Testimonials />
      <section id="pricing">
        <Pricing />
      </section>






      <JoinBanner />
      <Footer />
      <GennyChatWidget />
    </div>
  );
};

export default Index;

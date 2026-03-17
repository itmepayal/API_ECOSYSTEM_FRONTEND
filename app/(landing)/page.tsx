import { lazy } from "react";
import Section from "@/components/primitives/section";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";

// Lazy load landing page sections
const Hero = lazy(() => import("@/components/landing/hero/hero"));
const Feature = lazy(() => import("@/components/landing/features/feature"));
const Documents = lazy(() => import("@/components/landing/docs/docs"));
const Playground = lazy(
  () => import("@/components/landing/playground/playground")
);
const Ecosystem = lazy(
  () => import("@/components/landing/ecosystem/ecosystem")
);
const TechStack = lazy(
  () => import("@/components/landing/technologies/tech-stack")
);
const Footer = lazy(() => import("@/components/landing/footer/footer"));

const Home = () => {
  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Sections */}
      <Section>
        <Hero />
      </Section>
      <Section>
        <Feature />
      </Section>
      <Section>
        <Documents />
      </Section>
      <Section>
        <Playground />
      </Section>
      <Section>
        <Ecosystem />
      </Section>
      <Section>
        <TechStack />
      </Section>
      <Section>
        <Footer />
      </Section>
    </>
  );
};

export default Home;

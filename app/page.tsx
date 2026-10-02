"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowRight, ExternalLink, ChevronRight, Menu, X } from "lucide-react";

const projects = [
  {
    title: "Grill Junction",
    subtitle: "A fully responsive ordering platform that lets customers browse the menu, customise dishes, and check out in seconds. Built for speed and clarity, it turned a local favourite into a digital-first brand.",
    industry: "Food & Grills",
    description:
      "A fully responsive ordering platform that lets customers browse the menu, customise dishes, and check out in seconds. Built for speed and clarity, it turned a local favourite into a digital-first brand.",
    services: ["Web Design", "Development", "Ordering System"],
    technologies: ["Next.js", "Resend", "Supabase"],
    image: "/projects/grill-website.png",
    liveUrl: "https://www.grillsjunction.com.ng/",
    // caseStudyUrl: "#",
    challenge:
      "The business needed a more professional online presence and an easier way for customers to understand its services and order online.",
    solution:
      "Designed and developed a modern responsive website focused on clarity, trust, speed, and conversion.",
    result:
      "A much stronger digital presence designed to make it easier for customers to understand the business and take action.",
  },
  {
    title: "Bright Grills",
    subtitle:
      "A premium grill experience brought online for one of Abuja’s distinctive private grill brands, known for serving high-profile clients, private events, and special occasions.",
    industry: "Food & Grills",
    description:
      "A premium, fully responsive website built to showcase Bright Grills’ private grilling experience, signature dishes, events, and reservation services. The site combines strong visual storytelling with a clear booking experience, giving the brand a digital presence that matches the quality and exclusivity of its real-world service.",
    services: ["Web Design", "Development", "Reservation System"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Resend", "Framer Motion"],
    image: "/projects/grillsite2.png",
    liveUrl: "https://www.brightgrillzz.com/",
    // caseStudyUrl: "#",
    challenge:
      "Bright Grills had built a strong reputation in Abuja through premium private grilling, events, and high-profile clients, but needed an online presence that properly communicated the experience, personality, and quality behind the brand.",
    solution:
      "Designed and developed a premium, mobile-first website centered around the grill master, signature dishes, event services, visual storytelling, and a streamlined reservation experience.",
    result:
      "A stronger digital presence that positions Bright Grills as a premium Abuja grill brand, showcases the experience behind the food, and gives potential customers a clear path from discovering the brand to making a reservation.",
  },
  {
    title: "The Pastry Picasso",
    subtitle:
      "A modern digital presence for a Lagos food and grill brand built around flavour, presentation, and personal service.",
    industry: "Food & Grills",
    description:
      "A premium, mobile-first website designed for a Lagos-based food entrepreneur offering grilled dishes, catering, and made-to-order experiences. The website gives the brand a polished online presence while making it easier for customers to explore offerings, understand the business, and get in touch.",
    services: ["Web Design", "Development", "Ordering Experience"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/project4.png",
    liveUrl: "https://www.thepastrypicasso.com.ng/",
    // caseStudyUrl: "#",
    challenge:
      "The business needed a stronger digital presence that reflected the quality of the food and gave customers a clearer way to discover the brand, explore its offerings, and place enquiries or orders.",
    solution:
      "Designed and developed a clean, visually driven website centered around the food, the founder's brand, and the customer experience, with a responsive layout and clear calls to action throughout.",
    result:
      "A more professional online presence that helps the business showcase its work, build trust with new customers, and turn social-media interest into enquiries and potential orders.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};


function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-32 lg:py-40 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8">{children}</div>
    </section>
  );
}

function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900";
  const variants = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900",
    secondary:
      "bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:ring-neutral-900",
    ghost:
      "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-900",
  };

  const Comp = external ? "a" : Link;
  const props = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Comp
      {...props}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Comp>
  );
}

function AnimatedText({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-neutral-900"
          >
            <span className="font-light tracking-tight text-neutral-500">Design with</span>
            <span className="font-bold tracking-tight text-neutral-900"> Steve</span>
            <span className="text-orange-500 font-black">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[13px] font-medium tracking-tight text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Button href="#contact" className="px-5 py-2.5 text-[13px]">
              Start a Project
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex h-full flex-col justify-center px-8">
          <nav className="flex flex-col gap-6">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={false}
                animate={
                  mobileOpen
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.4,
                  delay: mobileOpen ? i * 0.06 : 0,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-semibold tracking-tight text-neutral-900"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={false}
              animate={
                mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.4,
                delay: mobileOpen ? 0.24 : 0,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="pt-4"
            >
              <Button
                href="#contact"
                className="w-full justify-center py-4 text-base"
                onClick={() => setMobileOpen(false)}
              >
                Start a Project
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div style={{ y, opacity }} className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-900"
          >
            I build websites
            <br />
            That prints money
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-500 md:text-xl"
          >
            Modern, high-converting websites built for businesses that want to
            look as good online as they are in real life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#work" className="px-8 py-4 text-base">
              View My Work
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              className="px-8 py-4 text-base"
            >
              Start a Project
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium tracking-tight text-neutral-400"
          >
            <span>Web Design</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>Development</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>Business Systems</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>Web Applications</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Portfolio preview hint */}
      {/* <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.8,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="absolute bottom-0 left-1/2 hidden w-full max-w-4xl -translate-x-1/2 translate-y-1/3 md:block"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200/60 bg-neutral-100 shadow-2xl shadow-neutral-900/10">
          <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
            Portfolio preview
          </div>
        </div>
      </motion.div> */}
    </section>
  );
}

function FeaturedWork() {
  return (
    <Section id="work" className="bg-white">
      <AnimatedText>
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Selected Work
        </p>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
          A selection of websites and digital experiences I&apos;ve built for
          businesses.
        </h2>
      </AnimatedText>

      <div className="mt-24 space-y-32 md:space-y-40">
        {projects.map((project, i) => (
          <ProjectShowcase key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectShowcase({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isReversed = index % 2 === 1;
  const isFullWidth = index === 2;

  if (isFullWidth) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={imageReveal} className="overflow-hidden rounded-2xl">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/5 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-neutral-400">
              {project.industry}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-500">
              {project.subtitle}
            </p>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-[12px] font-medium text-neutral-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-[12px] font-medium text-neutral-500"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={project.liveUrl} external className="px-6 py-3">
                View Live Website
                <ExternalLink size={15} />
              </Button>
              
            </div>
          </div>
        </motion.div>

        {/* Case study preview */}
        <motion.div
          variants={fadeUp}
          className="grid gap-8 border-t border-neutral-100 pt-12 md:grid-cols-3 md:gap-12"
        >
          {[
            { label: "The Challenge", text: project.challenge },
            { label: "The Solution", text: project.solution },
            { label: "The Result", text: project.result },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                {item.label}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 ${
        isReversed ? "md:direction-rtl" : ""
      }`}
    >
      <motion.div
        variants={imageReveal}
        className={`overflow-hidden rounded-2xl ${isReversed ? "md:order-2" : ""}`}
      >
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={isReversed ? "md:order-1" : ""}
      >
        <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-neutral-400">
          {project.industry}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-neutral-500">
          {project.subtitle}
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-neutral-200 px-3 py-1 text-[12px] font-medium text-neutral-600"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-[12px] font-medium text-neutral-500"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={project.liveUrl} external className="px-6 py-3">
            View Live Website
            <ExternalLink size={15} />
          </Button>
          
        </div>
      </motion.div>
    </motion.div>
  );
}

function Services() {
  const services = [
    {
      title: "Website Design",
      description:
        "Modern, carefully designed business websites focused on credibility, clarity, and conversion.",
    },
    {
      title: "Website Development",
      description:
        "Fast, responsive, production-ready websites built with modern technologies.",
    },
    {
      title: "Landing Pages",
      description:
        "Conversion-focused landing pages for products, campaigns, services, and businesses.",
    },
    {
      title: "Web Applications",
      description:
        "Custom dashboards, portals, internal tools, booking systems, ordering systems, and business applications.",
    },
    {
      title: "Website Redesign",
      description:
        "Transform outdated websites into modern digital experiences.",
    },
    {
      title: "Business Systems",
      description:
        "Custom web-based systems designed around how a business actually operates.",
    },
  ];

  return (
    <Section id="services" className="bg-neutral-50">
      <AnimatedText>
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Services
        </p>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
          What I Build
        </h2>
      </AnimatedText>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            className="group relative bg-white p-8 transition-colors duration-300 hover:bg-neutral-50 md:p-10"
          >
            <span className="text-[12px] font-medium text-neutral-300">
              0{i + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-neutral-900">
              {service.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-neutral-950 py-32 md:py-48"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto max-w-6xl px-6 text-center md:px-8"
      >
        <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
          Your website shouldn&apos;t just exist.
          <br />
          <span className="text-neutral-500">
            It should make your business look better than the competition.
          </span>
        </h2>
      </motion.div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      number: "01",
      title: "Understand",
      description:
        "Understand the business, customers, goals, and what the website actually needs to accomplish.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "Create a clean visual direction focused on usability, brand positioning, and conversion.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Develop a responsive, fast, polished website using modern technologies.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "Test the experience across devices, optimize performance, and launch.",
    },
  ];

  return (
    <Section id="process" className="bg-white">
      <AnimatedText>
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Process
        </p>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
          From idea to launch.
        </h2>
      </AnimatedText>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-20 grid gap-12 md:grid-cols-4 md:gap-8"
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={fadeUp}>
            <span className="text-[13px] font-medium text-neutral-300">
              {step.number}
            </span>
            <div className="mt-4 h-px w-full bg-neutral-200" />
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-900">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function WhyWorkWithMe() {
  const points = [
    {
      title: "Built Around Your Business",
      description:
        "No generic templates. The website is designed around the business and its customers.",
    },
    {
      title: "Modern by Default",
      description:
        "Responsive layouts, strong typography, clean interactions, and modern development practices.",
    },
    {
      title: "Performance Focused",
      description:
        "Fast loading, optimized assets, responsive images, and clean implementation.",
    },
    {
      title: "Designed to Convert",
      description:
        "Clear messaging, strong hierarchy, intentional calls to action, and frictionless navigation.",
    },
  ];

  return (
    <Section className="bg-neutral-50">
      <AnimatedText>
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Why Work With Me
        </p>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
          A better way to build.
        </h2>
      </AnimatedText>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16"
      >
        {points.map((point) => (
          <motion.div key={point.title} variants={fadeUp}>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              {point.title}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-500">
              {point.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function TechStack() {
  const tech = [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Supabase",
    "APIs",
    "AI Integrations",
  ];

  return (
    <Section className="bg-white">
      <AnimatedText>
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Technology
        </p>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
          Tools I use.
        </h2>
      </AnimatedText>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-12 flex flex-wrap gap-3"
      >
        {tech.map((t) => (
          <motion.span
            key={t}
            variants={fadeUp}
            className="rounded-full border border-neutral-200 px-4 py-2 text-[13px] font-medium text-neutral-600 transition-colors duration-300 hover:border-neutral-300 hover:bg-neutral-50"
          >
            {t}
          </motion.span>
        ))}
      </motion.div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" className="bg-neutral-50">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <AnimatedText>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            About
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            I build digital experiences that make businesses look more
            professional and make it easier for their customers to take action.
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-neutral-500">
            I work across design and development, which allows me to take
            projects from an initial idea through interface design,
            development, integration, and launch.
          </p>
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200"
        >
          <img
            src="/projects/profile.jpeg"
            alt="Professional photo"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </Section>
  );
}

function Testimonials() {
  // Hidden until real testimonials are provided
  return null;
}

function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-32 md:py-48">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
        >
          Have something you want to build?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400"
        >
          Tell me about your business, what you&apos;re trying to build, and
          where you are currently stuck.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            href="#"
            className="hover:bg-white hover:text-neutral-900 px-8 py-4 text-base text-neutral-900 bg-neutral-100"
          >
            Start a Project
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
          <Button
            href="https://calendly.com/kariakistephen/30min"
            external
            variant="ghost"
            className="px-8 py-4 text-base text-white hover:bg-white/10"
          >
            Book a Call
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-white"
          >
            <span className="font-light tracking-tight text-neutral-400">Design with</span>
            <span className="font-bold tracking-tight text-white"> Steve</span>
            <span className="text-orange-500 font-black">.</span>
          </Link>

          <nav className="flex flex-wrap gap-6">
            {["Work", "Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[13px] font-medium text-neutral-500 transition-colors hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex gap-5">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/kariakistephen58/" },
              { label: "GitHub", href: "https://github.com/Kariaki58" },
              { label: "TikTok", href: "https://www.tiktok.com/@stephenkariaki" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-neutral-500 transition-colors hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-8">
          <p className="text-[12px] text-neutral-600">
            © {year} Design with Steve. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-white antialiased">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <Statement />
      <Process />
      <WhyWorkWithMe />
      <TechStack />
      <About />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
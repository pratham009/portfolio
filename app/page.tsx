"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sections = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  // Register section refs
  const registerSection = (element: HTMLElement | null, id: string) => {
    if (element && !sections.current.find(section => section.id === id)) {
      sections.current.push(element);
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setScrolled(scrollPosition > 50);

      sections.current.forEach((section) => {
        const { offsetTop, offsetHeight, id } = section;
        if (scrollPosition > offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - (navRef.current?.offsetHeight || 0),
        behavior: 'smooth'
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  // Projects data
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "Designed and developed a responsive portfolio with animations",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Created a collaborative task management application with real-time updates",
      tags: ["React", "Firebase", "Material UI"],
      link: "#"
    }
  ];

  // Skills data
  const skills = [
    { name: "Python" },
    { name: "SQL" },
    { name: "C/C++" },
    { name: "Java" },


  ];

  // Experience data
  const experience = [
    {
      role: "System Support Associate",
      company: "Linamar Corporation",
      period: "April 2024 - April 2025",
      description: "Drove adoption of modern web technologies by demonstrating their efficiency in side-by-side comparisons with legacy systems.",
      achievements: [
        "Provided Technical Support for desktop systems and software applications, troubleshooting hardware/software issues",
        "Participated in system testing and documentation, working with QA teams to ensure smooth deployments.",
        "Learned to communicate and collaborate effectively with cross-functional teams, including developers, QA engineers, and product managers."
      ]
    },
    {
      role: "Hardware and Network Engineer",
      company: "Healthcare Informatics Private Limited",
      period: "June 2023 - Dec. 2023",
      description: "Developed and maintained web applications and APIs for healthcare systems, ensuring high performance and responsiveness.",
      achievements: [
        "Proactively maintained infrastructure (Windows/AD/PowerShell)",
        "Reduced API response time by 30%",
        "Optimized clinical workflows by resolving critical hardware/software issues."
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "K.S Technologies",
      period: "Sept. 2022 - Mar 2023",
      description: "Developed Full Stack Web Application",
      achievements: [
        "Designed and Implemeted Full Stack Web Application using Java, HTML, CSS, JavaScript, and MySQL",
        "Desiged UML flow Diagrams and ER Diagrams for the application",
        "Understood and implemented Agile methodologies in the project lifecycle."
      ]
    }
  ];

  return (
    <div className={`relative ${darkMode ? 'dark' : ''}`}>
      {/* Right Side Navigation Bar */}
      <div
        ref={navRef}
        className={`fixed left-5 top-0 h-full z-50 transition-all duration-300 flex items-center justify-center ${scrolled
            ? "bg-transparent backdrop-blur-md shadow-lg py-2 px-4"
            : "bg-transparent py-7 px-6"
          }`}
      >
        <div className="flex flex-col gap-15 items-center">
          {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-30 h-9 cursor-grab flex items-center justify-center rounded-full text-sm uppercase tracking-wider transition-all focus:outline-none ${activeSection === section
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              aria-label={section}
            >
              {section === 'home' && 'HOME'}
              {section === 'about' && 'ABOUT'}
              {section === 'skills' && 'SKILLS'}
              {section === 'projects' && 'PROJECTS'}
              {section === 'experience' && 'EXPERIENCE'}
              {section === 'contact' && 'CONTACT'}
            </button>
          ))}

        </div>
      </div>

      {/* Hero Section */}
<section
  id="home"
  ref={(el) => registerSection(el, 'home')}
  className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-8 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
>
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-cyan-500/10"
        style={{
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s ease-in-out alternate`
        }}
      />
    ))}
  </div>

  <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
    <div className="relative w-40 h-40 mb-8 group mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-white-50 opacity-0 group-hover:opacity-30 blur-md transition-all duration-500"></div>
      <Image
        src="/profile.jpeg"
        alt="Profile"
        width={130}
        height={160}
        className="rounded-full object-cover border-4 border-gray-700 group-hover:border-cyan-400 transition-all duration-500 z-10"
        priority
      />
    </div>

    {/* Futuristic Name Banner with Particle Effects */}
    <div 
      className="relative mb-10 group cursor-pointer"
      onClick={() => {
        const colors = ['from-cyan-400 to-purple-500', 'from-purple-500 to-pink-500', 
                       'from-pink-500 to-red-500', 'from-red-500 to-orange-500'];
        const randomColors = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById('name-container')?.classList.add('animate-tilt');
        setTimeout(() => {
          document.getElementById('name-container')?.classList.remove('animate-tilt');
          document.getElementById('name-gradient')?.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-purple-500');
          document.getElementById('name-gradient')?.classList.add('bg-gradient-to-r', ...randomColors.split(' '));
        }, 1000);
      }}
    >
      {/* 3D floating container */}
      <div 
        id="name-container"
        className="relative p-8 rounded-2xl bg-gray-900/50 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
        }}
      >
        {/* Holographic name with depth */}
        <div className="relative z-10">
          <h1
            id="name-gradient"
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-cyan-400"
            style={{
              textShadow: '0 0 10px rgba(34, 211, 238, 0.3)'
            }}
          >
            <span className="block hover:scale-105 transition-transform duration-300">PRATHAM</span>
            <span className="block hover:scale-105 transition-transform duration-300">VICHARE</span>
          </h1>
        </div>
        
        {/* Holographic effect layers */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/20 pointer-events-none"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ${Math.random() * 5}s ease-in-out alternate`,
              opacity: 0.6
            }}
          />
        ))}
        
        {/* Animated role text with typewriter effect */}
        <div className="mt-6 h-12 md:h-16 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {['GAMER', 'ENGINEER', 'LEARNER'].map((role, index) => (
              <div 
                key={role}
                className="absolute w-full text-center"
                style={{
                  animation: `typing 9s infinite ${index * 3}s steps(20), 
                              blink 0.5s infinite alternate ${index * 3}s,
                              fadeOut 9s infinite ${index * 3 + 2.5}s`
                }}
              >
                <span className="text-xl md:text-3xl font-mono font-bold text-cyan-300 tracking-wider">
                  {role.split('').map((char, i) => (
                    <span 
                      key={i}
                      className="inline-block animate-wave"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="ml-1 inline-block w-2 h-8 bg-cyan-400 align-middle animate-blink"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-cyan-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
    </div>

    {/* Buttons */}
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => scrollToSection('contact')}
        className="flex justify-center cursor-pointer px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95"
      >
        Contact Me
      </button>
      <button
        onClick={() => {
          const projectSection = document.getElementById('projects');
          if (projectSection) {
            projectSection.scrollIntoView({ behavior: 'smooth' });
            const firstProject = document.querySelector('#projects .group');
            firstProject?.classList.add('animate-bounce');
            setTimeout(() => firstProject?.classList.remove('animate-bounce'), 1000);
          }
        }}
        className="cursor-pointer px-6 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all hover:scale-105 active:scale-95"
      >
        View Projects
      </button>
    </div>

    {/* Scroll indicator */}
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      onClick={() => scrollToSection('about')}
    >
      <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
        <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
      </div>
    </div>
  </div>
</section>

        

      {/* About Section - Interactive Split Screen */}
      <section
        id="about"
        ref={(el) => registerSection(el, 'about')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gradient-to-br from-gray-800 to-gray-900 relative"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s ease-in-out alternate`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto w-full h-full ">
          {/* Split screen container */}
          <div className="flex flex-col lg:flex-row h-full gap-6">
            {/* Left panel - Professional */}
            <div className="lg:w-1/2 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden">
              <div className="relative h-full">
                <h2 className="text-4xl font-bold mb-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                  <span className="inline-block hover:scale-105 transition-transform">The Engineer</span>
                </h2>

                <Image
                  src="/about-professional.jpg"
                  alt="Professional Profile"
                  width={500}
                  height={600}
                  className="rounded-lg mb-19 object-cover w-full h-48 hover:scale-[1.02] transition-transform duration-500"
                />

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  I hold a Master's in Electrical and Computer Engineering from the University of Windsor, specializing in creating real-world tech solutions that bridge hardware and software.
                </p>
                <div className="bottom-18 left-0 right-0 flex flex-wrap gap-2 justify-center">
                  {['Communication', 'Time management', 'Emotional Intelligence', 'Problem Solving', 'Curiosity and Continuous Learning'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-purple-500/10 rounded-full text-sm text-cyan-400 hover:bg-purple-500/20 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-transparent"></div>
              </div>
            </div>

            {/* Right panel - Personal/Gaming */}
            <div className="lg:w-1/2 bg-gray-800/50 rounded-2xl p-8  border border-gray-700 hover:border-purple-400 transition-all duration-300 overflow-hidden">
              <div className="relative h-full">
                <h2 className="text-4xl font-bold mb-6 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300">
                  <span className="inline-block hover:scale-105 transition-transform">The Gamer</span>
                </h2>

                {/* Interactive game/anime gallery */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { name: 'PUBG', image: '/pubg.jpg', color: 'from-yellow-500/20 to-yellow-700/20' },
                    { name: 'Valorant', image: '/valorant.jpg', color: 'from-red-500/20 to-red-700/20' },
                    { name: 'FIFA', image: '/fifa.jpg', color: 'from-blue-500/20 to-blue-700/20' },
                    { name: 'One Piece', image: '/one-piece.jpg', color: 'from-orange-500/20 to-orange-700/20' },
                    { name: 'CALL OF DUTY', image: '/callofduty.jpg', color: 'from-gray-500/20 to-gray-700/20' },
                    { name: 'More...', image: '', color: 'from-gray-600/20 to-gray-800/20' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg overflow-hidden bg-gradient-to-br ${item.color} relative group cursor-pointer hover:scale-105 transition-transform duration-300`}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-medium text-sm md:text-lg drop-shadow-lg">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  When I'm not coding, you'll find me ranking up in competitive shooters, perfecting my FIFA skills, or binge-watching One Piece. Gaming fuels my problem-solving mindset and teamwork abilities.
                </p>

                {/* Interactive skill tags */}
                <div className="bottom-18 left-0 right-0 flex flex-wrap gap-2 justify-center">
                  {['Strategic Thinking', 'Quick Reflexes', 'Team Coordination', 'Adaptability', 'Perseverance'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-purple-500/10 rounded-full text-sm text-purple-300 hover:bg-purple-500/20 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connecting middle element */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-slow">
              &
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite;
  }
`}</style>

      {/* Skills Section - Interactive Skill Boxes */}
      <section
        id="skills"
        ref={(el) => registerSection(el, 'skills')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `pulse ${Math.random() * 15 + 10}s infinite ease-in-out`,
                opacity: Math.random() * 0.2 + 0.1
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
            Technical <span className="text-white">Skills</span>
          </h2>

          {/* Interactive Skill Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-box group relative h-40 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Skill content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">

                  <h3 className="text-xl font-medium text-gray-300 text-center">
                    {skill.name}
                  </h3>
                </div>

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-cyan-400/20"
                      style={{
                        width: Math.random() * 20 + 5,
                        height: Math.random() * 20 + 5,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 5}s infinite ${Math.random() * 3}s ease-in-out alternate`
                      }}
                    />
                  ))}
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 transform rotate-45 origin-bottom-left translate-x-1/2 -translate-y-1/2 group-hover:bg-cyan-400/20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Skill categories */}
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {['Programming', 'REST APIs', ' AirFlow', 'Docker', 'MySQL', 'MogoDB', 'UNIX/Linux'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300 border border-gray-700 hover:border-cyan-400"
                onClick={() => {
                  // Filter logic would go here in a real implementation
                  console.log(`Filter by ${category}`);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => registerSection(el, 'projects')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gradient-to-br from-gray-800 to-gray-900"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s ease-in-out alternate`
              }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-2 relative"
              >
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-600 font-bold opacity-70 group-hover:opacity-30 transition-opacity duration-300">
                    {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="px-4 py-2 bg-cyan-500 text-white rounded-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // In a real app, this would navigate to the project
                        alert(`Viewing ${project.title}`);
                      }}
                    >
                      View Project
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={(el) => registerSection(el, 'experience')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s ease-in-out alternate`
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Professional Experience
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-400 before:to-transparent md:before:ml-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-12 md:pl-16 group">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-cyan-400 border-4 border-gray-900 transform -translate-x-1/2 group-hover:scale-125 transition-transform z-10"></div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 group-hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-cyan-400 text-sm">{exp.period}</span>
                  </div>
                  <h4 className="text-gray-400 mb-2">{exp.company}</h4>
                  <p className="text-gray-300 mb-3">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => registerSection(el, 'contact')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gradient-to-br from-gray-800 to-gray-900"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s ease-in-out alternate`
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-cyan-400">Get In Touch</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 hover:text-cyan-400 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="text-gray-300 hover:text-cyan-400 transition-colors">pratham@example.com</span>
              </div>

              <div className="flex items-center gap-4 hover:text-cyan-400 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-gray-300 hover:text-cyan-400 transition-colors">+1 (123) 456-7890</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', icon: '💻' },
                  { name: 'LinkedIn', icon: '🔗' },
                  { name: 'Twitter', icon: '🐦' },
                  { name: 'Dribbble', icon: '🏀' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl hover:bg-cyan-500 hover:text-white transition-all"
                    aria-label={social.name}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            {formSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-green-400 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Thank you!</h3>
                <p className="text-gray-300">Your message has been sent successfully. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 py-8 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 mb-4">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Pratham Vichare. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Responsive CSS */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          /* Move navbar to bottom on mobile */
          .fixed.right-0 {
            right: auto;
            bottom: 0;
            top: auto;
            left: 0;
            width: 100%;
            height: auto;
            padding: 10px 0;
            background-color: rgba(17, 24, 39, 0.8) !important;
          }
          
          .flex-col {
            flex-direction: row;
            justify-content: center;
            gap: 10px;
          }
          
          section {
            padding-right: 0 !important;
            padding-bottom: 70px;
          }

          footer {
            padding-right: 0 !important;
            padding-bottom: 70px;
          }
        }
        @keyframes roleChange {
    0%, 20% {
      transform: translateY(0);
      opacity: 1;
    }
    25%, 45% {
      transform: translateY(-100%);
      opacity: 0;
    }
    50%, 70% {
      transform: translateY(-200%);
      opacity: 0;
    }
    75%, 95% {
      transform: translateY(-300%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes animate-tilt {
    0%, 100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
    25% { transform: perspective(1000px) rotateX(5deg) rotateY(5deg); }
    50% { transform: perspective(1000px) rotateX(0deg) rotateY(-5deg); }
    75% { transform: perspective(1000px) rotateX(-5deg) rotateY(0deg); }
  }
  
  @keyframes typing {
    0%, 90%, 100% { width: 0; }
    30%, 60% { width: 100%; }
  }
  
  @keyframes blink {
    50% { opacity: 0; }
  }
  
  @keyframes fadeOut {
    0%, 80% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes wave {
    0%, 40%, 100% { transform: translateY(0); }
    20% { transform: translateY(-10px); }
  }
      `}</style>
    </div>
  );
}
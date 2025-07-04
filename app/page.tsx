"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiMail
} from 'react-icons/fi';


export default function Portfolio() {

  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sections = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showCursor, setShowCursor] = useState(true);

  const titles = [
    "Computer Engineer",
    "Problem Solver",
    "Tech Enthusiast",
    "Software Developer",
    "Data World Explorer",
    "Gamer"
  ];
  const navItems = [
  { id: 'home', icon: <FiHome size={30} />, label: 'Home' },
  { id: 'about', icon: <FiUser size={30} />, label: 'About' },
  { id: 'skills', icon: <FiCode size={30} />, label: 'Skills' },
  { id: 'projects', icon: <FiFolder size={30} />, label: 'Projects' },
  { id: 'experience', icon: <FiBriefcase size={30} />, label: 'Experience' },
  { id: 'contact', icon: <FiMail size={30} />, label: 'Contact' }
];

  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[currentIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting characters
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
        setTypingSpeed(75); // Faster when deleting
      } else {
        // Adding characters
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        setTypingSpeed(150); // Normal typing speed
      }

      // When title is fully typed
      if (!isDeleting && displayedText === currentTitle) {
        setTypingSpeed(1500); // Pause at end
        setIsDeleting(true);
      } 
      // When title is fully deleted
      else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setTypingSpeed(500); // Pause before typing next
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, currentIndex, isDeleting]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

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

  // Skills data organized by category
  const skills = {
    "Programming Languages": ["Python", "SQL", "C/C++", "Java", "JavaScript"],
    "Web Technologies": ["React", "Next.js", "Node.js", "REST APIs", "HTML/CSS"],
    "Databases": ["MySQL", "MongoDB", "PostgreSQL"],
    "DevOps & Tools": ["Docker", "Git", "UNIX/Linux", "AirFlow", "PowerShell"]
  };

  // Experience data
  const experience = [
    {
      role: "System Support Associate",
      company: "Linamar Corporation",
      period: "April 2024 - April 2025",
      description: "Drove adoption of modern web technologies by demonstrating their efficiency in side-by-side comparisons with legacy systems.",
      achievements: [
        "Provided Technical Support for desktop systems and software applications, troubleshooting hardware/software issues",
        "Participated in system testing and documentation, working with QA teams to ensure smooth deployments",
        "Communicated and collaborated effectively with cross-functional teams"
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
        "Optimized clinical workflows by resolving critical hardware/software issues"
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "K.S Technologies",
      period: "Sept. 2022 - Mar 2023",
      description: "Developed Full Stack Web Application using modern technologies",
      achievements: [
        "Designed and Implemented Full Stack Web Application using Java, HTML, CSS, JavaScript, and MySQL",
        "Created UML flow Diagrams and ER Diagrams for the application",
        "Implemented Agile methodologies in the project lifecycle"
      ]
    }
  ];

   return (
     <div className="relative bg-gray-50">
    {/* Modern Vertical Navigation Bar with Blur Effect */}
    <div
      ref={navRef}
      className={`fixed left-0 top-0 h-full w-16 md:w-20 z-50 transition-all duration-300 flex items-center justify-center 
        backdrop-blur-lg bg-white/30 border-r border-gray-200/50`}
    >
      <div className="flex flex-col gap-3 md:gap-4 p-2 w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full p-3 rounded-lg flex flex-col items-center justify-center transition-all
              ${activeSection === item.id
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-gray-700 hover:text-teal-600 hover:bg-white/50'
              }`}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            <span className="text-xs mt-1 hidden md:block">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
      {/* Hero Section with Typewriter Effect */}
      <section
        id="home"
        ref={(el) => registerSection(el, 'home')}
        className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-8 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Profile Content */}
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Hi, I'm <span className="text-teal-600">Pratham Vichare</span>
              </h1>
              <div className="text-xl md:text-2xl text-gray-600 min-h-[2.5rem] flex items-center">
                <span className="font-medium">
                  {displayedText}
                  <span className={`inline-block w-1 h-6 bg-gray-600 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                </span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              I build innovative solutions that bridge hardware and software, with expertise in full-stack development and system architecture.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg"
              >
                Contact Me
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-all"
              >
                View Projects
              </button>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/profile.jpeg"
                alt="Pratham Vichare"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-600/10 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="w-6 h-10 border-2 border-teal-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-teal-600 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

     {/* About Section */}
<section
  id="about"
  ref={(el) => registerSection(el, 'about')}
  className="min-h-screen flex items-center justify-center py-24 px-8 bg-white"
>
  <div className="max-w-6xl mx-auto w-full">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
      About <span className="text-teal-600">Me</span>
    </h2>
    
    <div className="grid md:grid-cols-2 gap-12">
      {/* Education */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-teal-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Education</h3>
        </div>
        
        <div className="space-y-6">
          <div className="pl-4 border-l-4 border-teal-400">
            <h4 className="text-xl font-semibold text-gray-800">Master's in Electrical & Computer Engineering</h4>
            <p className="text-gray-600">University of Windsor</p>
            <p className="text-gray-500 text-sm">2023 - 2025</p>
          </div>
          
          <div className="pl-4 border-l-4 border-teal-400">
            <h4 className="text-xl font-semibold text-gray-800">Bachelor's in Computer Science & Engineering</h4>
            <p className="text-gray-600">Parul University, Vadodara</p>
            <p className="text-gray-500 text-sm">2019 - 2023</p>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            My academic journey includes core CS subjects like Data Structures & Algorithms, Operating Systems, and Database Management Systems, complemented by advanced graduate studies in hardware-software integration.
          </p>
        </div>
      </div>
      
      {/* Personal */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-teal-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Personal</h3>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          When I'm not coding, I enjoy competitive gaming which enhances my problem-solving and teamwork skills. I'm passionate about continuous learning and staying updated with the latest tech trends.
        </p>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">Strategic Thinking</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">Teamwork</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">Adaptability</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">Problem Solving</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">Quick Learner</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={(el) => registerSection(el, 'skills')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Technical <span className="text-teal-600">Skills</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillsList]) => (
              <div key={category} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 border-teal-200">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-100 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Skills */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2 border-teal-200">Additional Competencies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Agile Methodologies",
                "System Architecture",
                "Technical Documentation",
                "Code Review",
                "Performance Optimization",
                "Debugging",
                "CI/CD Pipelines",
                "Cloud Computing"
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => registerSection(el, 'projects')}
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Featured <span className="text-teal-600">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-r from-teal-500 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                    <svg className="h-32 w-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-100 hover:text-teal-700 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-1 transition-all"
                    onClick={() => alert(`Viewing ${project.title}`)}
                  >
                    View Project
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
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
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Professional <span className="text-teal-600">Experience</span>
          </h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-teal-400 before:to-transparent md:before:ml-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-12 md:pl-16 group">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-teal-600 border-4 border-white transform -translate-x-1/2 group-hover:scale-125 transition-transform z-10 shadow-md"></div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 group-hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-teal-600 text-sm font-medium">{exp.period}</span>
                  </div>
                  
                  <h4 className="text-gray-600 font-medium mb-3">{exp.company}</h4>
                  
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{achievement}</span>
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
        className="min-h-screen flex items-center justify-center py-24 px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Get In <span className="text-teal-600">Touch</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out and I'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm font-medium">Email</h4>
                  <a href="mailto:pratham@example.com" className="text-gray-800 hover:text-teal-600 transition-colors">pratham@example.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm font-medium">Phone</h4>
                  <a href="tel:+11234567890" className="text-gray-800 hover:text-teal-600 transition-colors">+1 (123) 456-7890</a>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {[
                    { name: 'GitHub', icon: 'github', color: 'gray' },
                    { name: 'LinkedIn', icon: 'linkedin', color: 'blue' },
                    { name: 'Twitter', icon: 'twitter', color: 'sky' },
                    { name: 'Medium', icon: 'book-open', color: 'gray' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`bg-${social.color}-100 p-3 rounded-full text-${social.color}-600 hover:bg-${social.color}-200 transition-all hover:scale-110`}
                      aria-label={social.name}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {social.icon === 'github' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        )}
                        {social.icon === 'linkedin' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        )}
                        {social.icon === 'twitter' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        )}
                        {social.icon === 'book-open' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        )}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            {formSubmitted ? (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center shadow-md">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-teal-600 mb-2">Thank you!</h3>
                <p className="text-gray-600">Your message has been sent successfully. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Pratham Vichare</h3>
              <p className="text-gray-400">Electrical & Computer Engineer</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              {['github', 'linkedin', 'twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all"
                  aria-label={social}
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'github' && (
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    )}
                    {social === 'linkedin' && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Pratham Vichare. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .fixed.left-0 {
            padding: 10px 0;
          }
          
          section {
            padding-top: 100px;
            padding-bottom: 80px;
          }
        }
      `}</style>
    </div>
  );
}
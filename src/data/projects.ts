export interface Project {
  id: string
  title: string
  description: string
  images: string[]
  tags: string[]
  category: string
  github?: string
  liveLink?: string
  featured?: boolean
  url?: string // For browser frame display
  status?: "completed" | "in-progress" | "planned"
  startDate?: string
  endDate?: string
  isLiveDemo?: boolean // For mobile apps: true = "View Live", false/undefined = "Download"
}

export const projects: Project[] = [
  {
    id: "sz-hotpot-haven",
    title: "S&Z Hot Pot Haven",
    description:
      "A modern web application for S&Z Hot Pot Haven, a premium hotpot ingredient store located in Bacoor, Cavite. This website allows customers to browse products, add items to cart, and place orders online with an intuitive interface designed for both customers and administrators.",
    images: [
      "/images/projects/szhotpot/szhotpot1.jpg",
      "/images/projects/szhotpot/szhotpot2.jpg",
      "/images/projects/szhotpot/szhotpot3.jpg",
      "/images/projects/szhotpot/szhotpot4.jpg",
      "/images/projects/szhotpot/szhotpot5.jpg",
      "/images/projects/szhotpot/szhotpot6.jpg",
    ],
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    category: "Web Application",
    liveLink: "https://szhotpot.free.nf/",
    github: "https://github.com/0phl/sz-hotpot-store",
    featured: false,
    url: "szhotpot.free.nf",
    status: "completed",
    startDate: "2024-01",
    endDate: "2024-03"
  },
  {
    id: "Pulse",
    title: "PULSE",
    description:
      "Pulse – Public Updates, Local Services, and Engagement App is my capstone project: a community engagement mobile app designed to connect and empower local communities. It helps residents stay informed through real-time notices and announcements, engage with media-rich posts, and interact through likes and comments. Pulse also includes an admin dashboard for managing community activities, a local buy-and-sell marketplace with seller tools and real-time chat, features for discovering volunteer opportunities and managing events, plus location-based reporting to address community concerns. It’s built to strengthen community connections, encourage civic participation, and support local businesses and initiatives.",
    images: [
      "/images/projects/pulse/pulse1.jpg",
      "/images/projects/pulse/pulse2.jpg",
      "/images/projects/pulse/pulse3.jpg",
      "/images/projects/pulse/pulse4.jpg",
      "/images/projects/pulse/pulse5.jpg",

    ],
    tags: ["Flutter", "Firebase"],
    category: "Mobile Application",
    // liveLink: "https://play.google.com/store", // Commented out - no download available yet
     github: "https://github.com/0phl/Pulse-App", // Commented out - private repository
    featured: true,
    status: "in-progress",
    startDate: "2024-10",
    isLiveDemo: false // This will show "Download" for mobile app when liveLink is available
    // Mobile apps don't need URL since they use PhoneFrame
  },
  
  {
    id: "linkfolio",
    title: "Linkfolio",
    description:
      "A personal digital bookmark organizer designed for individual use, helping users effortlessly collect, categorize, and access their favorite websites. All data is stored locally using IndexedDB, ensuring privacy and offline access without relying on external servers.",
    images: [
      "/images/projects/linkfolio/linkfolio1.jpg",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "IndexDB"],
    category: "Web Application",
    liveLink: "https://linkfolio-iota.vercel.app/",
    github: "https://github.com/0phl/Linkfolio",
    featured: false,
    url: "linkfolio-iota.vercel.app",
    status: "completed",
    startDate: "2025-02",
    endDate: "2025-02"
  },

  {
    id: "car-rental",
    title: "Car Rental System",
    description:
      "A comprehensive car rental management system built with PHP and MySQL, featuring a customer-facing booking interface and a complete administrative dashboard. The system allows customers to browse available vehicles, make bookings without registration, and track their reservations using unique reference numbers, while administrators can manage the entire fleet, process bookings, and generate detailed PDF reports.",
    images: [
      "/images/projects/carrental/car-rental1.jpg",
      "/images/projects/carrental/car-rental2.jpg",
      "/images/projects/carrental/car-rental3.jpg",
      "/images/projects/carrental/car-rental4.jpg",
      "/images/projects/carrental/car-rental5.jpg",
      "/images/projects/carrental/car-rental6.jpg",
      "/images/projects/carrental/car-rental7.jpg",
      "/images/projects/carrental/car-rental8.jpg",
    ],
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    category: "Web Application",
    //liveLink: "https://linkfolio-iota.vercel.app/",
    github: "https://github.com/0phl/Car-Rental-System",
    featured: false,
    url: "DGMT-Car-Rental-System",
    status: "completed",
    startDate: "2024-11",
    endDate: "2024-11"
  },





]

// Helper functions for project management
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}

export const getProjectsByCategory = (category: string): Project[] => {
  let filteredProjects: Project[]

  if (category === "All") {
    filteredProjects = projects
  } else {
    filteredProjects = projects.filter(project => project.category === category)
  }

  // Sort projects to prioritize featured ones first
  return filteredProjects.sort((a, b) => {
    // Featured projects come first
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    // If both are featured or both are not featured, maintain original order
    return 0
  })
}

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getCategories = (): string[] => {
  return ["All", ...Array.from(new Set(projects.map(project => project.category)))]
}


interface Contact {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    pdf: string;
}

interface Experience {
    role: string;
    company: string;
    dates: string;
    description: string;
}

interface Project {
    name: string;
    context: string;
    dates: string;
    description: string;
    stack: string[];
}

interface Skills {
    proficient: string[];
    familiar: string[];
}

interface Education {
    degree: string;
    university: string;
    dates: string;
}

interface CVData {
    name: string;
    title: string;
    tagline: string;
    contact: Contact;
    profile: string;
    experience: Experience[];
    projects: Project[];
    skills: Skills;
    education: Education;
    languages: string[];
}

const cvData: CVData = {
    name: "Viktor Kučera",
    title: "Software Engineer",
    tagline: "Crafting interactive worlds and robust solutions.",
    contact: {
        phone: "+420 776 275 366",
        email: "viktor.kucera9@gmail.com",
        linkedin: "https://www.linkedin.com/in/viktor-kucera-b4a161245/",
        github: "https://github.com/LordOfThePigs",
        pdf: "/ViktorKuceraCV.pdf" // Assumes the PDF is in the `public` folder
    },
    profile: "Currently pursuing a degree in Computer Science at the Faculty of Information Technology, Czech Technical University, with a focus on Software Engineering. Passionate about solving challenging problems and continuously learning new technologies and concepts to enhance my skill set.",
    experience: [
        {
            role: "Junior Software Developer",
            company: "More.is.More s.r.o",
            dates: "2022 - 2025",
            description: "Developed various augmented reality (AR) and virtual reality (VR) applications using the Unity game engine. Designed and implemented backend for larger projects."
        }
    ],
    projects: [
        {
            name: "Informational system for Prosaz",
            context: "Team project for BI-SP1",
            dates: "Feb 2025 - Present",
            description: "Developing and maintaining an informational system for a non-profit organization, Prosaz, for managing employee time schedules and billing. Primarily worked as a backend engineer.",
            stack: ["Java", "Spring", "React", "TypeScript", "PostgreSQL", "Docker", "Gitlab CI/CD"]
        }
    ],
    skills: {
        proficient: ["Java", "Spring", "C#", "C++", "C", "PostgreSQL", "Git"],
        familiar: ["JavaScript", "React", "TypeScript", "Unix"]
    },
    education: {
        degree: "Bachelors in Computer Science",
        university: "FIT CTU",
        dates: "2023 - Present"
    },
    languages: ["Czech (Native)", "English (Fluent)", "German (Basics)"]
};

export default cvData;

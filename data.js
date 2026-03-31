const opportunities = [
    { title: "AI Chatbot for E-commerce", skills: ["AI", "Python", "NLP"], location: "Remote", type: "Fixed-price", budget: "$800", level: "Intermediate", desc: "Build chatbot for product recommendations.", participants: 124 },
    { title: "Cybersecurity Audit", skills: ["Security", "Networking"], location: "Remote", type: "Hourly", budget: "$60/hr", level: "Expert", desc: "Audit system vulnerabilities.", participants: 12 },
    { title: "React SaaS Dashboard", skills: ["React", "Tailwind"], location: "Remote", type: "Fixed-price", budget: "$1200", level: "Intermediate", desc: "Build analytics dashboard.", participants: 89 },
    { title: "Android App Development", skills: ["Kotlin", "Android"], location: "Remote", type: "Fixed-price", budget: "$900", level: "Intermediate", desc: "Develop native Android app.", participants: 45 },
    { title: "Blockchain Smart Contract", skills: ["Solidity", "Web3"], location: "Remote", type: "Fixed-price", budget: "$1500", level: "Expert", desc: "Create secure smart contracts.", participants: 31 },
    { title: "UI/UX Design for App", skills: ["Figma", "UI"], location: "Remote", type: "Hourly", budget: "$30/hr", level: "Entry", desc: "Design modern mobile UI.", participants: 210 },
    { title: "Data Analysis Project", skills: ["Python", "Pandas"], location: "Remote", type: "Fixed-price", budget: "$500", level: "Entry", desc: "Analyze dataset and visualize insights.", participants: 67 },
    { title: "Full Stack MERN App", skills: ["MongoDB", "Express", "React", "Node"], location: "Remote", type: "Fixed-price", budget: "$2500", level: "Expert", desc: "Complete marketplace solution.", participants: 52 },
    { title: "iOS Swift Developer", skills: ["Swift", "iOS"], location: "Remote", type: "Hourly", budget: "$55/hr", level: "Intermediate", desc: "Feature updates for travel app.", participants: 18 },
    { title: "Logo & Brand Identity", skills: ["Illustrator", "Branding"], location: "Remote", type: "Fixed-price", budget: "$300", level: "Entry", desc: "Create logo for startup.", participants: 144 },
    { title: "Penetration Testing", skills: ["Kali Linux", "Security"], location: "Remote", type: "Hourly", budget: "$80/hr", level: "Expert", desc: "Network security testing.", participants: 9 },
    { title: "Shopify Store Setup", skills: ["Shopify", "Liquid"], location: "Remote", type: "Fixed-price", budget: "$600", level: "Intermediate", desc: "Customize Shopify theme.", participants: 33 },
    { title: "Machine Learning Model", skills: ["PyTorch", "Python"], location: "Remote", type: "Fixed-price", budget: "$1800", level: "Expert", desc: "Image recognition system.", participants: 27 },
    { title: "Vue.js Frontend", skills: ["Vue", "Vuex"], location: "Remote", type: "Hourly", budget: "$40/hr", level: "Intermediate", desc: "Build modular dashboard.", participants: 41 },
    { title: "WordPress Blog Design", skills: ["WordPress", "Elementor"], location: "Remote", type: "Fixed-price", budget: "$400", level: "Entry", desc: "Personal blog setup.", participants: 95 },
    { title: "Golang Microservices", skills: ["Go", "Docker", "Kubernetes"], location: "Remote", type: "Fixed-price", budget: "$3000", level: "Expert", desc: "Scalable backend architecture.", participants: 14 },
    { title: "Unity 3D Game Dev", skills: ["C#", "Unity"], location: "Remote", type: "Hourly", budget: "$50/hr", level: "Intermediate", desc: "Level design for mobile game.", participants: 29 },
    { title: "SEO Strategy Audit", skills: ["SEO", "Marketing"], location: "Remote", type: "Fixed-price", budget: "$700", level: "Intermediate", desc: "Improve organic search rankings.", participants: 50 },
    { title: "Technical Content Writer", skills: ["Writing", "Documentation"], location: "Remote", type: "Hourly", budget: "$25/hr", level: "Entry", desc: "Write API documentation.", participants: 112 },
    { title: "AWS Cloud Migration", skills: ["AWS", "Terraform"], location: "Remote", type: "Fixed-price", budget: "$2200", level: "Expert", desc: "Migrate on-prem to cloud.", participants: 11 },
    { title: "PHP Laravel Backend", skills: ["Laravel", "PHP"], location: "Remote", type: "Hourly", budget: "$45/hr", level: "Intermediate", desc: "API development for CRM.", participants: 38 },
    { title: "Flutter Social App", skills: ["Flutter", "Firebase"], location: "Remote", type: "Fixed-price", budget: "$1400", level: "Intermediate", desc: "Real-time chat application.", participants: 76 },
    { title: "Django Web Portal", skills: ["Django", "PostgreSQL"], location: "Remote", type: "Fixed-price", budget: "$1100", level: "Intermediate", desc: "Internal management tool.", participants: 24 },
    { title: "Java Spring Boot API", skills: ["Java", "Spring"], location: "Remote", type: "Hourly", budget: "$65/hr", level: "Expert", desc: "Banking microservices.", participants: 19 },
    { title: "Adobe After Effects Video", skills: ["After Effects", "Motion"], location: "Remote", type: "Fixed-price", budget: "$900", level: "Intermediate", desc: "2D motion graphics video.", participants: 43 },
    { title: "Excel Automation Script", skills: ["VBA", "Macros"], location: "Remote", type: "Fixed-price", budget: "$200", level: "Entry", desc: "Automate daily reports.", participants: 156 },
    { title: "Rust System Tool", skills: ["Rust", "C++"], location: "Remote", type: "Fixed-price", budget: "$2000", level: "Expert", desc: "Low-level performance utility.", participants: 7 },
    { title: "Copywriting for Landing Page", skills: ["Copywriting", "Sales"], location: "Remote", type: "Hourly", budget: "$35/hr", level: "Intermediate", desc: "High-converting sales copy.", participants: 88 },
    { title: "React Native Mobile", skills: ["React Native", "Redux"], location: "Remote", type: "Fixed-price", budget: "$1600", level: "Intermediate", desc: "Fitness tracking app.", participants: 61 },
    { title: "DevOps CI/CD Pipeline", skills: ["Jenkins", "GitLab"], location: "Remote", type: "Hourly", budget: "$70/hr", level: "Expert", desc: "Automate build and deploy.", participants: 22 },
    { title: "Product Photography Edit", skills: ["Photoshop", "Lightroom"], location: "Remote", type: "Fixed-price", budget: "$150", level: "Entry", desc: "Clean up 50 product images.", participants: 201 },
    { title: "TensorFlow Object Detection", skills: ["TensorFlow", "OpenCV"], location: "Remote", type: "Fixed-price", budget: "$1900", level: "Expert", desc: "Real-time security footage analysis.", participants: 15 },
    { title: "SQL Database Optimization", skills: ["SQL", "MySQL"], location: "Remote", type: "Hourly", budget: "$60/hr", level: "Intermediate", desc: "Fix slow query performance.", participants: 34 },
    { title: "Email Marketing Flow", skills: ["Mailchimp", "Klaviyo"], location: "Remote", type: "Fixed-price", budget: "$500", level: "Intermediate", desc: "Automate welcome sequences.", participants: 49 },
    { title: "C# Desktop App", skills: ["C#", ".NET"], location: "Remote", type: "Fixed-price", budget: "$1300", level: "Intermediate", desc: "Windows inventory management.", participants: 26 },
    { title: "NFT Marketplace UI", skills: ["Figma", "Web3"], location: "Remote", type: "Fixed-price", budget: "$1000", level: "Intermediate", desc: "Modern UI for NFT bidding.", participants: 55 },
    { title: "Quality Assurance Testing", skills: ["Selenium", "Jira"], location: "Remote", type: "Hourly", budget: "$40/hr", level: "Intermediate", desc: "Automated regression testing.", participants: 42 },
    { title: "D3.js Data Viz", skills: ["D3.js", "Javascript"], location: "Remote", type: "Fixed-price", budget: "$1200", level: "Expert", desc: "Interactive map visualization.", participants: 20 },
    { title: "Social Media Manager", skills: ["Instagram", "Canva"], location: "Remote", type: "Hourly", budget: "$20/hr", level: "Entry", desc: "Manage weekly post schedule.", participants: 310 },
    { title: "GraphQL API Integration", skills: ["GraphQL", "Apollo"], location: "Remote", type: "Fixed-price", budget: "$800", level: "Intermediate", desc: "Optimize frontend data fetching.", participants: 17 },
    { title: "Svelte Portfolio Site", skills: ["Svelte", "CSS"], location: "Remote", type: "Fixed-price", budget: "$350", level: "Entry", desc: "Minimalist personal site.", participants: 68 },
    { title: "Cybersecurity Training", skills: ["Teaching", "Security"], location: "Remote", type: "Hourly", budget: "$100/hr", level: "Expert", desc: "Staff security awareness workshop.", participants: 10 },
    { title: "Ruby on Rails Update", skills: ["Ruby", "Rails"], location: "Remote", type: "Fixed-price", budget: "$1400", level: "Intermediate", desc: "Upgrade legacy app to Rails 7.", participants: 13 },
    { title: "App Store Optimization", skills: ["ASO", "Mobile"], location: "Remote", type: "Fixed-price", budget: "$450", level: "Intermediate", desc: "Increase app downloads.", participants: 57 },
    { title: "Dockerizing Legacy App", skills: ["Docker", "Linux"], location: "Remote", type: "Fixed-price", budget: "$700", level: "Intermediate", desc: "Containerize old PHP project.", participants: 30 },
    { title: "Three.js 3D Web", skills: ["Three.js", "WebGL"], location: "Remote", type: "Fixed-price", budget: "$1700", level: "Expert", desc: "Immersive landing page experience.", participants: 23 },
    { title: "Salesforce Customization", skills: ["Salesforce", "Apex"], location: "Remote", type: "Hourly", budget: "$90/hr", level: "Expert", desc: "Custom triggers and flows.", participants: 8 },
    { title: "Podcast Audio Editing", skills: ["Audacity", "ProTools"], location: "Remote", type: "Hourly", budget: "$30/hr", level: "Entry", desc: "Remove noise and mix audio.", participants: 77 },
    { title: "Kubernetes Cluster Setup", skills: ["K8s", "Azure"], location: "Remote", type: "Fixed-price", budget: "$2500", level: "Expert", desc: "High availability setup.", participants: 12 },
    { title: "Translator (Eng to Span)", skills: ["Spanish", "Translation"], location: "Remote", type: "Fixed-price", budget: "$250", level: "Entry", desc: "Translate 5,000 word eBook.", participants: 41 }
];

// This registry simulates your historical "Completed Work"
// These titles must match the ones in the opportunities array exactly.
const completedRegistry = [
    "Cybersecurity Audit",
    "React SaaS Dashboard",
    "Penetration Testing",
    "Full Stack MERN App",
    "Technical Content Writer",
    "AWS Cloud Migration",
    "Python Data Automation" // This is a bonus one
];

// 🔥 STORE USER ADDED JOBS
function addNewJob(job) {
    let jobs = JSON.parse(localStorage.getItem("user_jobs")) || [];
    jobs.push(job);
    localStorage.setItem("user_jobs", JSON.stringify(jobs));

    checkJobMatch(job);
}

// 🔥 MATCH ENGINE
function checkJobMatch(job) {
    const user = JSON.parse(localStorage.getItem("signalX_user"));
    if (!user) return;

    const userSkills = (user.skills || []).map(s => s.toLowerCase());
    const userInterests = (user.interests || "").toLowerCase();

    const jobSkills = (job.skills || []).map(s => s.toLowerCase());
    const jobTitle = job.title.toLowerCase();

    let matchScore = 0;

    // Skill match
    jobSkills.forEach(skill => {
        if (userSkills.includes(skill)) matchScore += 2;
    });

    // Interest match
    if (userInterests && jobTitle.includes(userInterests)) {
        matchScore += 1;
    }

    // 🔥 IF MATCH FOUND
    if (matchScore >= 2) {
        let notifications = JSON.parse(localStorage.getItem("signal_notifications")) || [];

        notifications.push({
            title: job.title,
            score: matchScore,
            time: new Date().toLocaleTimeString()
        });

        localStorage.setItem("signal_notifications", JSON.stringify(notifications));
    }
}
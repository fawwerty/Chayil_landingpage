export const mockThreats = [
  {
    id: 1,
    title: "Ransomware Campaign - LockBit 3.0",
    severity: "Critical",
    category: "Ransomware",
    source: "CrowdStrike",
    timestamp: "2024-11-04T10:30:00Z",
    description: "New LockBit 3.0 ransomware variant targeting healthcare organizations with enhanced encryption algorithms.",
    indicators: ["SHA256: a1b2c3d4e5f6...", "Domain: lockbit-onion.site"],
    affectedSystems: ["Windows Server 2019", "Windows 10"],
    status: "Active"
  },
  {
    id: 2,
    title: "Zero-Day Vulnerability in Apache Log4j",
    severity: "High",
    category: "Vulnerability",
    source: "Mandiant",
    timestamp: "2024-11-04T09:15:00Z",
    description: "Critical zero-day vulnerability discovered in Apache Log4j library affecting millions of systems.",
    indicators: ["CVE-2024-XXXX", "Log4j version 2.17.1"],
    affectedSystems: ["Linux", "Windows", "macOS"],
    status: "Active"
  },
  {
    id: 3,
    title: "Phishing Campaign - Business Email Compromise",
    severity: "High",
    category: "Phishing",
    source: "Microsoft Defender",
    timestamp: "2024-11-04T08:45:00Z",
    description: "Sophisticated BEC campaign targeting executive accounts with personalized spear-phishing emails.",
    indicators: ["Email domain: office365-support.com", "Subject: Urgent Account Verification"],
    affectedSystems: ["Email Systems", "Financial Applications"],
    status: "Active"
  },
  {
    id: 4,
    title: "DDoS Attack on Financial Services",
    severity: "Medium",
    category: "DDoS",
    source: "Cloudflare",
    timestamp: "2024-11-04T07:20:00Z",
    description: "Large-scale DDoS attack using botnet infrastructure targeting major financial institutions.",
    indicators: ["IP ranges: 192.168.1.0/24", "Attack vector: SYN flood"],
    affectedSystems: ["Web Servers", "API Gateways"],
    status: "Mitigated"
  },
  {
    id: 5,
    title: "IoT Botnet Expansion",
    severity: "Medium",
    category: "Botnet",
    source: "Kaspersky",
    timestamp: "2024-11-04T06:10:00Z",
    description: "Rapid expansion of IoT botnet targeting smart home devices and industrial control systems.",
    indicators: ["Port: 23 (Telnet)", "Device: CCTV cameras"],
    affectedSystems: ["IoT Devices", "Network Infrastructure"],
    status: "Active"
  },
  {
    id: 6,
    title: "Supply Chain Attack - SolarWinds-like",
    severity: "Critical",
    category: "Supply Chain",
    source: "FireEye",
    timestamp: "2024-11-04T05:00:00Z",
    description: "Sophisticated supply chain compromise affecting software distribution networks.",
    indicators: ["Hash: MD5: 9f8e7d6c5b4a3210", "Compromised vendor: third-party-lib.com"],
    affectedSystems: ["Software Development", "CI/CD Pipelines"],
    status: "Active"
  },
  {
    id: 7,
    title: "Credential Stuffing Campaign",
    severity: "Low",
    category: "Credential Theft",
    source: "Have I Been Pwned",
    timestamp: "2024-11-04T04:30:00Z",
    description: "Automated credential stuffing attacks using leaked password databases.",
    indicators: ["Username patterns", "Common passwords"],
    affectedSystems: ["Authentication Systems", "Web Applications"],
    status: "Ongoing"
  },
  {
    id: 8,
    title: "APT Group Activity - State-sponsored",
    severity: "High",
    category: "APT",
    source: "Recorded Future",
    timestamp: "2024-11-04T03:15:00Z",
    description: "Advanced persistent threat activity linked to nation-state actors targeting critical infrastructure.",
    indicators: ["C2 server: malicious-domain.ru", "TTP: Living off the Land"],
    affectedSystems: ["Government Networks", "Critical Infrastructure"],
    status: "Active"
  }
];

export const mockThreatFeed = [
  {
    id: 1,
    title: "New Ransomware Variant Detected",
    severity: "Critical",
    source: "CrowdStrike",
    timestamp: "2024-11-04T10:45:00Z",
    summary: "LockBit 3.0 ransomware targeting healthcare sector"
  },
  {
    id: 2,
    title: "Zero-Day Exploit Published",
    severity: "High",
    source: "Mandiant",
    timestamp: "2024-11-04T10:30:00Z",
    summary: "Critical vulnerability in popular web framework"
  },
  {
    id: 3,
    title: "Phishing Campaign Alert",
    severity: "High",
    source: "Microsoft",
    timestamp: "2024-11-04T10:15:00Z",
    summary: "Massive BEC campaign targeting executives"
  },
  {
    id: 4,
    title: "DDoS Attack Mitigation",
    severity: "Medium",
    source: "Cloudflare",
    timestamp: "2024-11-04T10:00:00Z",
    summary: "Botnet attack on financial services disrupted"
  },
  {
    id: 5,
    title: "IoT Vulnerability Patch",
    severity: "Medium",
    source: "Kaspersky",
    timestamp: "2024-11-04T09:45:00Z",
    summary: "Critical security update for smart devices"
  }
];

// Mock data for reports and analytics
export const mockReports = [
  {
    id: 1,
    title: "Monthly Security Report",
    type: "Security",
    period: "October 2024",
    status: "Completed",
    generatedDate: "2024-11-01",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Compliance Assessment",
    type: "Compliance",
    period: "Q3 2024",
    status: "Completed",
    generatedDate: "2024-10-15",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Threat Analysis Report",
    type: "Threat Intelligence",
    period: "Weekly",
    status: "In Progress",
    generatedDate: "2024-11-04",
    downloadUrl: "#"
  },
  {
    id: 4,
    title: "Incident Response Summary",
    type: "Incident",
    period: "October 2024",
    status: "Completed",
    generatedDate: "2024-10-31",
    downloadUrl: "#"
  },
  {
    id: 5,
    title: "Vulnerability Scan Results",
    type: "Vulnerability",
    period: "Weekly",
    status: "Completed",
    generatedDate: "2024-11-03",
    downloadUrl: "#"
  }
];

export const mockReportsData = {
  threatTrends: [
    { month: 'Jan', threats: 45, incidents: 12 },
    { month: 'Feb', threats: 52, incidents: 18 },
    { month: 'Mar', threats: 38, incidents: 15 },
    { month: 'Apr', threats: 61, incidents: 22 },
    { month: 'May', threats: 49, incidents: 19 },
    { month: 'Jun', threats: 73, incidents: 28 },
    { month: 'Jul', threats: 58, incidents: 21 },
    { month: 'Aug', threats: 67, incidents: 25 },
    { month: 'Sep', threats: 54, incidents: 20 },
    { month: 'Oct', threats: 71, incidents: 26 },
    { month: 'Nov', threats: 63, incidents: 24 },
    { month: 'Dec', threats: 59, incidents: 23 }
  ],
  threatCategories: [
    { name: 'Ransomware', value: 35, color: '#ef4444' },
    { name: 'Phishing', value: 28, color: '#f97316' },
    { name: 'DDoS', value: 15, color: '#eab308' },
    { name: 'Vulnerability', value: 12, color: '#22c55e' },
    { name: 'APT', value: 10, color: '#3b82f6' }
  ],
  severityDistribution: [
    { name: 'Critical', value: 15, color: '#dc2626' },
    { name: 'High', value: 35, color: '#ea580c' },
    { name: 'Medium', value: 30, color: '#ca8a04' },
    { name: 'Low', value: 20, color: '#16a34a' }
  ],
  clientSecurityScores: [
    { client: 'TechCorp Inc', score: 92, trend: 'up' },
    { client: 'FinancePlus', score: 87, trend: 'up' },
    { client: 'HealthCare Pro', score: 78, trend: 'down' },
    { client: 'RetailChain', score: 85, trend: 'stable' },
    { client: 'Manufacturing LLC', score: 91, trend: 'up' }
  ],
  incidentResponseTimes: [
    { period: 'Week 1', avgTime: 45 },
    { period: 'Week 2', avgTime: 38 },
    { period: 'Week 3', avgTime: 52 },
    { period: 'Week 4', avgTime: 41 }
  ]
};

// Mock incidents data for client and admin dashboards
export const mockIncidents = [
  {
    id: 1,
    title: "Suspicious Login Attempt",
    severity: "High",
    status: "Open",
    category: "Authentication",
    description: "Multiple failed login attempts from unknown IP addresses detected.",
    timestamp: "2024-11-04T10:00:00Z",
    assignee: "John Doe",
    client: "TechCorp Inc",
    indicators: ["IP: 192.168.1.100", "User Agent: Suspicious Browser"],
    affectedSystems: ["Authentication Server"],
    priority: "High",
    resolution: null,
    comments: [
      { user: "System", message: "Incident automatically created by SIEM", timestamp: "2024-11-04T10:00:00Z" }
    ]
  },
  {
    id: 2,
    title: "Malware Detected on Endpoint",
    severity: "Critical",
    status: "In Progress",
    category: "Malware",
    description: "Ransomware variant detected on multiple endpoints in the finance department.",
    timestamp: "2024-11-04T09:30:00Z",
    assignee: "Jane Smith",
    client: "FinancePlus",
    indicators: ["SHA256: a1b2c3d4e5f6...", "File: invoice.exe"],
    affectedSystems: ["Windows Workstations", "File Server"],
    priority: "Critical",
    resolution: null,
    comments: [
      { user: "Jane Smith", message: "Isolating affected systems", timestamp: "2024-11-04T09:35:00Z" }
    ]
  },
  {
    id: 3,
    title: "Data Exfiltration Attempt",
    severity: "High",
    status: "Resolved",
    category: "Data Breach",
    description: "Large data transfer to external IP detected, potentially indicating data exfiltration.",
    timestamp: "2024-11-04T08:15:00Z",
    assignee: "Mike Johnson",
    client: "HealthCare Pro",
    indicators: ["Destination IP: 203.0.113.1", "Data size: 2.5GB"],
    affectedSystems: ["Database Server"],
    priority: "High",
    resolution: "False positive - legitimate backup transfer",
    comments: [
      { user: "Mike Johnson", message: "Investigating data transfer", timestamp: "2024-11-04T08:20:00Z" },
      { user: "Mike Johnson", message: "Confirmed as legitimate backup", timestamp: "2024-11-04T08:45:00Z" }
    ]
  },
  {
    id: 4,
    title: "Phishing Email Campaign",
    severity: "Medium",
    status: "Open",
    category: "Phishing",
    description: "Multiple users reported receiving suspicious emails impersonating company executives.",
    timestamp: "2024-11-04T07:45:00Z",
    assignee: "Sarah Wilson",
    client: "RetailChain",
    indicators: ["Sender: ceo@retailchain-support.com", "Subject: Urgent Payment Request"],
    affectedSystems: ["Email System"],
    priority: "Medium",
    resolution: null,
    comments: [
      { user: "Sarah Wilson", message: "User training initiated", timestamp: "2024-11-04T07:50:00Z" }
    ]
  },
  {
    id: 5,
    title: "DDoS Attack Mitigation",
    severity: "Medium",
    status: "Resolved",
    category: "DDoS",
    description: "Distributed denial of service attack targeting web applications.",
    timestamp: "2024-11-04T06:30:00Z",
    assignee: "Tom Brown",
    client: "Manufacturing LLC",
    indicators: ["Attack vector: SYN flood", "Peak traffic: 100Gbps"],
    affectedSystems: ["Web Servers", "Load Balancers"],
    priority: "Medium",
    resolution: "Attack mitigated using cloud protection services",
    comments: [
      { user: "Tom Brown", message: "DDoS protection activated", timestamp: "2024-11-04T06:35:00Z" },
      { user: "Tom Brown", message: "Attack successfully mitigated", timestamp: "2024-11-04T07:00:00Z" }
    ]
  },
  {
    id: 6,
    title: "Unauthorized Access to Admin Panel",
    severity: "High",
    status: "In Progress",
    category: "Unauthorized Access",
    description: "Suspicious access to administrative control panel from external IP.",
    timestamp: "2024-11-04T05:20:00Z",
    assignee: "Lisa Davis",
    client: "TechCorp Inc",
    indicators: ["IP: 198.51.100.1", "User: admin"],
    affectedSystems: ["Admin Console"],
    priority: "High",
    resolution: null,
    comments: [
      { user: "Lisa Davis", message: "IP blocked and password reset initiated", timestamp: "2024-11-04T05:25:00Z" }
    ]
  },
  {
    id: 7,
    title: "SSL Certificate Expiration",
    severity: "Low",
    status: "Resolved",
    category: "Configuration",
    description: "SSL certificate for main website expired, causing browser warnings.",
    timestamp: "2024-11-04T04:10:00Z",
    assignee: "Chris Anderson",
    client: "FinancePlus",
    indicators: ["Domain: financeplus.com", "Expiry: 2024-11-04"],
    affectedSystems: ["Web Server"],
    priority: "Low",
    resolution: "Certificate renewed and deployed",
    comments: [
      { user: "Chris Anderson", message: "Certificate renewed", timestamp: "2024-11-04T04:15:00Z" }
    ]
  },
  {
    id: 8,
    title: "Insider Threat Detected",
    severity: "Critical",
    status: "Open",
    category: "Insider Threat",
    description: "Unusual data access patterns suggesting potential insider threat activity.",
    timestamp: "2024-11-04T03:00:00Z",
    assignee: "Robert Taylor",
    client: "HealthCare Pro",
    indicators: ["User: employee123", "Access pattern: Bulk download"],
    affectedSystems: ["File Server", "Database"],
    priority: "Critical",
    resolution: null,
    comments: [
      { user: "Robert Taylor", message: "Account temporarily suspended for investigation", timestamp: "2024-11-04T03:05:00Z" }
    ]
  }
];

// Mock clients data
export const mockClients = [
  {
    id: 1,
    name: "TechCorp Inc",
    industry: "Technology",
    size: "Large",
    contact: "john.doe@techcorp.com",
    status: "Active",
    securityScore: 92,
    lastAssessment: "2024-11-01",
    incidents: 3,
    services: ["Endpoint Protection", "SIEM", "Vulnerability Scanning"]
  },
  {
    id: 2,
    name: "FinancePlus",
    industry: "Financial Services",
    size: "Medium",
    contact: "jane.smith@financeplus.com",
    status: "Active",
    securityScore: 87,
    lastAssessment: "2024-10-28",
    incidents: 5,
    services: ["Network Security", "Compliance Monitoring", "Incident Response"]
  },
  {
    id: 3,
    name: "HealthCare Pro",
    industry: "Healthcare",
    size: "Large",
    contact: "mike.johnson@healthcarepro.com",
    status: "Active",
    securityScore: 78,
    lastAssessment: "2024-10-25",
    incidents: 8,
    services: ["HIPAA Compliance", "Data Protection", "Endpoint Security"]
  },
  {
    id: 4,
    name: "RetailChain",
    industry: "Retail",
    size: "Large",
    contact: "sarah.wilson@retailchain.com",
    status: "Active",
    securityScore: 85,
    lastAssessment: "2024-11-02",
    incidents: 2,
    services: ["POS Security", "Network Monitoring", "Employee Training"]
  },
  {
    id: 5,
    name: "Manufacturing LLC",
    industry: "Manufacturing",
    size: "Medium",
    contact: "tom.brown@manufacturing.com",
    status: "Active",
    securityScore: 91,
    lastAssessment: "2024-10-30",
    incidents: 1,
    services: ["OT Security", "Network Segmentation", "Access Control"]
  }
];

// Mock security services data
export const mockSecurityServices = [
  {
    id: 1,
    name: "Endpoint Protection",
    description: "Advanced endpoint detection and response (EDR) solution",
    category: "Endpoint Security",
    price: 25,
    features: ["Real-time monitoring", "Threat detection", "Automated response"],
    clients: ["TechCorp Inc", "HealthCare Pro"]
  },
  {
    id: 2,
    name: "Network Security",
    description: "Comprehensive network security and monitoring",
    category: "Network Security",
    price: 50,
    features: ["Firewall management", "Intrusion detection", "Traffic analysis"],
    clients: ["FinancePlus", "Manufacturing LLC"]
  },
  {
    id: 3,
    name: "SIEM Solution",
    description: "Security Information and Event Management platform",
    category: "Monitoring",
    price: 75,
    features: ["Log aggregation", "Real-time alerts", "Compliance reporting"],
    clients: ["TechCorp Inc", "FinancePlus", "RetailChain"]
  },
  {
    id: 4,
    name: "Vulnerability Scanning",
    description: "Automated vulnerability assessment and management",
    category: "Assessment",
    price: 30,
    features: ["Weekly scans", "Risk prioritization", "Remediation tracking"],
    clients: ["TechCorp Inc", "HealthCare Pro", "Manufacturing LLC"]
  },
  {
    id: 5,
    name: "Incident Response",
    description: "24/7 incident response and forensic analysis",
    category: "Response",
    price: 100,
    features: ["24/7 support", "Forensic analysis", "Recovery assistance"],
    clients: ["FinancePlus", "HealthCare Pro"]
  }
];

// Mock compliance data
export const mockComplianceData = [
  {
    id: 1,
    category: "GDPR",
    title: "Data Protection Impact Assessment",
    description: "Conduct DPIA for high-risk processing activities",
    status: "completed",
    dueDate: "2024-12-01",
    priority: "High",
    progress: 100,
    requirements: [
      "Identify processing activities",
      "Assess necessity and proportionality",
      "Identify and mitigate risks",
      "Consult supervisory authority if needed"
    ]
  },
  {
    id: 2,
    category: "ISO 27001",
    title: "Information Security Management System",
    description: "Implement and maintain ISMS framework",
    status: "in_progress",
    dueDate: "2024-12-15",
    priority: "High",
    progress: 75,
    requirements: [
      "Define information security policy",
      "Conduct risk assessment",
      "Implement security controls",
      "Internal audit and management review"
    ]
  },
  {
    id: 3,
    category: "PCI DSS",
    title: "Payment Card Industry Compliance",
    description: "Maintain PCI DSS compliance for cardholder data",
    status: "pending",
    dueDate: "2024-11-30",
    priority: "Critical",
    progress: 45,
    requirements: [
      "Build and maintain secure network",
      "Protect cardholder data",
      "Maintain vulnerability management",
      "Implement access control measures"
    ]
  },
  {
    id: 4,
    category: "HIPAA",
    title: "Health Insurance Portability and Accountability Act",
    description: "Ensure HIPAA compliance for protected health information",
    status: "completed",
    dueDate: "2024-11-15",
    priority: "High",
    progress: 100,
    requirements: [
      "Implement safeguards",
      "Designate privacy officer",
      "Conduct security risk analysis",
      "Provide breach notification"
    ]
  },
  {
    id: 5,
    category: "SOX",
    title: "Sarbanes-Oxley Act Compliance",
    description: "Maintain financial reporting controls",
    status: "in_progress",
    dueDate: "2024-12-31",
    priority: "Medium",
    progress: 60,
    requirements: [
      "Establish internal controls",
      "Document financial processes",
      "Conduct regular audits",
      "Report on control effectiveness"
    ]
  }
];

// Mock training modules data
export const mockTrainingModules = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals",
    description: "Essential cybersecurity concepts and best practices",
    category: "Basic",
    duration: "2 hours",
    difficulty: "Beginner",
    status: "completed",
    progress: 100,
    completionDate: "2024-10-15",
    certificateEarned: true,
    modules: [
      { title: "Introduction to Cybersecurity", completed: true },
      { title: "Common Threats and Vulnerabilities", completed: true },
      { title: "Basic Security Practices", completed: true },
      { title: "Password Security", completed: true }
    ]
  },
  {
    id: 2,
    title: "Phishing Awareness Training",
    description: "Recognize and respond to phishing attempts",
    category: "Security Awareness",
    duration: "1.5 hours",
    difficulty: "Beginner",
    status: "completed",
    progress: 100,
    completionDate: "2024-10-20",
    certificateEarned: true,
    modules: [
      { title: "What is Phishing?", completed: true },
      { title: "Types of Phishing Attacks", completed: true },
      { title: "How to Identify Phishing", completed: true },
      { title: "Reporting Suspicious Emails", completed: true }
    ]
  },
  {
    id: 3,
    title: "Data Protection and Privacy",
    description: "Understanding data protection regulations and privacy",
    category: "Compliance",
    duration: "3 hours",
    difficulty: "Intermediate",
    status: "in_progress",
    progress: 70,
    completionDate: null,
    certificateEarned: false,
    modules: [
      { title: "GDPR Overview", completed: true },
      { title: "Data Subject Rights", completed: true },
      { title: "Data Processing Principles", completed: true },
      { title: "Privacy Impact Assessment", completed: false },
      { title: "Data Breach Response", completed: false }
    ]
  },
  {
    id: 4,
    title: "Incident Response Procedures",
    description: "Learn how to respond to security incidents effectively",
    category: "Incident Response",
    duration: "4 hours",
    difficulty: "Advanced",
    status: "not_started",
    progress: 0,
    completionDate: null,
    certificateEarned: false,
    modules: [
      { title: "Incident Response Lifecycle", completed: false },
      { title: "Preparation Phase", completed: false },
      { title: "Detection and Analysis", completed: false },
      { title: "Containment and Eradication", completed: false },
      { title: "Recovery and Lessons Learned", completed: false }
    ]
  },
  {
    id: 5,
    title: "Secure Remote Work",
    description: "Best practices for secure remote work environment",
    category: "Remote Work",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    status: "completed",
    progress: 100,
    completionDate: "2024-11-01",
    certificateEarned: true,
    modules: [
      { title: "VPN and Secure Connections", completed: true },
      { title: "Device Security", completed: true },
      { title: "Home Network Security", completed: true },
      { title: "Secure File Sharing", completed: true },
      { title: "Incident Reporting", completed: true }
    ]
  }
];

// Mock certificates data
export const mockCertificates = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals Certificate",
    moduleTitle: "Cybersecurity Fundamentals",
    earnedDate: "2024-10-15",
    expiryDate: "2025-10-15",
    status: "Active",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Phishing Awareness Certificate",
    moduleTitle: "Phishing Awareness Training",
    earnedDate: "2024-10-20",
    expiryDate: "2025-10-20",
    status: "Active",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Secure Remote Work Certificate",
    moduleTitle: "Secure Remote Work",
    earnedDate: "2024-11-01",
    expiryDate: "2025-11-01",
    status: "Active",
    downloadUrl: "#"
  }
];

// Mock messages and contacts data for communication
export const mockMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    content: "Hello! I wanted to discuss the recent security assessment.",
    timestamp: "2024-11-04T10:00:00Z",
    read: true
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    content: "Hi! Sure, I'd be happy to go over the findings with you.",
    timestamp: "2024-11-04T10:05:00Z",
    read: true
  },
  {
    id: 3,
    senderId: 1,
    receiverId: 2,
    content: "Great! I noticed some vulnerabilities in our endpoint protection.",
    timestamp: "2024-11-04T10:10:00Z",
    read: false
  }
];

export const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    role: "Security Analyst",
    avatar: "JD",
    status: "online",
    lastSeen: "2024-11-04T10:15:00Z",
    email: "john.doe@chayil.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Incident Response Lead",
    avatar: "JS",
    status: "online",
    lastSeen: "2024-11-04T10:10:00Z",
    email: "jane.smith@chayil.com"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Compliance Officer",
    avatar: "MJ",
    status: "away",
    lastSeen: "2024-11-04T09:45:00Z",
    email: "mike.johnson@chayil.com"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    role: "Training Coordinator",
    avatar: "SW",
    status: "offline",
    lastSeen: "2024-11-04T08:30:00Z",
    email: "sarah.wilson@chayil.com"
  }
];

// Mock billing data for client billing page
export const mockPlans = [
  {
    id: 1,
    name: "Basic Security",
    price: 99,
    period: "monthly",
    features: [
      "Endpoint Protection",
      "Basic Monitoring",
      "Email Security",
      "24/7 Support"
    ],
    current: true,
    popular: false
  },
  {
    id: 2,
    name: "Advanced Security",
    price: 199,
    period: "monthly",
    features: [
      "All Basic features",
      "Advanced Threat Detection",
      "SIEM Integration",
      "Compliance Monitoring",
      "Incident Response"
    ],
    current: false,
    popular: true
  },
  {
    id: 3,
    name: "Enterprise Security",
    price: 399,
    period: "monthly",
    features: [
      "All Advanced features",
      "Custom Integrations",
      "Dedicated SOC Team",
      "Advanced Analytics",
      "Priority Support"
    ],
    current: false,
    popular: false
  }
];

export const mockInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    date: "2024-11-01",
    dueDate: "2024-11-15",
    amount: 199.00,
    status: "paid",
    description: "Advanced Security Plan - November 2024",
    downloadUrl: "#"
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    date: "2024-10-01",
    dueDate: "2024-10-15",
    amount: 199.00,
    status: "paid",
    description: "Advanced Security Plan - October 2024",
    downloadUrl: "#"
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    date: "2024-09-01",
    dueDate: "2024-09-15",
    amount: 199.00,
    status: "paid",
    description: "Advanced Security Plan - September 2024",
    downloadUrl: "#"
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    date: "2024-12-01",
    dueDate: "2024-12-15",
    amount: 199.00,
    status: "pending",
    description: "Advanced Security Plan - December 2024",
    downloadUrl: "#"
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-005",
    date: "2024-08-01",
    dueDate: "2024-08-15",
    amount: 99.00,
    status: "paid",
    description: "Basic Security Plan - August 2024",
    downloadUrl: "#"
  }
];

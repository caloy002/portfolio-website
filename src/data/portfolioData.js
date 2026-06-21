import homeImage from '../assets/home_image.jpg'
import about1 from '../assets/about_1.jpg'
import about2 from '../assets/about_2.jpg'
import about3 from '../assets/about_3.jpg'
import about4 from '../assets/about_4.jpg'
import about5 from '../assets/about_5.jpg'
import about6 from '../assets/about_6.jpg'
import about7 from '../assets/about_7.jpg'
import about8 from '../assets/about_8.jpg'
import about9 from '../assets/about_9.jpg'
import project1 from '../assets/project1.png'
import project1_1 from '../assets/project1.1.png'
import project1_2 from '../assets/project1.2.png'
import project1_3 from '../assets/project1.3.png'
import project1_4 from '../assets/project1.4.png'
import project1_5 from '../assets/project1.5.png'
import project1_6 from '../assets/project1.6.png'
import project1_7 from '../assets/project1.7.png'
import project1_8 from '../assets/project1.8.png'
import project1_9 from '../assets/project1.9.png'
import project1_10 from '../assets/project1.10.png'
import project2 from '../assets/project2.jpg'
import project2_1 from '../assets/project2.1.jpg'
import project2_2 from '../assets/project2.2.jpg'
import project2_3 from '../assets/project2.3.jpg'
import project2_4 from '../assets/project2.4.png'
import project2_5 from '../assets/project2.5.png'
import project2_6 from '../assets/project2.6.png'
import project2_7 from '../assets/project2.7.png'
import project2_8 from '../assets/project2.8.png'
import project2_9 from '../assets/project2.9.png'
import project2_10 from '../assets/project2.10.png'
import project2_11 from '../assets/project2.11.png'
import project2_12 from '../assets/project2.12.png'
import project2_13 from '../assets/project2.13.png'
import project2_14 from '../assets/project2.14.png'
import project2_15 from '../assets/project2.15.png'
import project2_16 from '../assets/project2.16.png'
import project2_17 from '../assets/project2.17.png'
import project2_18 from '../assets/project2.18.png'
import project3 from '../assets/project3.png'
import project4 from '../assets/project4.png'
import project5_1 from '../assets/project5.1.png'
import project5_2 from '../assets/project5.2.png'
import project5_3 from '../assets/project5.3.png'
import stupidyanteVideo from '../assets/stupidyante.mp4'
import twoDFirstOutputVideo from '../assets/2d_1st_output.mp4'
import resumePdf from '../assets/Casing-John-Carlo-RESUME_.pdf'

export const navLinks = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'about', label: 'About', icon: 'User' },
  { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
  { id: 'contact', label: 'Contact', icon: 'Send' },
]

export const hero = {
  greeting: "Hi, I'm",
  name: 'John Carlo Casing',
  roles: ['Full Stack Web Developer', 'UI/UX Designer', 'Game Developer'],
  bio: "Hi, I'm John Carlo Casing, a passionate Full Stack Web Developer, creative UI/UX Designer, and Game Developer. I enjoy building responsive, user-friendly, and visually appealing websites, applications, and games while continuously improving my skills in design and development.",
  cvUrl: resumePdf,
  image: homeImage,
}

export const about = {
  title: 'About Me',
  paragraphs: [
    'I am an enthusiastic and detail-oriented Full Stack Web Developer, UI/UX Designer, and Game Developer with experience in Arduino projects. I enjoy transforming complex ideas into interactive, functional, and visually striking applications and games while focusing on clean code, usability, and performance.',
    'As a developer, I value creativity, continuous learning, and collaborative problem-solving. I am motivated to grow professionally, collaborate with teams, and build innovative digital solutions that deliver memorable user experiences and real-world impact.',
  ],
  images: [about1, about2, about3, about4, about5, about6, about7, about8, about9],
}

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Front end',
    element: 'anemo',
    skills: [
      { name: 'Html', level: 90, icon: 'HTML5' },
      { name: 'JavaScript', level: 85, icon: 'JS' },
      { name: 'CSS3', level: 88, icon: 'CSS3' },
      { name: 'Tailwind CSS', level: 82, icon: 'TW' },
      { name: 'Bootstrap', level: 80, icon: 'BS' },
      { name: 'React', level: 78, icon: 'React' },
    ],
  },
  {
    id: 'backend',
    label: 'Back-end',
    element: 'geo',
    skills: [
      { name: 'Php', level: 85, icon: 'PHP' },
      { name: 'MySQL', level: 82, icon: 'SQL' },
      { name: 'Node.js', level: 75, icon: 'Node' },
      { name: 'Supabase', level: 70, icon: 'SB' },
    ],
  },
  {
    id: 'design',
    label: 'UI/UX & Design Tools',
    element: 'electro',
    skills: [
      { name: 'Figma', level: 88, icon: 'Fig' },
      { name: 'Photoshop', level: 75, icon: 'Ps' },
      { name: 'Blender', level: 65, icon: '3D' },
    ],
  },
  {
    id: 'gamedev',
    label: 'Game Dev Tools',
    element: 'pyro',
    skills: [
      { name: 'Unity', level: 80, icon: 'Unity' },
      { name: 'Godot Engine', level: 75, icon: 'Godot' },
    ],
  },
]

export const projects = [
  {
    id: 'dar',
    category: 'System',
    title: 'DAR II Data Management System',
    summary:
      'LTID-Survey platform for DAR with municipality records, document management, map files, and admin accounts.',
    description:
      'A full data management system built for the Department of Agrarian Reform (DAR) under the LTID-Survey program. It includes secure login, role-based navigation, ASP & TTDS municipality record tracking, sketch plan folders, map record storage, extra file management, and account administration — all in a nature-inspired green interface designed for organized agricultural record keeping.',
    tags: ['Data Management', 'Records', 'Documents'],
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
    theme: 'forest',
    rarity: 'SR',
    coverImage: project1,
    screenshots: [
      { src: project1, label: 'Login & landing page', caption: 'Branded entry screen with secure sign-in and nature-themed visual design.' },
      { src: project1_1, label: 'Management dashboard', caption: 'Main dashboard with sidebar navigation and quick access to all system modules.' },
      {
        src: project1_2,
        label: 'ASP & TTDS — Municipalities',
        caption: 'Overview of 30 municipalities with record counts, CSV import, and bulk delete controls.',
      },
      {
        src: project1_3,
        label: 'Municipality record list',
        caption: 'Browse agrarian reform records per municipality with search, filters, and add-new-record actions.',
      },
      {
        src: project1_4,
        label: 'Record information',
        caption: 'Detailed record view with landowner data, survey numbers, area, dates, and edit/delete controls.',
      },
      {
        src: project1_5,
        label: 'Attached documents',
        caption: 'Upload and manage document attachments with view, download, print, and delete actions.',
      },
      {
        src: project1_6,
        label: 'Sketch plan folders',
        caption: 'Organize sketch plans by municipality with folder counts and add-new-record workflow.',
      },
      {
        src: project1_7,
        label: 'Map records — Folders',
        caption: 'Create, search, upload, and manage map record folders such as cadastral maps and land titles.',
      },
      {
        src: project1_8,
        label: 'Map records — Documents',
        caption: 'Browse map files inside folders with search, subfolders, attach document, and file actions.',
      },
      {
        src: project1_9,
        label: 'Extra files',
        caption: 'Additional file storage with folder creation, search, upload, open, and delete capabilities.',
      },
      {
        src: project1_10,
        label: 'Account management',
        caption: 'Admin panel to create accounts, assign roles, reset passwords, and manage user access.',
      },
    ],
  },
  {
    id: 'cec',
    category: 'System',
    title: 'CEC AttendEase',
    summary: 'Attendance system with vibrant UI, manual entry flows, and analytics dashboards.',
    description:
      `CEC Faculty Attendance Management System Using RFID Technology
System Description

The CEC Faculty Attendance Management System Using RFID Technology is a web-based attendance monitoring and management system designed to automate the recording, validation, and monitoring of faculty attendance within the College of Engineering and Computing (CEC) at Partido State University. The system utilizes Radio Frequency Identification (RFID) technology integrated with a centralized web application to ensure accurate, efficient, and schedule-based attendance tracking of faculty members.

The system operates through RFID readers installed in designated classrooms. Each faculty member is assigned a unique RFID card that serves as their identification credential. Attendance is validated based on the faculty member's assigned teaching schedule and classroom. When a faculty member taps their RFID card on the RFID reader located in their scheduled room during the scheduled class period, the system automatically records their attendance and marks them as Present. If the faculty member taps their RFID card more than fifteen (15) minutes after the scheduled start time, the system records their attendance as Late. If no RFID attendance record is detected within the allowable attendance period, the system automatically marks the faculty member as Absent.

To prevent invalid attendance entries, the system verifies the faculty member's assigned room and schedule before recording attendance. If a faculty member taps their RFID card in a classroom where they do not have a scheduled class during that time period, the system rejects the transaction and records it as an Invalid Attendance Attempt. This validation mechanism ensures that attendance records accurately reflect actual classroom presence and teaching assignments.

Upon successful attendance recording, the system automatically sends an email notification to the faculty member's registered email address. The notification contains attendance details such as the faculty member's name, date, time, assigned room, scheduled subject, and attendance status. This feature allows faculty members to verify that their attendance has been successfully recorded and provides a personal attendance reference for future use.

All attendance records are transmitted and stored in a centralized database accessible through the web-based management system. The system provides real-time attendance monitoring, allowing authorized personnel to view attendance status, monitor faculty presence, and track attendance trends across departments. Attendance data are immediately updated after every RFID transaction, ensuring that records remain accurate and current.

The system implements four distinct user roles with specific functions and access privileges:

### Attendance Monitoree

The Attendance Monitoree serves as the primary system administrator and has full control over all system functions. This role is responsible for managing user accounts, faculty profiles, RFID registrations, attendance records, room assignments, system configurations, and overall system maintenance. The Attendance Monitoree can create, update, activate, or deactivate accounts for faculty members, course secretaries, and deans. Additionally, the Attendance Monitoree oversees attendance monitoring activities, manages attendance-related concerns, and ensures the integrity and security of the entire system.

### Faculty

Faculty members can monitor their attendance records and submit manual attendance requests when RFID attendance recording is not possible. Situations such as room changes, official meetings, seminars, trainings, official travel, approved activities, or other valid academic responsibilities may require manual attendance submission. Faculty members can provide explanations, write messages or justifications, and upload supporting documents or proof images as evidence. These submissions are forwarded to the Course Secretary for verification and approval. Faculty members can also view attendance notifications and track the status of their submitted requests.

### Course Secretary

The Course Secretary is responsible for managing faculty schedules and validating manual attendance requests. This role can create, update, import, and manage faculty teaching schedules, classroom assignments, and subject schedules within the system. Additionally, the Course Secretary reviews manual attendance submissions, evaluates supporting documents, and determines whether the request is Valid or Invalid. Approved submissions are recorded in the attendance database, while rejected requests are documented accordingly. The Course Secretary plays a critical role in ensuring that attendance records accurately reflect faculty activities and schedule assignments.

### Dean

The Dean serves as the supervisory role with access to attendance analytics and reporting functions. The Dean can generate, view, filter, and export attendance reports based on individual faculty members, departments, date ranges, attendance status, and overall college attendance performance. Reports may include attendance summaries, present records, late records, absences, invalid attendance attempts, and manual attendance submissions. These reports support administrative decision-making, faculty performance monitoring, and compliance reporting within the college.

The system also includes automated report generation capabilities that allow authorized users to produce attendance summaries, late records, absence reports, manual attendance logs, invalid attendance reports, and departmental attendance statistics. Reports can be exported in digital formats for documentation, auditing, and administrative purposes.

To ensure security and data integrity, the system implements secure authentication, role-based access control, attendance validation mechanisms, email notification services, and centralized data storage. User permissions are restricted according to assigned roles, ensuring that sensitive information and system functions remain accessible only to authorized personnel. All attendance transactions and manual attendance actions are logged to promote transparency and accountability.

Through the integration of RFID technology, schedule-based attendance validation, automated email notifications, role-based management, manual attendance verification, and real-time reporting, the CEC Faculty Attendance Management System Using RFID Technology provides an efficient, reliable, and secure solution for monitoring faculty attendance and supporting academic administration within the College of Engineering and Computing.`,
    tags: ['RFID', 'WEB Based', 'Arduino'],
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML', 'CSS', 'C++', 'PHPMailer'],
    theme: 'celestial',
    rarity: 'SSR',
    coverImage: project2,
    screenshots: [
      { src: project2, label: 'Application overview', caption: 'Main interface showcasing the AttendEase visual identity and layout system.' },
      { src: project2_1, label: 'Manual attendance entry', caption: 'Dedicated flow for recording attendance with clear calls-to-action and campus-themed backdrop.' },
      { src: project2_2, label: 'Admin dashboard', caption: 'Dashboard with attendance tables, search, export actions, and summary statistics.' },
      { src: project2_3, label: 'Hardware Integration', caption: 'Developing and interfacing the physical RFID scanner with the microcontroller system.' },
      { src: project2_4, label: 'Login portal', caption: 'Vibrant and clean sign-in screen designed for CEC faculty and administrators.' },
      { src: project2_5, label: 'Main dashboard overview', caption: 'Comprehensive admin dashboard with quick stats, recent attendance logs, and navigation.' },
      { src: project2_6, label: 'Account management', caption: 'Manage user credentials, employee IDs, email addresses, system roles, and courses.' },
      { src: project2_7, label: 'Add account popup', caption: 'Interactive form for administrators to register new users, configure roles, and link details.' },
      { src: project2_8, label: 'RFID registration', caption: 'Assign RFID cards, register tags, and link physical cards to individual user profiles.' },
      { src: project2_9, label: 'RFID scan monitor', caption: 'View active RFID scanning, card reader signals, and live connection logs.' },
      { src: project2_10, label: 'Class schedule management', caption: 'Add, view, and organize class schedules, subject details, time, and room details.' },
      { src: project2_11, label: 'Schedule editor', caption: 'Configure weekly schedules, session times, assign instructors, and set room locations.' },
      { src: project2_12, label: 'Real-time attendance monitor', caption: 'Interactive view showing live check-ins, scanning logs, and check-in success states.' },
      { src: project2_13, label: 'Faculty attendance logs', caption: 'Detailed list of faculty attendance logs with name, department, RFID info, and time records.' },
      { src: project2_14, label: 'Attendance reports dashboard', caption: 'Search and query historical attendance data by date, department, employee, or status.' },
      { src: project2_15, label: 'Report export view', caption: 'Print-ready view and export functions for downloading records in CSV or PDF formats.' },
      { src: project2_16, label: 'Profile settings panel', caption: 'User account overview, details update, and password reset functionalities.' },
      { src: project2_17, label: 'System status & database logs', caption: 'Audit log monitoring to track database connectivity, system activity, and API performance.' },
      { src: project2_18, label: 'System configurations', caption: 'Configure global system settings, RFID reader ports, and security options.' }
    ],
  },
  {
    id: 'croplink',
    category: 'UI/UX Design',
    title: 'CropLink',
    summary:
      'Figma mobile app design connecting farmers and buyers — marketplace, donations, and CropPoint rewards.',
    description:
      'CropLink is a UI/UX Figma prototype for a mobile marketplace that links farmers and buyers. The app supports role-based onboarding (farmer or buyer), crop listings, ordering, wallet balance, produce donations with CropPoint rewards, and a reward center for redeeming farming supplies — all designed with a clean green agricultural brand.',
    tags: ['Figma', 'UI/UX', 'Mobile App'],
    techStack: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
    theme: 'forest',
    rarity: 'SSR',
    coverImage: project3,
    coverFit: 'contain',
    screenshots: [
      {
        src: project3,
        label: 'CropLink — full app overview',
        caption:
          'End-to-end Figma prototype: onboarding, farmer & buyer flows, marketplace, crop listings, donations, and CropPoint rewards.',
      },
    ],
  },
  {
    id: 'local-services',
    category: 'UI/UX Design',
    title: 'Local Services Booking App',
    summary:
      'Figma mobile app for booking local experts — barbers, tutors, mechanics — with onboarding, explore, bookings, and profile.',
    description:
      'A UI/UX Figma prototype for an on-demand local services platform. Users sign in, complete onboarding (find experts, instant booking, verified reviews, secure payments), browse featured providers by category, explore top-rated listings, manage upcoming and past bookings, and access account settings from a clean blue-and-white mobile interface.',
    tags: ['Figma', 'UI/UX', 'Mobile App', 'Booking'],
    techStack: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
    theme: 'celestial',
    rarity: 'SSR',
    coverImage: project4,
    coverFit: 'contain',
    screenshots: [
      {
        src: project4,
        label: 'Local Services — full app overview',
        caption:
          'Complete flow: login, onboarding screens, home with categories, explore listings, my bookings, and profile with account management.',
      },
    ],
  },
  {
    id: 'product-website-design',
    category: 'UI/UX Design',
    title: 'Product Website Design',
    summary: 'UI/UX website design for showcasing a premium product with interactive presentation sections.',
    description: 'A modern UI/UX design workflow for a product-focused website. The screens cover landing sections, specific product configurations, feature spotlights, and interactive showcase grids to deliver an immersive brand experience.',
    tags: ['Figma', 'UI/UX', 'Website Design'],
    techStack: ['Figma', 'UI/UX Design', 'Web Design', 'Prototyping'],
    theme: 'celestial',
    rarity: 'SSR',
    coverImage: project5_1,
    coverFit: 'contain',
    screenshots: [
      {
        src: project5_1,
        label: 'Desktop layout mockup',
        caption: 'The main interactive desktop mockup of the product landing page.',
      },
      {
        src: project5_2,
        label: 'Details mockup',
        caption: 'Sleek dark mode specifications and feature description cards.',
      },
      {
        src: project5_3,
        label: 'Features mockup',
        caption: 'Additional presentation screen showcasing core product details.',
      },
    ],
  },
  {
    id: 'stupidyante',
    category: 'Game',
    title: 'Stupidyante',
    summary:
      'A fun, humorous chase game where a student without an ID dodges the school guard and tries to escape.',
    description:
      "Stupidyante is a fun and humorous game about a student who tries to enter the school without an ID. The guard blocks the student from entering, but the student keeps running, so the guard starts chasing him. The main objective is to avoid getting caught by the guard and successfully escape. The game focuses on entertainment, quick reactions, and timing.",
    tags: ['Game', 'Humor', 'Chase'],
    techStack: ['Godot Engine', 'Photoshop'],
    theme: 'arcade',
    rarity: 'SR',
    coverVideo: stupidyanteVideo,
    screenshots: [
      {
        type: 'video',
        src: stupidyanteVideo,
        label: 'Gameplay demo',
        caption:
          'Watch the student run from the guard — dodge, react fast, and escape before you get caught.',
      },
    ],
  },
  {
    id: '2d-first-output',
    category: 'Game',
    title: '2D First Output',
    summary:
      'Early 2D game project showcasing core mechanics, movement, and interactive gameplay in a compact demo.',
    description:
      '2D First Output is an initial 2D game deliverable focused on building foundational gameplay systems — character movement, level interaction, and responsive controls. This project demonstrates the first playable output of a 2D game workflow, emphasizing clean mechanics, visual feedback, and a smooth player experience.',
    tags: ['2D', 'Game', 'Demo'],
    techStack: ['Godot Engine', 'Photoshop'],
    theme: 'arcade',
    rarity: 'SR',
    coverVideo: twoDFirstOutputVideo,
    screenshots: [
      {
        type: 'video',
        src: twoDFirstOutputVideo,
        label: 'Project demo',
        caption: 'Gameplay footage from the first 2D project output — movement, interaction, and core mechanics.',
      },
    ],
  },
]

export const heroSocials = [
  { label: 'Facebook', url: 'https://www.facebook.com/carlo.casing', icon: 'facebook' },
  { label: 'TikTok', url: 'https://tiktok.com', icon: 'tiktok' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/john-carlo-casing-139a45377?utm_source=share_via&utm_content=profile&utm_medium=member_android&fbclid=IwY2xjawSjmV5leHRuA2FlbQIxMABicmlkETFWQnl1S3JLNmR0ZzUxMFR2c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvPeOAVQ9DHPqbqlYZv42tUo_VOKs0fH3krFn6ypHwHC9l6uu79V9098kupz_aem_V7n1GxhXHk-MlhhAPWLwFQ',
    icon: 'linkedin',
  },
]

export const contact = {
  email: 'carlocasing05@gmail.com',
  socials: heroSocials,
}






// "use client";

// import React, { useState } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Users,
//   Settings,
//   HelpCircle,
//   Bell,
//   Search,
//   BarChart3,
//   Library,
//   User
// } from "lucide-react";

// // Main navigation items
// const navigationItems = [
//   { 
//     icon: Home, 
//     label: "Dashboard", 
//     href: "/dashboard",
//     description: "Overview and key metrics" 
//   },
//   { 
//     icon: BookOpen, 
//     label: "Assign Books", 
//     href: "/assign-books",
//     description: "Manage book assignments" 
//   },
//   { 
//     icon: ClipboardList, 
//     label: "Track Books", 
//     href: "/track-books",
//     description: "Monitor borrowed books" 
//   },
//   { 
//     icon: DollarSign, 
//     label: "Manage Fines", 
//     href: "/manage-fines",
//     description: "Handle overdue fines" 
//   },
//   { 
//     icon: Users, 
//     label: "Users", 
//     href: "/users",
//     description: "Manage library members" 
//   },
//   { 
//     icon: Library, 
//     label: "Book Inventory", 
//     href: "/inventory",
//     description: "Catalog management" 
//   },
//   { 
//     icon: BarChart3, 
//     label: "Reports", 
//     href: "/reports",
//     description: "Analytics and statistics" 
//   },
//   { 
//     icon: Settings, 
//     label: "Settings", 
//     href: "/settings",
//     description: "System preferences" 
//   }
// ];

// const NavItem = ({ icon: Icon, label, href, description, isCollapsed, isActive }) => {
//   return (
//     <a 
//       href={href} 
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//         isActive 
//           ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
//           : "hover:bg-white/10 text-gray-200 hover:text-white"
//       }`}
//       title={isCollapsed ? label : ""}
//     >
//       <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-white/10"}`}>
//         <Icon className="h-5 w-5" />
//       </div>
//       {!isCollapsed && (
//         <div className="flex-1">
//           <div className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
//           {description && !isCollapsed && (
//             <div className="text-xs opacity-75 mt-0.5">{description}</div>
//           )}
//         </div>
//       )}
//     </a>
//   );
// };

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   // Current path - in real app would use router
//   const currentPath = "/dashboard";

//   return (
//     <aside
//       className={`flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl transition-all duration-300 h-screen ${
//         isCollapsed ? "w-20" : "w-72"
//       }`}
//     >
//       <div className="flex h-16 items-center justify-between border-b border-gray-700/50 px-4 py-2">
//         {!isCollapsed && (
//           <h2 className="text-xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Cinzel, serif' }}>
//             LIBRARY ADMIN
//           </h2>
//         )}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
//         >
//           {isCollapsed ? (
//             <Menu className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>
      
//       {/* Admin profile */}
//       {!isCollapsed && (
//         <div className="mt-6 px-4 mb-6">
//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
//             <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-md">
//               LA
//             </div>
//             <div>
//               <div className="font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//               <div className="text-xs text-gray-400">admin@library.org</div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Main navigation */}
//       <div className="flex-1 overflow-y-auto px-3 py-2">
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map((item, index) => (
//             <NavItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               href={item.href}
//               description={item.description}
//               isCollapsed={isCollapsed}
//               isActive={item.href === currentPath}
//             />
//           ))}
//         </nav>
        
//         {/* Divider */}
//         {!isCollapsed && (
//           <div className="my-6 border-t border-gray-700/50 pt-6">
//             <h3 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
//               Help & Support
//             </h3>
//             <div className="space-y-2">
//               <a href="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-300 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/10">
//                   <HelpCircle className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Documentation</span>
//               </a>
//               <a href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-300 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/10">
//                   <LogOut className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// // Feature card component with icon, title and navigation
// const FeatureCard = ({ icon: Icon, title, description, href, color }) => {
//   // Direct mapping for background colors
//   const bgColorMap = {
//     'border-blue-600': 'bg-blue-100',
//     'border-purple-600': 'bg-purple-100',
//     'border-emerald-600': 'bg-emerald-100',
//     'border-amber-600': 'bg-amber-100',
//     'border-red-600': 'bg-red-100',
//     'border-indigo-600': 'bg-indigo-100'
//   };
  
//   // Direct mapping for text colors
//   const textColorMap = {
//     'border-blue-600': 'text-blue-600',
//     'border-purple-600': 'text-purple-600',
//     'border-emerald-600': 'text-emerald-600',
//     'border-amber-600': 'text-amber-600',
//     'border-red-600': 'text-red-600',
//     'border-indigo-600': 'text-indigo-600'
//   };
  
//   // Get the background and text color directly from the maps
//   const bgColor = bgColorMap[color] || 'bg-gray-100';
//   const textColor = textColorMap[color] || 'text-gray-600';
  
//   return (
//     <a 
//       href={href}
//       className={`bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 ${color} transition-all duration-300 flex flex-col h-full`}
//     >
//       <div className={`p-3 rounded-lg inline-block mb-4 ${bgColor}`}>
//         <Icon className={`h-6 w-6 ${textColor}`} />
//       </div>
//       <h3 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
//       <p className="text-gray-600 text-sm flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
//       <div className="mt-4 text-sm font-medium text-indigo-600" style={{ fontFamily: 'Inter, sans-serif' }}>
//         Access feature →
//       </div>
//     </a>
//   );
// };

// const Dashboard = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         {/* Top header with search and notifications */}
//         <div className="bg-white border-b shadow-sm px-8 py-4 sticky top-0 z-10">
//           <div className="flex justify-between items-center">
//             <div className="relative flex-1 max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search books, users, or reports..."
//                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 style={{ fontFamily: 'Inter, sans-serif' }}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative transition-colors">
//                 <Bell className="h-5 w-5 text-gray-600" />
//                 <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
//                   LA
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//                   <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>admin@library.org</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Welcome section */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
//               <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Welcome to Library Management System</h1>
//               <p className="opacity-90 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
//                 Access all library functions through this dashboard. Manage books, track assignments, handle user accounts, and generate reports from one central location.
//               </p>
//               <div className="mt-6 flex gap-4 flex-wrap">
//                 <a href="/assign-books" className="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Assign New Book
//                 </a>
//                 <a href="/track-books" className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-colors border border-indigo-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Track Books
//                 </a>
//               </div>
//             </div>

//             {/* Main features grid */}
//             <div>
//               <h2 className="text-xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Management Features</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <FeatureCard 
//                   icon={BookOpen}
//                   title="Assign Books"
//                   description="Assign books to students and faculty members. Create and manage book assignments with due dates."
//                   href="/assign-books"
//                   color="border-blue-600"
//                 />
//                 <FeatureCard 
//                   icon={ClipboardList}
//                   title="Track Books"
//                   description="Monitor all borrowed books, check due dates, and mark returns. Get overdue notifications."
//                   href="/track-books"
//                   color="border-purple-600"
//                 />
//                 <FeatureCard 
//                   icon={DollarSign}
//                   title="Manage Fines"
//                   description="Calculate and collect fines for overdue books. Generate fine reports and receipts."
//                   href="/manage-fines"
//                   color="border-emerald-600"
//                 />
//                 <FeatureCard 
//                   icon={Users}
//                   title="User Management"
//                   description="Add, edit, and remove library members. Track borrowing history and manage user privileges."
//                   href="/users"
//                   color="border-amber-600"
//                 />
//                 <FeatureCard 
//                   icon={Library}
//                   title="Book Inventory"
//                   description="Maintain a complete catalog of books. Track availability, condition, and location."
//                   href="/inventory"
//                   color="border-red-600"
//                 />
//                 <FeatureCard 
//                   icon={BarChart3}
//                   title="Reports & Analytics"
//                   description="Generate detailed reports on library usage, popular books, and user activities."
//                   href="/reports"
//                   color="border-indigo-600"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
//               <p>© 2025 Library Management System. All rights reserved.</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;









// "use client";

// import React, { useState } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Users,
//   Settings,
//   HelpCircle,
//   Bell,
//   Search,
//   BarChart3,
//   Library,
//   User
// } from "lucide-react";

// // Main navigation items
// const navigationItems = [
//   { 
//     icon: Home, 
//     label: "Dashboard", 
//     href: "/dashboard",
//     description: "Overview and key metrics" 
//   },
//   { 
//     icon: BookOpen, 
//     label: "Assign Books", 
//     href: "/assign-books",
//     description: "Manage book assignments" 
//   },
//   { 
//     icon: ClipboardList, 
//     label: "Track Books", 
//     href: "/track-books",
//     description: "Monitor borrowed books" 
//   },
//   { 
//     icon: DollarSign, 
//     label: "Manage Fines", 
//     href: "/manage-fines",
//     description: "Handle overdue fines" 
//   },
//   { 
//     icon: Users, 
//     label: "Users", 
//     href: "/users",
//     description: "Manage library members" 
//   },
//   { 
//     icon: Library, 
//     label: "Book Inventory", 
//     href: "/inventory",
//     description: "Catalog management" 
//   },
//   { 
//     icon: BarChart3, 
//     label: "Reports", 
//     href: "/reports",
//     description: "Analytics and statistics" 
//   },
//   { 
//     icon: Settings, 
//     label: "Settings", 
//     href: "/settings",
//     description: "System preferences" 
//   }
// ];

// const NavItem = ({ icon: Icon, label, href, description, isCollapsed, isActive }) => {
//   return (
//     <a 
//       href={href} 
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//         isActive 
//           ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
//           : "hover:bg-white/10 text-gray-700 hover:text-indigo-700"
//       }`}
//       title={isCollapsed ? label : ""}
//     >
//       <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-white/10"}`}>
//         <Icon className="h-5 w-5" />
//       </div>
//       {!isCollapsed && (
//         <div className="flex-1">
//           <div className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
//           {description && !isCollapsed && (
//             <div className="text-xs opacity-75 mt-0.5">{description}</div>
//           )}
//         </div>
//       )}
//     </a>
//   );
// };

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   // Current path - in real app would use router
//   const currentPath = "/dashboard";

//   return (
//     <aside
//       className={`flex flex-col bg-gradient-to-b from-blue-600 to-white shadow-xl transition-all duration-300 h-screen ${
//         isCollapsed ? "w-20" : "w-72"
//       }`}
//     >
//       <div className="flex h-16 items-center justify-between border-b border-blue-200 px-4 py-2">
//         {!isCollapsed && (
//           <h2 className="text-xl font-bold text-white bg-gradient-to-r from-white-600 to-black-100 bg-clip-text " style={{ fontFamily: 'Cinzel, serif' }}>
//             LIBRARY ADMIN
//           </h2>
//         )}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
//         >
//           {isCollapsed ? (
//             <Menu className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>
      
//       {/* Admin profile */}
//       {!isCollapsed && (
//         <div className="mt-6 px-4 mb-6">
//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/20">
//             <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-md">
//               LA
//             </div>
//             <div>
//               <div className="font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//               <div className="text-xs text-blue-100">admin@library.org</div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Main navigation */}
//       <div className="flex-1 px-3 py-2" style={{ overflow: 'hidden' }}>
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map((item, index) => (
//             <NavItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               href={item.href}
//               description={item.description}
//               isCollapsed={isCollapsed}
//               isActive={item.href === currentPath}
//             />
//           ))}
//         </nav>
        
//         {/* Divider */}
//         {!isCollapsed && (
//           <div className="my-6 border-t border-blue-200 pt-6">
//             <h3 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
//               Help & Support
//             </h3>
//             <div className="space-y-2">
//               <a href="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/20">
//                   <HelpCircle className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Documentation</span>
//               </a>
//               <a href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/20">
//                   <LogOut className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// // Feature card component with icon, title and navigation
// const FeatureCard = ({ icon: Icon, title, description, href, color }) => {
//   // Direct mapping for background colors
//   const bgColorMap = {
//     'border-blue-600': 'bg-blue-100',
//     'border-purple-600': 'bg-purple-100',
//     'border-emerald-600': 'bg-emerald-100',
//     'border-amber-600': 'bg-amber-100',
//     'border-red-600': 'bg-red-100',
//     'border-indigo-600': 'bg-indigo-100'
//   };
  
//   // Direct mapping for text colors
//   const textColorMap = {
//     'border-blue-600': 'text-blue-600',
//     'border-purple-600': 'text-purple-600',
//     'border-emerald-600': 'text-emerald-600',
//     'border-amber-600': 'text-amber-600',
//     'border-red-600': 'text-red-600',
//     'border-indigo-600': 'text-indigo-600'
//   };
  
//   // Get the background and text color directly from the maps
//   const bgColor = bgColorMap[color] || 'bg-gray-100';
//   const textColor = textColorMap[color] || 'text-gray-600';
  
//   return (
//     <a 
//       href={href}
//       className={`bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 ${color} transition-all duration-300 flex flex-col h-full`}
//     >
//       <div className={`p-3 rounded-lg inline-block mb-4 ${bgColor}`}>
//         <Icon className={`h-6 w-6 ${textColor}`} />
//       </div>
//       <h3 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
//       <p className="text-gray-600 text-sm flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
//       <div className="mt-4 text-sm font-medium text-indigo-600" style={{ fontFamily: 'Inter, sans-serif' }}>
//         Access feature →
//       </div>
//     </a>
//   );
// };

// const Dashboard = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         {/* Top header with search and notifications */}
//         <div className="bg-white border-b shadow-sm px-8 py-4 sticky top-0 z-10">
//           <div className="flex justify-between items-center">
//             <div className="relative flex-1 max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search books, users, or reports..."
//                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 style={{ fontFamily: 'Inter, sans-serif' }}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative transition-colors">
//                 <Bell className="h-5 w-5 text-gray-600" />
//                 <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
//                   LA
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//                   <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>admin@library.org</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Welcome section */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
//               <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Welcome to Library Management System</h1>
//               <p className="opacity-90 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
//                 Access all library functions through this dashboard. Manage books, track assignments, handle user accounts, and generate reports from one central location.
//               </p>
//               <div className="mt-6 flex gap-4 flex-wrap">
//                 <a href="/assign-books" className="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Assign New Book
//                 </a>
//                 <a href="/track-books" className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-colors border border-indigo-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Track Books
//                 </a>
//               </div>
//             </div>

//             {/* Main features grid */}
//             <div>
//               <h2 className="text-xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Management Features</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <FeatureCard 
//                   icon={BookOpen}
//                   title="Assign Books"
//                   description="Assign books to students and faculty members. Create and manage book assignments with due dates."
//                   href="/assign-books"
//                   color="border-blue-600"
//                 />
//                 <FeatureCard 
//                   icon={ClipboardList}
//                   title="Track Books"
//                   description="Monitor all borrowed books, check due dates, and mark returns. Get overdue notifications."
//                   href="/track-books"
//                   color="border-purple-600"
//                 />
//                 <FeatureCard 
//                   icon={DollarSign}
//                   title="Manage Fines"
//                   description="Calculate and collect fines for overdue books. Generate fine reports and receipts."
//                   href="/manage-fines"
//                   color="border-emerald-600"
//                 />
//                 <FeatureCard 
//                   icon={Users}
//                   title="User Management"
//                   description="Add, edit, and remove library members. Track borrowing history and manage user privileges."
//                   href="/users"
//                   color="border-amber-600"
//                 />
//                 <FeatureCard 
//                   icon={Library}
//                   title="Book Inventory"
//                   description="Maintain a complete catalog of books. Track availability, condition, and location."
//                   href="/inventory"
//                   color="border-red-600"
//                 />
//                 <FeatureCard 
//                   icon={BarChart3}
//                   title="Reports & Analytics"
//                   description="Generate detailed reports on library usage, popular books, and user activities."
//                   href="/reports"
//                   color="border-indigo-600"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
//               <p>© 2025 Library Management System. All rights reserved.</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;








// "use client";

// import React, { useState } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Users,
//   Settings,
//   HelpCircle,
//   Bell,
//   Search,
//   BarChart3,
//   Library,
//   User
// } from "lucide-react";

// // Main navigation items
// const navigationItems = [
//   { 
//     icon: Home, 
//     label: "Dashboard", 
//     href: "/dashboard",
//     description: "Overview and key metrics" 
//   },
//   { 
//     icon: BookOpen, 
//     label: "Assign Books", 
//     href: "/assign-books",
//     description: "Manage book assignments" 
//   },
//   { 
//     icon: ClipboardList, 
//     label: "Track Books", 
//     href: "/track-books",
//     description: "Monitor borrowed books" 
//   },
//   { 
//     icon: DollarSign, 
//     label: "Manage Fines", 
//     href: "/manage-fines",
//     description: "Handle overdue fines" 
//   },
//   { 
//     icon: Users, 
//     label: "Users", 
//     href: "/users",
//     description: "Manage library members" 
//   },
//   { 
//     icon: Library, 
//     label: "Book Inventory", 
//     href: "/inventory",
//     description: "Catalog management" 
//   },
//   { 
//     icon: BarChart3, 
//     label: "Reports", 
//     href: "/reports",
//     description: "Analytics and statistics" 
//   },
//   { 
//     icon: Settings, 
//     label: "Settings", 
//     href: "/settings",
//     description: "System preferences" 
//   }
// ];

// const NavItem = ({ icon: Icon, label, href, description, isCollapsed, isActive }) => {
//   return (
//     <a 
//       href={href} 
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//         isActive 
//           ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
//           : "hover:bg-white/10 text-gray-700 hover:text-indigo-700"
//       }`}
//       title={isCollapsed ? label : ""}
//     >
//       <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-white/10"}`}>
//         <Icon className="h-5 w-5" />
//       </div>
//       {!isCollapsed && (
//         <div className="flex-1">
//           <div className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
//           {description && !isCollapsed && (
//             <div className="text-xs opacity-75 mt-0.5">{description}</div>
//           )}
//         </div>
//       )}
//     </a>
//   );
// };

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   // Current path - in real app would use router
//   const currentPath = "/dashboard";

//   return (
//     <aside
//       className={`flex flex-col bg-gradient-to-b from-blue-600 to-black-50 shadow-xl transition-all duration-300 h-screen ${
//         isCollapsed ? "w-20" : "w-72"
//       }`}
//     >
//       <div className="flex h-16 items-center justify-between border-b border-blue-200 px-4 py-2">
//         {!isCollapsed && (
//           <h2 className="text-xl font-bold text-white bg-gradient-to-r from-white-600 to-white-500 bg-clip-text " style={{ fontFamily: 'Cinzel, serif' }}>
//             LIBRARY ADMIN
//           </h2>
//         )}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
//         >
//           {isCollapsed ? (
//             <Menu className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>
      
//       {/* Admin profile */}
//       {!isCollapsed && (
//         <div className="mt-6 px-4 mb-6">
//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/20">
//             <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-md">
//               LA
//             </div>
//             <div>
//               <div className="font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//               <div className="text-xs text-blue-100">admin@library.org</div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Main navigation with custom scrollbar styling */}
//       <div className="flex-1 px-3 py-2 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//         <style jsx global>{`
//           /* Hide scrollbar for Chrome, Safari and Opera */
//           .flex-1::-webkit-scrollbar {
//             display: none;
//           }
          
//           /* Hide scrollbar for IE, Edge and Firefox */
//           .flex-1 {
//             -ms-overflow-style: none;  /* IE and Edge */
//             scrollbar-width: none;  /* Firefox */
//           }
//         `}</style>
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map((item, index) => (
//             <NavItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               href={item.href}
//               description={item.description}
//               isCollapsed={isCollapsed}
//               isActive={item.href === currentPath}
//             />
//           ))}
//         </nav>
        
//         {/* Divider */}
//         {!isCollapsed && (
//           <div className="my-6 border-t border-blue-200 pt-6">
//             <h3 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
//               Help & Support
//             </h3>
//             <div className="space-y-2">
//               <a href="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/20">
//                   <HelpCircle className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Documentation</span>
//               </a>
//               <a href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/20">
//                   <LogOut className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// // Feature card component with icon, title and navigation
// const FeatureCard = ({ icon: Icon, title, description, href, color }) => {
//   // Direct mapping for background colors
//   const bgColorMap = {
//     'border-blue-600': 'bg-blue-100',
//     'border-purple-600': 'bg-purple-100',
//     'border-emerald-600': 'bg-emerald-100',
//     'border-amber-600': 'bg-amber-100',
//     'border-red-600': 'bg-red-100',
//     'border-indigo-600': 'bg-indigo-100'
//   };
  
//   // Direct mapping for text colors
//   const textColorMap = {
//     'border-blue-600': 'text-blue-600',
//     'border-purple-600': 'text-purple-600',
//     'border-emerald-600': 'text-emerald-600',
//     'border-amber-600': 'text-amber-600',
//     'border-red-600': 'text-red-600',
//     'border-indigo-600': 'text-indigo-600'
//   };
  
//   // Get the background and text color directly from the maps
//   const bgColor = bgColorMap[color] || 'bg-gray-100';
//   const textColor = textColorMap[color] || 'text-gray-600';
  
//   return (
//     <a 
//       href={href}
//       className={`bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 ${color} transition-all duration-300 flex flex-col h-full`}
//     >
//       <div className={`p-3 rounded-lg inline-block mb-4 ${bgColor}`}>
//         <Icon className={`h-6 w-6 ${textColor}`} />
//       </div>
//       <h3 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
//       <p className="text-gray-600 text-sm flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
//       <div className="mt-4 text-sm font-medium text-indigo-600" style={{ fontFamily: 'Inter, sans-serif' }}>
//         Access feature →
//       </div>
//     </a>
//   );
// };

// const Dashboard = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         {/* Top header with search and notifications */}
//         <div className="bg-white border-b shadow-sm px-8 py-4 sticky top-0 z-10">
//           <div className="flex justify-between items-center">
//             <div className="relative flex-1 max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search books, users, or reports..."
//                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 style={{ fontFamily: 'Inter, sans-serif' }}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative transition-colors">
//                 <Bell className="h-5 w-5 text-gray-600" />
//                 <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
//                   LA
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//                   <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>admin@library.org</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Welcome section */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
//               <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Welcome to Library Management System</h1>
//               <p className="opacity-90 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
//                 Access all library functions through this dashboard. Manage books, track assignments, handle user accounts, and generate reports from one central location.
//               </p>
//               <div className="mt-6 flex gap-4 flex-wrap">
//                 <a href="/assign-books" className="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Assign New Book
//                 </a>
//                 <a href="/track-books" className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-colors border border-indigo-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Track Books
//                 </a>
//               </div>
//             </div>

//             {/* Main features grid */}
//             <div>
//               <h2 className="text-xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Management Features</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <FeatureCard 
//                   icon={BookOpen}
//                   title="Assign Books"
//                   description="Assign books to students and faculty members. Create and manage book assignments with due dates."
//                   href="/assign-books"
//                   color="border-blue-600"
//                 />
//                 <FeatureCard 
//                   icon={ClipboardList}
//                   title="Track Books"
//                   description="Monitor all borrowed books, check due dates, and mark returns. Get overdue notifications."
//                   href="/track-books"
//                   color="border-purple-600"
//                 />
//                 <FeatureCard 
//                   icon={DollarSign}
//                   title="Manage Fines"
//                   description="Calculate and collect fines for overdue books. Generate fine reports and receipts."
//                   href="/manage-fines"
//                   color="border-emerald-600"
//                 />
//                 <FeatureCard 
//                   icon={Users}
//                   title="User Management"
//                   description="Add, edit, and remove library members. Track borrowing history and manage user privileges."
//                   href="/users"
//                   color="border-amber-600"
//                 />
//                 <FeatureCard 
//                   icon={Library}
//                   title="Book Inventory"
//                   description="Maintain a complete catalog of books. Track availability, condition, and location."
//                   href="/inventory"
//                   color="border-red-600"
//                 />
//                 <FeatureCard 
//                   icon={BarChart3}
//                   title="Reports & Analytics"
//                   description="Generate detailed reports on library usage, popular books, and user activities."
//                   href="/reports"
//                   color="border-indigo-600"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
//               <p>© 2025 Library Management System. All rights reserved.</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;




// "use client";

// import React, { useState } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Users,
//   Settings,
//   HelpCircle,
//   Library,
//   BarChart3,
//   User
// } from "lucide-react";

// // Main navigation items
// const navigationItems = [
//   { 
//     icon: Home, 
//     label: "Dashboard", 
//     href: "/dashboard",
//     description: "Overview and key metrics" 
//   },
//   { 
//     icon: BookOpen, 
//     label: "Assign Books", 
//     href: "/assign-books",
//     description: "Manage book assignments" 
//   },
//   { 
//     icon: ClipboardList, 
//     label: "Track Books", 
//     href: "/track-books",
//     description: "Monitor borrowed books" 
//   },
//   { 
//     icon: DollarSign, 
//     label: "Manage Fines", 
//     href: "/manage-fines",
//     description: "Handle overdue fines" 
//   },
//   { 
//     icon: Users, 
//     label: "Users", 
//     href: "/users",
//     description: "Manage library members" 
//   },
//   { 
//     icon: Library, 
//     label: "Book Inventory", 
//     href: "/inventory",
//     description: "Catalog management" 
//   },
//   { 
//     icon: BarChart3, 
//     label: "Reports", 
//     href: "/reports",
//     description: "Analytics and statistics" 
//   },
//   { 
//     icon: Settings, 
//     label: "Settings", 
//     href: "/settings",
//     description: "System preferences" 
//   }
// ];

// const NavItem = ({ icon: Icon, label, href, description, isCollapsed, isActive }) => {
//   return (
//     <a 
//       href={href} 
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//         isActive 
//           ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
//           : "hover:bg-white/10 text-gray-700 hover:text-indigo-700"
//       }`}
//       title={isCollapsed ? label : ""}
//     >
//       <div className={`p-2 rounded-lg ${
//         isActive 
//           ? (isCollapsed ? "bg-white/20" : "bg-white/20") 
//           : "bg-white/10"
//       }`}>
//         <Icon className="h-5 w-5" />
//       </div>
//       {!isCollapsed && (
//         <div className="flex-1">
//           <div className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
//           {description && !isCollapsed && (
//             <div className="text-xs opacity-75 mt-0.5">{description}</div>
//           )}
//         </div>
//       )}
//     </a>
//   );
// };

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   // Current path - in real app would use router
//   const currentPath = "/dashboard";

//   return (
//     <aside
//       className={`flex flex-col bg-gradient-to-b from-blue-600 to-black-50 shadow-xl transition-all duration-300 h-screen ${
//         isCollapsed ? "w-20" : "w-72"
//       }`}
//     >
//       <div className="flex h-16 items-center justify-between border-b border-blue-200 px-4 py-2">
//         {!isCollapsed && (
//           <h2 className="text-xl font-bold text-white bg-gradient-to-r from-white-600 to-white-500 bg-clip-text " style={{ fontFamily: 'Cinzel, serif' }}>
//             LIBRARY ADMIN
//           </h2>
//         )}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
//         >
//           {isCollapsed ? (
//             <Menu className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>
      
//       {/* Admin profile */}
//       {!isCollapsed && (
//         <div className="mt-6 px-4 mb-6">
//           <div className="flex items-center gap-3 p-3 rounded-lg bg-white/20">
//             <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-md">
//               LA
//             </div>
//             <div>
//               <div className="font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//               <div className="text-xs text-blue-100">admin@library.org</div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Main navigation with custom scrollbar styling */}
//       <div className="flex-1 px-3 py-2 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//         <style jsx global>{`
//           /* Hide scrollbar for Chrome, Safari and Opera */
//           .flex-1::-webkit-scrollbar {
//             display: none;
//           }
          
//           /* Hide scrollbar for IE, Edge and Firefox */
//           .flex-1 {
//             -ms-overflow-style: none;  /* IE and Edge */
//             scrollbar-width: none;  /* Firefox */
//           }
//         `}</style>
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map((item, index) => (
//             <NavItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               href={item.href}
//               description={item.description}
//               isCollapsed={isCollapsed}
//               isActive={item.href === currentPath}
//             />
//           ))}
//         </nav>
        
//         {/* Divider */}
//         {!isCollapsed && (
//           <div className="my-6 border-t border-blue-200 pt-6">
//             <h3 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
//               Help & Support
//             </h3>
//             <div className="space-y-2">
//               <a href="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/20">
//                   <HelpCircle className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Documentation</span>
//               </a>
//               <a href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
//                 <div className="p-2 rounded-lg bg-white/20">
//                   <LogOut className="h-5 w-5" />
//                 </div>
//                 <span style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// // Feature card component with icon, title and navigation
// const FeatureCard = ({ icon: Icon, title, description, href, color }) => {
//   // Direct mapping for background colors
//   const bgColorMap = {
//     'border-blue-600': 'bg-blue-100',
//     'border-purple-600': 'bg-purple-100',
//     'border-emerald-600': 'bg-emerald-100',
//     'border-amber-600': 'bg-amber-100',
//     'border-red-600': 'bg-red-100',
//     'border-indigo-600': 'bg-indigo-100'
//   };
  
//   // Direct mapping for text colors
//   const textColorMap = {
//     'border-blue-600': 'text-blue-600',
//     'border-purple-600': 'text-purple-600',
//     'border-emerald-600': 'text-emerald-600',
//     'border-amber-600': 'text-amber-600',
//     'border-red-600': 'text-red-600',
//     'border-indigo-600': 'text-indigo-600'
//   };
  
//   // Get the background and text color directly from the maps
//   const bgColor = bgColorMap[color] || 'bg-gray-100';
//   const textColor = textColorMap[color] || 'text-gray-600';
  
//   return (
//     <a 
//       href={href}
//       className={`bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 ${color} transition-all duration-300 flex flex-col h-full`}
//     >
//       <div className={`p-3 rounded-lg inline-block mb-4 ${bgColor}`}>
//         <Icon className={`h-6 w-6 ${textColor}`} />
//       </div>
//       <h3 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
//       <p className="text-gray-600 text-sm flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
//       <div className="mt-4 text-sm font-medium text-indigo-600" style={{ fontFamily: 'Inter, sans-serif' }}>
//         Access feature →
//       </div>
//     </a>
//   );
// };

// const Dashboard = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         {/* Top header - simplified without search and notifications */}
//         <div className="bg-white border-b shadow-sm px-8 py-4 sticky top-0 z-10">
//           <div className="flex justify-end items-center">
//             <div className="flex items-center gap-3">
//               <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
//                 LA
//               </div>
//               <div className="hidden md:block">
//                 <div className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
//                 <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>admin@library.org</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Welcome section */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
//               <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Welcome to Library Management System</h1>
//               <p className="opacity-90 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
//                 Access all library functions through this dashboard. Manage books, track assignments, handle user accounts, and generate reports from one central location.
//               </p>
//               <div className="mt-6 flex gap-4 flex-wrap">
//                 <a href="/assign-books" className="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Assign New Book
//                 </a>
//                 <a href="/track-books" className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-colors border border-indigo-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
//                   Track Books
//                 </a>
//               </div>
//             </div>

//             {/* Main features grid */}
//             <div>
//               <h2 className="text-xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Management Features</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <FeatureCard 
//                   icon={BookOpen}
//                   title="Assign Books"
//                   description="Assign books to students and faculty members. Create and manage book assignments with due dates."
//                   href="/assign-books"
//                   color="border-blue-600"
//                 />
//                 <FeatureCard 
//                   icon={ClipboardList}
//                   title="Track Books"
//                   description="Monitor all borrowed books, check due dates, and mark returns. Get overdue notifications."
//                   href="/track-books"
//                   color="border-purple-600"
//                 />
//                 <FeatureCard 
//                   icon={DollarSign}
//                   title="Manage Fines"
//                   description="Calculate and collect fines for overdue books. Generate fine reports and receipts."
//                   href="/manage-fines"
//                   color="border-emerald-600"
//                 />
//                 <FeatureCard 
//                   icon={Users}
//                   title="User Management"
//                   description="Add, edit, and remove library members. Track borrowing history and manage user privileges."
//                   href="/users"
//                   color="border-amber-600"
//                 />
//                 <FeatureCard 
//                   icon={Library}
//                   title="Book Inventory"
//                   description="Maintain a complete catalog of books. Track availability, condition, and location."
//                   href="/inventory"
//                   color="border-red-600"
//                 />
//                 <FeatureCard 
//                   icon={BarChart3}
//                   title="Reports & Analytics"
//                   description="Generate detailed reports on library usage, popular books, and user activities."
//                   href="/reports"
//                   color="border-indigo-600"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
//               <p>© 2025 Library Management System. All rights reserved.</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;










"use client";

import React, { useState } from "react";
import { 
  Home,
  BookOpen,
  ClipboardList,
  DollarSign,
  LogOut,
  Menu,
  ChevronLeft,
  Users,
  Settings,
  HelpCircle,
  Library,
  BarChart3
} from "lucide-react";

// Main navigation items
const navigationItems = [
  { 
    icon: Home, 
    label: "Dashboard", 
    href: "/dashboard",
    description: "Overview and key metrics" 
  },
  { 
    icon: BookOpen, 
    label: "Assign Books", 
    href: "/assign-books",
    description: "Manage book assignments" 
  },
  { 
    icon: ClipboardList, 
    label: "Return Books", 
    href: "/return-books",
    description: "Monitor borrowed books" 
  },
  { 
    icon: Library, 
    label: "Renewal Requests", 
    href: "/renewal-request",
    description: "Catalog management" 
  },

  { 
    icon: BarChart3, 
    label: "Renew Books", 
    href: "/renew-books",
    description: "Analytics and statistics" 
  },
  { 
    icon: DollarSign, 
    label: "Manage Fines", 
    href: "/manage-fines",
    description: "Handle overdue fines" 
  },
  { 
    icon: Users, 
    label: "Users", 
    href: "/users",
    description: "Manage library members" 
  },
  
 
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
    description: "System preferences" 
  }
];

const NavItem = ({ icon: Icon, label, href, description, isCollapsed, isActive }) => {
  return (
    <a 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
          : "hover:bg-white/10 text-gray-700 hover:text-indigo-700"
      }`}
      title={isCollapsed ? label : ""}
    >
      <div className={`flex items-center justify-center p-2 rounded-lg ${
        isActive 
          ? "bg-white/20" 
          : "bg-white/10"
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      {!isCollapsed && (
        <div className="flex-1">
          <div className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
          {description && !isCollapsed && (
            <div className="text-xs opacity-75 mt-0.5">{description}</div>
          )}
        </div>
      )}
    </a>
  );
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  // Current path - in real app would use router
  const currentPath = "/dashboard";

  return (
    <aside
      className={`flex flex-col bg-gradient-to-b from-blue-600 to-black-50 shadow-xl transition-all duration-300 h-screen ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-blue-200 px-4 py-2">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-white bg-gradient-to-r from-white-600 to-white-500 bg-clip-text " style={{ fontFamily: 'Cinzel, serif' }}>
            LIBRARY ADMIN
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-white/20 text-white transition-colors ${isCollapsed ? "mx-auto" : ""}`}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Admin profile */}
      {!isCollapsed && (
        <div className="mt-6 px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/20">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-md">
              LA
            </div>
            <div>
              <div className="font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
              <div className="text-xs text-blue-100">admin@library.org</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main navigation with custom scrollbar styling */}
      <div className="flex-1 px-3 py-2 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .flex-1::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          .flex-1 {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              description={item.description}
              isCollapsed={isCollapsed}
              isActive={item.href === currentPath}
            />
          ))}
        </nav>
        
        {/* Divider */}
        {!isCollapsed && (
          <div className="my-6 border-t border-blue-200 pt-6">
            <h3 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Help & Support
            </h3>
            <div className="space-y-2">
              <a href="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
                <div className="p-2 rounded-lg bg-white/20">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Documentation</span>
              </a>
              <a href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-800 transition-colors">
                <div className="p-2 rounded-lg bg-white/20">
                  <LogOut className="h-5 w-5" />
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Feature card component with icon, title and navigation
const FeatureCard = ({ icon: Icon, title, description, href, color }) => {
  // Direct mapping for background colors
  const bgColorMap = {
    'border-blue-600': 'bg-blue-100',
    'border-purple-600': 'bg-purple-100',
    'border-emerald-600': 'bg-emerald-100',
    'border-amber-600': 'bg-amber-100',
    'border-red-600': 'bg-red-100',
    'border-indigo-600': 'bg-indigo-100'
  };
  
  // Direct mapping for text colors
  const textColorMap = {
    'border-blue-600': 'text-blue-600',
    'border-purple-600': 'text-purple-600',
    'border-emerald-600': 'text-emerald-600',
    'border-amber-600': 'text-amber-600',
    'border-red-600': 'text-red-600',
    'border-indigo-600': 'text-indigo-600'
  };
  
  // Get the background and text color directly from the maps
  const bgColor = bgColorMap[color] || 'bg-gray-100';
  const textColor = textColorMap[color] || 'text-gray-600';
  
  return (
    <a 
      href={href}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 ${color} transition-all duration-300 flex flex-col h-full`}
    >
      <div className={`p-3 rounded-lg inline-block mb-4 ${bgColor}`}>
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
      <p className="text-gray-600 text-sm flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
      <div className="mt-4 text-sm font-medium text-indigo-600" style={{ fontFamily: 'Inter, sans-serif' }}>
        Access feature →
      </div>
    </a>
  );
};

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 overflow-y-auto">
        {/* Top header with title */}
        <div className="bg-white border-b shadow-sm px-8 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Merriweather, serif' }}>
              WELCOME TO LIBRARY MANAGEMENT SYSTEM
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
                LA
              </div>
              <div className="hidden md:block">
                <div className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Admin</div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>admin@library.org</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section - without buttons */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
              <p className="opacity-90 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                Access all library functions through this dashboard. Manage books, track assignments, handle user accounts, and generate reports from one central location.
              </p>
            </div>

            {/* Main features grid */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Library Management Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  icon={BookOpen}
                  title="Assign Books"
                  description="Assign books to students and faculty members. Create and manage book assignments with due dates."
                  href="/assign-books"
                  color="border-blue-600"
                />
                <FeatureCard 
                  icon={ClipboardList}
                  title="Return Books"
                  description="Monitor all borrowed books, check due dates, and mark returns. Get overdue notifications."
                  href="/return-books"
                  color="border-purple-600"
                />

                <FeatureCard 
                  icon={Library}
                  title="Renewal Requests"
                  description="Track and manage renewal requests with notifications for approvals and status updates."
                  href="/renewal-request"
                  color="border-red-600"
                />

               <FeatureCard 
                  icon={BarChart3}
                  title="Renew Books"
                  description="Renew books for students, updating due dates instantly."
                  href="/renew-books"
                  color="border-indigo-600"
                />

                <FeatureCard 
                  icon={DollarSign}
                  title="Manage Fines"
                  description="Calculate and collect fines for overdue books. Generate fine reports and receipts."
                  href="/manage-fines"
                  color="border-emerald-600"
                />
                <FeatureCard 
                  icon={Users}
                  title="User Management"
                  description="Add, edit, and remove library members. Track borrowing history and manage user privileges."
                  href="/users"
                  color="border-amber-600"
                />
             
                
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              <p>© 2025 Library Management System. All rights reserved.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
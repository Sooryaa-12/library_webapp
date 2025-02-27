// // "use client";

// // import React, { useState } from "react";
// // import { 
// //   Home,
// //   BookOpen,
// //   ClipboardList,
// //   DollarSign,
// //   LogOut,
// //   Menu,
// //   ChevronLeft
// // } from "lucide-react";

// // const navigationItems = [
// //   { icon: Home, label: "Dashboard", href: "/dashboard" },
// //   { icon: BookOpen, label: "Assign Books", href: "/assign-books" },
// //   { icon: ClipboardList, label: "Track Books", href: "/track-books" },
// //   { icon: DollarSign, label: "Manage Fines", href: "/manage-fines" },
// //   { icon: LogOut, label: "Logout", href: "/logout" },
// // ];

// // const NavItem = ({ icon: Icon, label, href, isCollapsed }) => {
// //   return (
// //     <a 
// //       href={href} 
// //       className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
// //       title={isCollapsed ? label : ""}
// //     >
// //       <Icon className="h-5 w-5 text-gray-300" />
// //       {!isCollapsed && <span className="text-gray-300">{label}</span>}
// //     </a>
// //   );
// // };

// // const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
// //   return (
// //     <aside
// //       className={`flex flex-col bg-gray-800 transition-all duration-300 ${
// //         isCollapsed ? "w-16" : "w-64"
// //       }`}
// //     >
// //       <div className="flex h-14 items-center justify-between border-b border-gray-700 px-3 py-2">
// //         {!isCollapsed && (
// //           <h2 className="text-lg font-semibold text-white">Library Admin</h2>
// //         )}
// //         <button
// //           onClick={() => setIsCollapsed(!isCollapsed)}
// //           className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
// //         >
// //           {isCollapsed ? (
// //             <Menu className="h-5 w-5" />
// //           ) : (
// //             <ChevronLeft className="h-5 w-5" />
// //           )}
// //         </button>
// //       </div>
// //       <div className="flex-1 overflow-y-auto px-2 py-3">
// //         <nav className="flex flex-col gap-1">
// //           {navigationItems.map((item, index) => (
// //             <NavItem
// //               key={index}
// //               icon={item.icon}
// //               label={item.label}
// //               href={item.href}
// //               isCollapsed={isCollapsed}
// //             />
// //           ))}
// //         </nav>
// //       </div>
// //     </aside>
// //   );
// // };

// // export default function Dashboard() {
// //   const [isCollapsed, setIsCollapsed] = useState(false);

// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
// //       <main className="flex-1 overflow-y-auto">
// //         <div className="container mx-auto p-8">
// //           <h1 className="text-3xl font-bold text-gray-900">Welcome to the Dashboard</h1>
// //           <p className="mt-2 text-gray-600">
// //             Select an option from the sidebar to manage library operations.
// //           </p>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }





// // "use client";

// // import React, { useState } from "react";
// // import { 
// //   Home,
// //   BookOpen,
// //   ClipboardList,
// //   DollarSign,
// //   LogOut,
// //   Menu,
// //   ChevronLeft,
// //   Users,
// //   TrendingUp,
// //   AlertCircle
// // } from "lucide-react";

// // const navigationItems = [
// //   { icon: Home, label: "Dashboard", href: "/dashboard" },
// //   { icon: BookOpen, label: "Assign Books", href: "/assign-books" },
// //   { icon: ClipboardList, label: "Track Books", href: "/track-books" },
// //   { icon: DollarSign, label: "Manage Fines", href: "/manage-fines" },
// //   { icon: LogOut, label: "Logout", href: "/logout" },
// // ];

// // const NavItem = ({ icon: Icon, label, href, isCollapsed }) => {
// //   return (
// //     <a 
// //       href={href} 
// //       className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
// //       title={isCollapsed ? label : ""}
// //     >
// //       <Icon className="h-5 w-5 text-gray-300" />
// //       {!isCollapsed && <span className="text-gray-300">{label}</span>}
// //     </a>
// //   );
// // };

// // const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
// //   return (
// //     <aside
// //       className={`flex flex-col bg-gray-800 shadow-xl transition-all duration-300 ${
// //         isCollapsed ? "w-16" : "w-64"
// //       }`}
// //     >
// //       <div className="flex h-16 items-center justify-between border-b border-gray-700 px-3 py-2">
// //         {!isCollapsed && (
// //           <h2 className="text-xl font-semibold text-white">Library Admin</h2>
// //         )}
// //         <button
// //           onClick={() => setIsCollapsed(!isCollapsed)}
// //           className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
// //         >
// //           {isCollapsed ? (
// //             <Menu className="h-5 w-5" />
// //           ) : (
// //             <ChevronLeft className="h-5 w-5" />
// //           )}
// //         </button>
// //       </div>
// //       <div className="flex-1 overflow-y-auto px-2 py-4">
// //         <nav className="flex flex-col gap-2">
// //           {navigationItems.map((item, index) => (
// //             <NavItem
// //               key={index}
// //               icon={item.icon}
// //               label={item.label}
// //               href={item.href}
// //               isCollapsed={isCollapsed}
// //             />
// //           ))}
// //         </nav>
// //       </div>
// //     </aside>
// //   );
// // };

// // const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-white" }) => (
// //   <div className={`rounded-lg shadow-md p-6 ${bgColor}`}>
// //     <div className="flex justify-between items-center mb-2">
// //       <span className="text-sm font-medium text-gray-500">{title}</span>
// //       <Icon className="h-4 w-4 text-gray-500" />
// //     </div>
// //     <div className="text-2xl font-bold">{value}</div>
// //     {trend && (
// //       <p className="text-xs text-gray-500 mt-1 flex items-center">
// //         <TrendingUp className="h-3 w-3 mr-1" />
// //         {trend} from last month
// //       </p>
// //     )}
// //   </div>
// // );

// // const RecentActivity = () => (
// //   <div className="bg-white rounded-lg shadow-md p-6">
// //     <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
// //     <div className="space-y-4">
// //       {[
// //         { title: "New book assigned", time: "2 minutes ago", user: "John Doe" },
// //         { title: "Fine collected", time: "1 hour ago", user: "Sarah Smith" },
// //         { title: "Book returned", time: "3 hours ago", user: "Mike Johnson" },
// //       ].map((activity, index) => (
// //         <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
// //           <div className="h-2 w-2 rounded-full bg-green-500" />
// //           <div className="flex-1">
// //             <p className="font-medium">{activity.title}</p>
// //             <p className="text-sm text-gray-500">
// //               {activity.user} • {activity.time}
// //             </p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // const OverdueBooks = () => (
// //   <div className="bg-white rounded-lg shadow-md p-6">
// //     <h3 className="text-lg font-semibold mb-4">Overdue Books</h3>
// //     <div className="space-y-4">
// //       {[
// //         { title: "The Great Gatsby", days: 5, user: "Alice Cooper" },
// //         { title: "1984", days: 3, user: "Bob Wilson" },
// //         { title: "To Kill a Mockingbird", days: 2, user: "Carol Davis" },
// //       ].map((book, index) => (
// //         <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
// //           <AlertCircle className="h-4 w-4 text-red-500" />
// //           <div className="flex-1">
// //             <p className="font-medium">{book.title}</p>
// //             <p className="text-sm text-gray-500">
// //               {book.user} • {book.days} days overdue
// //             </p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // export default function Dashboard() {
// //   const [isCollapsed, setIsCollapsed] = useState(false);

// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
// //       <main className="flex-1 overflow-y-auto">
// //         <div className="container mx-auto p-8">
// //           <div className="flex items-center justify-between mb-8">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Admin</h1>
// //               <p className="mt-2 text-gray-600">
// //                 Here's what's happening in your library today
// //               </p>
// //             </div>
// //             <div className="text-sm text-gray-500">
// //               {new Date().toLocaleDateString('en-US', { 
// //                 weekday: 'long', 
// //                 year: 'numeric', 
// //                 month: 'long', 
// //                 day: 'numeric' 
// //               })}
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //             <StatCard
// //               icon={BookOpen}
// //               title="Total Books"
// //               value="1,234"
// //               trend="+12%"
// //               bgColor="bg-blue-50"
// //             />
// //             <StatCard
// //               icon={Users}
// //               title="Active Members"
// //               value="892"
// //               trend="+5%"
// //               bgColor="bg-green-50"
// //             />
// //             <StatCard
// //               icon={ClipboardList}
// //               title="Books Borrowed"
// //               value="156"
// //               trend="+8%"
// //               bgColor="bg-purple-50"
// //             />
// //             <StatCard
// //               icon={DollarSign}
// //               title="Pending Fines"
// //               value="$432"
// //               trend="+2%"
// //               bgColor="bg-yellow-50"
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             <RecentActivity />
// //             <OverdueBooks />
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }





// "use client";

// import React, { useState, useEffect } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Users,
//   TrendingUp,
//   AlertCircle,
//   BookOpenCheck,
//   BookX
// } from "lucide-react";
// import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
// import { db } from "../../lib/firebase";

// const navigationItems = [
//   { icon: Home, label: "Dashboard", href: "/dashboard" },
//   { icon: BookOpen, label: "Assign Books", href: "/assign-books" },
//   { icon: ClipboardList, label: "Track Books", href: "/track-books" },
//   { icon: DollarSign, label: "Manage Fines", href: "/manage-fines" },
//   { icon: LogOut, label: "Logout", href: "/logout" },
// ];

// const NavItem = ({ icon: Icon, label, href, isCollapsed }) => {
//   return (
//     <a 
//       href={href} 
//       className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
//       title={isCollapsed ? label : ""}
//     >
//       <Icon className="h-5 w-5 text-gray-300" />
//       {!isCollapsed && <span className="text-gray-300">{label}</span>}
//     </a>
//   );
// };

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   return (
//     <aside
//       className={`flex flex-col bg-gray-800 shadow-xl transition-all duration-300 ${
//         isCollapsed ? "w-16" : "w-64"
//       }`}
//     >
//       <div className="flex h-16 items-center justify-between border-b border-gray-700 px-3 py-2">
//         {!isCollapsed && (
//           <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Cinzel, serif' }}>LIBRARY ADMIN</h2>
//         )}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
//         >
//           {isCollapsed ? (
//             <Menu className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>
//       <div className="flex-1 overflow-y-auto px-2 py-4">
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map((item, index) => (
//             <NavItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               href={item.href}
//               isCollapsed={isCollapsed}
//             />
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-white" }) => (
//   <div className={`rounded-lg shadow-md p-6 ${bgColor}`}>
//     <div className="flex justify-between items-center mb-2">
//       <span className="text-sm font-medium text-gray-500">{title}</span>
//       <Icon className="h-4 w-4 text-gray-500" />
//     </div>
//     <div className="text-2xl font-bold">{value}</div>
//     {trend && (
//       <p className="text-xs text-gray-500 mt-1 flex items-center">
//         <TrendingUp className="h-3 w-3 mr-1" />
//         {trend}
//       </p>
//     )}
//   </div>
// );

// const RecentAssignments = ({ assignments }) => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-4">Recent Book Assignments</h3>
//     <div className="space-y-4">
//       {assignments.map((assignment, index) => (
//         <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//           <div className="h-2 w-2 rounded-full bg-green-500" />
//           <div className="flex-1">
//             <p className="font-medium">{assignment.bookTitle}</p>
//             <p className="text-sm text-gray-500">
//               Assigned to: {assignment.userRegId} • Due: {new Date(assignment.returnDate).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const LowStockBooks = ({ books }) => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-4">Low Stock Books</h3>
//     <div className="space-y-4">
//       {books.map((book, index) => (
//         <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//           <BookX className="h-4 w-4 text-yellow-500" />
//           <div className="flex-1">
//             <p className="font-medium">{book.title}</p>
//             <p className="text-sm text-gray-500">
//               Only {book.available} copies available
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default function Dashboard() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [dashboardData, setDashboardData] = useState({
//     totalBooks: 0,
//     availableBooks: 0,
//     activeAssignments: 0,
//     recentAssignments: [],
//     lowStockBooks: []
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch total books and available books
//         const booksSnapshot = await getDocs(collection(db, "books"));
//         const booksData = booksSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         const totalBooks = booksData.length;
//         const availableBooks = booksData.reduce((sum, book) => sum + (book.available || 0), 0);
        
//         // Get low stock books (books with less than 2 copies available)
//         const lowStockBooks = booksData
//           .filter(book => book.available < 2)
//           .sort((a, b) => (a.available || 0) - (b.available || 0))
//           .slice(0, 5);

//         // Fetch recent assignments
//         const assignmentsQuery = query(
//           collection(db, "book_assignments"),
//           where("status", "==", "active"),
//           orderBy("takenDate", "desc"),
//           limit(5)
//         );
//         const assignmentsSnapshot = await getDocs(assignmentsQuery);
//         const recentAssignments = assignmentsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setDashboardData({
//           totalBooks,
//           availableBooks,
//           activeAssignments: recentAssignments.length,
//           recentAssignments,
//           lowStockBooks
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//         <main className="flex-1 overflow-y-auto">
//           <div className="container mx-auto p-8">
//             <div className="text-center">Loading dashboard data...</div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         <div className="container mx-auto p-8">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Cinzel, serif' }}>LIBRARY DASHBOARD</h1>
//               <p className="mt-2 text-gray-600">
//                 Overview of your library's current status
//               </p>
//             </div>
//             <div className="text-sm text-gray-500">
//               {new Date().toLocaleDateString('en-US', { 
//                 weekday: 'long', 
//                 year: 'numeric', 
//                 month: 'long', 
//                 day: 'numeric' 
//               })}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatCard
//               icon={BookOpen}
//               title="Total Books"
//               value={dashboardData.totalBooks}
//               bgColor="bg-blue-50"
//             />
//             <StatCard
//               icon={BookOpenCheck}
//               title="Available Books"
//               value={dashboardData.availableBooks}
//               bgColor="bg-green-50"
//             />
//             <StatCard
//               icon={ClipboardList}
//               title="Active Assignments"
//               value={dashboardData.activeAssignments}
//               bgColor="bg-purple-50"
//             />
//             <StatCard
//               icon={DollarSign}
//               title="Pending Returns"
//               value={dashboardData.recentAssignments.length}
//               bgColor="bg-yellow-50"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <RecentAssignments assignments={dashboardData.recentAssignments} />
//             <LowStockBooks books={dashboardData.lowStockBooks} />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }






// "use client";

// import React, { useState, useEffect } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Users,
//   TrendingUp,
//   AlertCircle,
//   BookOpenCheck,
//   BookX,
//   Search,
//   Calendar,
//   CheckCircle
// } from "lucide-react";
// import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
// import { db } from "../../lib/firebase";

// const navigationItems = [
//   { icon: Home, label: "Dashboard", href: "/dashboard" },
//   { icon: BookOpen, label: "Assign Books", href: "/assign-books" },
//   { icon: ClipboardList, label: "Track Books", href: "/track-books" },
//   { icon: DollarSign, label: "Manage Fines", href: "/manage-fines" },
//   { icon: LogOut, label: "Logout", href: "/logout" },
// ];

// const NavItem = ({ icon: Icon, label, href, isCollapsed }) => {
//   return (
//     <a 
//       href={href} 
//       className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
//       title={isCollapsed ? label : ""}
//     >
//       <Icon className="h-5 w-5 text-gray-300" />
//       {!isCollapsed && <span className="text-gray-300">{label}</span>}
//     </a>
//   );
// };

// const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
//   return (
//     <aside
//       className={`flex flex-col bg-gray-800 shadow-xl transition-all duration-300 ${
//         isCollapsed ? "w-16" : "w-64"
//       }`}
//     >
//       <div className="flex h-16 items-center justify-between border-b border-gray-700 px-3 py-2">
//         {!isCollapsed && (
//           <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Cinzel, serif' }}>LIBRARY ADMIN</h2>
//         )}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
//         >
//           {isCollapsed ? (
//             <Menu className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>
//       <div className="flex-1 overflow-y-auto px-2 py-4">
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map((item, index) => (
//             <NavItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               href={item.href}
//               isCollapsed={isCollapsed}
//             />
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-white" }) => (
//   <div className={`rounded-lg shadow-md p-6 ${bgColor} hover:shadow-lg transition-all duration-300`}>
//     <div className="flex justify-between items-center mb-2">
//       <span className="text-sm font-medium text-gray-500">{title}</span>
//       <div className="bg-indigo-100 p-2 rounded-full">
//         <Icon className="h-4 w-4 text-indigo-600" />
//       </div>
//     </div>
//     <div className="text-2xl font-bold text-indigo-900">{value}</div>
//     {trend && (
//       <p className="text-xs text-indigo-600 mt-1 flex items-center">
//         <TrendingUp className="h-3 w-3 mr-1" />
//         {trend}
//       </p>
//     )}
//   </div>
// );

// const RecentAssignments = ({ assignments }) => (
//   <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
//     <h3 className="text-lg font-semibold mb-4 text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>Recent Book Assignments</h3>
//     <div className="space-y-4">
//       {assignments.map((assignment, index) => (
//         <div key={index} className="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-lg transition-colors duration-200 border border-indigo-100">
//           <div className="bg-indigo-100 p-2 rounded-full">
//             <BookOpen className="h-4 w-4 text-indigo-600" />
//           </div>
//           <div className="flex-1">
//             <p className="font-medium text-indigo-900">{assignment.bookTitle}</p>
//             <div className="flex items-center gap-2 text-sm text-indigo-700 mt-1">
//               <Calendar size={14} />
//               <p>
//                 Assigned to: {assignment.userRegId} • Due: {new Date(assignment.returnDate).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const LowStockBooks = ({ books }) => (
//   <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
//     <h3 className="text-lg font-semibold mb-4 text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>Low Stock Books</h3>
//     <div className="space-y-4">
//       {books.map((book, index) => (
//         <div key={index} className="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-lg transition-colors duration-200 border border-indigo-100">
//           <div className="bg-red-100 p-2 rounded-full">
//             <BookX className="h-4 w-4 text-red-600" />
//           </div>
//           <div className="flex-1">
//             <p className="font-medium text-indigo-900">{book.title}</p>
//             <p className="text-sm text-red-600 mt-1">
//               Only {book.available} copies available
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default function Dashboard() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [dashboardData, setDashboardData] = useState({
//     totalBooks: 0,
//     availableBooks: 0,
//     activeAssignments: 0,
//     recentAssignments: [],
//     lowStockBooks: []
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch total books and available books
//         const booksSnapshot = await getDocs(collection(db, "books"));
//         const booksData = booksSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         const totalBooks = booksData.length;
//         const availableBooks = booksData.reduce((sum, book) => sum + (book.available || 0), 0);
        
//         // Get low stock books (books with less than 2 copies available)
//         const lowStockBooks = booksData
//           .filter(book => book.available < 2)
//           .sort((a, b) => (a.available || 0) - (b.available || 0))
//           .slice(0, 5);

//         // Fetch recent assignments
//         const assignmentsQuery = query(
//           collection(db, "book_assignments"),
//           where("status", "==", "active"),
//           orderBy("takenDate", "desc"),
//           limit(5)
//         );
//         const assignmentsSnapshot = await getDocs(assignmentsQuery);
//         const recentAssignments = assignmentsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setDashboardData({
//           totalBooks,
//           availableBooks,
//           activeAssignments: recentAssignments.length,
//           recentAssignments,
//           lowStockBooks
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
//         <div className="flex h-screen">
//           <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//           <main className="flex-1 overflow-y-auto p-8">
//             <div className="flex justify-center items-center h-full">
//               <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
//               <div className="ml-4 text-indigo-800 font-medium">Loading dashboard data...</div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
//       <div className="flex h-screen">
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//               <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//                 LIBRARY DASHBOARD
//               </h1>
//               <p className="mt-2 opacity-80">Overview of your library's current status</p>
//             </div>

//             <div className="p-8">
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-8">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-bold text-indigo-900">Welcome back, Admin</h2>
//                     <p className="text-indigo-700 mt-1">Here's what's happening in your library today</p>
//                   </div>
//                   <div className="text-sm text-indigo-700 font-medium">
//                     {new Date().toLocaleDateString('en-US', { 
//                       weekday: 'long', 
//                       year: 'numeric', 
//                       month: 'long', 
//                       day: 'numeric' 
//                     })}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 <StatCard
//                   icon={BookOpen}
//                   title="Total Books"
//                   value={dashboardData.totalBooks}
//                   bgColor="bg-blue-50"
//                 />
//                 <StatCard
//                   icon={BookOpenCheck}
//                   title="Available Books"
//                   value={dashboardData.availableBooks}
//                   bgColor="bg-green-50"
//                 />
//                 <StatCard
//                   icon={ClipboardList}
//                   title="Active Assignments"
//                   value={dashboardData.activeAssignments}
//                   bgColor="bg-purple-50"
//                 />
//                 <StatCard
//                   icon={DollarSign}
//                   title="Pending Returns"
//                   value={dashboardData.recentAssignments.length}
//                   bgColor="bg-yellow-50"
//                 />
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <RecentAssignments assignments={dashboardData.recentAssignments} />
//                 <LowStockBooks books={dashboardData.lowStockBooks} />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




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
  Bell,
  Search,
  BarChart3,
  BookMarked,
  CalendarDays,
  Library,
  User,
  PieChart
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
    label: "Track Books", 
    href: "/track-books",
    description: "Monitor borrowed books" 
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
    icon: BarChart3, 
    label: "Reports", 
    href: "/reports",
    description: "Analytics and statistics" 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
    description: "System preferences" 
  }
];

// Secondary features for quick access
const quickFeatures = [
  { icon: BookMarked, label: "Add New Book", href: "/add-book" },
  { icon: CalendarDays, label: "Reservation Calendar", href: "/reservations" },
  { icon: User, label: "Add New Member", href: "/add-member" },
  { icon: PieChart, label: "Usage Analytics", href: "/analytics" }
];

const NavItem = ({ icon: Icon, label, href, description, isCollapsed, isActive }) => {
  return (
    <a 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive 
          ? "bg-indigo-700 text-white hover:bg-indigo-800" 
          : "hover:bg-gray-700 text-gray-300 hover:text-white"
      }`}
      title={isCollapsed ? label : ""}
    >
      <div className={`p-2 rounded-lg ${isActive ? "bg-indigo-600" : "bg-gray-700"}`}>
        <Icon className="h-5 w-5" />
      </div>
      {!isCollapsed && (
        <div className="flex-1">
          <div className="font-medium">{label}</div>
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
      className={`flex flex-col bg-gray-800 shadow-xl transition-all duration-300 h-screen ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4 py-2">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Cinzel, serif' }}>
            LIBRARY ADMIN
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
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
          <div className="my-6 border-t border-gray-700 pt-6">
            <h3 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Help & Support
            </h3>
            <div className="space-y-2">
              <a href="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300">
                <HelpCircle className="h-5 w-5" />
                <span>Documentation</span>
              </a>
              <a href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Feature card component with icon, title and navigation
const FeatureCard = ({ icon: Icon, title, description, href, color }) => (
  <a 
    href={href}
    className={`bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 ${color} transition-all duration-300 flex flex-col h-full`}
  >
    <div className={`p-3 rounded-lg inline-block mb-4 ${color.replace("border-", "bg-").replace("-600", "-100")}`}>
      <Icon className={`h-6 w-6 ${color.replace("border-", "text-")}`} />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm flex-grow">{description}</p>
    <div className="mt-4 text-sm font-medium text-indigo-600">
      Access feature →
    </div>
  </a>
);

// Quick access button
const QuickAccessButton = ({ icon: Icon, label, href }) => (
  <a 
    href={href}
    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
  >
    <div className="p-2 bg-indigo-50 rounded-lg">
      <Icon className="h-5 w-5 text-indigo-600" />
    </div>
    <span className="font-medium text-gray-800">{label}</span>
  </a>
);

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 overflow-y-auto">
        {/* Top header with search and notifications */}
        <div className="bg-white border-b shadow-sm px-8 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                  LA
                </div>
                <div className="hidden md:block">
                  <div className="font-medium text-gray-800">Library Admin</div>
                  <div className="text-xs text-gray-500">admin@library.org</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Welcome to Library Management System</h1>
              <p className="opacity-90 max-w-3xl">
                Access all library functions through this dashboard. Manage books, track assignments, handle user accounts, and generate reports from one central location.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap">
                <a href="/assign-books" className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors">
                  Assign New Book
                </a>
                <a href="/track-books" className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-colors border border-indigo-400">
                  Track Books
                </a>
              </div>
            </div>

            {/* Quick access section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickFeatures.map((feature, index) => (
                  <QuickAccessButton 
                    key={index}
                    icon={feature.icon}
                    label={feature.label}
                    href={feature.href}
                  />
                ))}
              </div>
            </div>

            {/* Main features grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Library Management Features</h2>
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
                  title="Track Books"
                  description="Monitor all borrowed books, check due dates, and mark returns. Get overdue notifications."
                  href="/track-books"
                  color="border-purple-600"
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
                <FeatureCard 
                  icon={Library}
                  title="Book Inventory"
                  description="Maintain a complete catalog of books. Track availability, condition, and location."
                  href="/inventory"
                  color="border-red-600"
                />
                <FeatureCard 
                  icon={BarChart3}
                  title="Reports & Analytics"
                  description="Generate detailed reports on library usage, popular books, and user activities."
                  href="/reports"
                  color="border-indigo-600"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>© 2025 Library Management System. All rights reserved.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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





"use client";

import React, { useState, useEffect } from "react";
import { 
  Home,
  BookOpen,
  ClipboardList,
  DollarSign,
  LogOut,
  Menu,
  ChevronLeft,
  Users,
  TrendingUp,
  AlertCircle,
  BookOpenCheck,
  BookX
} from "lucide-react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../lib/firebase";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Assign Books", href: "/assign-books" },
  { icon: ClipboardList, label: "Track Books", href: "/track-books" },
  { icon: DollarSign, label: "Manage Fines", href: "/manage-fines" },
  { icon: LogOut, label: "Logout", href: "/logout" },
];

const NavItem = ({ icon: Icon, label, href, isCollapsed }) => {
  return (
    <a 
      href={href} 
      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
      title={isCollapsed ? label : ""}
    >
      <Icon className="h-5 w-5 text-gray-300" />
      {!isCollapsed && <span className="text-gray-300">{label}</span>}
    </a>
  );
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <aside
      className={`flex flex-col bg-gray-800 shadow-xl transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-700 px-3 py-2">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Cinzel, serif' }}>LIBRARY ADMIN</h2>
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
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-white" }) => (
  <div className={`rounded-lg shadow-md p-6 ${bgColor}`}>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <Icon className="h-4 w-4 text-gray-500" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    {trend && (
      <p className="text-xs text-gray-500 mt-1 flex items-center">
        <TrendingUp className="h-3 w-3 mr-1" />
        {trend}
      </p>
    )}
  </div>
);

const RecentAssignments = ({ assignments }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">Recent Book Assignments</h3>
    <div className="space-y-4">
      {assignments.map((assignment, index) => (
        <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <div className="flex-1">
            <p className="font-medium">{assignment.bookTitle}</p>
            <p className="text-sm text-gray-500">
              Assigned to: {assignment.userRegId} • Due: {new Date(assignment.returnDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LowStockBooks = ({ books }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">Low Stock Books</h3>
    <div className="space-y-4">
      {books.map((book, index) => (
        <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
          <BookX className="h-4 w-4 text-yellow-500" />
          <div className="flex-1">
            <p className="font-medium">{book.title}</p>
            <p className="text-sm text-gray-500">
              Only {book.available} copies available
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    availableBooks: 0,
    activeAssignments: 0,
    recentAssignments: [],
    lowStockBooks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total books and available books
        const booksSnapshot = await getDocs(collection(db, "books"));
        const booksData = booksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const totalBooks = booksData.length;
        const availableBooks = booksData.reduce((sum, book) => sum + (book.available || 0), 0);
        
        // Get low stock books (books with less than 2 copies available)
        const lowStockBooks = booksData
          .filter(book => book.available < 2)
          .sort((a, b) => (a.available || 0) - (b.available || 0))
          .slice(0, 5);

        // Fetch recent assignments
        const assignmentsQuery = query(
          collection(db, "book_assignments"),
          where("status", "==", "active"),
          orderBy("takenDate", "desc"),
          limit(5)
        );
        const assignmentsSnapshot = await getDocs(assignmentsQuery);
        const recentAssignments = assignmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setDashboardData({
          totalBooks,
          availableBooks,
          activeAssignments: recentAssignments.length,
          recentAssignments,
          lowStockBooks
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-8">
            <div className="text-center">Loading dashboard data...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Cinzel, serif' }}>LIBRARY DASHBOARD</h1>
              <p className="mt-2 text-gray-600">
                Overview of your library's current status
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={BookOpen}
              title="Total Books"
              value={dashboardData.totalBooks}
              bgColor="bg-blue-50"
            />
            <StatCard
              icon={BookOpenCheck}
              title="Available Books"
              value={dashboardData.availableBooks}
              bgColor="bg-green-50"
            />
            <StatCard
              icon={ClipboardList}
              title="Active Assignments"
              value={dashboardData.activeAssignments}
              bgColor="bg-purple-50"
            />
            <StatCard
              icon={DollarSign}
              title="Pending Returns"
              value={dashboardData.recentAssignments.length}
              bgColor="bg-yellow-50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentAssignments assignments={dashboardData.recentAssignments} />
            <LowStockBooks books={dashboardData.lowStockBooks} />
          </div>
        </div>
      </main>
    </div>
  );
}

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
//   TrendingUp,
//   AlertCircle,
//   BookOpenCheck,
//   BookX
// } from "lucide-react";
// import { collection, getDocs, doc, query, where, orderBy, limit } from "firebase/firestore";
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
//     {assignments.length > 0 ? (
//       <div className="space-y-4">
//         {assignments.map((assignment, index) => (
//           <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//             <div className="h-2 w-2 rounded-full bg-green-500" />
//             <div className="flex-1">
//               <p className="font-medium">{assignment.bookTitle}</p>
//               <p className="text-sm text-gray-500">
//                 Assigned to: {assignment.userRegId} • Due: {new Date(assignment.returnDate).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p className="text-gray-500 text-center py-4">No recent assignments found</p>
//     )}
//   </div>
// );

// const LowStockBooks = ({ books }) => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-4">Low Stock Books</h3>
//     {books.length > 0 ? (
//       <div className="space-y-4">
//         {books.map((book, index) => (
//           <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//             <BookX className="h-4 w-4 text-yellow-500" />
//             <div className="flex-1">
//               <p className="font-medium">{book.title}</p>
//               <p className="text-sm text-gray-500">
//                 Only {book.available} copies available
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p className="text-gray-500 text-center py-4">No low stock books found</p>
//     )}
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
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Using the same approach as your working assign-books component
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Simplified approach: fetch books first
//         const booksRef = collection(db, "books");
//         const booksSnapshot = await getDocs(booksRef);
        
//         // Extract book data
//         const booksData = booksSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         // Calculate book statistics
//         const totalBooks = booksData.length;
//         const availableBooks = booksData.reduce((sum, book) => 
//           sum + (parseInt(book.available) || 0), 0);
        
//         // Get low stock books
//         const lowStockBooks = booksData
//           .filter(book => (parseInt(book.available) || 0) < 2)
//           .slice(0, 5);
        
//         // Get active assignments using similar method as assign-books
//         const assignmentsRef = collection(db, "book_assignments");
//         const activeAssignmentsQuery = query(
//           assignmentsRef,
//           where("status", "==", "active")
//         );
//         const assignmentsSnapshot = await getDocs(activeAssignmentsQuery);
        
//         // Get recent assignments
//         const recentAssignmentsQuery = query(
//           assignmentsRef,
//           where("status", "==", "active"),
//           orderBy("takenDate", "desc"),
//           limit(5)
//         );
//         const recentAssignmentsSnapshot = await getDocs(recentAssignmentsQuery);
//         const recentAssignments = recentAssignmentsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         // Update dashboard data
//         setDashboardData({
//           totalBooks,
//           availableBooks,
//           activeAssignments: assignmentsSnapshot.docs.length,
//           recentAssignments,
//           lowStockBooks
//         });
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError("Failed to load dashboard data. Please check your connection.");
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
//             <div className="text-center py-12">
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
//               <p className="mt-4 text-gray-600">Loading dashboard data...</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//         <main className="flex-1 overflow-y-auto">
//           <div className="container mx-auto p-8">
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               <div className="flex items-center">
//                 <AlertCircle className="h-5 w-5 mr-2" />
//                 <p>{error}</p>
//               </div>
//               <button 
//                 onClick={() => window.location.reload()} 
//                 className="mt-2 px-4 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
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
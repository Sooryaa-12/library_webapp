// "use client";

// import React, { useState } from "react";
// import { 
//   Home,
//   BookOpen,
//   ClipboardList,
//   DollarSign,
//   LogOut,
//   Menu,
//   ChevronLeft
// } from "lucide-react";

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
//       className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
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
//       className={`flex flex-col bg-gray-800 transition-all duration-300 ${
//         isCollapsed ? "w-16" : "w-64"
//       }`}
//     >
//       <div className="flex h-14 items-center justify-between border-b border-gray-700 px-3 py-2">
//         {!isCollapsed && (
//           <h2 className="text-lg font-semibold text-white">Library Admin</h2>
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
//       <div className="flex-1 overflow-y-auto px-2 py-3">
//         <nav className="flex flex-col gap-1">
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

// export default function Dashboard() {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         <div className="container mx-auto p-8">
//           <h1 className="text-3xl font-bold text-gray-900">Welcome to the Dashboard</h1>
//           <p className="mt-2 text-gray-600">
//             Select an option from the sidebar to manage library operations.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }





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
//   TrendingUp,
//   AlertCircle
// } from "lucide-react";

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
//           <h2 className="text-xl font-semibold text-white">Library Admin</h2>
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
//         {trend} from last month
//       </p>
//     )}
//   </div>
// );

// const RecentActivity = () => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//     <div className="space-y-4">
//       {[
//         { title: "New book assigned", time: "2 minutes ago", user: "John Doe" },
//         { title: "Fine collected", time: "1 hour ago", user: "Sarah Smith" },
//         { title: "Book returned", time: "3 hours ago", user: "Mike Johnson" },
//       ].map((activity, index) => (
//         <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//           <div className="h-2 w-2 rounded-full bg-green-500" />
//           <div className="flex-1">
//             <p className="font-medium">{activity.title}</p>
//             <p className="text-sm text-gray-500">
//               {activity.user} • {activity.time}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const OverdueBooks = () => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-4">Overdue Books</h3>
//     <div className="space-y-4">
//       {[
//         { title: "The Great Gatsby", days: 5, user: "Alice Cooper" },
//         { title: "1984", days: 3, user: "Bob Wilson" },
//         { title: "To Kill a Mockingbird", days: 2, user: "Carol Davis" },
//       ].map((book, index) => (
//         <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//           <AlertCircle className="h-4 w-4 text-red-500" />
//           <div className="flex-1">
//             <p className="font-medium">{book.title}</p>
//             <p className="text-sm text-gray-500">
//               {book.user} • {book.days} days overdue
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default function Dashboard() {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <main className="flex-1 overflow-y-auto">
//         <div className="container mx-auto p-8">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Admin</h1>
//               <p className="mt-2 text-gray-600">
//                 Here's what's happening in your library today
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
//               value="1,234"
//               trend="+12%"
//               bgColor="bg-blue-50"
//             />
//             <StatCard
//               icon={Users}
//               title="Active Members"
//               value="892"
//               trend="+5%"
//               bgColor="bg-green-50"
//             />
//             <StatCard
//               icon={ClipboardList}
//               title="Books Borrowed"
//               value="156"
//               trend="+8%"
//               bgColor="bg-purple-50"
//             />
//             <StatCard
//               icon={DollarSign}
//               title="Pending Fines"
//               value="$432"
//               trend="+2%"
//               bgColor="bg-yellow-50"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <RecentActivity />
//             <OverdueBooks />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }





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
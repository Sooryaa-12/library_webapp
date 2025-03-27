

//modified by ME


// "use client";

// import { useState, useEffect } from "react";
// import { Search, BookOpen, Calendar, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
// import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
// import { db } from "../../lib/firebase";

// export default function TrackBooks() {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [loadingReturn, setLoadingReturn] = useState(null);

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const fetchAssignments = async () => {
//     setLoading(true);
//     try {
//       const usersRef = collection(db, "borrowed");
//       const snapshot = await getDocs(usersRef);
//       let assignmentsList = [];
      
//       snapshot.forEach(userDoc => {
//         const userData = userDoc.data();
//         userData.takenBooks.forEach(book => {
//           assignmentsList.push({
//             id: userDoc.id,
//             ...book,
//             userRegId: userData.regid,
//             userName: userData.name,
//             isOverdue: new Date(book.returnDate) < new Date(),
//           });
//         });
//       });
//       setAssignments(assignmentsList);
//     } catch (error) {
//       console.error("Error fetching assignments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsReturned = async (assignment) => {
//     setLoadingReturn(assignment.isbn);
//     try {
//       const userDocRef = doc(db, "borrowed", assignment.userRegId);
//       const bookIndex = assignments.findIndex(a => a.isbn === assignment.isbn && a.userRegId === assignment.userRegId);
//       if (bookIndex === -1) return;
      
//       assignments[bookIndex].status = "returned";
//       assignments[bookIndex].returnedDate = new Date().toISOString();
      
//       await updateDoc(userDocRef, {
//         takenBooks: assignments.map(book => book.isbn === assignment.isbn ? { ...book, status: "returned", returnedDate: new Date().toISOString() } : book)
//       });
      
//       const bookDocRef = doc(db, "books", assignment.isbn);
//       await updateDoc(bookDocRef, {
//         available: increment(1)
//       });
      
//       setAssignments([...assignments]);
//     } catch (error) {
//       console.error("Error updating status:", error);
//     } finally {
//       setLoadingReturn(null);
//     }
//   };

//   const filteredAssignments = assignments.filter(assignment => {
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       return assignment.title.toLowerCase().includes(searchLower) || assignment.userRegId.toLowerCase().includes(searchLower);
//     }
//     if (filter === "overdue") return assignment.isOverdue;
//     if (filter === "returned") return assignment.status === "returned";
//     return true;
//   });

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>TRACK BOOKS</h1>
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by book title or student ID..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <select
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All Books</option>
//           <option value="overdue">Overdue</option>
//           <option value="returned">Returned</option>
//         </select>
//       </div>
//       {loading ? (
//         <div className="text-center py-8">Loading assignments...</div>
//       ) : (
//         <div className="grid gap-4">
//           {filteredAssignments.map((assignment) => (
//             <div key={assignment.isbn} className="p-4 bg-white rounded-lg shadow flex items-center">
//               <img src={assignment.coverImg} alt={assignment.title} className="w-16 h-24 rounded-md mr-4" />
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="text-gray-500" size={20} />
//                       <h3 className="font-semibold text-lg">{assignment.title}</h3>
//                     </div>
//                     <p className="text-gray-600 mt-1">Student ID: {assignment.userRegId}</p>
//                     <p className="text-gray-600">Name: {assignment.userName}</p>
//                     <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
//                       <Calendar size={16} />
//                       <span>Borrowed: {new Date(assignment.takenDate).toLocaleDateString()}</span>
//                       <Calendar size={16} />
//                       <span>Due: {new Date(assignment.returnDate).toLocaleDateString()}</span>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     assignment.status === "returned" 
//                       ? "bg-green-100 text-green-800" 
//                       : assignment.isOverdue 
//                       ? "bg-red-100 text-red-800" 
//                       : "bg-blue-100 text-blue-800"
//                   }`}>
//                     {assignment.status === "returned" ? "Returned" : assignment.isOverdue ? "Overdue" : "Borrowed"}
//                   </span>
//                 </div>
//                 {assignment.isOverdue && assignment.status !== "returned" && (
//                   <div className="mt-3 flex items-center gap-2 text-red-600">
//                     <AlertCircle size={16} />
//                     <span className="text-sm">Overdue by {Math.ceil((new Date() - new Date(assignment.returnDate)) / (1000 * 60 * 60 * 24))} days</span>
//                   </div>
//                 )}
//                 {assignment.status !== "returned" && (
//                   <button
//                     className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
//                     onClick={() => markAsReturned(assignment)}
//                     disabled={loadingReturn === assignment.isbn}
//                   >
//                     {loadingReturn === assignment.isbn ? <Loader2 className="animate-spin mr-2" size={16} /> : <CheckCircle className="mr-2" size={16} />}
//                     {loadingReturn === assignment.isbn ? "Processing..." : "Mark as Returned"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// "use client"

// import { useState, useEffect } from "react"
// import { Search, BookOpen, Calendar, AlertCircle, CheckCircle, Loader2, X, Tag } from "lucide-react"
// import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// export default function TrackBooks() {
//   const [assignments, setAssignments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filter, setFilter] = useState("all")
//   const [loadingReturn, setLoadingReturn] = useState(null)
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState("")

//   useEffect(() => {
//     fetchAssignments()
//   }, [])

//   const fetchAssignments = async () => {
//     setLoading(true)
//     setError("")
//     try {
//       const usersRef = collection(db, "borrowed")
//       const snapshot = await getDocs(usersRef)
//       let assignmentsList = []
      
//       snapshot.forEach(userDoc => {
//         const userData = userDoc.data()
//         userData.takenBooks.forEach(book => {
//           assignmentsList.push({
//             id: userDoc.id,
//             ...book,
//             userRegId: userData.regid,
//             userName: userData.name,
//             isOverdue: new Date(book.returnDate) < new Date(),
//           })
//         })
//       })
//       setAssignments(assignmentsList)
//     } catch (error) {
//       console.error("Error fetching assignments:", error)
//       setError("Failed to load book assignments. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const markAsReturned = async (assignment) => {
//     setLoadingReturn(assignment.isbn)
//     setError("")
//     try {
//       const userDocRef = doc(db, "borrowed", assignment.userRegId)
//       const bookIndex = assignments.findIndex(a => a.isbn === assignment.isbn && a.userRegId === assignment.userRegId)
//       if (bookIndex === -1) return
      
//       assignments[bookIndex].status = "returned"
//       assignments[bookIndex].returnedDate = new Date().toISOString()
      
//       // Update in Firestore
//       await updateDoc(userDocRef, {
//         takenBooks: assignments
//           .filter(book => book.userRegId === assignment.userRegId)
//           .map(book => book.isbn === assignment.isbn 
//             ? { ...book, status: "returned", returnedDate: new Date().toISOString() } 
//             : book)
//       })
      
//       // Update book availability
//       const bookDocRef = doc(db, "books", assignment.isbn)
//       await updateDoc(bookDocRef, {
//         available: increment(1)
//       })
      
//       setAssignments([...assignments])
//       setSuccessMessage(`Book "${assignment.title}" has been marked as returned by ${assignment.userName}`)
      
//       // Auto hide success message after 5 seconds
//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (error) {
//       console.error("Error updating status:", error)
//       setError(`Failed to mark book as returned: ${error.message}`)
//     } finally {
//       setLoadingReturn(null)
//     }
//   }

//   const filteredAssignments = assignments.filter(assignment => {
//     const searchLower = searchTerm.toLowerCase()
//     const matchesSearch = !searchTerm || 
//       assignment.title.toLowerCase().includes(searchLower) || 
//       assignment.userRegId.toString().toLowerCase().includes(searchLower) ||
//       assignment.userName.toLowerCase().includes(searchLower)
    
//     if (filter === "overdue") return matchesSearch && assignment.isOverdue && assignment.status !== "returned"
//     if (filter === "returned") return matchesSearch && assignment.status === "returned"
//     if (filter === "active") return matchesSearch && !assignment.isOverdue && assignment.status !== "returned"
    
//     return matchesSearch
//   })

//   // Calculate days overdue or remaining
//   const calculateDaysDifference = (dueDate) => {
//     const today = new Date()
//     const due = new Date(dueDate)
//     return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//           <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//             TRACK BOOKS
//           </h1>
//           <p className="mt-2 opacity-80">Monitor borrowed books and manage returns</p>
//         </div>

//         <div className="p-8">
//           {successMessage && (
//             <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg flex items-center gap-3 animate-fadeIn">
//               <div className="bg-emerald-100 p-2 rounded-full">
//                 <CheckCircle size={20} className="text-emerald-600" />
//               </div>
//               <p className="font-medium">{successMessage}</p>
//             </div>
//           )}

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//               <div className="bg-red-100 p-2 rounded-full">
//                 <X size={20} className="text-red-600" />
//               </div>
//               <p className="font-medium">{error}</p>
//             </div>
//           )}

//           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-8">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="relative flex-1">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Search className="text-indigo-500" size={20} />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by book title, student ID or name..."
//                   className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <select
//                 className="px-6 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all text-indigo-700"
//                 style={{ fontFamily: "Inter, sans-serif" }}
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               >
//                 <option value="all">All Books</option>
//                 <option value="active">Currently Borrowed</option>
//                 <option value="overdue">Overdue</option>
//                 <option value="returned">Returned</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="p-12 flex flex-col justify-center items-center space-y-4">
//               <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
//               <div className="text-indigo-800 font-medium">Loading assignments...</div>
//             </div>
//           ) : filteredAssignments.length === 0 ? (
//             <div className="p-12 flex flex-col justify-center items-center space-y-4 text-center">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <BookOpen size={48} className="text-indigo-600" />
//               </div>
//               <div className="text-xl font-medium text-indigo-800">No book assignments found</div>
//               <p className="text-indigo-600 max-w-md">
//                 {searchTerm 
//                   ? "Try adjusting your search criteria" 
//                   : filter !== "all" 
//                     ? `No ${filter === "overdue" ? "overdue" : filter === "returned" ? "returned" : "active"} books found` 
//                     : "There are no book assignments in the system yet"}
//               </p>
//             </div>
//           ) : (
//             <div className="grid gap-6 mb-6">
//               {filteredAssignments.map((assignment) => (
//                 <div
//                   key={`${assignment.isbn}-${assignment.userRegId}`}
//                   className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
//                 >
//                   <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
//                       <img
//                         src={assignment.coverImg || "/placeholder.svg"}
//                         alt={assignment.title}
//                         className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex-1 p-6">
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div>
//                           <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
//                             {assignment.title}
//                           </h3>
//                           <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                             {assignment.author}
//                           </p>

//                           <div className="flex items-center gap-6 mt-3">
//                             <div className="flex items-center gap-2">
//                               <div className="bg-indigo-100 p-1.5 rounded-full">
//                                 <BookOpen size={16} className="text-indigo-600" />
//                               </div>
//                               <span className="font-medium">ISBN: {assignment.isbn}</span>
//                             </div>
//                           </div>

//                           <div className="mt-4 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
//                             <div className="text-indigo-800 font-medium">
//                               Assigned to: {assignment.userName} (ID: {assignment.userRegId})
//                             </div>
//                             <div className="flex flex-wrap gap-4 mt-2 text-sm text-indigo-700">
//                               <div className="flex items-center gap-1.5">
//                                 <Calendar size={14} />
//                                 <span>Borrowed: {new Date(assignment.takenDate).toLocaleDateString()}</span>
//                               </div>
//                               <div className="flex items-center gap-1.5">
//                                 <Calendar size={14} />
//                                 <span>Due: {new Date(assignment.returnDate).toLocaleDateString()}</span>
//                               </div>
//                               {assignment.status === "returned" && (
//                                 <div className="flex items-center gap-1.5">
//                                   <CheckCircle size={14} />
//                                   <span>Returned: {new Date(assignment.returnedDate).toLocaleDateString()}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
//                           <span
//                             className={`px-4 py-2 rounded-full font-medium w-40 text-center shadow-sm ${
//                               assignment.status === "returned"
//                                 ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
//                                 : assignment.isOverdue
//                                 ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
//                                 : "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700"
//                             }`}
//                           >
//                             {assignment.status === "returned" 
//                               ? "Returned" 
//                               : assignment.isOverdue 
//                               ? `Overdue by ${Math.abs(calculateDaysDifference(assignment.returnDate))} days` 
//                               : `${calculateDaysDifference(assignment.returnDate)} days remaining`}
//                           </span>

//                           {assignment.status !== "returned" && (
//                             <button
//                               className={`flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40 ${
//                                 loadingReturn === assignment.isbn
//                                   ? "bg-gray-500 cursor-not-allowed"
//                                   : assignment.isOverdue
//                                   ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
//                                   : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                               }`}
//                               onClick={() => markAsReturned(assignment)}
//                               disabled={loadingReturn === assignment.isbn}
//                             >
//                               {loadingReturn === assignment.isbn ? (
//                                 <>
//                                   <Loader2 size={18} className="animate-spin" />
//                                   Processing...
//                                 </>
//                               ) : (
//                                 <>
//                                   <CheckCircle size={18} />
//                                   Mark as Returned
//                                 </>
//                               )}
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       {assignment.isOverdue && assignment.status !== "returned" && (
//                         <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
//                           <AlertCircle size={18} className="text-red-600" />
//                           <span className="font-medium">
//                             This book is overdue by {Math.abs(calculateDaysDifference(assignment.returnDate))} days.
//                             {assignment.fine > 0 && ` Current fine: $${assignment.fine.toFixed(2)}`}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }








"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, Calendar, AlertCircle, CheckCircle, Loader2, X, Tag } from "lucide-react"
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore"
import { db } from "../../lib/firebase"

export default function TrackBooks() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [loadingReturn, setLoadingReturn] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    setLoading(true)
    setError("")
    try {
      const usersRef = collection(db, "borrowed")
      const snapshot = await getDocs(usersRef)
      let assignmentsList = []
      
      snapshot.forEach(userDoc => {
        const userData = userDoc.data()
        userData.takenBooks.forEach(book => {
          assignmentsList.push({
            id: userDoc.id,
            ...book,
            userRegId: userData.regid,
            userName: userData.name,
            isOverdue: new Date(book.returnDate) < new Date(),
          })
        })
      })
      
      // Sort assignments by takenDate (newest first)
      assignmentsList.sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate))
      
      setAssignments(assignmentsList)
    } catch (error) {
      console.error("Error fetching assignments:", error)
      setError("Failed to load book assignments. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const markAsReturned = async (assignment) => {
    setLoadingReturn(assignment.isbn)
    setError("")
    try {
      const userDocRef = doc(db, "borrowed", assignment.userRegId)
      const bookIndex = assignments.findIndex(a => a.isbn === assignment.isbn && a.userRegId === assignment.userRegId)
      if (bookIndex === -1) return
      
      assignments[bookIndex].status = "returned"
      assignments[bookIndex].returnedDate = new Date().toISOString()
      
      // Update in Firestore
      await updateDoc(userDocRef, {
        takenBooks: assignments
          .filter(book => book.userRegId === assignment.userRegId)
          .map(book => book.isbn === assignment.isbn 
            ? { ...book, status: "returned", returnedDate: new Date().toISOString() } 
            : book)
      })
      
      // Update book availability
      const bookDocRef = doc(db, "books", assignment.isbn)
      await updateDoc(bookDocRef, {
        available: increment(1)
      })
      
      // Re-sort assignments after status update to maintain proper order
      const updatedAssignments = [...assignments]
      updatedAssignments.sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate))
      
      setAssignments(updatedAssignments)
      setSuccessMessage(`Book "${assignment.title}" has been marked as returned by ${assignment.userName}`)
      
      // Auto hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      console.error("Error updating status:", error)
      setError(`Failed to mark book as returned: ${error.message}`)
    } finally {
      setLoadingReturn(null)
    }
  }

  const filteredAssignments = assignments.filter(assignment => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = !searchTerm || 
      assignment.title.toLowerCase().includes(searchLower) || 
      assignment.userRegId.toString().toLowerCase().includes(searchLower) ||
      assignment.userName.toLowerCase().includes(searchLower)
    
    if (filter === "overdue") return matchesSearch && assignment.isOverdue && assignment.status !== "returned"
    if (filter === "returned") return matchesSearch && assignment.status === "returned"
    if (filter === "active") return matchesSearch && !assignment.isOverdue && assignment.status !== "returned"
    
    return matchesSearch
  })

  // Calculate days overdue or remaining
  const calculateDaysDifference = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            RETURN BOOKSS
          </h1>
          <p className="mt-2 opacity-80">Monitor borrowed books and manage returns</p>
        </div>

        <div className="p-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg flex items-center gap-3 animate-fadeIn">
              <div className="bg-emerald-100 p-2 rounded-full">
                <CheckCircle size={20} className="text-emerald-600" />
              </div>
              <p className="font-medium">{successMessage}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <X size={20} className="text-red-600" />
              </div>
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-indigo-500" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search by book title, student ID or name..."
                  className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-6 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all text-indigo-700"
                style={{ fontFamily: "Inter, sans-serif" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Books</option>
                <option value="active">Currently Borrowed</option>
                <option value="overdue">Overdue</option>
                <option value="returned">Returned</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col justify-center items-center space-y-4">
              <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
              <div className="text-indigo-800 font-medium">Loading assignments...</div>
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="p-12 flex flex-col justify-center items-center space-y-4 text-center">
              <div className="bg-indigo-100 p-4 rounded-full">
                <BookOpen size={48} className="text-indigo-600" />
              </div>
              <div className="text-xl font-medium text-indigo-800">No book assignments found</div>
              <p className="text-indigo-600 max-w-md">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : filter !== "all" 
                    ? `No ${filter === "overdue" ? "overdue" : filter === "returned" ? "returned" : "active"} books found` 
                    : "There are no book assignments in the system yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 mb-6">
              {filteredAssignments.map((assignment) => (
                <div
                  // key={`${assignment.isbn}-${assignment.userRegId}`}
                  key={`${assignment.isbn}-${assignment.userRegId}-${assignment.takenDate}`}
                  className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
                      <img
                        src={assignment.coverImg || "/placeholder.svg"}
                        alt={assignment.title}
                        className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
                            {assignment.title}
                          </h3>
                          <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                            {assignment.author}
                          </p>

                          <div className="flex items-center gap-6 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="bg-indigo-100 p-1.5 rounded-full">
                                <BookOpen size={16} className="text-indigo-600" />
                              </div>
                              <span className="font-medium">ISBN: {assignment.isbn}</span>
                            </div>
                          </div>

                          <div className="mt-4 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                            <div className="text-indigo-800 font-medium">
                              Assigned to: {assignment.userName} (ID: {assignment.userRegId})
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-indigo-700">
                              <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>Borrowed: {new Date(assignment.takenDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>Due: {new Date(assignment.returnDate).toLocaleDateString()}</span>
                              </div>
                              {assignment.status === "returned" && (
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle size={14} />
                                  <span>Returned: {new Date(assignment.returnedDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
                          <span
                            className={`px-4 py-2 rounded-full font-medium w-40 text-center shadow-sm ${
                              assignment.status === "returned"
                                ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                                : assignment.isOverdue
                                ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
                                : "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700"
                            }`}
                          >
                            {assignment.status === "returned" 
                              ? "Returned" 
                              : assignment.isOverdue 
                              ? `Overdue by ${Math.abs(calculateDaysDifference(assignment.returnDate))} days` 
                              : `${calculateDaysDifference(assignment.returnDate)} days remaining`}
                          </span>

                          {assignment.status !== "returned" && (
                            <button
                              className={`flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40 ${
                                loadingReturn === assignment.isbn
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : assignment.isOverdue
                                  ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                              }`}
                              onClick={() => markAsReturned(assignment)}
                              disabled={loadingReturn === assignment.isbn}
                            >
                              {loadingReturn === assignment.isbn ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CheckCircle size={18} />
                                  Mark as Returned
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {assignment.isOverdue && assignment.status !== "returned" && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                          <AlertCircle size={18} className="text-red-600" />
                          <span className="font-medium">
                            This book is overdue by {Math.abs(calculateDaysDifference(assignment.returnDate))} days.
                            {assignment.fine > 0 && ` Current fine: $${assignment.fine.toFixed(2)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// "use client"

// import { useState, useEffect } from "react"
// import { Search, BookOpen, Calendar, AlertCircle, RefreshCw, Loader2, X, CheckCircle } from "lucide-react"
// import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// export default function RenewBooks() {
//   const [assignments, setAssignments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filter, setFilter] = useState("active")
//   const [loadingRenew, setLoadingRenew] = useState(null)
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
      
//       // Sort assignments by takenDate (newest first)
//       assignmentsList.sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate))
      
//       setAssignments(assignmentsList)
//     } catch (error) {
//       console.error("Error fetching assignments:", error)
//       setError("Failed to load book assignments. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const requestRenewal = async (assignment) => {
//     setLoadingRenew(assignment.isbn)
//     setError("")
//     try {
//       // Check if the book is already returned
//       if (assignment.status === "returned") {
//         setError("Cannot renew a book that has already been returned.")
//         return
//       }
      
//       // Create a renewal request in Firestore
//       await addDoc(collection(db, "renewalRequests"), {
//         userRegid: assignment.userRegId,
//         userName: assignment.userName,
//         bookIsbn: assignment.isbn,
//         bookTitle: assignment.title,
//         bookCoverImg: assignment.coverImg,
//         takenDate: assignment.takenDate,
//         currentReturnDate: assignment.returnDate,
//         requestedDays: 10, // Fixed 10-day extension
//         requestDate: new Date().toISOString(),
//         status: "pending"
//       })
      
//       setSuccessMessage(`Renewal request for "${assignment.title}" has been submitted and is pending approval`)
      
//       // Auto hide success message after 5 seconds
//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (error) {
//       console.error("Error requesting renewal:", error)
//       setError(`Failed to request renewal: ${error.message}`)
//     } finally {
//       setLoadingRenew(null)
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

//   // Calculate new return date (current date + 10 days)
//   const calculateNewReturnDate = (currentReturnDate) => {
//     const currentDate = new Date(currentReturnDate)
//     const newDate = new Date(currentDate)
//     newDate.setDate(newDate.getDate() + 10)
//     return newDate.toLocaleDateString()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//           <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//             RENEW BOOKS
//           </h1>
//           <p className="mt-2 opacity-80">Request renewal for your borrowed books</p>
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
//                                 loadingRenew === assignment.isbn
//                                   ? "bg-gray-500 cursor-not-allowed"
//                                   : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                               }`}
//                               onClick={() => requestRenewal(assignment)}
//                               disabled={loadingRenew === assignment.isbn}
//                             >
//                               {loadingRenew === assignment.isbn ? (
//                                 <>
//                                   <Loader2 size={18} className="animate-spin" />
//                                   Processing...
//                                 </>
//                               ) : (
//                                 <>
//                                   <RefreshCw size={18} />
//                                   Renew Book
//                                 </>
//                               )}
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       {assignment.status !== "returned" && (
//                         <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-2 text-indigo-700">
//                           <AlertCircle size={18} className="text-indigo-600" />
//                           <span className="font-medium">
//                             Renewing this book will extend the due date by 10 days to {calculateNewReturnDate(assignment.returnDate)}.
//                             Your request will need approval.
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






// "use client"

// import { useState, useEffect } from "react"
// import { Search, BookOpen, Calendar, AlertCircle, RefreshCw, Loader2, X, CheckCircle } from "lucide-react"
// import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp, query, where, getDoc } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// export default function RenewBooks() {
//   const [assignments, setAssignments] = useState([])
//   const [renewalRequests, setRenewalRequests] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filter, setFilter] = useState("active")
//   const [loadingRenew, setLoadingRenew] = useState(null)
//   const [loadingApprove, setLoadingApprove] = useState(null)
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState("")
//   const [isAdmin, setIsAdmin] = useState(false) // Set to true for admin users who can approve requests

//   useEffect(() => {
//     fetchAssignments()
//     fetchRenewalRequests()
//     // For demo purposes, you can uncomment this to simulate admin access
//     // setIsAdmin(true)
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
      
//       // Sort assignments by takenDate (newest first)
//       assignmentsList.sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate))
      
//       setAssignments(assignmentsList)
//     } catch (error) {
//       console.error("Error fetching assignments:", error)
//       setError("Failed to load book assignments. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchRenewalRequests = async () => {
//     try {
//       const requestsRef = collection(db, "renewalRequests")
//       const snapshot = await getDocs(requestsRef)
//       let requestsList = []
      
//       snapshot.forEach(doc => {
//         requestsList.push({
//           id: doc.id,
//           ...doc.data()
//         })
//       })
      
//       setRenewalRequests(requestsList)
//     } catch (error) {
//       console.error("Error fetching renewal requests:", error)
//     }
//   }

//   const requestRenewal = async (assignment) => {
//     setLoadingRenew(assignment.isbn)
//     setError("")
//     try {
//       // Check if the book is already returned
//       if (assignment.status === "returned") {
//         setError("Cannot renew a book that has already been returned.")
//         return
//       }
      
//       // Check if there's already a pending request for this book
//       const existingRequest = renewalRequests.find(req => 
//         req.bookIsbn === assignment.isbn && 
//         req.userRegid === assignment.userRegId &&
//         req.status === "pending"
//       )
      
//       if (existingRequest) {
//         setError(`A renewal request for "${assignment.title}" is already pending approval.`)
//         return
//       }
      
//       // Create a renewal request in Firestore
//       await addDoc(collection(db, "renewalRequests"), {
//         userRegid: assignment.userRegId,
//         userName: assignment.userName,
//         bookIsbn: assignment.isbn,
//         bookTitle: assignment.title,
//         bookCoverImg: assignment.coverImg,
//         takenDate: assignment.takenDate,
//         currentReturnDate: assignment.returnDate,
//         requestedDays: 10, // Fixed 10-day extension
//         requestDate: new Date().toISOString(),
//         status: "pending"
//       })
      
//       // Refresh renewal requests
//       await fetchRenewalRequests()
      
//       setSuccessMessage(`Renewal request for "${assignment.title}" has been submitted and is pending approval`)
      
//       // Auto hide success message after 5 seconds
//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (error) {
//       console.error("Error requesting renewal:", error)
//       setError(`Failed to request renewal: ${error.message}`)
//     } finally {
//       setLoadingRenew(null)
//     }
//   }

//   // New function to approve a renewal request
//   const approveRenewal = async (request) => {
//     setLoadingApprove(request.id)
//     setError("")
//     try {
//       // 1. Update the request status to approved
//       const requestRef = doc(db, "renewalRequests", request.id)
//       await updateDoc(requestRef, {
//         status: "approved",
//         approvalDate: new Date().toISOString()
//       })
      
//       // 2. Find the borrowed document that contains this book
//       const borrowedRef = collection(db, "borrowed")
//       const borrowedSnapshot = await getDocs(borrowedRef)
      
//       let borrowedDocId = null
//       let borrowedData = null
//       let bookIndex = -1
      
//       borrowedSnapshot.forEach(borrowedDoc => {
//         const data = borrowedDoc.data()
//         if (data.regid === request.userRegid) {
//           const index = data.takenBooks.findIndex(book => book.isbn === request.bookIsbn)
//           if (index !== -1) {
//             borrowedDocId = borrowedDoc.id
//             borrowedData = data
//             bookIndex = index
//           }
//         }
//       })
      
//       if (!borrowedDocId || bookIndex === -1) {
//         throw new Error("Could not find the borrowed book record")
//       }
      
//       // 3. Calculate the new return date
//       const currentReturnDate = new Date(request.currentReturnDate)
//       const newReturnDate = new Date(currentReturnDate)
//       newReturnDate.setDate(newReturnDate.getDate() + request.requestedDays)
      
//       // 4. Update the return date in the borrowed document
//       const updatedTakenBooks = [...borrowedData.takenBooks]
//       updatedTakenBooks[bookIndex] = {
//         ...updatedTakenBooks[bookIndex],
//         returnDate: newReturnDate.toISOString(),
//         renewalCount: (updatedTakenBooks[bookIndex].renewalCount || 0) + 1
//       }
      
//       const borrowedDocRef = doc(db, "borrowed", borrowedDocId)
//       await updateDoc(borrowedDocRef, {
//         takenBooks: updatedTakenBooks
//       })
      
//       // 5. Refresh the data
//       await fetchAssignments()
//       await fetchRenewalRequests()
      
//       setSuccessMessage(`Renewal for "${request.bookTitle}" has been approved. Return date extended by ${request.requestedDays} days.`)
      
//       // Auto hide success message after 5 seconds
//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (error) {
//       console.error("Error approving renewal:", error)
//       setError(`Failed to approve renewal: ${error.message}`)
//     } finally {
//       setLoadingApprove(null)
//     }
//   }

//   // Function to check if a book has a pending renewal request
//   const hasPendingRenewal = (assignment) => {
//     return renewalRequests.some(req => 
//       req.bookIsbn === assignment.isbn && 
//       req.userRegid === assignment.userRegId &&
//       req.status === "pending"
//     )
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
//     if (filter === "pending") return matchesSearch && hasPendingRenewal(assignment)
    
//     return matchesSearch
//   })

//   // Calculate days overdue or remaining
//   const calculateDaysDifference = (dueDate) => {
//     const today = new Date()
//     const due = new Date(dueDate)
//     return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
//   }

//   // Calculate new return date (current date + 10 days)
//   const calculateNewReturnDate = (currentReturnDate) => {
//     const currentDate = new Date(currentReturnDate)
//     const newDate = new Date(currentDate)
//     newDate.setDate(newDate.getDate() + 10)
//     return newDate.toLocaleDateString()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//           <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//             RENEW BOOKS
//           </h1>
//           <p className="mt-2 opacity-80">Request renewal for your borrowed books</p>
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
//                 <option value="pending">Pending Renewal</option>
//               </select>
//             </div>
//           </div>

//           {isAdmin && (
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-indigo-900 mb-4">Pending Renewal Requests</h2>
//               {renewalRequests.filter(req => req.status === "pending").length === 0 ? (
//                 <div className="p-6 bg-indigo-50 rounded-lg text-indigo-700 flex items-center justify-center">
//                   No pending renewal requests at this time
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   {renewalRequests
//                     .filter(req => req.status === "pending")
//                     .map(request => (
//                       <div key={request.id} className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
//                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                           <div>
//                             <h3 className="font-bold text-lg">{request.bookTitle}</h3>
//                             <p>Requested by: {request.userName} (ID: {request.userRegid})</p>
//                             <p>Current Return Date: {new Date(request.currentReturnDate).toLocaleDateString()}</p>
//                             <p>Requested Extension: {request.requestedDays} days</p>
//                           </div>
//                           <button
//                             className={`flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg ${
//                               loadingApprove === request.id
//                                 ? "bg-gray-500 cursor-not-allowed"
//                                 : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
//                             }`}
//                             onClick={() => approveRenewal(request)}
//                             disabled={loadingApprove === request.id}
//                           >
//                             {loadingApprove === request.id ? (
//                               <>
//                                 <Loader2 size={18} className="animate-spin" />
//                                 Processing...
//                               </>
//                             ) : (
//                               <>
//                                 <CheckCircle size={18} />
//                                 Approve Renewal
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           )}

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
//                     ? `No ${filter === "overdue" ? "overdue" : filter === "returned" ? "returned" : filter === "pending" ? "pending renewal" : "active"} books found` 
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
//                               {assignment.renewalCount > 0 && (
//                                 <div className="flex items-center gap-1.5">
//                                   <RefreshCw size={14} />
//                                   <span>Renewed: {assignment.renewalCount} time{assignment.renewalCount > 1 ? 's' : ''}</span>
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
//                             <div>
//                               {hasPendingRenewal(assignment) ? (
//                                 <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg flex items-center gap-2">
//                                   <AlertCircle size={18} />
//                                   <span>Renewal pending approval</span>
//                                 </div>
//                               ) : (
//                                 <button
//                                   className={`flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40 ${
//                                     loadingRenew === assignment.isbn
//                                       ? "bg-gray-500 cursor-not-allowed"
//                                       : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                                   }`}
//                                   onClick={() => requestRenewal(assignment)}
//                                   disabled={loadingRenew === assignment.isbn}
//                                 >
//                                   {loadingRenew === assignment.isbn ? (
//                                     <>
//                                       <Loader2 size={18} className="animate-spin" />
//                                       Processing...
//                                     </>
//                                   ) : (
//                                     <>
//                                       <RefreshCw size={18} />
//                                       Renew Book
//                                     </>
//                                   )}
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {assignment.status !== "returned" && !hasPendingRenewal(assignment) && (
//                         <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-2 text-indigo-700">
//                           <AlertCircle size={18} className="text-indigo-600" />
//                           <span className="font-medium">
//                             Renewing this book will extend the due date by 10 days to {calculateNewReturnDate(assignment.returnDate)}.
//                             Your request will need approval.
//                           </span>
//                         </div>
//                       )}
                      
//                       {hasPendingRenewal(assignment) && (
//                         <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-700">
//                           <AlertCircle size={18} className="text-yellow-600" />
//                           <span className="font-medium">
//                             A renewal request for this book is pending approval. The return date will be extended once approved.
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





//Renew books code.

"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, Calendar, AlertCircle, RefreshCw, Loader2, X, CheckCircle } from "lucide-react"
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"

export default function RenewBooks() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("active")
  const [loadingRenew, setLoadingRenew] = useState(null)
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
      const assignmentsList = []

      snapshot.forEach((userDoc) => {
        const userData = userDoc.data()
        userData.takenBooks.forEach((book) => {
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

  const renewBook = async (assignment) => {
    setLoadingRenew(assignment.isbn)
    setError("")
    try {
      // Check if the book is already returned
      if (assignment.status === "returned") {
        setError("Cannot renew a book that has already been returned.")
        return
      }

      // Find the borrowed document that contains this book
      const borrowedRef = collection(db, "borrowed")
      const borrowedSnapshot = await getDocs(borrowedRef)

      let borrowedDocId = null
      let borrowedData = null
      let bookIndex = -1

      borrowedSnapshot.forEach((borrowedDoc) => {
        const data = borrowedDoc.data()
        if (data.regid === assignment.userRegId) {
          const index = data.takenBooks.findIndex((book) => book.isbn === assignment.isbn)
          if (index !== -1) {
            borrowedDocId = borrowedDoc.id
            borrowedData = data
            bookIndex = index
          }
        }
      })

      if (!borrowedDocId || bookIndex === -1) {
        throw new Error("Could not find the borrowed book record")
      }

      // Calculate the new return date (current return date + 10 days)
      const currentReturnDate = new Date(assignment.returnDate)
      const newReturnDate = new Date(currentReturnDate)
      newReturnDate.setDate(newReturnDate.getDate() + 10)

      // Update the return date in the borrowed document
      const updatedTakenBooks = [...borrowedData.takenBooks]
      updatedTakenBooks[bookIndex] = {
        ...updatedTakenBooks[bookIndex],
        returnDate: newReturnDate.toISOString(),
        renewalCount: (updatedTakenBooks[bookIndex].renewalCount || 0) + 1,
      }

      const borrowedDocRef = doc(db, "borrowed", borrowedDocId)
      await updateDoc(borrowedDocRef, {
        takenBooks: updatedTakenBooks,
      })

      // Refresh the data
      await fetchAssignments()

      setSuccessMessage(
        `Book "${assignment.title}" has been renewed. Return date extended by 10 days to ${newReturnDate.toLocaleDateString()}.`,
      )

      // Auto hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      console.error("Error renewing book:", error)
      setError(`Failed to renew book: ${error.message}`)
    } finally {
      setLoadingRenew(null)
    }
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      !searchTerm ||
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

  // Calculate new return date (current date + 10 days)
  const calculateNewReturnDate = (currentReturnDate) => {
    const currentDate = new Date(currentReturnDate)
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 10)
    return newDate.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            RENEW BOOKS
          </h1>
          <p className="mt-2 opacity-80">Extend due dates for borrowed books</p>
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
                  key={`${assignment.isbn}-${assignment.userRegId}`}
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
                          <h3
                            className="font-bold text-xl text-indigo-900"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
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
                              {assignment.renewalCount > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <RefreshCw size={14} />
                                  <span>
                                    Renewed: {assignment.renewalCount} time{assignment.renewalCount > 1 ? "s" : ""}
                                  </span>
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
                                loadingRenew === assignment.isbn
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                              }`}
                              onClick={() => renewBook(assignment)}
                              disabled={loadingRenew === assignment.isbn}
                            >
                              {loadingRenew === assignment.isbn ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <RefreshCw size={18} />
                                  Renew Book
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {assignment.status !== "returned" && (
                        <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-2 text-indigo-700">
                          <AlertCircle size={18} className="text-indigo-600" />
                          <span className="font-medium">
                            Renewing this book will extend the due date by 10 days to{" "}
                            {calculateNewReturnDate(assignment.returnDate)}.
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


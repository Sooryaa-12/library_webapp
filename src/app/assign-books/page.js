
// "use client"

// import { useState, useEffect } from "react"
// import { Search, UserPlus, BookOpen, Check, X, Star, Calendar, Tag } from "lucide-react"
// import { collection, getDocs, doc, setDoc, query, where, limit, orderBy, updateDoc, getDoc } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// function AssignBooks() {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedBook, setSelectedBook] = useState(null)
//   const [showAssignForm, setShowAssignForm] = useState(false)
//   const [studentId, setStudentId] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState("")
//   const [searchBy, setSearchBy] = useState("title")
//   const [assignmentLoading, setAssignmentLoading] = useState(false)

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         searchBooks(searchTerm)
//       } else {
//         fetchInitialBooks()
//       }
//     }, 300)

//     return () => clearTimeout(delayDebounceFn)
//   }, [searchTerm])

//   const fetchInitialBooks = async () => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const booksQuery = query(booksCollection, orderBy("lowertitle"), limit(30))
//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error fetching initial books:", err)
//       setError("Failed to load books. Please try again later.")
//     }
//     setLoading(false)
//   }

//   const searchBooks = async (term) => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const lowerTerm = term.toLowerCase()
//       let booksQuery

//       if (searchBy === "title") {
//         booksQuery = query(
//           booksCollection,
//           where("lowertitle", ">=", lowerTerm),
//           where("lowertitle", "<=", lowerTerm + "\uf8ff"),
//           limit(30),
//         )
//       } else {
//         booksQuery = query(booksCollection, where("isbn", ">=", term), where("isbn", "<=", term + "\uf8ff"), limit(30))
//       }

//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error searching books:", err)
//       setError("Failed to search books. Please try again.")
//     }
//     setLoading(false)
//   }

//   const findUserByRegId = async (regId) => {
//     try {
//       const usersRef = collection(db, "users")
//       const regIdString = regId.toString().trim()
//       const q = query(usersRef, where("regid", "==", regIdString))
//       const querySnapshot = await getDocs(q)

//       if (querySnapshot.empty) {
//         return null
//       }

//       const userData = querySnapshot.docs[0].data()
//       return {
//         id: querySnapshot.docs[0].id,
//         ...userData,
//       }
//     } catch (error) {
//       console.error("Error in findUserByRegId:", error)
//       throw error
//     }
//   }

//   const handleAssign = async (e) => {
//     e.preventDefault()
//     setAssignmentLoading(true)
//     setError("")

//     try {
//       const user = await findUserByRegId(studentId)

//       if (!user) {
//         setError("Student ID not found. Please check the ID and try again.")
//         setAssignmentLoading(false)
//         return
//       }

//       const takenDate = new Date()
//       const returnDate = new Date(takenDate)
//       returnDate.setDate(returnDate.getDate() + 10)

//       const newBorrowedBook = {
//         isbn: selectedBook.isbn,
//         title: selectedBook.title,
//         author: selectedBook.author,
//         coverImg: selectedBook.coverImg,
//         takenDate: takenDate.toISOString(),
//         returnDate: returnDate.toISOString(),
//         status: "active",
//         fine: 0,
//       }

//       const borrowedRef = doc(db, "borrowed", user.regid)
//       const borrowedDoc = await getDoc(borrowedRef)

//       if (borrowedDoc.exists()) {
//         // User already has borrowed books, append the new book
//         await updateDoc(borrowedRef, {
//           takenBooks: [...borrowedDoc.data().takenBooks, newBorrowedBook],
//         })
//       } else {
//         // First time user is borrowing a book
//         await setDoc(borrowedRef, {
//           name: user.name,
//           email: user.email,
//           regid: user.regid,
//           takenBooks: [newBorrowedBook],
//         })
//       }

//       const bookRef = doc(db, "books", selectedBook.id)
//       const newAvailableCount = (selectedBook.available || 0) - 1
//       await updateDoc(bookRef, {
//         available: newAvailableCount,
//       })

//       setBooks(books.map((book) => (book.id === selectedBook.id ? { ...book, available: newAvailableCount } : book)))

//       setSuccessMessage(`Book "${selectedBook.title}" successfully assigned to ${user.name} (ID: ${studentId})`)
//       setShowAssignForm(false)
//       setSelectedBook(null)
//       setStudentId("")

//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (err) {
//       console.error("Error assigning book:", err)
//       setError(`Failed to assign book: ${err.message}`)
//     } finally {
//       setAssignmentLoading(false)
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Cinzel, serif" }}>
//         ASSIGN BOOKS
//       </h1>

//       {successMessage && (
//         <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
//           <Check size={20} />
//           {successMessage}
//         </div>
//       )}

//       <div className="flex gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder={`Search by ${searchBy}...`}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={searchBy === "isbn"}
//               onChange={() => setSearchBy(searchBy === "title" ? "isbn" : "title")}
//             />
//             <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//             <span className="ml-2 text-sm font-medium text-gray-900">
//               {searchBy === "title" ? "Search by Title" : "Search by ISBN"}
//             </span>
//           </label>
//         </div>
//       </div>

//       {loading ? (
//         <div className="p-6 flex justify-center items-center">
//           <div className="text-gray-600">Loading books...</div>
//         </div>
//       ) : error ? (
//         <div className="p-6">
//           <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
//         </div>
//       ) : (
//         <div className="grid gap-4 mb-6">
//           {books.map((book) => (
//             <div key={book.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex gap-4">
//                 <img
//                   src={book.coverImg || "/placeholder.svg"}
//                   alt={book.title}
//                   className="w-32 h-40 object-cover rounded"
//                 />

//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-lg">{book.title}</h3>
//                       <p className="text-gray-600">{book.author}</p>

//                       <div className="flex items-center gap-4 mt-2">
//                         <div className="flex items-center gap-1">
//                           <Star size={16} className="text-yellow-500 fill-yellow-500" />
//                           <span>{book.rating}</span>
//                         </div>
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <Calendar size={16} />
//                           <span>{book.publishDate}</span>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {book.genres?.slice(0, 3).map((genre, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full flex items-center gap-1"
//                           >
//                             <Tag size={12} />
//                             {genre}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-end gap-2">
//                       <span
//                         className={`px-2 py-1 rounded ${
//                           book.available > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {book.available > 0 ? `${book.available} Available` : "Out of Stock"}
//                       </span>

//                       {book.available > 0 && (
//                         <button
//                           onClick={() => {
//                             setSelectedBook(book)
//                             setShowAssignForm(true)
//                             setError("")
//                           }}
//                           className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                           <UserPlus size={16} />
//                           Assign
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   <p className="text-sm text-gray-500 mt-2">ISBN: {book.isbn}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showAssignForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Assign Book</h2>
//               <button
//                 onClick={() => {
//                   setShowAssignForm(false)
//                   setError("")
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <BookOpen size={20} className="text-gray-500" />
//                 <span className="font-medium">{selectedBook?.title}</span>
//               </div>
//               <p className="text-gray-600">{selectedBook?.author}</p>
//               <p className="text-sm text-gray-500 mt-1">{selectedBook?.available} copies available</p>
//             </div>

//             {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

//             <form onSubmit={handleAssign}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={studentId}
//                   onChange={(e) => setStudentId(e.target.value)}
//                   placeholder="Enter student ID"
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowAssignForm(false)
//                     setError("")
//                   }}
//                   className="flex-1 px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
//                   disabled={assignmentLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
//                   disabled={assignmentLoading}
//                 >
//                   {assignmentLoading ? "Assigning..." : "Confirm Assignment"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AssignBooks







// "use client"

// import { useState, useEffect } from "react"
// import { Search, UserPlus, BookOpen, Check, X, Star, Calendar, Tag } from "lucide-react"
// import { collection, getDocs, doc, setDoc, query, where, limit, orderBy, updateDoc, getDoc } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// function AssignBooks() {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedBook, setSelectedBook] = useState(null)
//   const [showAssignForm, setShowAssignForm] = useState(false)
//   const [studentId, setStudentId] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState("")
//   const [searchBy, setSearchBy] = useState("title")
//   const [assignmentLoading, setAssignmentLoading] = useState(false)

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         searchBooks(searchTerm)
//       } else {
//         fetchInitialBooks()
//       }
//     }, 300)

//     return () => clearTimeout(delayDebounceFn)
//   }, [searchTerm])

//   const fetchInitialBooks = async () => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const booksQuery = query(booksCollection, orderBy("lowertitle"), limit(30))
//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error fetching initial books:", err)
//       setError("Failed to load books. Please try again later.")
//     }
//     setLoading(false)
//   }

//   const searchBooks = async (term) => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const lowerTerm = term.toLowerCase()
//       let booksQuery

//       if (searchBy === "title") {
//         booksQuery = query(
//           booksCollection,
//           where("lowertitle", ">=", lowerTerm),
//           where("lowertitle", "<=", lowerTerm + "\uf8ff"),
//           limit(30),
//         )
//       } else {
//         booksQuery = query(booksCollection, where("isbn", ">=", term), where("isbn", "<=", term + "\uf8ff"), limit(30))
//       }

//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error searching books:", err)
//       setError("Failed to search books. Please try again.")
//     }
//     setLoading(false)
//   }

//   const findUserByRegId = async (regId) => {
//     try {
//       const usersRef = collection(db, "users")
//       const regIdString = regId.toString().trim()
//       const q = query(usersRef, where("regid", "==", regIdString))
//       const querySnapshot = await getDocs(q)

//       if (querySnapshot.empty) {
//         return null
//       }

//       const userData = querySnapshot.docs[0].data()
//       return {
//         id: querySnapshot.docs[0].id,
//         ...userData,
//       }
//     } catch (error) {
//       console.error("Error in findUserByRegId:", error)
//       throw error
//     }
//   }

//   const handleAssign = async (e) => {
//     e.preventDefault()
//     setAssignmentLoading(true)
//     setError("")

//     try {
//       const user = await findUserByRegId(studentId)

//       if (!user) {
//         setError("Student ID not found. Please check the ID and try again.")
//         setAssignmentLoading(false)
//         return
//       }

//       const takenDate = new Date()
//       const returnDate = new Date(takenDate)
//       returnDate.setDate(returnDate.getDate() + 10)

//       const newBorrowedBook = {
//         isbn: selectedBook.isbn,
//         title: selectedBook.title,
//         author: selectedBook.author,
//         coverImg: selectedBook.coverImg,
//         takenDate: takenDate.toISOString(),
//         returnDate: returnDate.toISOString(),
//         status: "active",
//         fine: 0,
//       }

//       const borrowedRef = doc(db, "borrowed", user.regid)
//       const borrowedDoc = await getDoc(borrowedRef)

//       if (borrowedDoc.exists()) {
//         // User already has borrowed books, append the new book
//         await updateDoc(borrowedRef, {
//           takenBooks: [...borrowedDoc.data().takenBooks, newBorrowedBook],
//         })
//       } else {
//         // First time user is borrowing a book
//         await setDoc(borrowedRef, {
//           name: user.name,
//           email: user.email,
//           regid: user.regid,
//           takenBooks: [newBorrowedBook],
//         })
//       }

//       const bookRef = doc(db, "books", selectedBook.id)
//       const newAvailableCount = (selectedBook.available || 0) - 1
//       await updateDoc(bookRef, {
//         available: newAvailableCount,
//       })

//       setBooks(books.map((book) => (book.id === selectedBook.id ? { ...book, available: newAvailableCount } : book)))

//       setSuccessMessage(`Book "${selectedBook.title}" successfully assigned to ${user.name} (ID: ${studentId})`)
//       setShowAssignForm(false)
//       setSelectedBook(null)
//       setStudentId("")

//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (err) {
//       console.error("Error assigning book:", err)
//       setError(`Failed to assign book: ${err.message}`)
//     } finally {
//       setAssignmentLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//           <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//             ASSIGN BOOKS
//           </h1>
//           <p className="mt-2 opacity-80">Manage book assignments to students</p>
//         </div>

//         <div className="p-8">
//           {successMessage && (
//             <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg flex items-center gap-3 animate-fadeIn">
//               <div className="bg-emerald-100 p-2 rounded-full">
//                 <Check size={20} className="text-emerald-600" />
//               </div>
//               <p className="font-medium">{successMessage}</p>
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
//                   placeholder={`Search by ${searchBy}...`}
//                   className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={searchBy === "isbn"}
//                     onChange={() => setSearchBy(searchBy === "title" ? "isbn" : "title")}
//                   />
//                   <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md"></div>
//                   <span className="ml-3 text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
//                     {searchBy === "title" ? "Search by Title" : "Search by ISBN"}
//                   </span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="p-12 flex flex-col justify-center items-center space-y-4">
//               <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
//               <div className="text-indigo-800 font-medium">Loading books...</div>
//             </div>
//           ) : error ? (
//             <div className="p-6">
//               <div className="p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//                 <div className="bg-red-100 p-2 rounded-full">
//                   <X size={20} className="text-red-600" />
//                 </div>
//                 <p className="font-medium">{error}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid gap-6 mb-6">
//               {books.map((book) => (
//                 <div 
//                   key={book.id} 
//                   className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
//                       <img
//                         src={book.coverImg || "/placeholder.svg"}
//                         alt={book.title}
//                         className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex-1 p-6">
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div>
//                           <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
//                             {book.title}
//                           </h3>
//                           <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                             {book.author}
//                           </p>

//                           <div className="flex items-center gap-6 mt-3">
//                             <div className="flex items-center gap-2">
//                               <div className="bg-amber-100 p-1.5 rounded-full">
//                                 <Star size={16} className="text-amber-500 fill-amber-500" />
//                               </div>
//                               <span className="font-medium">{book.rating}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-600">
//                               <div className="bg-indigo-100 p-1.5 rounded-full">
//                                 <Calendar size={16} className="text-indigo-600" />
//                               </div>
//                               <span>{book.publishDate}</span>
//                             </div>
//                           </div>

//                           <div className="flex flex-wrap gap-2 mt-4">
//                             {book.genres?.slice(0, 3).map((genre, index) => (
//                               <span
//                                 key={index}
//                                 className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center gap-1 shadow-sm"
//                               >
//                                 <Tag size={12} />
//                                 {genre}
//                               </span>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
//                           <span
//                             className={`px-4 py-2 rounded-full font-medium ${
//                               book.available > 0 
//                                 ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700" 
//                                 : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
//                             } shadow-sm`}
//                           >
//                             {book.available > 0 ? `${book.available} Available` : "Out of Stock"}
//                           </span>

//                           {book.available > 0 && (
//                             <button
//                               onClick={() => {
//                                 setSelectedBook(book)
//                                 setShowAssignForm(true)
//                                 setError("")
//                               }}
//                               className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                             >
//                               <UserPlus size={18} />
//                               Assign Book
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       <p className="text-sm text-gray-500 mt-4 font-mono">ISBN: {book.isbn}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {showAssignForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
//           <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
//             <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-5 text-white">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
//                   Assign Book
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowAssignForm(false)
//                     setError("")
//                   }}
//                   className="text-white hover:text-indigo-200 focus:outline-none transition-colors"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="bg-indigo-100 p-2 rounded-full">
//                     <BookOpen size={20} className="text-indigo-600" />
//                   </div>
//                   <span className="font-bold text-indigo-900">{selectedBook?.title}</span>
//                 </div>
//                 <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                   {selectedBook?.author}
//                 </p>
//                 <p className="text-sm text-indigo-600 mt-2 font-medium">
//                   {selectedBook?.available} copies available
//                 </p>
//               </div>

//               {error && (
//                 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//                   <div className="bg-red-100 p-1.5 rounded-full">
//                     <X size={16} className="text-red-600" />
//                   </div>
//                   <p className="font-medium">{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleAssign}>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
//                     Student ID
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                     placeholder="Enter student ID"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAssignForm(false)
//                       setError("")
//                     }}
//                     className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-70"
//                     disabled={assignmentLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
//                     disabled={assignmentLoading}
//                   >
//                     {assignmentLoading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
//                         <span>Assigning...</span>
//                       </div>
//                     ) : (
//                       "Confirm Assignment"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AssignBooks







// "use client"

// import { useState, useEffect } from "react"
// import { Search, UserPlus, BookOpen, Check, X, Star, Calendar, Tag } from "lucide-react"
// import { collection, getDocs, doc, setDoc, query, where, limit, orderBy, updateDoc, getDoc } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// function AssignBooks() {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedBook, setSelectedBook] = useState(null)
//   const [showAssignForm, setShowAssignForm] = useState(false)
//   const [studentId, setStudentId] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState("")
//   const [searchBy, setSearchBy] = useState("title")
//   const [assignmentLoading, setAssignmentLoading] = useState(false)

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         searchBooks(searchTerm)
//       } else {
//         fetchInitialBooks()
//       }
//     }, 300)

//     return () => clearTimeout(delayDebounceFn)
//   }, [searchTerm])

//   const fetchInitialBooks = async () => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const booksQuery = query(booksCollection, orderBy("lowertitle"), limit(30))
//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error fetching initial books:", err)
//       setError("Failed to load books. Please try again later.")
//     }
//     setLoading(false)
//   }

//   const searchBooks = async (term) => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const lowerTerm = term.toLowerCase()
//       let booksQuery

//       if (searchBy === "title") {
//         booksQuery = query(
//           booksCollection,
//           where("lowertitle", ">=", lowerTerm),
//           where("lowertitle", "<=", lowerTerm + "\uf8ff"),
//           limit(30),
//         )
//       } else {
//         booksQuery = query(booksCollection, where("isbn", ">=", term), where("isbn", "<=", term + "\uf8ff"), limit(30))
//       }

//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error searching books:", err)
//       setError("Failed to search books. Please try again.")
//     }
//     setLoading(false)
//   }

//   const findUserByRegId = async (regId) => {
//     try {
//       const usersRef = collection(db, "users")
//       const regIdString = regId.toString().trim()
//       const q = query(usersRef, where("regid", "==", regIdString))
//       const querySnapshot = await getDocs(q)

//       if (querySnapshot.empty) {
//         return null
//       }

//       const userData = querySnapshot.docs[0].data()
//       return {
//         id: querySnapshot.docs[0].id,
//         ...userData,
//       }
//     } catch (error) {
//       console.error("Error in findUserByRegId:", error)
//       throw error
//     }
//   }

//   const handleAssign = async (e) => {
//     e.preventDefault()
//     setAssignmentLoading(true)
//     setError("")

//     try {
//       const user = await findUserByRegId(studentId)

//       if (!user) {
//         setError("Student ID not found. Please check the ID and try again.")
//         setAssignmentLoading(false)
//         return
//       }

//       const takenDate = new Date()
//       const returnDate = new Date(takenDate)
//       returnDate.setDate(returnDate.getDate() + 10)

//       const newBorrowedBook = {
//         isbn: selectedBook.isbn,
//         title: selectedBook.title,
//         author: selectedBook.author,
//         coverImg: selectedBook.coverImg,
//         takenDate: takenDate.toISOString(),
//         returnDate: returnDate.toISOString(),
//         status: "active",
//         fine: 0,
//       }

//       const borrowedRef = doc(db, "borrowed", user.regid)
//       const borrowedDoc = await getDoc(borrowedRef)

//       if (borrowedDoc.exists()) {
//         // User already has borrowed books, append the new book
//         await updateDoc(borrowedRef, {
//           takenBooks: [...borrowedDoc.data().takenBooks, newBorrowedBook],
//         })
//       } else {
//         // First time user is borrowing a book
//         await setDoc(borrowedRef, {
//           name: user.name,
//           email: user.email,
//           regid: user.regid,
//           takenBooks: [newBorrowedBook],
//         })
//       }

//       const bookRef = doc(db, "books", selectedBook.id)
//       const newAvailableCount = (selectedBook.available || 0) - 1
//       await updateDoc(bookRef, {
//         available: newAvailableCount,
//       })

//       setBooks(books.map((book) => (book.id === selectedBook.id ? { ...book, available: newAvailableCount } : book)))

//       setSuccessMessage(`Book "${selectedBook.title}" successfully assigned to ${user.name} (ID: ${studentId})`)
//       setShowAssignForm(false)
//       setSelectedBook(null)
//       setStudentId("")

//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (err) {
//       console.error("Error assigning book:", err)
//       setError(`Failed to assign book: ${err.message}`)
//     } finally {
//       setAssignmentLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//           <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//             ASSIGN BOOKS
//           </h1>
//           <p className="mt-2 opacity-80">Manage book assignments to students</p>
//         </div>

//         <div className="p-8">
//           {successMessage && (
//             <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg flex items-center gap-3 animate-fadeIn">
//               <div className="bg-emerald-100 p-2 rounded-full">
//                 <Check size={20} className="text-emerald-600" />
//               </div>
//               <p className="font-medium">{successMessage}</p>
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
//                   placeholder={`Search by ${searchBy}...`}
//                   className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={searchBy === "isbn"}
//                     onChange={() => setSearchBy(searchBy === "title" ? "isbn" : "title")}
//                   />
//                   <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md"></div>
//                   <span className="ml-3 text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
//                     {searchBy === "title" ? "Search by Title" : "Search by ISBN"}
//                   </span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="p-12 flex flex-col justify-center items-center space-y-4">
//               <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
//               <div className="text-indigo-800 font-medium">Loading books...</div>
//             </div>
//           ) : error ? (
//             <div className="p-6">
//               <div className="p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//                 <div className="bg-red-100 p-2 rounded-full">
//                   <X size={20} className="text-red-600" />
//                 </div>
//                 <p className="font-medium">{error}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid gap-6 mb-6">
//               {books.map((book) => (
//                 <div 
//                   key={book.id} 
//                   className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
//                       <img
//                         src={book.coverImg || "/placeholder.svg"}
//                         alt={book.title}
//                         className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex-1 p-6">
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div>
//                           <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
//                             {book.title}
//                           </h3>
//                           <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                             {book.author}
//                           </p>

//                           <div className="flex items-center gap-6 mt-3">
//                             <div className="flex items-center gap-2">
//                               <div className="bg-amber-100 p-1.5 rounded-full">
//                                 <Star size={16} className="text-amber-500 fill-amber-500" />
//                               </div>
//                               <span className="font-medium">{book.rating}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-600">
//                               <div className="bg-indigo-100 p-1.5 rounded-full">
//                                 <Calendar size={16} className="text-indigo-600" />
//                               </div>
//                               <span>{book.publishDate}</span>
//                             </div>
//                           </div>

//                           <div className="flex flex-wrap gap-2 mt-4">
//                             {book.genres?.slice(0, 3).map((genre, index) => (
//                               <span
//                                 key={index}
//                                 className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center gap-1 shadow-sm"
//                               >
//                                 <Tag size={12} />
//                                 {genre}
//                               </span>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
//                           <span
//                             className={`px-4 py-2 rounded-full font-medium w-32 text-center ${
//                               book.available > 0 
//                                 ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700" 
//                                 : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
//                             } shadow-sm`}
//                           >
//                             {book.available > 0 ? `${book.available} Available` : "Out of Stock"}
//                           </span>

//                           {book.available > 0 && (
//                             <button
//                               onClick={() => {
//                                 setSelectedBook(book)
//                                 setShowAssignForm(true)
//                                 setError("")
//                               }}
//                               className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40"
//                             >
//                               <UserPlus size={18} />
//                               Assign Book
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       <p className="text-sm text-gray-500 mt-4 font-mono">ISBN: {book.isbn}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {showAssignForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
//           <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
//             <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-5 text-white">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
//                   Assign Book
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowAssignForm(false)
//                     setError("")
//                   }}
//                   className="text-white hover:text-indigo-200 focus:outline-none transition-colors"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="bg-indigo-100 p-2 rounded-full">
//                     <BookOpen size={20} className="text-indigo-600" />
//                   </div>
//                   <span className="font-bold text-indigo-900">{selectedBook?.title}</span>
//                 </div>
//                 <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                   {selectedBook?.author}
//                 </p>
//                 <p className="text-sm text-indigo-600 mt-2 font-medium">
//                   {selectedBook?.available} copies available
//                 </p>
//               </div>

//               {error && (
//                 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//                   <div className="bg-red-100 p-1.5 rounded-full">
//                     <X size={16} className="text-red-600" />
//                   </div>
//                   <p className="font-medium">{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleAssign}>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
//                     Student ID
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                     placeholder="Enter student ID"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAssignForm(false)
//                       setError("")
//                     }}
//                     className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-70"
//                     disabled={assignmentLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
//                     disabled={assignmentLoading}
//                   >
//                     {assignmentLoading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
//                         <span>Assigning...</span>
//                       </div>
//                     ) : (
//                       "Confirm Assignment"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AssignBooks





// "use client"

// import { useState, useEffect } from "react"
// import { Search, UserPlus, BookOpen, Check, X, Star, Calendar, Tag } from "lucide-react"
// import { collection, getDocs, doc, setDoc, query, where, limit, orderBy, updateDoc, getDoc, increment } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// function AssignBooks() {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedBook, setSelectedBook] = useState(null)
//   const [showAssignForm, setShowAssignForm] = useState(false)
//   const [studentId, setStudentId] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState("")
//   const [searchBy, setSearchBy] = useState("title")
//   const [assignmentLoading, setAssignmentLoading] = useState(false)

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         searchBooks(searchTerm)
//       } else {
//         fetchInitialBooks()
//       }
//     }, 300)

//     return () => clearTimeout(delayDebounceFn)
//   }, [searchTerm])

//   const fetchInitialBooks = async () => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const booksQuery = query(booksCollection, orderBy("lowertitle"), limit(30))
//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error fetching initial books:", err)
//       setError("Failed to load books. Please try again later.")
//     }
//     setLoading(false)
//   }

//   const searchBooks = async (term) => {
//     setLoading(true)
//     try {
//       const booksCollection = collection(db, "books")
//       const lowerTerm = term.toLowerCase()
//       let booksQuery

//       if (searchBy === "title") {
//         booksQuery = query(
//           booksCollection,
//           where("lowertitle", ">=", lowerTerm),
//           where("lowertitle", "<=", lowerTerm + "\uf8ff"),
//           limit(30),
//         )
//       } else {
//         booksQuery = query(booksCollection, where("isbn", ">=", term), where("isbn", "<=", term + "\uf8ff"), limit(30))
//       }

//       const booksSnapshot = await getDocs(booksQuery)
//       const booksList = booksSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBooks(booksList)
//     } catch (err) {
//       console.error("Error searching books:", err)
//       setError("Failed to search books. Please try again.")
//     }
//     setLoading(false)
//   }

//   const findUserByRegId = async (regId) => {
//     try {
//       const usersRef = collection(db, "users")
//       const regIdString = regId.toString().trim()
//       const q = query(usersRef, where("regid", "==", regIdString))
//       const querySnapshot = await getDocs(q)

//       if (querySnapshot.empty) {
//         return null
//       }

//       const userData = querySnapshot.docs[0].data()
//       return {
//         id: querySnapshot.docs[0].id,
//         ...userData,
//       }
//     } catch (error) {
//       console.error("Error in findUserByRegId:", error)
//       throw error
//     }
//   }

//   const handleAssign = async (e) => {
//     e.preventDefault()
//     setAssignmentLoading(true)
//     setError("")

//     try {
//       const user = await findUserByRegId(studentId)

//       if (!user) {
//         setError("Student ID not found. Please check the ID and try again.")
//         setAssignmentLoading(false)
//         return
//       }

//       const takenDate = new Date()
//       const returnDate = new Date(takenDate)
//       returnDate.setDate(returnDate.getDate() + 10)

//       const newBorrowedBook = {
//         isbn: selectedBook.isbn,
//         title: selectedBook.title,
//         author: selectedBook.author,
//         coverImg: selectedBook.coverImg,
//         takenDate: takenDate.toISOString(),
//         returnDate: returnDate.toISOString(),
//         status: "active",
//         fine: 0,
//       }

//       const borrowedRef = doc(db, "borrowed", user.regid)
//       const borrowedDoc = await getDoc(borrowedRef)

//       if (borrowedDoc.exists()) {
//         // User already has borrowed books, append the new book
//         await updateDoc(borrowedRef, {
//           takenBooks: [...borrowedDoc.data().takenBooks, newBorrowedBook],
//         })
//       } else {
//         // First time user is borrowing a book
//         await setDoc(borrowedRef, {
//           name: user.name,
//           email: user.email,
//           regid: user.regid,
//           takenBooks: [newBorrowedBook],
//         })
//       }

//       const bookRef = doc(db, "books", selectedBook.id)
//       const newAvailableCount = (selectedBook.available || 0) - 1
      
//       // Update both available count and totalReads
//       await updateDoc(bookRef, {
//         available: newAvailableCount,
//         // Use Firestore's increment() to safely increment the counter
//         // If totalReads doesn't exist yet, it will be created with value 1
//         totalReads: increment(1)
//       })

//       // Update the local state to reflect changes
//       setBooks(books.map((book) => (
//         book.id === selectedBook.id 
//           ? { 
//               ...book, 
//               available: newAvailableCount, 
//               totalReads: (book.totalReads || 0) + 1 
//             } 
//           : book
//       )))

//       setSuccessMessage(`Book "${selectedBook.title}" successfully assigned to ${user.name} (ID: ${studentId})`)
//       setShowAssignForm(false)
//       setSelectedBook(null)
//       setStudentId("")

//       setTimeout(() => setSuccessMessage(""), 5000)
//     } catch (err) {
//       console.error("Error assigning book:", err)
//       setError(`Failed to assign book: ${err.message}`)
//     } finally {
//       setAssignmentLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
//           <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
//             ASSIGN BOOKS
//           </h1>
//           <p className="mt-2 opacity-80">Manage book assignments to students</p>
//         </div>

//         <div className="p-8">
//           {successMessage && (
//             <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg flex items-center gap-3 animate-fadeIn">
//               <div className="bg-emerald-100 p-2 rounded-full">
//                 <Check size={20} className="text-emerald-600" />
//               </div>
//               <p className="font-medium">{successMessage}</p>
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
//                   placeholder={`Search by ${searchBy}...`}
//                   className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={searchBy === "isbn"}
//                     onChange={() => setSearchBy(searchBy === "title" ? "isbn" : "title")}
//                   />
//                   <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md"></div>
//                   <span className="ml-3 text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
//                     {searchBy === "title" ? "Search by Title" : "Search by ISBN"}
//                   </span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="p-12 flex flex-col justify-center items-center space-y-4">
//               <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
//               <div className="text-indigo-800 font-medium">Loading books...</div>
//             </div>
//           ) : error ? (
//             <div className="p-6">
//               <div className="p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//                 <div className="bg-red-100 p-2 rounded-full">
//                   <X size={20} className="text-red-600" />
//                 </div>
//                 <p className="font-medium">{error}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid gap-6 mb-6">
//               {books.map((book) => (
//                 <div 
//                   key={book.id} 
//                   className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
//                       <img
//                         src={book.coverImg || "/placeholder.svg"}
//                         alt={book.title}
//                         className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex-1 p-6">
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div>
//                           <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
//                             {book.title}
//                           </h3>
//                           <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                             {book.author}
//                           </p>

//                           <div className="flex items-center gap-6 mt-3">
//                             <div className="flex items-center gap-2">
//                               <div className="bg-amber-100 p-1.5 rounded-full">
//                                 <Star size={16} className="text-amber-500 fill-amber-500" />
//                               </div>
//                               <span className="font-medium">{book.rating}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-600">
//                               <div className="bg-indigo-100 p-1.5 rounded-full">
//                                 <Calendar size={16} className="text-indigo-600" />
//                               </div>
//                               <span>{book.publishDate}</span>
//                             </div>
//                             {/* Display totalReads if available */}
//                             {book.totalReads !== undefined && (
//                               <div className="flex items-center gap-2 text-indigo-600">
//                                 <div className="bg-indigo-100 p-1.5 rounded-full">
//                                   <BookOpen size={16} className="text-indigo-600" />
//                                 </div>
//                                 <span>Read {book.totalReads} times</span>
//                               </div>
//                             )}
//                           </div>

//                           <div className="flex flex-wrap gap-2 mt-4">
//                             {book.genres?.slice(0, 3).map((genre, index) => (
//                               <span
//                                 key={index}
//                                 className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center gap-1 shadow-sm"
//                               >
//                                 <Tag size={12} />
//                                 {genre}
//                               </span>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
//                           <span
//                             className={`px-4 py-2 rounded-full font-medium w-32 text-center ${
//                               book.available > 0 
//                                 ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700" 
//                                 : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
//                             } shadow-sm`}
//                           >
//                             {book.available > 0 ? `${book.available} Available` : "Out of Stock"}
//                           </span>

//                           {book.available > 0 && (
//                             <button
//                               onClick={() => {
//                                 setSelectedBook(book)
//                                 setShowAssignForm(true)
//                                 setError("")
//                               }}
//                               className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40"
//                             >
//                               <UserPlus size={18} />
//                               Assign Book
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       <p className="text-sm text-gray-500 mt-4 font-mono">ISBN: {book.isbn}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {showAssignForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
//           <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
//             <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-5 text-white">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
//                   Assign Book
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowAssignForm(false)
//                     setError("")
//                   }}
//                   className="text-white hover:text-indigo-200 focus:outline-none transition-colors"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="bg-indigo-100 p-2 rounded-full">
//                     <BookOpen size={20} className="text-indigo-600" />
//                   </div>
//                   <span className="font-bold text-indigo-900">{selectedBook?.title}</span>
//                 </div>
//                 <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                   {selectedBook?.author}
//                 </p>
//                 <div className="flex items-center justify-between mt-2">
//                   <p className="text-sm text-indigo-600 font-medium">
//                     {selectedBook?.available} copies available
//                   </p>
//                   {selectedBook?.totalReads !== undefined && (
//                     <p className="text-sm text-indigo-600 font-medium">
//                       Read {selectedBook.totalReads} times
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {error && (
//                 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//                   <div className="bg-red-100 p-1.5 rounded-full">
//                     <X size={16} className="text-red-600" />
//                   </div>
//                   <p className="font-medium">{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleAssign}>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
//                     Student ID
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                     placeholder="Enter student ID"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAssignForm(false)
//                       setError("")
//                     }}
//                     className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-70"
//                     disabled={assignmentLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
//                     disabled={assignmentLoading}
//                   >
//                     {assignmentLoading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
//                         <span>Assigning...</span>
//                       </div>
//                     ) : (
//                       "Confirm Assignment"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AssignBooks











"use client"

import { useState, useEffect } from "react"
import { Search, UserPlus, BookOpen, Check, X, Star, Calendar, Tag } from "lucide-react"
import { collection, getDocs, doc, setDoc, query, where, limit, orderBy, updateDoc, getDoc, increment } from "firebase/firestore"
import { db } from "../../lib/firebase"

function AssignBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState(null)
  const [showAssignForm, setShowAssignForm] = useState(false)
  const [studentId, setStudentId] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const [searchBy, setSearchBy] = useState("title")
  const [assignmentLoading, setAssignmentLoading] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchBooks(searchTerm)
      } else {
        fetchInitialBooks()
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const fetchInitialBooks = async () => {
    setLoading(true)
    try {
      const booksCollection = collection(db, "books")
      const booksQuery = query(booksCollection, orderBy("lowertitle"), limit(30))
      const booksSnapshot = await getDocs(booksQuery)
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setBooks(booksList)
    } catch (err) {
      console.error("Error fetching initial books:", err)
      setError("Failed to load books. Please try again later.")
    }
    setLoading(false)
  }

  const searchBooks = async (term) => {
    setLoading(true)
    try {
      const booksCollection = collection(db, "books")
      const lowerTerm = term.toLowerCase()
      let booksQuery

      if (searchBy === "title") {
        booksQuery = query(
          booksCollection,
          where("lowertitle", ">=", lowerTerm),
          where("lowertitle", "<=", lowerTerm + "\uf8ff"),
          limit(30),
        )
      } else {
        booksQuery = query(booksCollection, where("isbn", ">=", term), where("isbn", "<=", term + "\uf8ff"), limit(30))
      }

      const booksSnapshot = await getDocs(booksQuery)
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setBooks(booksList)
    } catch (err) {
      console.error("Error searching books:", err)
      setError("Failed to search books. Please try again.")
    }
    setLoading(false)
  }

  const findUserByRegId = async (regId) => {
    try {
      const usersRef = collection(db, "users")
      const regIdString = regId.toString().trim()
      const q = query(usersRef, where("regid", "==", regIdString))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return null
      }

      const userData = querySnapshot.docs[0].data()
      return {
        id: querySnapshot.docs[0].id,
        ...userData,
      }
    } catch (error) {
      console.error("Error in findUserByRegId:", error)
      throw error
    }
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    setAssignmentLoading(true)
    setError("")

    try {
      const user = await findUserByRegId(studentId)

      if (!user) {
        setError("Student ID not found. Please check the ID and try again.")
        setAssignmentLoading(false)
        return
      }

      const takenDate = new Date()
      const returnDate = new Date(takenDate)
      returnDate.setDate(returnDate.getDate() + 10)

      const newBorrowedBook = {
        isbn: selectedBook.isbn,
        title: selectedBook.title,
        author: selectedBook.author,
        coverImg: selectedBook.coverImg,
        takenDate: takenDate.toISOString(),
        returnDate: returnDate.toISOString(),
        status: "active",
        fine: 0,
      }

      const borrowedRef = doc(db, "borrowed", user.regid)
      const borrowedDoc = await getDoc(borrowedRef)

      if (borrowedDoc.exists()) {
        // User already has borrowed books, append the new book
        await updateDoc(borrowedRef, {
          takenBooks: [...borrowedDoc.data().takenBooks, newBorrowedBook],
        })
      } else {
        // First time user is borrowing a book
        await setDoc(borrowedRef, {
          name: user.name,
          email: user.email,
          regid: user.regid,
          takenBooks: [newBorrowedBook],
        })
      }

      // Update book document - decrement available count and increment totalReads
      const bookRef = doc(db, "books", selectedBook.id)
      const newAvailableCount = (selectedBook.available || 0) - 1
      await updateDoc(bookRef, {
        available: newAvailableCount,
        totalReads: increment(1)
      })

      // Update user document - increment readCount
      const userRef = doc(db, "users", user.id)
      await updateDoc(userRef, {
        readCount: increment(1)
      })

      // Update the local state to reflect changes
      setBooks(books.map((book) => (
        book.id === selectedBook.id 
          ? { 
              ...book, 
              available: newAvailableCount, 
              totalReads: (book.totalReads || 0) + 1 
            } 
          : book
      )))

      setSuccessMessage(`Book "${selectedBook.title}" successfully assigned to ${user.name} (ID: ${studentId})`)
      setShowAssignForm(false)
      setSelectedBook(null)
      setStudentId("")

      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (err) {
      console.error("Error assigning book:", err)
      setError(`Failed to assign book: ${err.message}`)
    } finally {
      setAssignmentLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            ASSIGN BOOKS
          </h1>
          <p className="mt-2 opacity-80">Manage book assignments to students</p>
        </div>

        <div className="p-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg flex items-center gap-3 animate-fadeIn">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Check size={20} className="text-emerald-600" />
              </div>
              <p className="font-medium">{successMessage}</p>
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
                  placeholder={`Search by ${searchBy}...`}
                  className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={searchBy === "isbn"}
                    onChange={() => setSearchBy(searchBy === "title" ? "isbn" : "title")}
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    {searchBy === "title" ? "Search by Title" : "Search by ISBN"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col justify-center items-center space-y-4">
              <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
              <div className="text-indigo-800 font-medium">Loading books...</div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <X size={20} className="text-red-600" />
                </div>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 mb-6">
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
                      <img
                        src={book.coverImg || "/placeholder.svg"}
                        alt={book.title}
                        className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
                            {book.title}
                          </h3>
                          <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                            {book.author}
                          </p>

                          <div className="flex items-center gap-6 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="bg-amber-100 p-1.5 rounded-full">
                                <Star size={16} className="text-amber-500 fill-amber-500" />
                              </div>
                              <span className="font-medium">{book.rating}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <div className="bg-indigo-100 p-1.5 rounded-full">
                                <Calendar size={16} className="text-indigo-600" />
                              </div>
                              <span>{book.publishDate}</span>
                            </div>
                            {/* Display totalReads if available */}
                            {book.totalReads !== undefined && (
                              <div className="flex items-center gap-2 text-indigo-600">
                                <div className="bg-indigo-100 p-1.5 rounded-full">
                                  <BookOpen size={16} className="text-indigo-600" />
                                </div>
                                <span>Read {book.totalReads} times</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {book.genres?.slice(0, 3).map((genre, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full flex items-center gap-1 shadow-sm"
                              >
                                <Tag size={12} />
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
                          <span
                            className={`px-4 py-2 rounded-full font-medium w-32 text-center ${
                              book.available > 0 
                                ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700" 
                                : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
                            } shadow-sm`}
                          >
                            {book.available > 0 ? `${book.available} Available` : "Out of Stock"}
                          </span>

                          {book.available > 0 && (
                            <button
                              onClick={() => {
                                setSelectedBook(book)
                                setShowAssignForm(true)
                                setError("")
                              }}
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40"
                            >
                              <UserPlus size={18} />
                              Assign Book
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mt-4 font-mono">ISBN: {book.isbn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAssignForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
            <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-5 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                  Assign Book
                </h2>
                <button
                  onClick={() => {
                    setShowAssignForm(false)
                    setError("")
                  }}
                  className="text-white hover:text-indigo-200 focus:outline-none transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <BookOpen size={20} className="text-indigo-600" />
                  </div>
                  <span className="font-bold text-indigo-900">{selectedBook?.title}</span>
                </div>
                <p className="text-indigo-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  {selectedBook?.author}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-indigo-600 font-medium">
                    {selectedBook?.available} copies available
                  </p>
                  {selectedBook?.totalReads !== undefined && (
                    <p className="text-sm text-indigo-600 font-medium">
                      Read {selectedBook.totalReads} times
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
                  <div className="bg-red-100 p-1.5 rounded-full">
                    <X size={16} className="text-red-600" />
                  </div>
                  <p className="font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleAssign}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    Student ID
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter student ID"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignForm(false)
                      setError("")
                    }}
                    className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-70"
                    disabled={assignmentLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={assignmentLoading}
                  >
                    {assignmentLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                        <span>Assigning...</span>
                      </div>
                    ) : (
                      "Confirm Assignment"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssignBooks
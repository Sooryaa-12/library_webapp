"use client"

import { useState, useEffect } from "react"
import { Search, UserPlus, BookOpen, Check, X, Star, Calendar, Tag } from "lucide-react"
import { collection, getDocs, doc, updateDoc, query, where, limit, orderBy, addDoc } from "firebase/firestore"
import { db } from "../../lib/firebase" // Adjust the import path as needed

export default function AssignBooks() {
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
  }, [searchTerm, searchBy])

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
          limit(30)
        )
      } else {
        booksQuery = query(
          booksCollection,
          where("isbn", ">=", term),
          where("isbn", "<=", term + "\uf8ff"),
          limit(30)
        )
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
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("regId", "==", regId))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return null
    }
    
    // Return the first matching user document
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    }
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    setAssignmentLoading(true)
    setError("")
    
    try {
      // Find user by registration ID
      const user = await findUserByRegId(studentId)
      
      if (!user) {
        setError("Student ID not found. Please check the ID and try again.")
        setAssignmentLoading(false)
        return
      }

      // Calculate return date (10 days from now)
      const takenDate = new Date()
      const returnDate = new Date(takenDate)
      returnDate.setDate(returnDate.getDate() + 10)

      // Create assignment record
      const assignmentData = {
        bookId: selectedBook.id,
        userId: user.id,
        userRegId: studentId,
        bookIsbn: selectedBook.isbn,
        bookTitle: selectedBook.title,
        takenDate: takenDate.toISOString(),
        returnDate: returnDate.toISOString(),
        status: "active"
      }

      // Add to book_assignments collection
      const bookAssignmentsRef = collection(db, "book_assignments")
      await addDoc(bookAssignmentsRef, assignmentData)

      // Update book availability
      const bookRef = doc(db, "books", selectedBook.id)
      const newAvailableCount = (selectedBook.available || 0) - 1
      await updateDoc(bookRef, {
        available: newAvailableCount
      })

      // Update user's borrowed books array
      const userRef = doc(db, "users", user.id)
      const borrowedBooks = user.borrowedBooks || []
      borrowedBooks.push({
        isbn: selectedBook.isbn,
        title: selectedBook.title,
        takenDate: takenDate.toISOString(),
        returnDate: returnDate.toISOString()
      })

      await updateDoc(userRef, {
        borrowedBooks: borrowedBooks
      })

      // Update local state
      setBooks(books.map((book) => 
        book.id === selectedBook.id ? { ...book, available: newAvailableCount } : book
      ))

      setSuccessMessage(`Book "${selectedBook.title}" assigned to student ID: ${studentId}`)
      setShowAssignForm(false)
      setSelectedBook(null)
      setStudentId("")

      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Error assigning book:", err)
      setError("Failed to assign book. Please try again.")
    } finally {
      setAssignmentLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>ASSIGN BOOKS</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
          <Check size={20} />
          {successMessage}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`Search by ${searchBy}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            <span className="ml-2 text-sm font-medium text-gray-900">
              {searchBy === "title" ? "Search by Title" : "Search by ISBN"}
            </span>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="p-6 flex justify-center items-center">
          <div className="text-gray-600">Loading books...</div>
        </div>
      ) : error ? (
        <div className="p-6">
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        </div>
      ) : (
        <div className="grid gap-4 mb-6">
          {books.map((book) => (
            <div key={book.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <img
                  src={book.coverImg || "/placeholder.svg"}
                  alt={book.title}
                  className="w-32 h-40 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span>{book.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar size={16} />
                          <span>{book.publishDate}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {book.genres?.slice(0, 3).map((genre, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full flex items-center gap-1"
                          >
                            <Tag size={12} />
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          book.available > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
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
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <UserPlus size={16} />
                          Assign
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">ISBN: {book.isbn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAssignForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Assign Book</h2>
              <button 
                onClick={() => {
                  setShowAssignForm(false)
                  setError("")
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={20} className="text-gray-500" />
                <span className="font-medium">{selectedBook?.title}</span>
              </div>
              <p className="text-gray-600">{selectedBook?.author}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedBook?.available} copies available</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleAssign}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignForm(false)
                    setError("")
                  }}
                  className="flex-1 px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                  disabled={assignmentLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                  disabled={assignmentLoading}
                >
                  {assignmentLoading ? "Assigning..." : "Confirm Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
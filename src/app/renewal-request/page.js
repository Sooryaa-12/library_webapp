"use client"

import { useState, useEffect } from "react"
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase" // Adjust path to your Firebase config
import { Search, BookOpen, Calendar, AlertCircle, CheckCircle, Loader2, X, Tag } from "lucide-react"

export default function RenewalRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingAction, setLoadingAction] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fetchRenewalRequests()
  }, [])

  const fetchRenewalRequests = async () => {
    try {
      setLoading(true)
      const q = query(
        collection(db, "renewalRequests"),
        where("status", "==", "pending")
      )
      
      const querySnapshot = await getDocs(q)
      const requestsData = []
      
      querySnapshot.forEach((doc) => {
        requestsData.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      // Sort by request date, newest first
      requestsData.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
      
      setRequests(requestsData)
    } catch (err) {
      console.error("Error fetching renewal requests:", err)
      setError("Failed to load renewal requests")
    } finally {
      setLoading(false)
    }
  }

  const handleRenewalAction = async (requestId, action) => {
    try {
      setLoadingAction(requestId)
      setError(null)
      
      // Get the request data
      const requestRef = doc(db, "renewalRequests", requestId)
      const requestSnap = await getDoc(requestRef)
      
      if (!requestSnap.exists()) {
        throw new Error("Request not found")
      }
      
      const requestData = requestSnap.data()
      
      // Update the request status
      await updateDoc(requestRef, {
        status: action
      })
      
      // If approved, update the book's return date
      if (action === "approved") {
        const userRegid = requestData.userRegid
        const borrowedRef = doc(db, "borrowed", userRegid)
        const borrowedSnap = await getDoc(borrowedRef)
        
        if (borrowedSnap.exists()) {
          const borrowedData = borrowedSnap.data()
          const books = borrowedData.takenBooks || []
          
          // Find the specific book and update its return date
          const updatedBooks = books.map(book => {
            if (book.isbn === requestData.bookIsbn && book.takenDate === requestData.takenDate) {
              // Calculate new return date (current return date + requested days)
              const currentReturnDate = new Date(book.returnDate)
              const newReturnDate = new Date(currentReturnDate)
              newReturnDate.setDate(newReturnDate.getDate() + requestData.requestedDays)
              
              return { 
                ...book, 
                returnDate: newReturnDate.toISOString() 
              }
            }
            return book
          })
          
          // Update the borrowed document
          await updateDoc(borrowedRef, {
            takenBooks: updatedBooks
          })
        }
        
        setSuccessMessage(`Renewal for "${requestData.bookTitle}" has been approved for ${requestData.userName}`)
      } else {
        setSuccessMessage(`Renewal for "${requestData.bookTitle}" has been rejected`)
      }
      
      // Auto hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)
      
      // Refresh the list
      fetchRenewalRequests()
    } catch (err) {
      console.error("Error processing renewal request:", err)
      setError(`Failed to process request: ${err.message}`)
    } finally {
      setLoadingAction(null)
    }
  }

  const filteredRequests = requests.filter(request => {
    const searchLower = searchTerm.toLowerCase()
    return !searchTerm || 
      request.bookTitle.toLowerCase().includes(searchLower) || 
      request.userName.toLowerCase().includes(searchLower) ||
      request.bookIsbn.toLowerCase().includes(searchLower) ||
      request.userRegid.toLowerCase().includes(searchLower)
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
              RENEWAL REQUESTS
            </h1>
            <p className="mt-2 opacity-80">Manage book renewal requests from users</p>
          </div>
          <div className="p-12 flex flex-col justify-center items-center space-y-4">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
            <div className="text-indigo-800 font-medium">Loading renewal requests...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            RENEWAL REQUESTS
          </h1>
          <p className="mt-2 opacity-80">Manage book renewal requests from users</p>
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
                  placeholder="Search by book title, ISBN, student ID or name..."
                  className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="p-12 flex flex-col justify-center items-center space-y-4 text-center">
              <div className="bg-indigo-100 p-4 rounded-full">
                <BookOpen size={48} className="text-indigo-600" />
              </div>
              <div className="text-xl font-medium text-indigo-800">No renewal requests found</div>
              <p className="text-indigo-600 max-w-md">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "There are no pending renewal requests in the system"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 mb-6">
              {filteredRequests.map((request) => (
                <div 
                  key={request.id}
                  className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
                      <img
                        src={request.bookCoverImg || "/placeholder.svg"}
                        alt={request.bookTitle}
                        className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
                            {request.bookTitle}
                          </h3>
                          
                          <div className="flex items-center gap-6 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="bg-indigo-100 p-1.5 rounded-full">
                                <BookOpen size={16} className="text-indigo-600" />
                              </div>
                              <span className="font-medium">ISBN: {request.bookIsbn}</span>
                            </div>
                          </div>

                          <div className="mt-4 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                            <div className="text-indigo-800 font-medium">
                              Requested by: {request.userName} (ID: {request.userRegid})
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-indigo-700">
                              <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>Current due date: {new Date(request.currentReturnDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>Requested extension: {request.requestedDays} days</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>Requested on: {new Date(request.requestDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRenewalAction(request.id, "approved")}
                              disabled={loadingAction === request.id}
                              className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loadingAction === request.id ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CheckCircle size={18} />
                                  Approve
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => handleRenewalAction(request.id, "rejected")}
                              disabled={loadingAction === request.id}
                              className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loadingAction === request.id ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <X size={18} />
                                  Reject
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-2 text-indigo-700">
                        <AlertCircle size={18} className="text-indigo-600" />
                        <span className="font-medium">
                          If approved, the new due date will be {new Date(new Date(request.currentReturnDate).setDate(new Date(request.currentReturnDate).getDate() + request.requestedDays)).toLocaleDateString()}
                        </span>
                      </div>
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
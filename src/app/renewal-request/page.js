



"use client"

import { useState, useEffect } from "react"
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase" // Adjust path to your Firebase config
import { Search, BookOpen, Calendar, AlertCircle, CheckCircle, Loader2, X, Send, ClipboardCheck } from "lucide-react"

export default function RenewalRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingAction, setLoadingAction] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [currentRequest, setCurrentRequest] = useState(null)

  // Predefined rejection reasons
  const rejectionReasons = {
    inventoryAuditing:
      "Your renewal request has been declined due to ongoing inventory auditing. We are currently reviewing our collection, so extensions are temporarily unavailable. Please return the book by the due date to avoid any late fees. Thank you for your understanding.",
    highDemand:
      "Your renewal request has been declined due to high demand. The book has been requested by other users, so we are unable to extend your borrowing period. Please return it by the due date to avoid any late fees. Thank you for your understanding.",
  }

  useEffect(() => {
    fetchRenewalRequests()
  }, [])

  const fetchRenewalRequests = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, "renewalRequests"), where("status", "==", "pending"))

      const querySnapshot = await getDocs(q)
      const requestsData = []

      querySnapshot.forEach((doc) => {
        requestsData.push({
          id: doc.id,
          ...doc.data(),
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
    if (action === "rejected") {
      // Get the request data and open the rejection modal
      const request = requests.find((req) => req.id === requestId)
      setCurrentRequest(request)
      setShowRejectionModal(true)
      return
    }

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
        status: action,
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
          const updatedBooks = books.map((book) => {
            if (book.isbn === requestData.bookIsbn && book.takenDate === requestData.takenDate) {
              // Calculate new return date (current return date + requested days)
              const currentReturnDate = new Date(book.returnDate)
              const newReturnDate = new Date(currentReturnDate)
              newReturnDate.setDate(newReturnDate.getDate() + requestData.requestedDays)

              return {
                ...book,
                returnDate: newReturnDate.toISOString(),
              }
            }
            return book
          })

          // Update the borrowed document
          await updateDoc(borrowedRef, {
            takenBooks: updatedBooks,
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

  const handleRejectionSubmit = async () => {
    if (!currentRequest) return

    try {
      setLoadingAction(currentRequest.id)
      setError(null)

      // Update the request status with rejection reason
      const requestRef = doc(db, "renewalRequests", currentRequest.id)
      await updateDoc(requestRef, {
        status: "rejected",
        rejectionReason: rejectionReason,
      })

      // Send rejection email using the API route
      const emailResult = await sendRejectionEmail(currentRequest, rejectionReason)

      if (!emailResult.success) {
        // Still proceed with rejection but show a warning about email
        setSuccessMessage(
          `Renewal for "${currentRequest.bookTitle}" has been rejected, but email notification failed: ${emailResult.message}`,
        )
      } else {
        setSuccessMessage(`Renewal for "${currentRequest.bookTitle}" has been rejected and user has been notified`)
      }

      // Close the modal and reset form
      setShowRejectionModal(false)
      setRejectionReason("")
      setCurrentRequest(null)

      // Auto hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)

      // Refresh the list
      fetchRenewalRequests()
    } catch (err) {
      console.error("Error processing rejection:", err)
      setError(`Failed to process rejection: ${err.message}`)
    } finally {
      setLoadingAction(null)
    }
  }

  const sendRejectionEmail = async (request, reason) => {
    try {
      // Log the userRegid for debugging
      console.log("Looking up user with regid/id:", request.userRegid)

      // First check if the email is directly in the request
      let userEmail = request.userEmail || request.email

      // If not, try to get it from the users collection
      if (!userEmail) {
        try {
          // Try with userRegid
          let userSnap = null
          const userRef = doc(db, "users", request.userRegid)
          userSnap = await getDoc(userRef)

          // If not found and the field might be named differently
          if (!userSnap.exists()) {
            console.log("User not found with userRegid in users collection. Trying to query by different field names.")

            // Query users where regid or userId or studentId equals request.userRegid
            const userQueries = [
              query(collection(db, "users"), where("regid", "==", request.userRegid)),
              query(collection(db, "users"), where("userId", "==", request.userRegid)),
              query(collection(db, "users"), where("studentId", "==", request.userRegid)),
              query(collection(db, "users"), where("id", "==", request.userRegid)),
            ]

            for (const q of userQueries) {
              const querySnapshot = await getDocs(q)
              if (!querySnapshot.empty) {
                userSnap = querySnapshot.docs[0]
                console.log("Found user using field query:", userSnap.id)
                break
              }
            }
          }

          if (userSnap && userSnap.exists()) {
            const userData = userSnap.data()
            userEmail = userData.email || userData.userEmail || userData.emailAddress
            console.log("Found user email from users collection:", userEmail)
          } else {
            console.warn("User not found in users collection, trying students collection")

            // Try students collection with direct ID
            const studentRef = doc(db, "students", request.userRegid)
            const studentSnap = await getDoc(studentRef)

            if (studentSnap.exists()) {
              const studentData = studentSnap.data()
              userEmail = studentData.email || studentData.userEmail || studentData.emailAddress
              console.log("Found user email from students collection:", userEmail)
            } else {
              // Try students collection with queries
              const studentQueries = [
                query(collection(db, "students"), where("regid", "==", request.userRegid)),
                query(collection(db, "students"), where("studentId", "==", request.userRegid)),
                query(collection(db, "students"), where("id", "==", request.userRegid)),
              ]

              for (const q of studentQueries) {
                const querySnapshot = await getDocs(q)
                if (!querySnapshot.empty) {
                  const studentData = querySnapshot.docs[0].data()
                  userEmail = studentData.email || studentData.userEmail || studentData.emailAddress
                  console.log("Found user email using field query in students collection:", userEmail)
                  break
                }
              }
            }
          }
        } catch (err) {
          console.error("Error finding user:", err)
        }
      }

      // If still no email, try to use the regid as email if it looks like an email
      if (!userEmail && request.userRegid && request.userRegid.includes("@")) {
        console.log("Using userRegid as email as it appears to be an email address")
        userEmail = request.userRegid
      }

      // Check if userName contains an email pattern as last resort
      if (!userEmail && request.userName && request.userName.includes("@")) {
        console.log("Extracting email from userName as it appears to contain an email address")
        // Extract email-like pattern from userName
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        const matches = request.userName.match(emailRegex)
        if (matches && matches.length > 0) {
          userEmail = matches[0]
        }
      }

      if (!userEmail) {
        console.error("Could not find user email after all attempts")
        throw new Error("Could not find user email after all attempts")
      }

      console.log("Final user email to be used:", userEmail)

      // Make sure all required fields are available
      if (!request.userName || !request.bookTitle || !reason) {
        console.error("Missing required fields for email:", {
          userEmail,
          userName: request.userName,
          bookTitle: request.bookTitle,
          reason,
        })
        throw new Error("Missing required fields for email")
      }

      console.log("Sending rejection email to:", userEmail)

      const response = await fetch("/api/send-rejection-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          userName: request.userName,
          bookTitle: request.bookTitle,
          rejectionReason: reason,
        }),
      })

      const data = await response.json()
      console.log("Email API response:", data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email")
      }

      return { success: true, ...data }
    } catch (error) {
      console.error("Error sending rejection email:", error)
      return { success: false, message: error.message }
    }
  }

  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      !searchTerm ||
      request.bookTitle.toLowerCase().includes(searchLower) ||
      request.userName.toLowerCase().includes(searchLower) ||
      request.bookIsbn.toLowerCase().includes(searchLower) ||
      request.userRegid.toLowerCase().includes(searchLower)
    )
  })

  // Function to apply predefined rejection reason
  const applyRejectionReason = (reasonKey) => {
    setRejectionReason(rejectionReasons[reasonKey])
  }

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
                        alt={`Cover of ${request.bookTitle}`}
                        className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3
                            className="font-bold text-xl text-indigo-900"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
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
                                <span>
                                  Current due date: {new Date(request.currentReturnDate).toLocaleDateString()}
                                </span>
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
                          If approved, the new due date will be{" "}
                          {new Date(
                            new Date(request.currentReturnDate).setDate(
                              new Date(request.currentReturnDate).getDate() + request.requestedDays,
                            ),
                          ).toLocaleDateString()}
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

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">Rejection Reason</h3>
            <p className="text-gray-700 mb-4">
              Please provide a reason for rejecting {currentRequest?.userName}'s renewal request for "
              {currentRequest?.bookTitle}". This reason will be sent to the user via email.
            </p>

            {/* Quick rejection reason options */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => applyRejectionReason("inventoryAuditing")}
                className="flex items-center justify-center gap-2 p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all text-indigo-800"
              >
                <ClipboardCheck size={18} />
                <span className="font-medium">Inventory Auditing</span>
              </button>
              <button
                onClick={() => applyRejectionReason("highDemand")}
                className="flex items-center justify-center gap-2 p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all text-indigo-800"
              >
                <ClipboardCheck size={18} />
                <span className="font-medium">High Demand</span>
              </button>
            </div>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 bg-indigo-50 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              placeholder="Enter rejection reason..."
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowRejectionModal(false)
                  setRejectionReason("")
                  setCurrentRequest(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleRejectionSubmit}
                disabled={!rejectionReason.trim() || loadingAction}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingAction ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit & Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


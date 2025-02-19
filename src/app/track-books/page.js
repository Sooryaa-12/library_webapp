"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, Calendar, AlertCircle } from "lucide-react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function TrackBooks() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, overdue, returned

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const assignmentsRef = collection(db, "book_assignments");
      const q = query(assignmentsRef, orderBy("takenDate", "desc"));
      const snapshot = await getDocs(q);
      
      const assignmentsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isOverdue: new Date(doc.data().returnDate) < new Date()
      }));

      setAssignments(assignmentsList);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        assignment.bookTitle?.toLowerCase().includes(searchLower) ||
        assignment.userRegId?.toLowerCase().includes(searchLower)
      );
    }
    
    if (filter === "overdue") {
      return assignment.isOverdue;
    }
    if (filter === "returned") {
      return assignment.status === "returned";
    }
    return true;
  });

  const getStatusColor = (assignment) => {
    if (assignment.status === "returned") return "bg-green-100 text-green-800";
    if (assignment.isOverdue) return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>TRACK BOOKS</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by book title or student ID..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Books</option>
          <option value="overdue">Overdue</option>
          <option value="returned">Returned</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading assignments...</div>
      ) : (
        <div className="grid gap-4">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-gray-500" size={20} />
                    <h3 className="font-semibold text-lg">{assignment.bookTitle}</h3>
                  </div>
                  <p className="text-gray-600 mt-1">Student ID: {assignment.userRegId}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>Borrowed: {new Date(assignment.takenDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>Due: {new Date(assignment.returnDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment)}`}>
                  {assignment.status === "returned" ? "Returned" : assignment.isOverdue ? "Overdue" : "Borrowed"}
                </span>
              </div>

              {assignment.isOverdue && assignment.status !== "returned" && (
                <div className="mt-3 flex items-center gap-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm">
                    Overdue by {Math.ceil((new Date() - new Date(assignment.returnDate)) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              )}
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No assignments found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
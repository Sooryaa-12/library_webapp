"use client";

import { useState, useEffect } from "react";
import { Search, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { collection, getDocs, query, where, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function ManageFines() {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("unpaid"); // all, paid, unpaid

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    setLoading(true);
    try {
      // Fetch overdue assignments to calculate fines
      const assignmentsRef = collection(db, "book_assignments");
      const q = query(assignmentsRef, where("status", "==", "active"));
      const snapshot = await getDocs(q);
      
      const finesList = snapshot.docs.map(doc => {
        const data = doc.data();
        const dueDate = new Date(data.returnDate);
        const today = new Date();
        const daysOverdue = Math.max(0, Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)));
        const fineAmount = daysOverdue * 1; // $1 per day

        return {
          id: doc.id,
          bookTitle: data.bookTitle,
          userRegId: data.userRegId,
          dueDate: data.returnDate,
          daysOverdue,
          amount: fineAmount,
          paid: false,
          ...data
        };
      }).filter(fine => fine.daysOverdue > 0);

      setFines(finesList);
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayFine = async (fineId) => {
    try {
      // Update the assignment status
      const assignmentRef = doc(db, "book_assignments", fineId);
      await updateDoc(assignmentRef, {
        fineStatus: "paid"
      });

      // Update local state
      setFines(fines.map(fine => 
        fine.id === fineId ? { ...fine, paid: true } : fine
      ));
    } catch (error) {
      console.error("Error updating fine status:", error);
    }
  };

  const filteredFines = fines.filter(fine => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        fine.bookTitle?.toLowerCase().includes(searchLower) ||
        fine.userRegId?.toLowerCase().includes(searchLower)
      );
    }
    
    if (filter === "paid") return fine.paid;
    if (filter === "unpaid") return !fine.paid;
    return true;
  });

  const totalUnpaidFines = filteredFines
    .filter(fine => !fine.paid)
    .reduce((sum, fine) => sum + fine.amount, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>MANAGE FINES</h1>
          <p className="text-gray-600 mt-1">Total unpaid fines: Rs {totalUnpaidFines.toFixed(2)}</p>
        </div>
      </div>

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
          <option value="all">All Fines</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading fines...</div>
      ) : (
        <div className="grid gap-4">
          {filteredFines.map((fine) => (
            <div key={fine.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-gray-500" size={20} />
                    <h3 className="font-semibold text-lg">{fine.bookTitle}</h3>
                  </div>
                  <p className="text-gray-600 mt-1">Student ID: {fine.userRegId}</p>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Due Date: {new Date(fine.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Days Overdue: {fine.daysOverdue}
                    </p>
                    <p className="text-sm font-semibold">
                      Fine Amount: ${fine.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`flex items-center gap-1 ${fine.paid ? 'text-green-600' : 'text-red-600'}`}>
                    {fine.paid ? (
                      <>
                        <CheckCircle size={16} />
                        <span className="text-sm">Paid</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        <span className="text-sm">Unpaid</span>
                      </>
                    )}
                  </span>

                  {!fine.paid && (
                    <button
                      onClick={() => handlePayFine(fine.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredFines.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No fines found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
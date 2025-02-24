// 'use client';

// import React from 'react';
// import { useState, useEffect } from "react";
// import { Search, DollarSign, CheckCircle, XCircle } from "lucide-react";
// import { collection, getDocs, query, where, orderBy, updateDoc, doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// const ManageFines = () => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("unpaid"); // all, paid, unpaid

//   const getBookDetails = async (isbn) => {
//     try {
//       const booksRef = collection(db, "books");
//       const q = query(booksRef, where("isbn", "==", isbn));
//       const snapshot = await getDocs(q);
      
//       if (!snapshot.empty) {
//         return snapshot.docs[0].data().title;
//       }
//       return "Unknown Book";
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//       return "Unknown Book";
//     }
//   };

//   const fetchFines = async () => {
//     setLoading(true);
//     try {
//       const borrowedRef = collection(db, "borrowed");
//       const borrowedSnapshot = await getDocs(borrowedRef);
      
//       const finesList = [];

//       for (const borrowedDoc of borrowedSnapshot.docs) {
//         const userData = borrowedDoc.data();
        
//         // Check takenBooks array
//         if (userData.takenBooks && Array.isArray(userData.takenBooks)) {
//           for (const book of userData.takenBooks) {
//             if (book.status === "active" && book.fine > 0) {
//               const bookTitle = await getBookDetails(book.isbn);
              
//               finesList.push({
//                 id: `${book.regid}-${book.isbn}`,
//                 bookTitle,
//                 regid: book.regid,
//                 name: book.name,
//                 isbn: book.isbn,
//                 fine: book.fine,
//                 paid: book.fineStatus === "paid"
//               });
//             }
//           }
//         }
//       }

//       setFines(finesList);
//     } catch (error) {
//       console.error("Error fetching fines:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFines();
//   }, []);

//   const handlePayFine = async (fineId) => {
//     try {
//       const [regid, isbn] = fineId.split("-");
      
//       // Get the borrowed document
//       const borrowedRef = doc(db, "borrowed", regid);
//       const borrowedDoc = await getDoc(borrowedRef);
      
//       if (borrowedDoc.exists()) {
//         const userData = borrowedDoc.data();
//         const updatedTakenBooks = userData.takenBooks.map(book => {
//           if (book.isbn === isbn) {
//             return { ...book, fineStatus: "paid" };
//           }
//           return book;
//         });
        
//         // Update the document
//         await updateDoc(borrowedRef, {
//           takenBooks: updatedTakenBooks
//         });

//         // Update local state
//         setFines(fines.map(fine => 
//           fine.id === fineId ? { ...fine, paid: true } : fine
//         ));
//       }
//     } catch (error) {
//       console.error("Error updating fine status:", error);
//     }
//   };

//   const filteredFines = fines.filter(fine => {
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         fine.bookTitle?.toLowerCase().includes(searchLower) ||
//         fine.regid?.toLowerCase().includes(searchLower) ||
//         fine.name?.toLowerCase().includes(searchLower)
//       );
//     }
    
//     if (filter === "paid") return fine.paid;
//     if (filter === "unpaid") return !fine.paid;
//     return true;
//   });

//   const totalUnpaidFines = filteredFines
//     .filter(fine => !fine.paid)
//     .reduce((sum, fine) => sum + fine.fine, 0);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-4xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>MANAGE FINES</h1>
//           <p className="text-gray-600 mt-1">Total unpaid fines: Rs {totalUnpaidFines.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by book title, student ID, or name..."
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
//           <option value="all">All Fines</option>
//           <option value="paid">Paid</option>
//           <option value="unpaid">Unpaid</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="text-center py-8">Loading fines...</div>
//       ) : (
//         <div className="grid gap-4">
//           {filteredFines.map((fine) => (
//             <div key={fine.id} className="p-4 bg-white rounded-lg shadow">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <DollarSign className="text-gray-500" size={20} />
//                     <h3 className="font-semibold text-lg">{fine.bookTitle}</h3>
//                   </div>
//                   <p className="text-gray-600 mt-1">Student ID: {fine.regid}</p>
//                   <p className="text-gray-600">Student Name: {fine.name}</p>
                  
//                   <div className="mt-2 space-y-1">
//                     <p className="text-sm font-semibold">
//                       Fine Amount: Rs {fine.fine.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   <span className={`flex items-center gap-1 ${fine.paid ? 'text-green-600' : 'text-red-600'}`}>
//                     {fine.paid ? (
//                       <>
//                         <CheckCircle size={16} />
//                         <span className="text-sm">Paid</span>
//                       </>
//                     ) : (
//                       <>
//                         <XCircle size={16} />
//                         <span className="text-sm">Unpaid</span>
//                       </>
//                     )}
//                   </span>

//                   {!fine.paid && (
//                     <button
//                       onClick={() => handlePayFine(fine.id)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                     >
//                       Mark as Paid
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredFines.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               No fines found matching your criteria.
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageFines;




// 'use client';

// import React from 'react';
// import { useState, useEffect } from "react";
// import { Search, DollarSign, CheckCircle, XCircle } from "lucide-react";
// import { collection, getDocs, query, where, orderBy, updateDoc, doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// const ManageFines = () => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("unpaid"); // all, paid, unpaid

//   const getBookDetails = async (isbn) => {
//     try {
//       const booksRef = collection(db, "books");
//       const q = query(booksRef, where("isbn", "==", isbn));
//       const snapshot = await getDocs(q);
      
//       if (!snapshot.empty) {
//         return snapshot.docs[0].data().title;
//       }
//       return "Unknown Book";
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//       return "Unknown Book";
//     }
//   };

//   const fetchFines = async () => {
//     setLoading(true);
//     try {
//       const borrowedRef = collection(db, "borrowed");
//       const borrowedSnapshot = await getDocs(borrowedRef);
      
//       const finesList = [];

//       for (const borrowedDoc of borrowedSnapshot.docs) {
//         const userData = borrowedDoc.data();
        
//         // Check takenBooks array
//         if (userData.takenBooks && Array.isArray(userData.takenBooks)) {
//           for (const book of userData.takenBooks) {
//             if (book.status === "active" && book.fine > 0) {
//               const bookTitle = await getBookDetails(book.isbn);
              
//               finesList.push({
//                 id: `${userData.userRegId}-${book.isbn}`,
//                 bookTitle,
//                 regid: userData.userRegId, // Updated to use userRegId
//                 name: userData.userName,    // Updated to use userName
//                 isbn: book.isbn,
//                 fine: book.fine,
//                 paid: book.fineStatus === "paid"
//               });
//             }
//           }
//         }
//       }

//       setFines(finesList);
//     } catch (error) {
//       console.error("Error fetching fines:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFines();
//   }, []);

//   const handlePayFine = async (fineId) => {
//     try {
//       const [regid, isbn] = fineId.split("-");
      
//       // Get the borrowed document
//       const borrowedRef = doc(db, "borrowed", regid);
//       const borrowedDoc = await getDoc(borrowedRef);
      
//       if (borrowedDoc.exists()) {
//         const userData = borrowedDoc.data();
//         const updatedTakenBooks = userData.takenBooks.map(book => {
//           if (book.isbn === isbn) {
//             return { ...book, fineStatus: "paid" };
//           }
//           return book;
//         });
        
//         // Update the document
//         await updateDoc(borrowedRef, {
//           takenBooks: updatedTakenBooks
//         });

//         // Update local state
//         setFines(fines.map(fine => 
//           fine.id === fineId ? { ...fine, paid: true } : fine
//         ));
//       }
//     } catch (error) {
//       console.error("Error updating fine status:", error);
//     }
//   };

//   const filteredFines = fines.filter(fine => {
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         fine.bookTitle?.toLowerCase().includes(searchLower) ||
//         fine.regid?.toLowerCase().includes(searchLower) ||
//         fine.name?.toLowerCase().includes(searchLower)
//       );
//     }
    
//     if (filter === "paid") return fine.paid;
//     if (filter === "unpaid") return !fine.paid;
//     return true;
//   });

//   const totalUnpaidFines = filteredFines
//     .filter(fine => !fine.paid)
//     .reduce((sum, fine) => sum + fine.fine, 0);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-4xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>MANAGE FINES</h1>
//           <p className="text-gray-600 mt-1">Total unpaid fines: Rs {totalUnpaidFines.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by book title, student ID, or name..."
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
//           <option value="all">All Fines</option>
//           <option value="paid">Paid</option>
//           <option value="unpaid">Unpaid</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="text-center py-8">Loading fines...</div>
//       ) : (
//         <div className="grid gap-4">
//           {filteredFines.map((fine) => (
//             <div key={fine.id} className="p-4 bg-white rounded-lg shadow">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <DollarSign className="text-gray-500" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-lg">{fine.bookTitle}</h3>
//                       <p className="text-gray-500 text-sm">ISBN: {fine.isbn}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mt-1">Student ID: {fine.regid}</p>
//                   <p className="text-gray-600">Student Name: {fine.name}</p>
                  
//                   <div className="mt-2 space-y-1">
//                     <p className="text-sm font-semibold">
//                       Fine Amount: Rs {fine.fine.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   <span className={`flex items-center gap-1 ${fine.paid ? 'text-green-600' : 'text-red-600'}`}>
//                     {fine.paid ? (
//                       <>
//                         <CheckCircle size={16} />
//                         <span className="text-sm">Paid</span>
//                       </>
//                     ) : (
//                       <>
//                         <XCircle size={16} />
//                         <span className="text-sm">Unpaid</span>
//                       </>
//                     )}
//                   </span>

//                   {!fine.paid && (
//                     <button
//                       onClick={() => handlePayFine(fine.id)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                     >
//                       Mark as Paid
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredFines.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               No fines found matching your criteria.
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageFines;




'use client';

import React from 'react';
import { useState, useEffect } from "react";
import { Search, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { collection, getDocs, query, where, orderBy, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ManageFines = () => {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("unpaid"); // all, paid, unpaid

  const getBookDetails = async (isbn) => {
    try {
      const booksRef = collection(db, "books");
      const q = query(booksRef, where("isbn", "==", isbn));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const bookData = snapshot.docs[0].data();
        return {
          title: bookData.title,
          coverImg: bookData.coverImg
        };
      }
      return {
        title: "Unknown Book",
        coverImg: ""
      };
    } catch (error) {
      console.error("Error fetching book details:", error);
      return {
        title: "Unknown Book",
        coverImg: ""
      };
    }
  };

  const fetchFines = async () => {
    setLoading(true);
    try {
      const borrowedRef = collection(db, "borrowed");
      const borrowedSnapshot = await getDocs(borrowedRef);
      
      const finesList = [];

      for (const borrowedDoc of borrowedSnapshot.docs) {
        const userData = borrowedDoc.data();
        
        if (userData.takenBooks && Array.isArray(userData.takenBooks)) {
          for (const book of userData.takenBooks) {
            if (book.status === "active" && book.fine > 0) {
              const bookDetails = await getBookDetails(book.isbn);
              
              finesList.push({
                id: `${userData.regid}-${book.isbn}`,
                bookTitle: bookDetails.title,
                coverImg: bookDetails.coverImg,
                regid: userData.regid,
                name: userData.name,
                isbn: book.isbn,
                fine: book.fine,
                paid: book.fineStatus === "paid"
              });
            }
          }
        }
      }

      setFines(finesList);
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  const handlePayFine = async (fineId) => {
    try {
      const [regid, isbn] = fineId.split("-");
      
      const borrowedRef = doc(db, "borrowed", regid);
      const borrowedDoc = await getDoc(borrowedRef);
      
      if (borrowedDoc.exists()) {
        const userData = borrowedDoc.data();
        const updatedTakenBooks = userData.takenBooks.map(book => {
          if (book.isbn === isbn) {
            return { ...book, fineStatus: "paid" };
          }
          return book;
        });
        
        await updateDoc(borrowedRef, {
          takenBooks: updatedTakenBooks
        });

        setFines(fines.map(fine => 
          fine.id === fineId ? { ...fine, paid: true } : fine
        ));
      }
    } catch (error) {
      console.error("Error updating fine status:", error);
    }
  };

  const filteredFines = fines.filter(fine => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        fine.bookTitle?.toLowerCase().includes(searchLower) ||
        fine.regid?.toLowerCase().includes(searchLower) ||
        fine.name?.toLowerCase().includes(searchLower)
      );
    }
    
    if (filter === "paid") return fine.paid;
    if (filter === "unpaid") return !fine.paid;
    return true;
  });

  const totalUnpaidFines = filteredFines
    .filter(fine => !fine.paid)
    .reduce((sum, fine) => sum + fine.fine, 0);

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
            placeholder="Search by book title, student ID, or name..."
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
                <div className="flex">
                  <img src={fine.coverImg} alt={fine.bookTitle} className="w-16 h-24 rounded-md mr-4" />
                  <div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-gray-500" size={20} />
                      <div>
                        <h3 className="font-semibold text-lg">{fine.bookTitle}</h3>
                        <p className="text-gray-500 text-sm">ISBN: {fine.isbn}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">Student ID: {fine.regid}</p>
                    <p className="text-gray-600">Student Name: {fine.name}</p>
                    
                    <div className="mt-2 space-y-1">
                      <p className="text-sm font-semibold">
                        Fine Amount: Rs {fine.fine.toFixed(2)}
                      </p>
                    </div>
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
};

export default ManageFines;
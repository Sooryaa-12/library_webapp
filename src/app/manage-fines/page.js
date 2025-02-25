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




// 'use client';

// import React from 'react';
// import { useState, useEffect } from "react";
// import { Search, BookOpen, CheckCircle, XCircle } from "lucide-react";
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
//         const bookData = snapshot.docs[0].data();
//         return {
//           title: bookData.title,
//           coverImg: bookData.coverImg
//         };
//       }
//       return {
//         title: "Unknown Book",
//         coverImg: ""
//       };
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//       return {
//         title: "Unknown Book",
//         coverImg: ""
//       };
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
        
//         if (userData.takenBooks && Array.isArray(userData.takenBooks)) {
//           for (const book of userData.takenBooks) {
//             if (book.status === "active" && book.fine > 0) {
//               const bookDetails = await getBookDetails(book.isbn);
              
//               finesList.push({
//                 id: `${userData.regid}-${book.isbn}`,
//                 bookTitle: bookDetails.title,
//                 coverImg: bookDetails.coverImg,
//                 regid: userData.regid,
//                 name: userData.name,
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
        
//         await updateDoc(borrowedRef, {
//           takenBooks: updatedTakenBooks
//         });

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
//                 <div className="flex">
//                   <img src={fine.coverImg} alt={fine.bookTitle} className="w-16 h-24 rounded-md mr-4" />
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="text-gray-500" size={20} />
//                       <div>
//                         <h3 className="font-semibold text-lg">{fine.bookTitle}</h3>
//                         <p className="text-gray-500 text-sm">ISBN: {fine.isbn}</p>
//                       </div>
//                     </div>
//                     <p className="text-gray-600 mt-1">Student ID: {fine.regid}</p>
//                     <p className="text-gray-600">Student Name: {fine.name}</p>
                    
//                     <div className="mt-2 space-y-1">
//                       <p className="text-sm font-semibold">
//                         Fine Amount: Rs {fine.fine.toFixed(2)}
//                       </p>
//                     </div>
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
import { Search, BookOpen, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { collection, getDocs, query, where, orderBy, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ManageFines = () => {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("unpaid"); // all, paid, unpaid
  const [loadingPayment, setLoadingPayment] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
    setLoadingPayment(fineId);
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
        
        // Get the fine details to display in the success message
        const paidFine = fines.find(fine => fine.id === fineId);
        setSuccessMessage(`Fine for "${paidFine.bookTitle}" has been marked as paid for ${paidFine.name}`);
        
        // Auto hide success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error updating fine status:", error);
    } finally {
      setLoadingPayment(null);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-white">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            MANAGE FINES
          </h1>
          <p className="mt-2 opacity-80">Track and process overdue book fines</p>
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

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
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
                  <option value="all">All Fines</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              
              <div className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg shadow-sm">
                <span className="font-semibold text-indigo-800">Total Unpaid Fines: </span>
                <span className="font-bold text-indigo-900">Rs {totalUnpaidFines.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col justify-center items-center space-y-4">
              <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
              <div className="text-indigo-800 font-medium">Loading fines...</div>
            </div>
          ) : filteredFines.length === 0 ? (
            <div className="p-12 flex flex-col justify-center items-center space-y-4 text-center">
              <div className="bg-indigo-100 p-4 rounded-full">
                <BookOpen size={48} className="text-indigo-600" />
              </div>
              <div className="text-xl font-medium text-indigo-800">No fines found</div>
              <p className="text-indigo-600 max-w-md">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : filter !== "all" 
                    ? `No ${filter === "paid" ? "paid" : "unpaid"} fines found` 
                    : "There are no fines in the system yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 mb-6">
              {filteredFines.map((fine) => (
                <div
                  key={fine.id}
                  className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center overflow-hidden">
                      <img
                        src={fine.coverImg || "/placeholder.svg"}
                        alt={fine.bookTitle}
                        className="h-52 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: "Playfair Display, serif" }}>
                            {fine.bookTitle}
                          </h3>
                          
                          <div className="flex items-center gap-6 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="bg-indigo-100 p-1.5 rounded-full">
                                <BookOpen size={16} className="text-indigo-600" />
                              </div>
                              <span className="font-medium">ISBN: {fine.isbn}</span>
                            </div>
                          </div>

                          <div className="mt-4 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                            <div className="text-indigo-800 font-medium">
                              Student: {fine.name} (ID: {fine.regid})
                            </div>
                            <div className="mt-2 text-indigo-700">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">Fine Amount:</span> 
                                <span className="text-red-600 font-bold">Rs {fine.fine.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
                          <span
                            className={`px-4 py-2 rounded-full font-medium w-32 text-center shadow-sm ${
                              fine.paid
                                ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                                : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700"
                            }`}
                          >
                            {fine.paid 
                              ? "Paid" 
                              : "Unpaid"}
                          </span>

                          {!fine.paid && (
                            <button
                              className={`flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-40 ${
                                loadingPayment === fine.id
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                              }`}
                              onClick={() => handlePayFine(fine.id)}
                              disabled={loadingPayment === fine.id}
                            >
                              {loadingPayment === fine.id ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CheckCircle size={18} />
                                  Mark as Paid
                                </>
                              )}
                            </button>
                          )}
                        </div>
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
  );
};

export default ManageFines;
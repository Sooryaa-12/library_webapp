// "use client"; // Ensures this runs only on the client side
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../lib/firebase";  // Import Firebase auth

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form submission reload
//     setError(""); // Clear any previous errors

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push("/dashboard"); // Redirect to the dashboard on successful login
//     } catch (err) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#e8f5e9] overflow-hidden">
//       {/* Right Section */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
//         <div className="w-full max-w-[440px] space-y-6">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">ADMIN LOGIN</h1>
//           </div>

//           {error && <p className="text-red-500 text-center">{error}</p>}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="text-gray-600 mb-1 block">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-600 mb-1 block">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#2d3748] text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors"
//             >
//               Sign in
//             </button>
//           </form>

//           <p className="text-center text-gray-600">
//             Need help? <a href="#" className="text-green-600 hover:text-green-700">Contact IT Support</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../lib/firebase";  // Make sure this path matches your Firebase config file location
// import { functions} from "../../lib/firebase";  // Make sure this path matches your Firebase config file location
// import { httpsCallable } from "firebase/functions";
// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setError("")
//     setIsLoading(true)

//     try {
//       await signInWithEmailAndPassword(auth, email, password)

//       // Call the updateFines function
//       const updateFines = httpsCallable(functions, "updateFinesTrigger")
//       await updateFines()

//       // Call the sendReminders function
//       const sendReminders = httpsCallable(functions, "sendReturnReminderEmails")
//       await sendReminders()

//       router.push("/dashboard")
//     } catch (err) {
//       setError("Invalid email or password. Please try again.")
//       console.error("Login error:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center p-4"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/background-image.jpg')`, // Replace 'background-image.jpg' with your image path
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       <div className="w-full max-w-md backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl">
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
//             ADMIN PORTAL
//           </h1>
//           <p className="text-xl text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
//             Secure Access Dashboard
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-500/20 text-red-200 p-4 rounded-lg flex items-center gap-2 mb-6 backdrop-blur-sm">
//             <AlertCircle className="h-5 w-5" />
//             <p style={{ fontFamily: 'Quicksand, sans-serif' }}>{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label className="text-gray-200 mb-1 block" style={{ fontFamily: 'Quicksand, sans-serif' }}>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-3 py-3 bg-white/10 border border-gray-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-white backdrop-blur-sm transition-all"
//                   placeholder="Enter your email"
//                   required
//                   style={{ fontFamily: 'Quicksand, sans-serif' }}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-gray-200 mb-1 block" style={{ fontFamily: 'Quicksand, sans-serif' }}>
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-10 py-3 bg-white/10 border border-gray-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-white backdrop-blur-sm transition-all"
//                   placeholder="••••••••"
//                   required
//                   style={{ fontFamily: 'Quicksand, sans-serif' }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
//             style={{ fontFamily: 'Quicksand, sans-serif' }}
//           >
//             {isLoading ? (
//               <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "Sign in"
//             )}
//           </button>

//           <div className="text-center">
//             <p className="text-sm text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
//               Need assistance?{" "}
//               <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
//                 Contact IT Support
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth, functions } from "../../lib/firebase";  // Make sure this path matches your Firebase config file location
import { httpsCallable } from "firebase/functions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Wait for auth state to be fully processed
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the ID token to ensure Firebase recognizes the authenticated state
      const idToken = await getIdToken(user, true);
      
      // try {
      //   // Call the updateFines function with force refresh of token
      //   const updateFines = httpsCallable(functions, "updateFinesTrigger");
      //   await updateFines();
        
      //   // Call the sendReminders function
      //   const sendReminders = httpsCallable(functions, "sendReturnReminderEmails");
      //   await sendReminders();
      // } catch (funcError) {
      //   // Even if functions fail, we still want to proceed to dashboard
      //   console.warn("Cloud functions execution warning:", funcError);
      // }
      
      // Navigate to dashboard regardless of function execution success
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/background-image.jpg')`, // Replace 'background-image.jpg' with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
            ADMIN PORTAL
          </h1>
          <p className="text-xl text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Secure Access Dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-200 p-4 rounded-lg flex items-center gap-2 mb-6 backdrop-blur-sm">
            <AlertCircle className="h-5 w-5" />
            <p style={{ fontFamily: 'Quicksand, sans-serif' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-gray-200 mb-1 block" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-gray-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-white backdrop-blur-sm transition-all"
                  placeholder="Enter your email"
                  required
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="text-gray-200 mb-1 block" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-gray-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-white backdrop-blur-sm transition-all"
                  placeholder="••••••••"
                  required
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Need assistance?{" "}
              <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                Contact IT Support
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
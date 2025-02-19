// src/app/profile/page.js

export default function ProfilePage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Your Profile</h1>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <p className="text-xl">Name: John Doe</p>
          <p className="text-xl">Email: johndoe@example.com</p>
          <button className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    );
  }
  
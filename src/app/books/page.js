// src/app/books/page.js

export default function BooksPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Books Available</h1>
        <p className="text-xl mb-8 text-center">Browse through the available books.</p>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Book Title 1</h2>
            <p className="text-sm">Description of the book.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Book Title 2</h2>
            <p className="text-sm">Description of the book.</p>
          </div>
          {/* Add more books similarly */}
        </div>
      </div>
    );
  }
  
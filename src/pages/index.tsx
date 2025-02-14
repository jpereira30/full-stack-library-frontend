import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../styles/Home.module.css";

// Define TypeScript interface for Book
interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  description: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books from the Spring Boot backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize filteredBooks with all books
    } catch (error) {
      setErrorMsg("Failed to load books." + error);
    } finally {
      setLoading(false);
    }
  };

  // Filter books based on search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim() === "") {
      setFilteredBooks(books); // Reset to all books if search is cleared
    } else {
      setFilteredBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            book.author.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (errorMsg) return <div className={styles.errorMessage}>{errorMsg}</div>;

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.appTitle}>📖 My Library</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.bookGrid}>
        {filteredBooks.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>👤 {book.author}</p>
            <Link href={`/books/${book.id}`} className={styles.bookLink}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

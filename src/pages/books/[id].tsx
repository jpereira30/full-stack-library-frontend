import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/BookDetails.module.css';

// Define TypeScript interface for Book details
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  description: string;
}

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  // Fetch book details from backend
  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${id}`);
      setBook(response.data);
    } catch (error) {
      setErrorMsg('Failed to load book details.' + error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch AI insights
  const fetchAIInsights = async () => {
    if (!id) return;
    setInsightLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/books/${id}/ai-insights`);
      const { insights } = response.data;
      setAiInsight(insights);
    } catch (error) {
      setErrorMsg('Failed to load AI insights.');
    } finally {
      setInsightLoading(false);
    }
  };

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      Loading...
    </div>
  );
  if (errorMsg) return <div className={styles.errorMessage}>{errorMsg}</div>;

  return (
    <div className={styles.detailsContainer}>
      {book ? (
        <>
          <h1 className={styles.bookTitle}>{book.title}</h1>
          <p className={styles.bookInfo}><strong>Author:</strong> {book.author}</p>
          <p className={styles.bookInfo}><strong>ISBN:</strong> {book.isbn}</p>
          <p className={styles.bookInfo}><strong>Published:</strong> {book.publicationYear}</p>
          <p className={styles.bookDescription}><strong>Description:</strong> {book.description}</p>

          <button
            onClick={fetchAIInsights}
            className={styles.aiButton}
            disabled={insightLoading}
          >
            {insightLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              'Get AI Insights'
            )}
          </button>

          {aiInsight && (
            <p className={styles.aiInsight}>💡 {aiInsight}</p>
          )}

          <button
            onClick={() => router.push('/')}
            className={styles.backButton}
          >
            Back to Library
          </button>
        </>
      ) : (
        <p className={styles.errorMessage}>No book details available.</p>
      )}
    </div>
  );
}

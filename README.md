# Full-Stack Online Library with AI Insights - Frontend (Next.js)

This is the frontend UI for the **Full-Stack Online Library with AI Insights** challenge. It is a simple **Next.js** application that interacts with a Spring Boot backend to manage and display books, and provides AI-powered insights for each book.

## Project Setup

Follow these steps to set up and run the frontend application:

### 1. Clone the repository

If you haven’t already cloned the repository, you can clone it using the following command:

```bash
git clone https://github.com/jpereira30/full-stack-library-frontend.git
````

### 2. Navigate to the project directory

After cloning the repository, navigate into the project directory:

```bash
cd full-stack-library-frontend
````

### 3. Install dependencies

Install the required dependencies using either `npm` or `yarn`:

- Using **npm**:

  ```bash
  npm install
````

### 4. Run the development server

Once dependencies are installed, you can start the development server by running:

- Using **npm**:

  ```bash
  npm run dev
````

### 5. Open the app

After the server is running, open your browser and navigate to `http://localhost:3000` to access the application.


### 6. Features

This application provides the following features:

#### 1. Home / Books List Page

- Displays a list of all books fetched from the backend API (`GET /books`).
- Each book item shows key details such as:
  - Title
  - Author
  - Publication Year
- Allows users to click on a book to view more details.

#### 2. Book Details Page

- Displays detailed information about a selected book by calling `GET /books/{id}`.
- Includes a button or link to request AI insights for the book.

#### 3. AI Insights Feature

- The AI insights feature fetches a short, engaging tagline or summary for the book by calling the backend endpoint `GET /books/{id}/ai-insights`.
- The AI-generated insights are displayed alongside the book details.

#### 4. Search Functionality (Optional)

- Allows users to search for books by title or author using the `GET /books/search` endpoint.
  - Example: `GET /books/search?title=Spring`
  - Example: `GET /books/search?author=Smith`


### 7. Testing

The frontend application ensures robust error handling for API calls and loading states, although explicit testing for UI components is not yet implemented.

#### Key Testing Considerations:
- **API Error Handling**: The application handles errors gracefully during API requests, showing meaningful error messages when an API call fails (e.g., if the backend is unavailable or if the AI insights service fails).
- **Loading States**: Loading spinners are shown while the data is being fetched from the backend or AI insights are being generated, ensuring that users are informed of the ongoing operations.
  
Future enhancements could include:
- Writing unit and integration tests for components using tools like Jest or React Testing Library.
- Testing the integration with the backend API to ensure the data is correctly rendered and error handling works as expected.

### 8. AI Integration and Billing

The AI-powered insights feature relies on integration with an external AI service, such as **OpenAI**, to generate engaging taglines or summaries for the books.

#### OpenAI Billing Considerations:
- The AI insights feature will only work if you have an active OpenAI subscription or billing account.
- OpenAI provides a paid API service, and you will need to set up billing to use their models (e.g., GPT-3 or GPT-4) for generating insights.
  
To enable the AI insights functionality in this application, you will need to:
1. Set up an OpenAI account and provide billing information.
2. Obtain an API key from OpenAI.
3. Configure the backend to use this API key to send requests to OpenAI's models for generating the book insights.

You can find more details about OpenAI’s pricing and usage limits in the [OpenAI pricing documentation](https://openai.com/pricing).

Without an active OpenAI subscription or appropriate billing setup, the AI insights feature will not work as intended.

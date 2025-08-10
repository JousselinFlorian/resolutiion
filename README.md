# Resolutiion take-home test

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** 18.17 or later
- **Yarn** (recommended) or npm
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resolutiion
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./prisma/resolutiion.db"
```

### 4. Set Up Database

```bash
# Run database migrations
yarn migrate
# or
npm run migrate
```

### 5. Start Development Server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Testing

### Run All Tests

```bash
yarn test
# or
npm test
```

### Run Unit Tests Only

```bash
yarn test:unit
# or
npm run test:unit
```

### Run Integration Tests Only

```bash
yarn test:integration
# or
npm run test:integration
```

### Test Coverage

```bash
yarn test --coverage
# or
npm test -- --coverage
```

## 🗄️ Database Schema

The application uses SQLite with the following main entities:

- **User**: User accounts (currently using mock user)
- **Book**: Book information (title, author, timestamps)
- **UserRead**: User's reading status for books

## 🔒 Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS and injection attacks
- **SQL Injection Protection**: Parameterized queries and input validation
- **XSS Prevention**: Comprehensive sanitization of all user inputs
- **Type Safety**: Full TypeScript coverage for runtime safety

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Switching**: Dark/light mode with system preference detection
- **Loading States**: Proper loading indicators for better UX
- **Error Handling**: User-friendly error messages
- **Debounced Actions**: Optimised performance for frequent user interactions
- **Centralised strings**: Easier to translate to multiple languages later on

## 🧪 Testing Strategy

### Unit Tests
- **Security Helpers**: XSS, SQL injection, and encoding attack prevention
- **Book Helpers**: Title normalization and sanitization
- **Utility Functions**: Input validation and data processing

### Integration Tests
- **Book Management**: Complete add book workflow
- **Database Operations**: CRUD operations with proper error handling
- **Server Actions**: Form processing and validation
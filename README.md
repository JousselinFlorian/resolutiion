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

### Type Checking

```bash
yarn type-check
# or
npm run type-check
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

## 🔮 What's Next

### Authentication
Currently, the app uses a mock user for simplicity. In the future, implementing a robust authentication system—using NextAuth, AWS Cognito, or similar—would secure user data and ensure that users can only access their own books.

### External API
While server actions simplify development here, adopting an external API would better support multi-platform access and clearly separate frontend and backend responsibilities, improving scalability and maintainability. Also a caching layer like Redis would be a good idea to implement when moving to an external API which could catch the last books page for example.

### Database
Though SQLite works well for this stage, migrating to a more scalable database like PostgreSQL would better support larger datasets and concurrent users as the app grows.

### Performance
Limiting book queries to 20 results is a good start, but implementing pagination or infinite scrolling will enhance performance and user experience when dealing with extensive libraries.

### Security
Adding a Web Application Firewall (WAF) could help protect the app by filtering malicious traffic and blocking suspicious IPs or regions, adding an extra security layer.

### UI/UX
The current design is minimalistic; adding more styling and personality would improve engagement. Expanding the book model with additional fields could enable useful features like filtering and sorting. The data model also supports new pages—such as a “Read” list showing user-read books—that would enrich the experience. Also changing the switch to a dropdown would be nice to be able to add different statuses (see ReadStatus enum) which will allow a user to track their read progress.

### Testing
The project would benefit from broader test coverage, including more unit, integration, and end-to-end tests. Integrating these into a CI/CD pipeline would help maintain quality and catch regressions during development.
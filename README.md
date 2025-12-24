# Favorite Shortlist Project

A modern full-stack application built with Next.js, NestJS, PostgreSQL, and Docker.

## 🚀 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **pnpm** - Fast, disk space efficient package manager

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeORM** - TypeScript ORM for database operations
- **PostgreSQL 18** - Relational database
- **Swagger** - API documentation
- **pnpm** - Package manager

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **pgAdmin** - PostgreSQL administration

## 📁 Project Structure

```
favorite-shortlist-project/
├── frontend/               # Next.js application
│   ├── app/               # App Router pages
│   ├── lib/               # Utilities and helpers
│   ├── types/             # TypeScript types
│   ├── public/            # Static assets
│   └── Dockerfile         # Frontend container config
├── backend/               # NestJS application
│   ├── src/
│   │   ├── domain/        # Business logic
│   │   │   ├── users/    # User module
│   │   │   └── entities/ # Database entities
│   │   └── common/        # Shared utilities
│   │       ├── config/   # Configuration
│   │       └── database/ # Database setup
│   └── Dockerfile         # Backend container config
└── docker-compose.yaml    # Service orchestration
```

## 🛠️ Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed
- **Node.js 20+** and **pnpm** (for local development)

### Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd favorite-shortlist-project
   ```

2. **Start all services**

   ```bash
   docker-compose up
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs (Swagger): http://localhost:3001/api
   - pgAdmin: http://localhost:8080
     - Email: `admin@example.com`
     - Password: `123456`

### Local Development (Without Docker)

#### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run database migrations**

   ```bash
   pnpm migration:run
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

## 🔧 Available Commands

### Docker Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Stop and remove volumes
docker-compose down -v
```

### Backend Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start:prod       # Start production server
pnpm lint             # Run ESLint
pnpm test             # Run tests
pnpm migration:generate --name=MigrationName  # Generate migration
pnpm migration:run    # Run migrations
pnpm migration:revert # Revert last migration
```

### Frontend Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## 🌐 API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Full API documentation available at: http://localhost:3001/api/v1

## 🗄️ Database

### PostgreSQL Connection

- **Host**: localhost
- **Port**: 5432
- **Database**: myapp
- **Username**: postgres
- **Password**: password

### pgAdmin Connection

1. Open http://localhost:8080
2. Login with credentials above
3. Add new server:
   - Host: `postgres_db` (or `localhost` if connecting from host)
   - Port: 5432
   - Database: myapp
   - Username: postgres
   - Password: password

## 🔐 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Backend (.env)

```env
NODE_ENV=local
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp
DB_SYNCHRONIZE=false
```

## 📝 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload in development mode
2. **Type Safety**: Use TypeScript types from `/types` directory in frontend
3. **API Client**: Use the provided `apiClient` utility for API calls
4. **Migrations**: Always create migrations for database schema changes
5. **Docker Volumes**: Database data persists in Docker volumes

## 🎨 Features

- ✅ Modern UI with Tailwind CSS
- ✅ Type-safe full-stack TypeScript
- ✅ RESTful API with Swagger docs
- ✅ Database migrations with TypeORM
- ✅ Docker containerization
- ✅ Hot reload in development
- ✅ PostgreSQL with pgAdmin
- ✅ Responsive design
- ✅ Error handling
- ✅ Form validation

## 🚧 Roadmap

- [ ] Authentication & Authorization
- [ ] User roles and permissions
- [ ] File upload functionality
- [ ] Real-time updates with WebSockets
- [ ] Unit and E2E tests
- [ ] CI/CD pipeline
- [ ] Production deployment guides

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using modern web technologies

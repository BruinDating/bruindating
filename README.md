# BruinDating 

BruinDating is a social matching application developed for UCLA students. The project consists of two parts: frontend (based on Next.js) and backend (based on Django).

## Project Structure

- `/` - Frontend code (Next.js)
- `/bruindating-backend/` - Backend code (Django)

## Frontend Setup

### Installing Dependencies

```bash
# Install dependencies using yarn
yarn install
```

### Environment Variables Configuration

1. Copy the example environment variables file
```bash
cp .env.example .env.local
```

2. Fill in the actual configuration values in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

### Starting the Development Server

```bash
# Development mode
yarn dev

# Or build production version
yarn build
yarn start
```

The frontend service will run at [http://localhost:3000](http://localhost:3000)

## Backend Setup

### Preparing Python Environment

```bash
# Navigate to the backend directory
cd bruindating-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Environment Variables Configuration

Create a `.env` file in the `bruindating-backend` directory with the following content:

```
DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Database Setup

```bash
# Run database migrations
python manage.py migrate

# Create admin user (optional)
python manage.py createsuperuser
```

### Starting the Backend Server

```bash
python manage.py runserver
```

The backend API will run at [http://localhost:8000](http://localhost:8000)

## Dependencies

### Main Frontend Dependencies

- Next.js 15.1.7
- React 19.0.0
- Mantine UI 7.16.3
- TypeScript 5.x

### Main Backend Dependencies

- Django 5.1.6
- Django REST Framework 3.15.2
- Django Channels 4.2.0
- django-allauth 65.4.1

## Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

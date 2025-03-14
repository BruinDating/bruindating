
=======
# Bruin Dating

Bruin Dating is a web application designed and built for students at UCLA. Through the application you are able to connect with your fellow bruins, and make friendships and maybe even meet the love of your life. This repository only contains the details for the backend of the application. 

## Getting started

### Required Technologies

- Node.js (v18 +)
- yarn
- Python (v3.12 +)
- PostgreSQL
- pip (Python package manager)

### Installation steps

#### Clone the repository

bash
git clone https://github.com/BruinDating/bruindating.git
cd bruindating


#### Set up frontend

1. **Go into frontend repository**

bash
cd frontend


2. **Install dependencies**

bash
yarn install


3. **Run the development server**

bash
yarn dev      # or npm run dev


The application will now be available at [http://localhost:3000](http://localhost:3000/)

#### Set up backend

1. **Go into backend repository**

bash
cd backend  # if in the frontend repository use `cd ../backend`


2. **Set up a virtual environment**

bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`


3. **Install dependencies**

bash
pip install -r requirements.txt


4. **Run the development server**

bash
python manage.py runserver



## Features

### User Authentication

An important feature of Bruin Dating is that only students at UCLA are able to access it. To do this users will be required to use their UCLA email to sign up for Bruin Dating. Users will also be required to use DUO Mobile authentication to verify that it is you who is logging in or signing up. 

### How to meet people

After you fill out the questionnaire an algorithm is used to show you the profile of a potential match and you will be able to swipe left or right (ignore or like). When both of you give each other a like you will unlock the ability to message each other with the built in chat feature. 

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Mantine](https://mantine.dev/) - React components library
- [ESLint](https://eslint.org/) - Code linting
- [PostCSS](https://postcss.org/) - CSS processing
- [Django](https://www.djangoproject.com/) - Web framework for Python
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Django Rest Framework](https://www.django-rest-framework.org/) - API framework for Django


### Starting the Development Server

bash
# Development mode
yarn dev



- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Django, take a look at the following resources:

- [Django Documentation](https://docs.djangoproject.com/en/stable/) - Comprehensive guide to Django
- [Django Rest Framework](https://www.django-rest-framework.org/) - Learn about building APIs with Django

## Contributions

This application was created as part the project of the ComSci 35L course at UCLA during the winter quarter of 2025.  
Team members:
Burak Arslan, Charles Zhu, Luke Yamaguchi, Jason Vu, XiaoJin Zuo

<<<<<<< HEAD
# Or build production version
yarn build
yarn start


The frontend service will run at [http://localhost:3000](http://localhost:3000)

## Backend Setup

### Preparing Python Environment

bash
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


### Environment Variables Configuration

Create a .env file in the bruindating-backend directory with the following content:

DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000


### Database Setup

bash
# Run database migrations
python manage.py migrate

# Create admin user (optional)
python manage.py createsuperuser


### Starting the Backend Server

bash
python manage.py runserver


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
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request
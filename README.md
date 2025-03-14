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

```bash
git clone https://github.com/BruinDating/bruindating.git
cd bruindating
```

#### Set up frontend

1. **Go into frontend repository**

```bash
cd frontend
```

2. **Install dependencies**

```bash
yarn install
```

3. **Run the development server**

```bash
yarn dev      # or npm run dev
```

The application will now be available at [http://localhost:3000](http://localhost:3000/)

#### Set up backend

1. **Go into backend repository**

```bash
cd backend  # if in the frontend repository use `cd ../backend`
```

2. **Set up a virtual environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the development server**

```bash
python manage.py runserver
```


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


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Django, take a look at the following resources:

- [Django Documentation](https://docs.djangoproject.com/en/stable/) - Comprehensive guide to Django
- [Django Rest Framework](https://www.django-rest-framework.org/) - Learn about building APIs with Django

## Contributions

This application was created as part the project of the ComSci 35L course at UCLA during the winter quarter of 2025.  
Team members:
Burak Arslan, Charles Zhu, Luke Yamaguchi, Jason Vu, XiaoJin Zuo
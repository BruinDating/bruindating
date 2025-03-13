# Bruin Dating Frontend

Bruin Dating is a web application designed and built for students at UCLA. Through the application you are able to connect with your fellow bruins, and make friendships and maybe even meet the love of your life. This repository only contains the details for the frontend of the application. The backend is located here: [https://github.com/BruinDating/bruindating-backend](https://github.com/BruinDating/bruindating-backend)

## Getting started

### Required Technologies

- Node.js (v18 +)
- yarn
### Installation
#### Entire shell prompt

```bash
git clone https://github.com/BruinDating/bruindating-frontend.git
cd bruindating-frontend
yarn install
yarn dev
```

#### Step by step

1. **Clone the repository**

Note: it is recommended that before cloning this repository you create a parent folder that will hold both the frontend and the backend for this application. 

```bash
git clone https://github.com/BruinDating/bruindating-backend.git
cd bruindating-frontend
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


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

# Inscribe - A Blogging Platform

**Inscribe** is a dynamic and feature-rich blogging platform built with Django, React, and Tailwind CSS. It allows users to create, read, update, and delete (CRUD) blog posts, while providing a sleek and responsive interface. This platform is designed for modern bloggers who want an easy and efficient way to share their content with the world.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Backend Setup (Django)](#backend-setup-django)
- [Frontend Setup (React)](#frontend-setup-react)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and signup system with JWT.
- **Post Management:** Create, edit, and delete blog posts.
- **Responsive Design:** Tailwind CSS for a mobile-first and visually appealing design.
- **API-Driven:** Fully functioning RESTful API for all CRUD operations.
- **Comment System:** Users can comment on posts (future implementation).
- **Rich Text Editor:** Format your blog posts easily (optional integration).
- **Search & Filtering:** Search posts by title or content (future implementation).

## Tech Stack

- **Backend:** Django (Django Rest Framework)
- **Frontend:** React, Tailwind CSS
- **Database:** SQLite (can be configured to use PostgreSQL, MySQL, etc.)
- **API:** RESTful API built using Django Rest Framework (DRF)
- **Authentication:** JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Python 3.x
- Node.js & npm/yarn
- Django
- React
- Tailwind CSS
- PostgreSQL (optional for production)

### Folder Structure

Here is an overview of the project folder structure:

```
inscribe/
│
├── backend/                      # Django backend
│   ├── articles/                 # Django app for users
│   │   ├── migrations/           # Django migrations for users
│   │   ├── apps.py               # Django apps config file
│   │   ├── models.py             # Models for the blog app
│   │   ├── serializers.py        # Serializers for DRF
│   │   ├── views.py              # Views for handling API requests
│   │   ├── urls.py               # API URL configurations
│   │   └── tests.py              # Unit tests for the API
│   ├── users/                    # Django app for articles
│   │   ├── management/           # Users management directory
│   │   ├── migrations/           # Django migrations
│   │   ├── apps.py               # Django apps config file
│   │   ├── models.py             # Models for the users app
│   │   ├── serializers.py        # Serializers for DRF
│   │   ├── views.py              # Views for handling API requests
│   │   ├── urls.py               # API URL configurations
│   │   └── tests.py              # Unit tests for the API
│   ├── inscribe/                 # Main Django project directory
│   │   ├── asgi.py               # ASGI config for inscribe project
│   │   ├── settings.py           # Django settings
│   │   ├── urls.py               # Root URLs
│   │   └── wsgi.py               # WSGI configuration for deployment
│   ├── media/                    # Media direcory
│   │   └── avatars               # Image avatars
│   ├── manage.py                 # Django management script
│   └── requirements.txt          # Backend dependencies
│
├── frontend/                     # React frontend
│   ├── public/                   # Public files
│   ├── src/                      # React source code
|   ├── ├── assets                # Images and logos
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Pages for different routes
│   │   ├── services/             # Services for API calls
│   │   ├── App.jsx               # Main React component
│   │   ├── main.jsx              # Entry point for React
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   └── .env                      # Environment variables for React
│
├── README.md                     # Project documentation
└── .gitignore                    # Ignored files and directories
```

This structure separates the backend and frontend to make development more modular and scalable.

### Backend Setup (Django)

1. Clone the repository:

    ```bash
    git clone https://github.com/goody-1/inscribe.git
    cd inscribe
    ```

2. Create and activate a virtual environment:

    ```bash
    python3 -m venv env
    source env/bin/activate
    ```

3. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run migrations:

    ```bash
    python manage.py migrate
    ```

5. Create a `.env` file in the root directory and configure the necessary environment variables:

    ```env
    DEBUG=True
    SECRET_KEY=your_secret_key
    ALLOWED_HOSTS=localhost, 127.0.0.1
    ```

6. Start the Django server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. Navigate to the frontend_inscribe directory:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables for the frontend by creating a `.env` file in the `frontend` directory:

    ```env
    REACT_APP_API_URL=http://localhost:8000/api
    ```

4. Start the React development server:

    ```bash
    npm run dev
    ```

### Running the Project

After setting up both the backend and frontend, you can run the project by:

1. Running Django for the backend:

    ```bash
    python manage.py runserver
    ```

2. Running React for the frontend:

    ```bash
    npm run dev
    ```

Your application will be available at `http://localhost:3000` for the frontend, and the backend API at `http://localhost:8000/api`.

## API Endpoints

- **GET** `/api/posts/` - List all posts
- **POST** `/api/posts/` - Create a new post
- **GET** `/api/posts/:id/` - Retrieve a single post
- **PUT** `/api/posts/:id/` - Update an existing post
- **DELETE** `/api/posts/:id/` - Delete a post

Additional routes and detailed documentation are available in the API docs (future feature).

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

## Authors

- [@goody-1](https://www.github.com/goody-1)
- [@MrDarlineTheEngineer](https://www.github.com/MrDarlingTheEngineer)
- [@Elijah-6](https://www.github.com/elijah-6)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

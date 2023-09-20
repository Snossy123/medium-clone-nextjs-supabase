
# Medium Clone Project

This project is a Medium clone built using React, Next.js, Tailwind CSS, and Supabase. It aims to replicate some of the core features of the Medium platform, allowing users to read and publish articles.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication: Users can create accounts, log in, and log out.
- Article Creation and Editing: Authenticated users can create, edit, and delete articles.
- Article Reading: Users can view published articles.
- User Profiles: Users have profile pages displaying their articles.
- Real-time Updates: Articles are updated in real-time using Supabase.
- Responsive Design: The application is fully responsive for various devices.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Next.js: A React framework for server-rendered applications.
- Tailwind CSS: A utility-first CSS framework for building modern web applications.
- Supabase: A platform for building web and mobile applications with serverless PostgreSQL.

## Usage In Production

Visit: https://medium-clone-nextjs-supabase.vercel.app

## Getting Started In Development

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/medium-clone.git
   ```

2. Change to the project directory:

   ```bash
   cd medium-clone
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

### Environment Variables

To run the project, you need to set up environment variables. Create a `.env.local` file in the root directory and add the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_api_key
```

Replace `your_supabase_url` and `your_supabase_api_key` with your Supabase project details.

Create your supabase database https://gist.github.com/Snossy123/85937ac18f1cf5f60db1024a23feaf5a 

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

3. Create an account, log in, and start publishing articles or reading articles from other users.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes and push to your fork:

   ```bash
   git commit -m "Add your feature or fix"
   git push origin feature/your-feature-name
   ```

4. Create a pull request with a clear description of your changes.

5. Your pull request will be reviewed, and once approved, it will be merged into the main branch.

## License

This project is licensed under the [MIT License](LICENSE).
```

This README file provides an overview of your project, its features, technologies used, installation instructions, configuration steps, usage guidelines, contribution guidelines, and licensing information. You can customize it further to suit the specific details of your Medium clone project.

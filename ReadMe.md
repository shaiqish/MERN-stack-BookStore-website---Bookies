# Bookies 📚

**Bookies** is a full-stack web application where users can view, filter, and purchase books. Built using the MERN stack, this project is fully responsive, scalable, and includes advanced features like light/dark mode toggling, user authentication, and an admin dashboard.

## Features 🌟

- **Responsive Design**: Adapts seamlessly to any device, ensuring a great user experience on mobile, tablet, and desktop.
- **Dark & Light Mode**: Users can switch between themes to suit their preferences.
- **User Authentication**: Secure login and signup functionality using JSON Web Token (JWT) and bcrypt.js.
- **Book Management**: Users can filter books by free and paid options.
- **Admin Dashboard**: Accessible only via a secret key, allowing admins to:
  - View, add, and delete books
  - Analyze mock data (ready to connect to real-time data in production)

## Tech Stack 🛠️

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT), bcrypt.js
- **Styling**: Tailwind CSS, Material Tailwind React
- **Deployment**: (Include details if deployed, e.g., Netlify, Heroku, etc.)

## Installation & Setup 🚀

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/bookies.git
cd bookies
```

Install Dependencies:

For the Client
cd client
npm install

For the Server
cd ../server
npm install
Environment Variables
Create a .env file in the server directory and add the necessary environment variables:

MONGO_URI=your_mongodb_uri

Run the Application:

Start the Client
cd client
npm run dev

Start the Server
cd ../server
npm run start

Future Enhancements 🔮
Real-Time Data Analysis: Connect the admin dashboard to real-time data analytics.
Advanced Filtering: Add more advanced filtering options for users.
Payment Gateway Integration: Enable users to purchase books directly through the site.
Contributing 🤝
Contributions are welcome! If you'd like to contribute, please fork the repository and make a pull request.

License 📄
This project is open-source and available under the MIT License.

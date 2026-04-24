# NexasLeads Back-Office

This is the **Back-Office** for **NexasLeads**, a platform to manage blogs, partners, statistics, and users.  
It is built with **React.js**, **Redux**, and **TailwindCSS**, and integrates with the NexasLeads Back-End API.  

---

## Features

- React + Redux state management  
- Protected routes with authentication  
- Blog management dashboard  
- User & Partner management UI  
- Statistics visualization with **Chart.js** & **Recharts**  
- Rich text editor support with **Draft.js** & **Jodit**  
- Notifications with **react-hot-toast**  
- TailwindCSS + Ant Design UI components  

---

## Project Structure

```
NexasLeads-Back-Office/
├── public/              
│   └── index.html
│
├── src/                 # Main source code
│   ├── API/             # API service files
│   │   ├── Blogs.js
│   │   └── Users.js
│   │
│   ├── assets/          # Images & static assets
│   │   ├── favicon.ico
│   │   ├── logo1.png
│   │   └── logo2.png
│   │
│   ├── components/      # UI components
│   │   ├── card.jsx
│   │   └── Doughnut.jsx
│   │
│   ├── pages/           # Application pages
│   │   ├── Blog.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── User.jsx
│   │
│   ├── Redux/           # Redux state management
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── Types/
│   │       └── store.js
│   │
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   ├── index.css        # Global styles
│   └── PrivateRoute.js  # Protected routes
│
├── tailwind.config.js   # TailwindCSS config
├── package.json         # Dependencies & scripts
└── .gitignore
```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NexasLeads-Back-Office.git
   cd NexasLeads-Back-Office
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

---

## Running the Project

### Development
```bash
npm start
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
npm run build
```
Builds the app for production into the `build/` folder.

---

## Tech Stack

- **React.js**  
- **Redux (Thunk middleware)**  
- **TailwindCSS**  
- **Ant Design (UI Components)**  
- **Chart.js & Recharts (Charts & Stats)**  
- **Draft.js & Jodit Editor (Rich Text Editing)**  
- **Axios (API calls)**  

---

## License

This project is licensed under the [MIT License](LICENSE).  
---
Copyright© Aymane Mehdi  

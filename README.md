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
├── src/                 
│   ├── API/             
│   │   ├── Blogs.js
│   │   └── Users.js
│   │
│   ├── assets/          
│   │
│   ├── components/      
│   │   ├── card.jsx
│   │   └── Doughnut.jsx
│   │
│   ├── pages/           
│   │   ├── Blog.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── User.jsx
│   │
│   ├── Redux/           
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── Types/
│   │       └── store.js
│   │
│   ├── App.js           
│   ├── index.js         
│   ├── index.css        
│   └── PrivateRoute.js  
│
├── SECURITY.md
├── LICENSE  
├── tailwind.config.js   
├── package.json
├── package-lock.json         
└── .gitignore
```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AymaneMehdi/NexasLeads-Back-Office.git
   cd NexasLeads-Back-Office
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_BLOGS_URL=API endpoint for blog management
   REACT_APP_USERS_URL=API endpoint for user management
   REACT_APP_STATISTICS_URL=API endpoint for dashboard statistics
   REACT_APP_AUTH_URL=API endpoint for authentication and user profile
   REACT_APP_LOGIN_URL=API endpoint for user login
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

## Deployment

The easiest way to deploy your app is using [Vercel Platform](https://vercel.com) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Security

Please review our [Security Policy](SECURITY.md) for information about reporting vulnerabilities.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Copyright © Aymane Mehdi**

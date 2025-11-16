
# YouTube Clone

A full-stack YouTube-clone application, built to replicate core YouTube features: user authentication, video upload, viewing, comments, likes, and more.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Running the Project](#running-the-project)    
- [Environment Variables](#environment-variables)  
- [Future Enhancements](#future-enhancements)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- User signup and login  
- Secure authentication (JWT or similar)  
- Upload videos (with thumbnail)  
- Stream / watch videos  
- Like / dislike videos  
- Comment on videos  
- Track video views (view count)   
- Responsive UI (works on desktop and mobile)

---

## Tech Stack

Here are the main technologies used in your project:

- **Frontend**: React (likely with state management like Redux or Context), React Router, Axios  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (with Mongoose)  
- **Authentication**: JWT  
- **File Upload**: Multer for video uploads   
- **Styling**: Tailwind CSS 

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repo**  
   ```bash
   git clone https://github.com/aviral-pal/YouTube-Clone.git  
   cd YouTube-Clone
````

2. **Install backend dependencies**

   ```bash
   cd backend  
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend  
   npm install
   ```

---

## Running the Project

1. **Start the backend server**
   In the `backend` folder:

   ```bash
   npm start 
   ```

2. **Start the frontend**
   In the `frontend` folder:

   ```bash
   npm run dev
   ```

3. **Open the app**
   Open your browser and go to `(http://localhost:5173/)`.

---

## Environment Variables

You will need to set up `.env` files in backend:

**Backend (`backend/.env`):**

```
PORT=7272  
MONGO_URI=<your-mongodb-connection-string>  
JWT_SECRET=<your-jwt-secret>  
```

**Frontend (`frontend/.env`):**

```
VITE_API_URL="http://localhost:7272/api"
```

---

## Future Enhancements (Ideas)

* Improve **watch history** (show list of watched videos)
* Video recommendations (based on tags / history)
* Notifications (for new video from subscribed channels)
* Improve UI with better design / responsiveness
* Optimize video streaming (e.g. chunked streaming)
* Add “Watch Later” or playlist feature

---

## Contributing

If you want to contribute:

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add some feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is (./LICENSE) — feel free to modify it, but please credit if you reuse significant parts.

---

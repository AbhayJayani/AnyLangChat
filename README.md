# AnyLangChat

AnyLangChat is a real-time, multi-language chat application built with the MERN stack. It allows users to communicate seamlessly in their preferred language—every message is automatically translated using the Gemini API, so users always see messages in the language they choose.

## Demo
https://github.com/user-attachments/assets/bba427e5-29d0-494c-9cc1-db55b8e8da0c
## Features

- Real-time messaging with Socket.IO
- Automatic translation of all messages to each user's preferred language
- User authentication (signup, login, logout)
- Modern WhatsApp-like UI with React and Tailwind CSS
- Language selection (set once, all messages shown in that language)
- MongoDB Atlas for cloud database storage

## Tech Stack

- **Frontend:** React, Vite, Zustand, Axios, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express, Mongoose, Socket.IO
- **Database:** MongoDB Atlas
- **Translation:** Gemini API (Google Generative Language API)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account
- Gemini API key

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd AnyLangChat/Backend
   ```

2. **Install backend dependencies:**
   ```sh
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd Frontend
   npm install
   cd ..
   ```

4. **Configure environment variables:**

   Create a `.env` file in the `Backend` folder:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_TOKEN=your_jwt_secret
   API_KEY=your_gemini_api_key
   ```

5. **Start MongoDB Atlas cluster** (if not already running).

6. **Run the backend server:**
   ```sh
   npm run dev
   ```

7. **Run the frontend:**
   ```sh
   cd Frontend
   npm run dev
   ```

8. **Open the app:**
   - Visit [http://localhost:300](http://localhost:300) in your browser.

## Usage

- Sign up for a new account or log in.
- Set your preferred language (default is English).
- Start a chat with any user. All messages will appear in your chosen language, regardless of the sender's language.
- Log out when done.

## Project Structure

```
Backend/
  controller/
  models/
  routes/
  utils/
  SocketIO/
  middleware/
  Frontend/
    src/
      components/
      context/
      home/
      statemanage/
      assets/
```

## Environment Variables

- `PORT`: Port for backend server (default: 3000)
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_TOKEN`: Secret for JWT authentication
- `API_KEY`: Gemini API key for translation

## License

This project is licensed by Abhay Singh.

---

**Enjoy chatting in any language with AnyLangChat!**

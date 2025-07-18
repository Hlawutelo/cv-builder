# CV Builder Full-Stack App

A full-stack CV (Resume) builder application built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🌐 Live Deployment (After Setup)

- **Frontend (Netlify)**: `https://your-app.netlify.app`
- **Backend (Render)**: `https://your-api.onrender.com`

> Update these URLs once deployed.

---

## 🚀 Features

- User Registration & Login (JWT-based)
- Resume Builder with live preview
- Blog and Career Guide sections
- Responsive design using Tailwind CSS
- Protected API routes and persistent MongoDB storage

---

## 🧰 Tech Stack

**Frontend**
- React (with TypeScript)
- Vite
- Tailwind CSS
- Lucide Icons

**Backend**
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication

---

## 🛠️ Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

---

### 2. Set Up Environment Variables

Create a `.env` file in the root with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Or use the preconfigured `.env`:

```
MONGO_URI=mongodb+srv://hlawutelo2ntsanwisi:Hlawutelo@11@hlawutelo.qrp80ko.mongodb.net/?retryWrites=true&w=majority&appName=hlawutelo
JWT_SECRET=HlawuteloSecret@2025
PORT=5000
```

---

### 3. Install Dependencies

```bash
npm install
```

To install server dependencies (if split):

```bash
cd server
npm install
```

---

### 4. Run Locally

**Dev (Frontend & Backend concurrently):**

```bash
npm run dev:full
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🛰 Deployment

### 🔹 Backend (Render)

1. Push project to GitHub
2. Go to [https://render.com](https://render.com)
3. Click “New Web Service”
4. Connect GitHub repo
5. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`)
7. Deploy 🎉

---

### 🔹 Frontend (Netlify)

1. Push frontend to GitHub (can be same or separate repo)
2. Go to [https://app.netlify.com](https://app.netlify.com)
3. Click “New Site from Git”
4. Set:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Deploy 🚀

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

---

## 📄 License

[MIT](LICENSE)

---

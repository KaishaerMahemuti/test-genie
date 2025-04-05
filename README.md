# 🧪 Test Genie

**Test Genie** is a web-based developer tool that leverages AI to automatically generate unit test cases for your code in multiple programming languages. Whether you paste code, upload a file, or fetch it directly from a public GitHub repo, Test Genie makes testing fast, reliable, and accessible — even for beginners.

Built for developers who want to improve code quality without the hassle of writing boilerplate tests.

---

## 🚀 Features

- 🔐 **Authentication**
  - Google login & Email/Password auth via **Firebase Authentication**

- 🧠 **AI-Powered Test Generation**
  - Uses **OpenAI GPT-4 API** to generate smart, edge-case-focused test cases

- 💻 **Multiple Input Methods**
  - Paste code directly
  - Upload local files
  - Browse and select files from a **public GitHub repo**

- 🌐 **Multi-Language & Framework Support**
  - **Languages**: JavaScript, Python, Java, Swift, TypeScript
  - **Testing Frameworks**: Jest, Mocha, PyTest, JUnit, XCTest

- 📂 **GitHub Repo Explorer**
  - Browse folders and files inside any public GitHub repo

- 💾 **Test History**
  - View, revisit, and delete previously generated tests (saved in **Firestore**)

- 🌓 **Dark Mode Toggle**

---

## 🛠 Tech Stack

### ⚙️ Frontend
- React
- Bootstrap 5
- Firebase Auth & Firestore
- GitHub REST API
- Webpack

### 🧪 Backend
- Node.js + Express
- OpenAI SDK
- CORS, dotenv

### 🧳 Hosting
- **Frontend**: Vercel (Free Tier)
- **Backend**: Render (Free Tier)
- **Database & Auth**: Firebase

---

## 📸 Demo Preview

(https://www.youtube.com/watch?v=T2VWHK28hn0)

---

## 🧰 Setup Instructions

1. **Clone the repo**

Install dependencies

Backend:

bash
Copy
Edit
cd server
npm install
Frontend:

bash
Copy
Edit
cd ../client
npm install
Configure Environment Variables

Create .env in both /server and /client folders:

/server/.env:

env
Copy
Edit
OPENAI_API_KEY=your_openai_key_here
/client/.env:

env
Copy
Edit
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=...
Run locally

bash
Copy
Edit
npm run dev
📌 Future Improvements
Add support for private GitHub repos (via OAuth)

Improve loading speed with server-side queuing

Add code coverage report integration

Embed Monaco editor for better code UX

🤝 Contributing
Pull requests are welcome! Feel free to fork this repo and propose new features or improvements.

🙌 Acknowledgements
OpenAI for powering the test generation

Firebase for seamless auth and data persistence

GitHub for repo content access

Made with 💻, ☕, and a bit of 🧙‍♂️ by @kaishaer

# Fullstack Application with Jenkins CI/CD

A lightweight, modern fullstack web application boilerplate featuring React 19 with TypeScript and Tailwind CSS on the frontend, powered by a high-performance FastAPI backend. Includes automated CI/CD pipeline using Jenkins.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Getting Started](#-getting-started)
- [Jenkins Setup](#-jenkins-setup)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Local Development](#-local-development)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **CORS Middleware** - Cross-origin resource sharing

### CI/CD
- **Jenkins** - Automation server
- **GitHub** - Version control
- **Render** - Cloud deployment platform

## 📁 Project Structure

```
.
├── client/                 # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── App.tsx        # Main app component
│   │   └── vite-env.d.ts  # TypeScript definitions
│   ├── .env.development   # Development environment variables
│   ├── .env.production    # Production environment variables
│   └── package.json
├── server/                 # Backend (FastAPI)
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── Jenkinsfile            # CI/CD pipeline configuration
└── .gitignore
```

## 🚀 CI/CD Pipeline

This project uses **Jenkins** for automated continuous integration and deployment. The pipeline includes the following stages:

### Pipeline Stages

```
Start → Tool Install → Checkout → Build → Test → Deploy to Render → Post Actions → End
```

#### 1. **Tool Install**
- Sets up Node.js environment
- Validates required tools

#### 2. **Checkout**
- Clones repository from GitHub
- Uses credentials for private repos

#### 3. **Build** (Parallel)
- **Client Build**
  - Installs npm dependencies
  - Builds production-ready React app
- **Server Build**
  - Creates Python virtual environment
  - Installs FastAPI and dependencies

#### 4. **Test** (Parallel)
- **Client Lint**
  - Runs ESLint on frontend code
  - Checks for code quality issues
- **Server Test**
  - Validates Python environment
  - Runs pytest (if configured)

#### 5. **Deploy to Render**
- Triggers deployment to Render via webhooks
- Deploys backend and frontend services
- Validates deployment success

#### 6. **Post Actions**
- Sends build notifications
- Cleans up workspace (if configured)

### Pipeline Visualization

![Jenkins Pipeline](https://img.shields.io/badge/Jenkins-Automated-brightgreen?logo=jenkins)

All stages run automatically on push to the `main` branch.

## 🎯 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python 3.11+**
- **Jenkins** (for CI/CD)
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hanumantjain/jenkins.git
   cd jenkins
   ```

2. **Set up environment variables**
   ```bash
   # Client environment variables are already configured
   # Update server/.env if needed (for local development)
   ```

3. **Run locally** (see [Local Development](#-local-development))

## 🔧 Jenkins Setup

### 1. Install Required Plugins

Install these Jenkins plugins:
- **NodeJS Plugin** - For Node.js support
- **Git Plugin** - For GitHub integration
- **Pipeline Plugin** - For Jenkinsfile support
- **Credentials Plugin** - For secure credential storage

### 2. Configure Tools

**Jenkins → Manage Jenkins → Tools**

#### NodeJS Installation
- Name: `node`
- Version: NodeJS 18.x or higher
- Install automatically: ✓

### 3. Add Credentials

**Jenkins → Manage Jenkins → Credentials**

#### GitHub Token
- Kind: Username with password
- ID: `Git token`
- Username: Your GitHub username
- Password: GitHub Personal Access Token

#### Render API Key (Optional)
- Kind: Secret text
- ID: `render-api-key`
- Secret: Your Render API key

### 4. Create Pipeline Job

1. **New Item** → Enter name → **Pipeline**
2. **Pipeline Definition**: Pipeline script from SCM
3. **SCM**: Git
   - Repository URL: `https://github.com/hanumantjain/jenkins`
   - Credentials: Select your Git token
   - Branch: `*/main`
4. **Script Path**: `Jenkinsfile`
5. **Save**

### 5. Configure Webhooks (Optional)

For automatic builds on push:

1. Go to GitHub repository → **Settings** → **Webhooks**
2. Add webhook:
   - Payload URL: `http://your-jenkins-url/github-webhook/`
   - Content type: `application/json`
   - Events: Just the push event
3. Save

## 🌐 Deployment

### Render Configuration

The application is deployed to [Render](https://render.com/) automatically via Jenkins.

#### Backend Service
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment**: Python 3.11

#### Frontend Service
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment**: Static Site

### Deploy Hooks

Update these in your `Jenkinsfile`:

```groovy
RENDER_BACKEND_DEPLOY_HOOK = "https://api.render.com/deploy/srv-xxx?key=xxx"
RENDER_FRONTEND_DEPLOY_HOOK = "https://api.render.com/deploy/srv-xxx?key=xxx"
```

Get your deploy hooks from: Render Dashboard → Service → Settings → Deploy Hook

## 🔐 Environment Variables

### Client (.env.production)

```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

### Server

CORS is configured to allow requests from:
- `http://localhost:5173` (development)
- `http://localhost:5001` (local API)
- `https://your-frontend-url.onrender.com` (production)

Update `server/main.py` to add your production frontend URL.

## 💻 Local Development

### Start the Backend Server

```bash
cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 5001
```

The API will be available at `http://localhost:5001`

**API Endpoints:**
- `GET /` - Welcome message
- `GET /health` - Health check

### Start the Frontend Development Server

```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Other Useful Commands

```bash
# Client
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint

# Server
pytest              # Run tests (if configured)
```

## 📊 Monitoring Pipeline

### View Pipeline Status

- Go to Jenkins Dashboard
- Select your pipeline job
- View **Build History** and **Stage View**

### Pipeline Stages Breakdown

| Stage | Duration | Description |
|-------|----------|-------------|
| Tool Install | ~0.5s | Sets up Node.js environment |
| Checkout | ~1-2s | Clones repository |
| Build | ~20-30s | Installs dependencies and builds |
| Test | ~5-10s | Runs linting and tests |
| Deploy | ~10-15s | Triggers Render deployment |

## 🐛 Troubleshooting

### Common Issues

**1. Jenkins build fails at Python installation**
- Ensure Python 3.11+ is installed on Jenkins agent
- Check that `python3` command is available

**2. npm install fails**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, reinstall

**3. Render deployment fails**
- Verify deploy hooks are correct
- Check Render service logs
- Ensure environment variables are set

**4. CORS errors in production**
- Update `server/main.py` with correct frontend URL
- Redeploy backend service

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Hanumant Jain**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ using Jenkins CI/CD**


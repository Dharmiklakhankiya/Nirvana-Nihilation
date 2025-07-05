import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import RootLayout from './layouts/RootLayout.jsx'

if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', 'dev-user-' + Math.floor(Math.random() * 1000));
  console.log('Set development userId:', localStorage.getItem('userId'));
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/auth/sign-in',
        element: <SignInPage/>
      },
      {
        path: '/my-resume/:resumeId/view',
        element: <ViewResume/>
      },
      {
        element: <App/>,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard/>
          },
          {
            path: '/dashboard/resume/:resumeId/edit',
            element: <EditResume/>
          },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)

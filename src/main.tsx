import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Authentication from './pages/Authentication.tsx'
import { ProtectedRoute } from './Component/ProtectedRoute.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from './firebase.ts'

const router = createBrowserRouter([
  {path: '/', element: <ProtectedRoute auth={auth}><App/></ProtectedRoute>},
  {path: 'auth', element: <Authentication/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

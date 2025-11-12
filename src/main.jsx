import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import ThemeProvider from './contexts/ThemeProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import AddArtwork from './components/AddArtwork/AddArtwork.jsx';
import MyFavorites from './components/MyFavorites/MyFavorites.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import ArtworkDetails from './components/ArtworkDetails/ArtworkDetails.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import MyProfile from './components/MyProfile/MyProfile.jsx';
import MyGallery from './components/MyGallery/MyGallery.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/explore",
        Component: AllProducts
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/add-artwork",
        element: <PrivateRoute><AddArtwork /></PrivateRoute>
      },
      {
        path: "/my-gallery",
        element: <PrivateRoute><MyGallery /></PrivateRoute>
      },
      {
        path: "/my-favorites",
        element: <PrivateRoute><MyFavorites /></PrivateRoute>
      },
      {
        path: "/my-profile",
        element: <PrivateRoute><MyProfile /></PrivateRoute>
      },
      {
        path: "/artwork/:id",
        element: <PrivateRoute><ArtworkDetails /></PrivateRoute>
      }
    ]
  },
  {
    path: "*",
    Component: NotFound
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
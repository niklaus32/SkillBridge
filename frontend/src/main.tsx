import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Register from './routes/Register';
import Profile from './routes/Profile';
import Connect from './routes/Swipe';
import Projects from './routes/Projects';
import Chat from './routes/Chat';
import YourProjects from './routes/YourProjects';
import Settings from './routes/Settings';
import Notifications from './routes/NotificationsPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="yourProjects" element={<YourProjects />} />
          <Route path="connect" element={<Connect />} />
          <Route path="projects" element={<Projects />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

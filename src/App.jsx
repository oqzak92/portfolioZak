// App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';

function App() {
  return (
    <div className="app-background"> 
      <BrowserRouter>
        <AppRouter />
        </BrowserRouter>
    </div>
  );
}

export default App;

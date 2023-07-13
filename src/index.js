import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// This is a form where you can take input and store the data in the local component state.
// Render the list on the right hand side section using the same saved data.
// User can also edit the list (on clicking the edit button data will be populated in the form again and user can update the data). / list will also be updated.
// Deleting the data will delete the record from the list.


import React from 'react';
import './App.css';
import ListComponent from './Components/ListComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>todos</h1>
          <ListComponent />
      </header>
    </div>
  );
}

export default App;

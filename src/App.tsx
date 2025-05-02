import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Character List</div>} />
      </Routes>
    </Router>
  );
}

export default App;

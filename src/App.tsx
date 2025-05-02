import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
      </Routes>
    </Router>
  );
}

export default App;

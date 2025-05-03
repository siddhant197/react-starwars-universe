import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

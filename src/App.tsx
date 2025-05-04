import { Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';
import FavoritesList from './pages/FavoritesList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CharacterList />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
      <Route path="/favorites" element={<FavoritesList />} />
    </Routes>
  );
}

export default App;

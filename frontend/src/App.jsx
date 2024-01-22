import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/books/create' element={<CreateBook></CreateBook>} />
      <Route path='/books/details/:id' element={<ShowBook></ShowBook>} />
      <Route path='/books/edit/:id' element={<EditBook></EditBook>} />
      <Route path='/books/delete/:id' element={<DeleteBook></DeleteBook>} />
    </Routes>
  )
}

export default App
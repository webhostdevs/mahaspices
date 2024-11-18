import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import MenuPage from './components/MenuPage';
import MenuDetails from './components/MenuDetails';
import MenuItemForm from './components/MenuItemForm';
import AddCategory from './components/AddCategory';




function App() {
  const [count, setCount] = useState(0);

  return (
    <Router futureFlags={{ v7_startTransition: true }}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Define routes here */}
            <Route path="/" element={<HomePage />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="/menu/:id" element={<MenuDetails />} />
            <Route path="/admin" element={<MenuItemForm />} />
            <Route path="/category" element={<AddCategory />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

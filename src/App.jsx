import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import MenuPage from './components/MenuPage';
import MenuDetails from './components/MenuDetails';
import MenuItemForm from './components/MenuItemForm';
import AddCategory from './components/AddCategory';
import DeliveryMenu from './components/DeliveryMenu';
import MealBox from './components/MealBox';
import MenuOrder from './components/MenuOrder';
import Feedback from './components/Feedback';
import ScrollToTop from './components/ScrollToTop';
import CustomOrder from './components/CustomOrder';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router futureFlags={{ v7_startTransition: true }}>
      <div className="min-h-auto flex flex-col">
        <ScrollToTop /> 
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Define routes here */}
            <Route path="/" element={<HomePage />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="/menu/:categoryName" element={<MenuDetails />} />
            <Route path="/admin" element={<MenuItemForm />} />
            <Route path="/category" element={<AddCategory />} />
            <Route path="/deliverymenu" element={<DeliveryMenu />} />
            <Route path="/mealboxx" element={<MealBox />} />
            <Route path="/menu/:categoryName/order" element={<MenuOrder />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/customorder" element={<CustomOrder />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { Utensils, Wine, Globe, Celebration } from "lucide-react";

const Services = () => {
  return (
    <section className="bg-green-50 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-6">
          Our Services
        </h2>
        <p className="text-lg text-green-700 text-center mb-12">
          Maha Spice Catering specializes in offering a wide range of services to make your events unforgettable.
          From weddings to corporate events, we handle every detail with passion and professionalism.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Utensils className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">Customized Cuisine</h3>
            <p className="text-green-600">
              Delightful and diverse menu options tailored to your preferences.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Wine className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">Cocktail Services</h3>
            <p className="text-green-600">
              Unique and refreshing cocktails to elevate your event.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Globe className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">Destination Catering</h3>
            <p className="text-green-600">
              World-class service at any venue or destination of your choice.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Celebration className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">Event Planning</h3>
            <p className="text-green-600">
              Comprehensive support to make every celebration flawless.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-green-800 text-center mb-4">
            Why Choose Our Services?
          </h3>
          <p className="text-lg text-green-700 text-center">
            We go beyond catering to provide an exceptional experience for you and your guests. 
            With attention to detail and a passion for excellence, we ensure your events are truly memorable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;

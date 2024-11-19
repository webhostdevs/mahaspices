import React from "react";
import { Users, CheckCircle, Star, Briefcase } from "lucide-react";

const About = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-6">
          About Maha Spice Catering
        </h2>
        <p className="text-lg text-green-700 text-center mb-12">
          Maha Spice Catering delivers culinary and hospitality excellence to thousands of events
          annually. Trusted in Telangana and Andhra Pradesh for over half a century, we specialize
          in creative cuisine and gracious catering service for weddings, galas, and parties.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Users className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">158,598</h3>
            <p className="text-green-600">Happy Customers</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">10+ Years</h3>
            <p className="text-green-600">Of Experience</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Star className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">10,000</h3>
            <p className="text-green-600">Menus/Dishes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Briefcase className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-green-800">450</h3>
            <p className="text-green-600">Staff Members</p>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-green-800 text-center mb-4">
            Why Choose Maha Spice Catering?
          </h3>
          <p className="text-lg text-green-700 text-center">
            At Maha Spice Catering, every event is special to our team. We provide customized,
            delectable culinary creations and cocktails to make your occasions extraordinary. Our
            passion for creative cuisine and gracious service sets us apart as the best catering
            service provider in Hyderabad.
          </p>
        </div>
        <div className="mt-12 text-center">
          <a
            href="tel:04022228888"
            className="inline-block bg-green-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Contact Us: 040 2222 8888
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;

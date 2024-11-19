import React, { useState } from "react";
import { Utensils, Wine, Globe, PartyPopper } from "lucide-react";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What types of events do you cater?",
      answer:
        "We cater to a variety of events, including weddings, corporate gatherings, birthday parties, anniversaries, and private dinners.",
    },
    {
      question: "Do you offer custom menu options?",
      answer:
        "Yes, we work with you to create a menu that suits your preferences, dietary restrictions, and event theme.",
    },
    {
      question: "How far in advance do I need to book your services?",
      answer:
        "We recommend booking at least 2-3 months in advance to ensure availability, especially during peak seasons.",
    },
    {
      question: "Do you provide staff for events?",
      answer:
        "Yes, our team includes chefs, servers, and event coordinators to ensure your event runs smoothly.",
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer:
        "Absolutely! We can provide vegetarian, vegan, gluten-free, and other specialized options upon request.",
    },
    {
      question: "Do you offer tastings before booking?",
      answer:
        "Yes, we offer tastings to help you decide on the perfect menu for your event. Please contact us for scheduling and pricing details.",
    },
    {
      question: "What is included in your catering packages?",
      answer:
        "Our packages typically include food, serving equipment, staff, and basic tableware. Additional services like décor can be arranged.",
    },
    {
      question: "Do you provide beverages and bar services?",
      answer:
        "Yes, we offer beverage and bar services, including custom cocktails, mocktails, and non-alcoholic options.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We cater events within a 100-mile radius of our location and can discuss options for farther destinations.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made at least 14 days before the event will receive a full refund. After that, a partial refund may apply.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className=" py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-6">
            Our Services
          </h2>
          <p className="text-lg text-green-700 text-center mb-12">
            Maha Spice Catering specializes in offering a wide range of services to make your events unforgettable. From
            weddings to corporate events, we handle every detail with passion and professionalism.
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
              <PartyPopper className="text-green-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-green-800">Event Planning</h3>
              <p className="text-green-600">
                Comprehensive support to make every celebration flawless.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 border hover:border-green-500 transition"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-green-500 transform ${
                      activeIndex === index ? "rotate-180" : ""
                    } transition-transform`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {activeIndex === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

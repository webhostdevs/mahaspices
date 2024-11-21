import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const VENDORS_API_URL = 'https://bookmycater.freewebhostmost.com/getVendors.php';
const DEFAULT_IMAGE_PATH = '/default-vendor-image.jpg';

const HomePage = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [locations, setLocations] = useState(['All Locations']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(VENDORS_API_URL);
        const vendorData = response.data || [];

        setVendors(vendorData);
        
        const uniqueLocations = Array.from(
          new Set(
            vendorData
              .flatMap(vendor => vendor.operating_regions.split(','))
              .map(location => location.trim())
          )
        );
        setLocations(['All Locations', ...uniqueLocations]);
      } catch (err) {
        setError('Failed to load vendors. Please try again later.');
        console.error('Vendor fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const filterVendors = () => {
      const filtered = vendors.filter(vendor => {
        const matchesName = vendor.company_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        
        const matchesLocation = 
          selectedLocation === 'All Locations' ||
          vendor.operating_regions
            .split(',')
            .map(loc => loc.trim())
            .includes(selectedLocation);
        
        return matchesName && matchesLocation;
      });

      setFilteredVendors(filtered);
    };

    filterVendors();
  }, [vendors, searchTerm, selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const renderVendorCard = (vendor) => (
    <Link
      to={`/vendor/${vendor.id}`}
      key={vendor.id}
      className="shadow-md hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden flex flex-col"
    >
      <img
        src={`https://bookmycater.freewebhostmost.com/${vendor.event_photos}`}
        alt={`${vendor.company_name} event`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_IMAGE_PATH;
        }}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {vendor.company_name}
        </h2>
        <p className="text-gray-600 flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-blue-500" />
          {vendor.business_address}
        </p>
        <p className="text-green-700 font-semibold">
          Starting from: ₹{vendor.pricing_per_event.toLocaleString()}
        </p>
        <div className="mt-3 flex items-center">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-gray-700 font-medium">
            {vendor.average_rating} Rating
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Catering Vendor Marketplace
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center relative w-full md:w-2/3">
              <FaSearch className="absolute left-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="w-full md:w-1/3">
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.length > 0 ? (
              filteredVendors.map(renderVendorCard)
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No vendors found. Try adjusting your search criteria.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

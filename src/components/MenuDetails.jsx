import React from "react";
import { useParams } from "react-router-dom";

const MenuDetails = () => {
  const { id } = useParams();
  return (
    <div className="bg-white py-10 px-5 text-center">
      <h1 className="text-3xl font-bold text-green-600">Menu Details for ID: {id}</h1>
      <p className="text-black mt-4">Here you can display detailed information about the menu.</p>
    </div>
  );
};

export default MenuDetails;

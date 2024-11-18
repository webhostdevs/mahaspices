import React, { useState } from "react";

const MenuItemForm = () => {
  const [itemCount, setItemCount] = useState(0);
  const [formData, setFormData] = useState([]);

  const menuOptions = {
    "Cocktail Menu": [
      "Cocktail Menu Diamond Exotic",
      "Cocktail Menu Standard",
    ],
    "Diamond Menu": ["Veg Diamond Exotic", "Non-Veg Diamond Exotic"],
    "Gold Menu": ["Veg Gold Menu", "Non-Veg Gold Menu"],
    "Silver Menu": ["Veg Silver Menu", "Non-Veg Silver Menu"],
  };

  const handleItemCountChange = (e) => {
    let count = parseInt(e.target.value, 10);

    // Ensure count is a positive integer, or default to 1
    if (isNaN(count) || count <= 0) {
      count = 1;  // Default to 1 if the input is invalid or 0
    }

    setItemCount(count);
    setFormData(Array(count).fill({}));  // Create an array of the given length
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...formData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    setFormData(updatedData);
  };

  const handleCheckboxChange = (index, field, value, parentField = null) => {
    const updatedData = [...formData];
    if (parentField) {
      updatedData[index][parentField] = updatedData[index][parentField] || {};
      updatedData[index][parentField][field] = value;
    } else {
      updatedData[index][field] = value;
    }
    setFormData(updatedData);
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form Data before submit:", formData); // Add this log for debugging

    const formDataWithFiles = new FormData();
    formData.forEach((item, idx) => {
      formDataWithFiles.append(`items[${idx}]`, JSON.stringify(item));
      if (item.image) {
        formDataWithFiles.append(`file_${idx}`, item.image);
      }
    });

    fetch("http://bookmycater.freewebhostmost.com/submititems.php", {
      method: "POST",
      body: formDataWithFiles,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // or response.json() depending on the data format
      })
      .then((data) => {
        console.log(data); // Process the response data
        setAlertMessage("Items added successfully!"); // Success alert
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setAlertMessage("There was an error submitting the form. Please try again."); // Error alert
      });
  };

  
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label className="block text-green-700 font-semibold mb-2">
          Number of items:
        </label>
        <input
          type="number"
          value={itemCount}
          onChange={handleItemCountChange}
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {formData.map((item, index) => (
        <div
          key={index}
          className="p-4 border border-green-300 rounded-md mb-6 bg-green-50"
        >
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Item {index + 1}
          </h3>

          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">
              Item Name:
            </label>
            <input
              type="text"
              onChange={(e) =>
                handleInputChange(index, "itemName", e.target.value)
              }
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">
              Menu Type:
            </label>
            <div>
              {Object.keys(menuOptions).map((menuType) => (
                <div key={menuType} className="mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(
                          index,
                          menuType,
                          e.target.checked,
                          "menuType"
                        )
                      }
                      className="mr-2 text-green-500 focus:ring-green-500"
                    />
                    <label className="text-green-800">{menuType}</label>
                  </div>
                  {item.menuType && item.menuType[menuType] && (
                    <div className="ml-6 mt-2">
                      {menuOptions[menuType].map((subMenu) => (
                        <div key={subMenu} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(
                                index,
                                subMenu,
                                e.target.checked,
                                menuType
                              )
                            }
                            className="mr-2 text-green-500 focus:ring-green-500"
                          />
                          <label className="text-green-600">{subMenu}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">Types:</label>
            <div>
              {["Beverages", "Mocktails", "Welcome Sweets"].map((type) => (
                <div key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(index, type, e.target.checked, "types")
                    }
                    className="mr-2 text-green-500 focus:ring-green-500"
                  />
                  <label className="text-green-800">{type}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">Price:</label>
            <input
              type="number"
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-700 font-medium mb-2">
              Item Image:
            </label>
            <input
              type="file"
              onChange={(e) =>
                handleInputChange(index, "image", e.target.files[0])
              }
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default MenuItemForm;

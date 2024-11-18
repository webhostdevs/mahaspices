import React, { useState } from "react";
import { CheckSquare, Square, PlusCircle } from "lucide-react";

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
    if (isNaN(count) || count <= 0) {
      count = 1;
    }
    setItemCount(count);
    setFormData(Array(count).fill({}));
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
      updatedData[index] = {
        ...updatedData[index],
        [parentField]: {
          ...updatedData[index]?.[parentField],
          [field]: value,
        },
      };
    } else {
      updatedData[index] = {
        ...updatedData[index],
        [field]: value,
      };
    }
    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const CustomCheckbox = ({ checked, onChange, label, className = "" }) => (
    <div 
      className={`flex items-center space-x-2 cursor-pointer ${className}`}
      onClick={() => onChange(!checked)}
    >
      {checked ? (
        <CheckSquare className="w-5 h-5 text-green-600" />
      ) : (
        <Square className="w-5 h-5 text-gray-400" />
      )}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );

  // Custom Card component to replace the imported Card components
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="border-b pb-4 mb-4">{children}</div>
  );

  const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-800">{children}</h3>
  );

  const CardContent = ({ children }) => (
    <div className="space-y-4">{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Menu Item Management</h1>
          <p className="mt-2 text-gray-600">Add and configure menu items for your catering service</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Number of Items</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="number"
                value={itemCount}
                onChange={handleItemCountChange}
                placeholder="Enter number of items"
                min="1"
                className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
              />
            </CardContent>
          </Card>

          {formData.map((item, index) => (
            <Card key={index} className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl font-semibold">Item {index + 1}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Item Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
                    placeholder="Enter item name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                </div>

                {/* Menu Type Selection */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Type
                  </label>
                  <div className="space-y-4">
                    {Object.keys(menuOptions).map((menuType) => (
                      <div key={menuType} className="space-y-2">
                        <CustomCheckbox
                          checked={item?.menuType?.[menuType] || false}
                          onChange={(checked) =>
                            handleCheckboxChange(index, menuType, checked, "menuType")
                          }
                          label={menuType}
                        />
                        
                        {item?.menuType?.[menuType] && (
                          <div className="ml-6 space-y-2">
                            {menuOptions[menuType].map((subMenu) => (
                              <CustomCheckbox
                                key={subMenu}
                                checked={item?.[menuType]?.[subMenu] || false}
                                onChange={(checked) =>
                                  handleCheckboxChange(index, subMenu, checked, menuType)
                                }
                                label={subMenu}
                                className="ml-4"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Types Selection */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Types
                  </label>
                  <div className="space-y-2">
                    {["Beverages", "Mocktails", "Welcome Sweets"].map((type) => (
                      <CustomCheckbox
                        key={type}
                        checked={item?.types?.[type] || false}
                        onChange={(checked) =>
                          handleCheckboxChange(index, type, checked, "types")
                        }
                        label={type}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(index, "price", e.target.value)}
                    placeholder="Enter price"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Item Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleInputChange(index, "image", e.target.files[0])}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            disabled={formData.length === 0}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Submit Menu Items</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;

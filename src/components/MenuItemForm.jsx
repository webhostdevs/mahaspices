import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
        // Add success notification here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Add error notification here
      });
  };

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
              <Input
                type="number"
                value={itemCount}
                onChange={handleItemCountChange}
                placeholder="Enter number of items"
                min="1"
                className="max-w-xs"
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
                  <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                  <Input
                    id={`item-name-${index}`}
                    type="text"
                    onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
                    placeholder="Enter item name"
                  />
                </div>

                {/* Menu Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Menu Type</Label>
                  <div className="grid gap-4">
                    {Object.keys(menuOptions).map((menuType) => (
                      <div key={menuType} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${menuType}-${index}`}
                            checked={item?.menuType?.[menuType] || false}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(index, menuType, checked, "menuType")
                            }
                          />
                          <Label
                            htmlFor={`${menuType}-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {menuType}
                          </Label>
                        </div>
                        
                        {item?.menuType?.[menuType] && (
                          <div className="ml-6 grid gap-2">
                            {menuOptions[menuType].map((subMenu) => (
                              <div key={subMenu} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${subMenu}-${index}`}
                                  checked={item?.[menuType]?.[subMenu] || false}
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange(index, subMenu, checked, menuType)
                                  }
                                />
                                <Label
                                  htmlFor={`${subMenu}-${index}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {subMenu}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Types Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Types</Label>
                  <div className="grid gap-2">
                    {["Beverages", "Mocktails", "Welcome Sweets"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${type}-${index}`}
                          checked={item?.types?.[type] || false}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(index, type, checked, "types")
                          }
                        />
                        <Label
                          htmlFor={`${type}-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor={`price-${index}`}>Price</Label>
                  <Input
                    id={`price-${index}`}
                    type="number"
                    onChange={(e) => handleInputChange(index, "price", e.target.value)}
                    placeholder="Enter price"
                    min="0"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor={`image-${index}`}>Item Image</Label>
                  <Input
                    id={`image-${index}`}
                    type="file"
                    onChange={(e) => handleInputChange(index, "image", e.target.files[0])}
                    className="cursor-pointer"
                    accept="image/*"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={formData.length === 0}
          >
            Submit Menu Items
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;

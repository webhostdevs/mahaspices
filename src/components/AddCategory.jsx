  // import React, { useState } from 'react';
// import { Upload, X } from 'lucide-react';

// const AddCategory = () => {
//   const [formData, setFormData] = useState({
//     categoryName: '',
//     categoryImage: null
//   });
//   const [previewURL, setPreviewURL] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, categoryImage: file }));
//       setPreviewURL(URL.createObjectURL(file));
//     }
//   };

//   const clearImage = () => {
//     setFormData(prev => ({ ...prev, categoryImage: null }));
//     setPreviewURL('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage({ type: '', text: '' });

//     try {
//       const formDataWithFiles = new FormData();
//       formDataWithFiles.append('categoryName', formData.categoryName);
//       if (formData.categoryImage) {
//         formDataWithFiles.append('categoryImage', formData.categoryImage);
//       }

//       const response = await fetch("http://bookmycater.freewebhostmost.com/submitCategory.php", {
//         method: "POST",
//         body: formDataWithFiles,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setMessage({ type: 'success', text: 'Category added successfully!' });
//         setFormData({ categoryName: '', categoryImage: null });
//         setPreviewURL('');
//       } else {
//         setMessage({ type: 'error', text: data.message || 'Failed to add category' });
//       }
//     } catch (error) {
//       setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-lg shadow-xl p-8">
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
//             Add New Category
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Category Name Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category Name
//               </label>
//               <input
//                 type="text"
//                 value={formData.categoryName}
//                 onChange={(e) => setFormData(prev => ({ ...prev, categoryName: e.target.value }))}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter category name"
//                 required
//               />
//             </div>

//             {/* Image Upload Section */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category Image
//               </label>
//               <div className="mt-2">
//                 {!previewURL ? (
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="cursor-pointer flex flex-col items-center"
//                     >
//                       <Upload className="h-12 w-12 text-gray-400" />
//                       <span className="mt-2 text-sm text-gray-500">
//                         Click to upload image
//                       </span>
//                     </label>
//                   </div>
//                 ) : (
//                   <div className="relative">
//                     <img
//                       src={previewURL}
//                       alt="Preview"
//                       className="w-full h-48 object-cover rounded-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={clearImage}
//                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Message Display */}
//             {message.text && (
//               <div
//                 className={`p-4 rounded-md ${
//                   message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                 isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//               }`}
//             >
//               {isSubmitting ? 'Adding Category...' : 'Add Category'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryImage: null
  });
  const [previewURL, setPreviewURL] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, categoryImage: file }));
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, categoryImage: null }));
    setPreviewURL('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const formDataWithFiles = new FormData();
    formDataWithFiles.append('categoryName', formData.categoryName);
    if (formData.categoryImage) {
      formDataWithFiles.append('categoryImage', formData.categoryImage);
    }

    try {
      // First, let's try a test request to check if the server is reachable
      const testResponse = await fetch("http://bookmycater.freewebhostmost.com/submitCategory.php", {
        method: 'OPTIONS'
      });
      console.log('CORS pre-flight response:', testResponse.status);

      // Now let's make the actual request
      const response = await fetch("https://bookmycater.freewebhostmost.com/submitCategory.php", {
          method: "POST",
          body: formDataWithFiles,
      });


      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (e) {
        console.error('JSON parse error:', e);
        throw new Error('Invalid JSON response from server');
      }

      if (data.success) {
        setMessage({ type: 'success', text: 'Category added successfully!' });
        setFormData({ categoryName: '', categoryImage: null });
        setPreviewURL('');
      } else {
        throw new Error(data.message || 'Server returned unsuccessful response');
      }
    } catch (error) {
      console.error('Detailed error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      setMessage({
        type: 'error',
        text: `Submission failed: ${error.message}. Please check console for details.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Add New Category
          </h2>

          {/* Debug Info */}
          <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
            <p>Server Status: {isSubmitting ? 'Submitting...' : 'Ready'}</p>
            <p>Form Data: {JSON.stringify({
              categoryName: formData.categoryName,
              hasImage: !!formData.categoryImage
            }, null, 2)}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, categoryName: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              <div className="mt-2">
                {!previewURL ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        Click to upload image
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Adding Category...' : 'Add Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ShopRedeemPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [userCoins, setUserCoins] = useState(1000); // Default coins for demo
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [redeemHistory, setRedeemHistory] = useState<Array<{
    id: number;
    productName: string;
    price: number;
    date: string;
    status: string;
  }>>([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "digital",
    type: "digital",
    stock: "",
    image: "",
    shipping: "",
    sizes: [] as string[],
    colors: [] as string[],
    capacity: "",
    material: "",
    batteryLife: "",
    features: [] as string[],
    compatibility: [] as string[],
    laptopCompartment: "",
    available: true
  });
  const [tempSizes, setTempSizes] = useState("");
  const [tempColors, setTempColors] = useState("");
  const [tempFeatures, setTempFeatures] = useState("");
  const [tempCompatibility, setTempCompatibility] = useState("");
  
  // Image upload state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load user data and products from localStorage and API
  useEffect(() => {
    const savedCoins = localStorage.getItem('user-coins');
    if (savedCoins) {
      setUserCoins(parseInt(savedCoins));
    }

    const savedHistory = localStorage.getItem('redeem-history');
    if (savedHistory) {
      setRedeemHistory(JSON.parse(savedHistory));
    }

    // Load products from API
    loadProductsFromAPI();
  }, []);

  // Save coins to localStorage
  useEffect(() => {
    localStorage.setItem('user-coins', userCoins.toString());
  }, [userCoins]);

  // Load products from API
  const loadProductsFromAPI = async () => {
    try {
      const response = await fetch('/api/shopProducts');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to load products from API');
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const categories = [
    { id: "all", name: "All Products", icon: "" },
    { id: "digital", name: "Digital", icon: "" },
    { id: "merchandise", name: "Merchandise", icon: "" },
    { id: "gaming", name: "Gaming", icon: "" },
    { id: "premium", name: "Premium", icon: "" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRedeem = (product: any) => {
    if (userCoins >= product.price) {
      setSelectedProduct(product);
      setShowRedeemModal(true);
    } else {
      alert(" Insufficient coins! You need " + product.price + " coins to redeem this product.");
    }
  };

  const confirmRedeem = () => {
    if (!selectedProduct) return;

    // Deduct coins
    const newCoins = userCoins - selectedProduct.price;
    setUserCoins(newCoins);

    // Add to redeem history
    const newRedeem = {
      id: Date.now(),
      productName: selectedProduct.name,
      price: selectedProduct.price,
      date: new Date().toLocaleDateString(),
      status: "Redeemed"
    };
    
    const newHistory = [newRedeem, ...redeemHistory];
    setRedeemHistory(newHistory);
    localStorage.setItem('redeem-history', JSON.stringify(newHistory));

    // Update product stock
    setProducts(prev => prev.map(p => 
      p.id === selectedProduct.id ? { ...p, stock: p.stock - 1 } : p
    ));

    setShowRedeemModal(false);
    setSelectedProduct(null);
    
    alert(` Successfully redeemed ${selectedProduct.name}!`);
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : "";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "digital": return "text-blue-600 bg-blue-100";
      case "merchandise": return "text-purple-600 bg-purple-100";
      case "gaming": return "text-green-600 bg-green-100";
      case "premium": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  // Image upload functions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setUploadedImageFile(file);
        setNewProduct({...newProduct, image: e.target?.result as string});
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setUploadedImageFile(null);
    setNewProduct({...newProduct, image: ""});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add Product Functions with API integration
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.stock) {
      alert("Please fill in all required fields!");
      return;
    }

    // Parse arrays from comma-separated strings
    const sizes = tempSizes ? tempSizes.split(',').map(s => s.trim()).filter(s => s) : [];
    const colors = tempColors ? tempColors.split(',').map(c => c.trim()).filter(c => c) : [];
    const features = tempFeatures ? tempFeatures.split(',').map(f => f.trim()).filter(f => f) : [];
    const compatibility = tempCompatibility ? tempCompatibility.split(',').map(c => c.trim()).filter(c => c) : [];

    const productToAdd: any = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      type: newProduct.type,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || "/shop.svg",
      available: newProduct.available
    };

    // Add physical product specific fields only if type is physical
    if (newProduct.type === "physical") {
      productToAdd.shipping = newProduct.shipping || "";
      productToAdd.sizes = sizes;
      productToAdd.colors = colors;
      productToAdd.capacity = newProduct.capacity || "";
      productToAdd.material = newProduct.material || "";
      productToAdd.batteryLife = newProduct.batteryLife || "";
      productToAdd.features = features;
      productToAdd.compatibility = compatibility;
      productToAdd.laptopCompartment = newProduct.laptopCompartment || "";
    }

    try {
      // Save to API
      const response = await fetch('/api/shopProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToAdd),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        
        // Update local state
        setProducts(prev => [savedProduct, ...prev]);
        
        // Reset form
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "digital",
          type: "digital",
          stock: "",
          image: "",
          shipping: "",
          sizes: [],
          colors: [],
          capacity: "",
          material: "",
          batteryLife: "",
          features: [],
          compatibility: [],
          laptopCompartment: "",
          available: true
        });
        setTempSizes("");
        setTempColors("");
        setTempFeatures("");
        setTempCompatibility("");
        setUploadedImage(null);
        setUploadedImageFile(null);
        
        setShowAddProductModal(false);
        alert(" Product added successfully and saved to database!");
      } else {
        alert(" Failed to save product to database. Please try again.");
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert(" Error saving product. Please try again.");
    }
  };

  const resetAddProductForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "digital",
      type: "digital",
      stock: "",
      image: "",
      shipping: "",
      sizes: [],
      colors: [],
      capacity: "",
      material: "",
      batteryLife: "",
      features: [],
      compatibility: [],
      laptopCompartment: "",
      available: true
    });
    setTempSizes("");
    setTempColors("");
    setTempFeatures("");
    setTempCompatibility("");
    setUploadedImage(null);
    setUploadedImageFile(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/shop.svg" alt="Shop Redeem" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Shop Redeem</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Add Product Button */}
          <Button 
            onClick={() => setShowAddProductModal(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <span></span>
            <span>Add Product</span>
          </Button>
          
          {/* User Coins Display */}
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
            <span className="text-yellow-600 font-semibold"></span>
            <span className="text-yellow-800 font-bold text-lg">{userCoins}</span>
            <span className="text-yellow-600 text-sm">coins</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "secondary" : "default"}
              size="sm"
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = `/shop-redeem/${product.id}`}>
            <div className="flex items-center justify-between mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                  {getCategoryIcon(product.category)} {product.category}
                </span>
                {product.type === "physical" && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                     Physical
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            
            {/* Physical Product Details */}
            {product.type === "physical" && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium"> {product.shipping}</span>
                </div>
                {product.sizes && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Sizes:</span> {product.sizes.join(", ")}
                  </div>
                )}
                {product.colors && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Colors:</span> {product.colors.join(", ")}
                  </div>
                )}
                {product.capacity && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Capacity:</span> {product.capacity}
                  </div>
                )}
                {product.material && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Material:</span> {product.material}
                  </div>
                )}
                {product.batteryLife && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Battery Life:</span> {product.batteryLife}
                  </div>
                )}
                {product.features && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Features:</span> {product.features.join(", ")}
                  </div>
                )}
                {product.compatibility && (
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Compatibility:</span> {product.compatibility.join(", ")}
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 font-bold"></span>
                <span className="text-lg font-bold">{product.price}</span>
              </div>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRedeem(product);
                }}
                disabled={!product.available || product.stock === 0 || userCoins < product.price}
                className="w-full"
                variant={userCoins >= product.price ? "secondary" : "secondary"}
              >
                {userCoins >= product.price ? " Redeem Now" : " Insufficient Coins"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adding some products or adjusting your search filter</p>
        </div>
      )}

      {/* Redeem History */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4"> Redeem History</h2>
        {redeemHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No redemption history yet. Start redeeming products to see your history!</p>
        ) : (
          <div className="space-y-3">
            {redeemHistory.map((redeem) => (
              <div key={redeem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600"></span>
                  <div>
                    <div className="font-semibold">{redeem.productName}</div>
                    <div className="text-sm text-gray-500">{redeem.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-yellow-600"> {redeem.price}</div>
                  <div className="text-sm text-green-600">{redeem.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Confirm Redemption</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="h-12 w-12" />
                <div>
                  <div className="font-semibold">{selectedProduct.name}</div>
                  <div className="text-sm text-gray-600">{selectedProduct.description}</div>
                </div>
              </div>
              
              <Separator />
              
              {/* Physical Product Shipping Info */}
              {selectedProduct.type === "physical" && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1"> Physical Product</div>
                    <div> {selectedProduct.shipping}</div>
                    {selectedProduct.sizes && (
                      <div>Sizes: {selectedProduct.sizes.join(", ")}</div>
                    )}
                    {selectedProduct.colors && (
                      <div>Colors: {selectedProduct.colors.join(", ")}</div>
                    )}
                    {selectedProduct.capacity && (
                      <div>Capacity: {selectedProduct.capacity}</div>
                    )}
                    {selectedProduct.material && (
                      <div>Material: {selectedProduct.material}</div>
                    )}
                    {selectedProduct.batteryLife && (
                      <div>Battery Life: {selectedProduct.batteryLife}</div>
                    )}
                    {selectedProduct.features && (
                      <div>Features: {selectedProduct.features.join(", ")}</div>
                    )}
                    {selectedProduct.compatibility && (
                      <div>Compatibility: {selectedProduct.compatibility.join(", ")}</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span>Price:</span>
                <span className="font-bold text-yellow-600"> {selectedProduct.price}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Your Coins:</span>
                <span className="font-bold">{userCoins}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Remaining:</span>
                <span className="font-bold text-green-600">{userCoins - selectedProduct.price}</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowRedeemModal(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmRedeem}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {selectedProduct.type === "physical" ? " Order Now" : "Confirm Redemption"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold"> Add New Product</h3>
              <Button
                onClick={() => setShowAddProductModal(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="digital">Digital</option>
                    <option value="merchandise">Merchandise</option>
                    <option value="gaming">Gaming</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (coins) *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Product Type *</label>
                  <select
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="digital">Digital</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                
                {/* Drag and Drop Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={uploadedImage}
                          alt="Uploaded product"
                          className="h-32 w-32 object-cover rounded-lg mx-auto"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          
                        </button>
                      </div>
                      <p className="text-sm text-green-600"> Image uploaded successfully!</p>
                      <p className="text-xs text-gray-500">
                        File: {uploadedImageFile?.name} ({((uploadedImageFile?.size || 0) / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-4xl"></div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">Drop your image here</p>
                        <p className="text-sm text-gray-500">or click to browse files</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2"
                      >
                         Browse Files
                      </Button>
                      <p className="text-xs text-gray-400">
                        Supports: JPG, PNG, GIF, WebP (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Alternative: Image URL Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Or enter Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg (optional)"
                />
              </div>

              {/* Physical Product Specific Fields */}
              {newProduct.type === "physical" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800"> Physical Product Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Shipping Info</label>
                      <input
                        type="text"
                        value={newProduct.shipping}
                        onChange={(e) => setNewProduct({...newProduct, shipping: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Free shipping worldwide"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Material</label>
                      <input
                        type="text"
                        value={newProduct.material}
                        onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Cotton, Steel, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Sizes (comma-separated)</label>
                      <input
                        type="text"
                        value={tempSizes}
                        onChange={(e) => setTempSizes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., S, M, L, XL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Colors (comma-separated)</label>
                      <input
                        type="text"
                        value={tempColors}
                        onChange={(e) => setTempColors(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Black, White, Navy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Capacity</label>
                      <input
                        type="text"
                        value={newProduct.capacity}
                        onChange={(e) => setNewProduct({...newProduct, capacity: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 500ml, 15 inch"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Battery Life</label>
                      <input
                        type="text"
                        value={newProduct.batteryLife}
                        onChange={(e) => setNewProduct({...newProduct, batteryLife: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 24 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
                    <input
                      type="text"
                      value={tempFeatures}
                      onChange={(e) => setTempFeatures(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Wireless Charging, Noise Cancellation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Compatibility (comma-separated)</label>
                    <input
                      type="text"
                      value={tempCompatibility}
                      onChange={(e) => setTempCompatibility(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., iPhone, Android, Windows, Mac"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={newProduct.available}
                  onChange={(e) => setNewProduct({...newProduct, available: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="available" className="text-sm font-medium">
                  Product is available for redemption
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowAddProductModal(false);
                  resetAddProductForm();
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                variant="primary"
                className="flex-1"
              >
                 Add Product
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Product type definition
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  stock: number;
  type: "digital" | "physical";
  shipping?: string;
  sizes?: string[];
  colors?: string[];
  capacity?: string;
  material?: string;
  batteryLife?: string;
  features?: string[];
  compatibility?: string[];
  createdAt: string;
}

export default function ShopProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "digital",
    image: "",
    available: true,
    stock: 1,
    type: "digital" as "digital" | "physical",
    shipping: "",
    sizes: [] as string[],
    colors: [] as string[],
    capacity: "",
    material: "",
    batteryLife: "",
    features: [] as string[],
    compatibility: [] as string[]
  });

  const categories = [
    { id: "digital", name: "Digital", icon: "💻" },
    { id: "merchandise", name: "Merchandise", icon: "👕" },
    { id: "gaming", name: "Gaming", icon: "🎮" },
    { id: "premium", name: "Premium", icon: "⭐" }
  ];

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('shop-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with sample products including AirPods
      const initialProducts: Product[] = [
        {
          id: 1,
          name: "Softcode AirPods",
          description: "Premium wireless earbuds with Softcode branding. Perfect for coding sessions, music, and calls. Active noise cancellation and 24-hour battery life.",
          price: 8000,
          category: "merchandise",
          image: "/airpod.webp",
          available: true,
          stock: 15,
          type: "physical",
          shipping: "Free shipping worldwide",
          batteryLife: "24 hours",
          features: ["Active Noise Cancellation", "Wireless Charging", "Spatial Audio"],
          compatibility: ["iPhone", "Android", "Windows", "Mac"],
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Softcode T-Shirt",
          description: "Premium cotton t-shirt with Softcode logo. Available in S, M, L, XL sizes. Perfect for coding enthusiasts!",
          price: 2500,
          category: "merchandise",
          image: "/shop.svg",
          available: true,
          stock: 50,
          type: "physical",
          shipping: "Free shipping worldwide",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black", "White", "Navy"],
          createdAt: new Date().toISOString()
        }
      ];
      setProducts(initialProducts);
      localStorage.setItem('shop-products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem('shop-products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, createdAt: editingProduct.createdAt }
          : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct: Product = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "digital",
      image: "",
      available: true,
      stock: 1,
      type: "digital",
      shipping: "",
      sizes: [],
      colors: [],
      capacity: "",
      material: "",
      batteryLife: "",
      features: [],
      compatibility: []
    });
    setShowAddForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      available: product.available,
      stock: product.stock,
      type: product.type,
      shipping: product.shipping || "",
      sizes: product.sizes || [],
      colors: product.colors || [],
      capacity: product.capacity || "",
      material: product.material || "",
      batteryLife: product.batteryLife || "",
      features: product.features || [],
      compatibility: product.compatibility || []
    });
  };

  const handleDelete = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleToggleAvailability = (productId: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    ));
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : "📦";
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/shop.svg" alt="Shop Products Admin" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Shop Products Management</h1>
        </div>
        
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          {showAddForm ? "❌ Cancel" : "➕ Add Product"}
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      {showAddForm && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Product Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as "digital" | "physical"})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="digital">💻 Digital</option>
                  <option value="physical">📦 Physical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Price (coins)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="/image.svg"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Available</span>
                </label>
              </div>
            </div>
            
            {/* Physical Product Fields */}
            {formData.type === "physical" && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">📦 Physical Product Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Shipping Info</label>
                    <input
                      type="text"
                      value={formData.shipping}
                      onChange={(e) => setFormData({...formData, shipping: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Free shipping worldwide"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sizes (comma separated)</label>
                    <input
                      type="text"
                      value={formData.sizes.join(", ")}
                      onChange={(e) => setFormData({...formData, sizes: e.target.value.split(",").map(s => s.trim()).filter(s => s)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="S, M, L, XL"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Colors (comma separated)</label>
                    <input
                      type="text"
                      value={formData.colors.join(", ")}
                      onChange={(e) => setFormData({...formData, colors: e.target.value.split(",").map(s => s.trim()).filter(s => s)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Black, White, Navy"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="500ml, 15 inch, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Material</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({...formData, material: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Cotton, Stainless Steel, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Battery Life</label>
                    <input
                      type="text"
                      value={formData.batteryLife}
                      onChange={(e) => setFormData({...formData, batteryLife: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="24 hours, 8 hours, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Features (comma separated)</label>
                    <input
                      type="text"
                      value={formData.features.join(", ")}
                      onChange={(e) => setFormData({...formData, features: e.target.value.split(",").map(s => s.trim()).filter(s => s)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Active Noise Cancellation, Wireless Charging, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Compatibility (comma separated)</label>
                    <input
                      type="text"
                      value={formData.compatibility.join(", ")}
                      onChange={(e) => setFormData({...formData, compatibility: e.target.value.split(",").map(s => s.trim()).filter(s => s)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="iPhone, Android, Windows, Mac, etc."
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
              
              {editingProduct && (
                <Button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      description: "",
                      price: 0,
                      category: "digital",
                      image: "",
                      available: true,
                      stock: 1,
                      type: "digital",
                      shipping: "",
                      sizes: [],
                      colors: [],
                      capacity: "",
                      material: "",
                      batteryLife: "",
                      features: [],
                      compatibility: []
                    });
                  }}
                  variant="secondary"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      {/* Products List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">📦 Current Products</h2>
        
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No products added yet. Add your first product to get started!</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image || "/shop.svg"} 
                      alt={product.name} 
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                          {getCategoryIcon(product.category)} {product.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.type === "physical" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}>
                          {product.type === "physical" ? "📦 Physical" : "💻 Digital"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-yellow-600">🪙 {product.price}</div>
                    <div className="text-sm text-gray-500">Stock: {product.stock}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                {/* Physical Product Details */}
                {product.type === "physical" && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      {product.shipping && <div className="mb-1">🚚 {product.shipping}</div>}
                      {product.sizes && <div className="mb-1">Sizes: {product.sizes.join(", ")}</div>}
                      {product.colors && <div className="mb-1">Colors: {product.colors.join(", ")}</div>}
                      {product.capacity && <div className="mb-1">Capacity: {product.capacity}</div>}
                      {product.material && <div className="mb-1">Material: {product.material}</div>}
                      {product.batteryLife && <div className="mb-1">🔋 Battery: {product.batteryLife}</div>}
                      {product.features && <div className="mb-1">✨ Features: {product.features.join(", ")}</div>}
                      {product.compatibility && <div className="mb-1">🔌 Compatible: {product.compatibility.join(", ")}</div>}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.available ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
                    }`}>
                      {product.available ? "✅ Available" : "❌ Unavailable"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Created: {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleToggleAvailability(product.id)}
                      variant="secondary"
                      size="sm"
                    >
                      {product.available ? "Disable" : "Enable"}
                    </Button>
                    
                    <Button
                      onClick={() => handleEdit(product)}
                      variant="secondary"
                      size="sm"
                    >
                      ✏️ Edit
                    </Button>
                    
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="secondary"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{products.length}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.available).length}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {products.filter(p => p.type === "physical").length}
          </div>
          <div className="text-sm text-gray-600">Physical Products</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {products.reduce((sum, p) => sum + p.price, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Value</div>
        </Card>
      </div>

      <Link href="/admin" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Admin
      </Link>
    </div>
  );
} 
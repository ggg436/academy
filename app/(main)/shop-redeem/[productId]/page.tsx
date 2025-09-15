"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample products data (in real app, this would come from API)
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Softcode AirPods",
    description: "Premium wireless earbuds with Softcode branding. Perfect for coding sessions, music, and calls. Active noise cancellation and 24-hour battery life.",
    longDescription: "Experience premium audio quality with our Softcode-branded AirPods. These wireless earbuds feature cutting-edge technology including active noise cancellation, spatial audio, and wireless charging. Perfect for developers who need to focus during coding sessions or enjoy music while working. The 24-hour battery life ensures you never run out of power during long development sessions.",
    price: 8000,
    category: "merchandise",
    image: "/airpod.webp",
    images: ["/airpod.webp", "/airpod.webp", "/airpod.webp", "/airpod.webp"], // Multiple angles
    available: true,
    stock: 15,
    type: "physical",
    shipping: "Free shipping worldwide",
    batteryLife: "24 hours",
    features: ["Active Noise Cancellation", "Wireless Charging", "Spatial Audio", "24-Hour Battery Life", "Premium Sound Quality", "Softcode Branding"],
    compatibility: ["iPhone", "Android", "Windows", "Mac"],
    colors: ["White", "Black", "Space Gray"],
    sizes: ["One Size Fits All"],
    material: "Premium Plastic & Metal",
    rating: 4.8,
    reviews: 127,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Softcode T-Shirt",
    description: "Premium cotton t-shirt with Softcode logo. Available in S, M, L, XL sizes. Perfect for coding enthusiasts!",
    longDescription: "Show your coding pride with our premium Softcode branded t-shirt. Made from 100% organic cotton for maximum comfort during long coding sessions. The Softcode logo is prominently displayed, making it perfect for coding meetups, hackathons, or casual wear. Available in multiple sizes and colors to suit your style.",
    price: 2500,
    category: "merchandise",
    image: "/shop.svg",
    images: ["/shop.svg", "/shop.svg", "/shop.svg", "/shop.svg"],
    available: true,
    stock: 50,
    type: "physical",
    shipping: "Free shipping worldwide",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    material: "100% Organic Cotton",
    rating: 4.6,
    reviews: 89,
    createdAt: new Date().toISOString()
  }
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.productId as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [userCoins, setUserCoins] = useState(1000);
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  const product = PRODUCTS_DATA.find(p => p.id === productId);

  // Load user coins from localStorage
  useEffect(() => {
    const savedCoins = localStorage.getItem('user-coins');
    if (savedCoins) {
      setUserCoins(parseInt(savedCoins));
    }
  }, []);

  // Set default selections
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/shop-redeem" className="text-blue-600 hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleRedeem = () => {
    if (userCoins >= product.price) {
      setShowRedeemModal(true);
    } else {
      alert("❌ Insufficient coins! You need " + product.price + " coins to redeem this product.");
    }
  };

  const confirmRedeem = () => {
    // Deduct coins
    const newCoins = userCoins - product.price;
    setUserCoins(newCoins);
    localStorage.setItem('user-coins', newCoins.toString());

    // Add to redeem history
    const newRedeem = {
      id: Date.now(),
      productName: product.name,
      price: product.price,
      date: new Date().toLocaleDateString(),
      status: "Ordered"
    };
    
    const savedHistory = localStorage.getItem('redeem-history');
    const redeemHistory = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [newRedeem, ...redeemHistory];
    localStorage.setItem('redeem-history', JSON.stringify(newHistory));

    setShowRedeemModal(false);
    alert(`🎉 Successfully ordered ${product.name}! Your order has been placed.`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.898 3.26 1.127-6.565L.49 6.74l6.615-.96L10 0l2.895 5.78 6.615.96-4.739 4.155 1.127 6.565z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/shop-redeem" className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">Product Details</h1>
            </div>
            
            {/* User Coins Display */}
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
              <span className="text-yellow-600 font-semibold">🪙</span>
              <span className="text-yellow-800 font-bold text-lg">{userCoins}</span>
              <span className="text-yellow-600 text-sm">coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/shop-redeem" className="hover:text-blue-600">Shop</Link>
            <span>/</span>
            <Link href={`/shop-redeem?category=${product.category}`} className="hover:text-blue-600 capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                  {product.category}
                </span>
                {product.type === "physical" && (
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                    📦 Physical Product
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-yellow-600">🪙 {product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-600">coins</span>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Product Options */}
            {product.colors && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                </button>
              </div>
            </div>

            {/* Product Features */}
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Specifications */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.batteryLife && (
                  <div>
                    <span className="font-medium text-gray-700">Battery Life:</span>
                    <span className="ml-2 text-gray-600">{product.batteryLife}</span>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="font-medium text-gray-700">Material:</span>
                    <span className="ml-2 text-gray-600">{product.material}</span>
                  </div>
                )}
                {product.compatibility && (
                  <div>
                    <span className="font-medium text-gray-700">Compatibility:</span>
                    <span className="ml-2 text-gray-600">{product.compatibility.join(", ")}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Stock:</span>
                  <span className="ml-2 text-gray-600">{product.stock} units available</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Shipping:</span>
                  <span className="ml-2 text-gray-600">{product.shipping}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleRedeem}
                disabled={!product.available || product.stock === 0 || userCoins < product.price}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                size="lg"
              >
                {userCoins >= product.price ? "🛒 Order Now" : "❌ Insufficient Coins"}
              </Button>
              
              {product.stock === 0 && (
                <div className="text-center text-red-600 font-medium">
                  Out of Stock
                </div>
              )}
              
              {userCoins < product.price && (
                <div className="text-center text-red-600 font-medium">
                  You need {product.price - userCoins} more coins
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-6 text-center">Confirm Order</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-lg" />
                <div>
                  <div className="font-semibold text-lg">{product.name}</div>
                  <div className="text-gray-600">{selectedColor} {selectedSize && `- ${selectedSize}`}</div>
                  <div className="text-gray-600">Qty: {quantity}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Price:</span>
                <span className="font-bold text-yellow-600 text-xl">🪙 {(product.price * quantity).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Your Coins:</span>
                <span className="font-bold">{userCoins}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Remaining:</span>
                <span className="font-bold text-green-600">{userCoins - (product.price * quantity)}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
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
                Confirm Order
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 
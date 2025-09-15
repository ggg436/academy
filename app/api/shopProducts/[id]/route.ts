import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo purposes
// In production, this would be stored in a database
let shopProducts = [
  {
    id: 1,
    name: "Premium Course Access",
    description: "Unlock all premium courses for 30 days",
    price: 500,
    category: "education",
    image: "/courses.svg",
    available: true,
    stock: 100,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Custom Avatar",
    description: "Get a unique custom avatar for your profile",
    price: 200,
    category: "cosmetic",
    image: "/avatar.svg",
    available: true,
    stock: 50,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Extra Hearts",
    description: "Get 5 extra hearts for games",
    price: 150,
    category: "gaming",
    image: "/heart.svg",
    available: true,
    stock: 200,
    createdAt: new Date().toISOString()
  }
];

// GET - Get product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const product = shopProducts.find(p => p.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update product by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const productIndex = shopProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    shopProducts[productIndex] = {
      ...shopProducts[productIndex],
      ...body,
      id: id // Ensure ID is preserved
    };
    
    return NextResponse.json(shopProducts[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    const productIndex = shopProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    const deletedProduct = shopProducts.splice(productIndex, 1)[0];
    
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
} 
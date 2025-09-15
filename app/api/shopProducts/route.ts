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

// GET - List all products
export async function GET() {
  try {
    return NextResponse.json(shopProducts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shop products" },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    shopProducts.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create shop product" },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    const productIndex = shopProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    shopProducts[productIndex] = {
      ...shopProducts[productIndex],
      ...updateData,
      id: id // Ensure ID is preserved
    };
    
    return NextResponse.json(shopProducts[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update shop product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }
    
    const productIndex = shopProducts.findIndex(p => p.id === parseInt(id));
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
      { error: "Failed to delete shop product" },
      { status: 500 }
    );
  }
} 
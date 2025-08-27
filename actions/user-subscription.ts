"use server";

import { cookies } from "next/headers";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/shop");

import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

// Helper to get Firebase user ID from cookies
async function getFirebaseUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebase-auth');
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      return authData.uid || null;
    }
  } catch {}
  return null;
}

// Helper to get Firebase user data from cookies
async function getFirebaseUserData(): Promise<{ uid: string; email?: string } | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebase-auth');
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      return authData || null;
    }
  } catch {}
  return null;
}

export const getUserSubscription = async () => {
  const userId = await getFirebaseUserId();

  // Return null instead of throwing error for unauthenticated users
  if (!userId) {
    return null;
  }

  return getLocalStorage(`user-subscription-${userId}`, null);
};

export const createStripeUrl = async () => {
  const userId = await getFirebaseUserId();
  const userData = await getFirebaseUserData();

  if (!userId || !userData) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await getUserSubscription();

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: userData.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "Lingo Pro",
            description: "Unlimited Hearts",
          },
          unit_amount: 2000, // $20.00 USD
          recurring: {
            interval: "month",
          },
        },
      },
    ],
    metadata: {
      userId,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return { data: stripeSession.url };
};

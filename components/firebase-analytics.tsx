"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase-client";

export default function FirebaseAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
} 
"use client";

import React from "react";

type Props = {
  motivation: string;
  fun: string;
  className?: string;
};

export function MotivationFun({ motivation, fun, className }: Props) {
  return (
    <div className={`mt-10 space-y-4 ${className || ""}`}>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="grid grid-cols-[24px_1fr] gap-2 items-start">
          <span className="text-lg leading-none">💡</span>
          <p className="text-blue-700 text-base font-medium">Motivation</p>
          <div className="col-start-2">
            <p className="text-blue-700 text-sm mt-1">{motivation}</p>
          </div>
        </div>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="grid grid-cols-[24px_1fr] gap-2 items-start">
          <span className="text-lg leading-none">😂</span>
          <p className="text-purple-700 text-base font-medium">Fun</p>
          <div className="col-start-2">
            <p className="text-purple-700 text-sm mt-1">{fun}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 

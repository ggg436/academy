"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson15Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState("");

  const handleTryNow = (code: string) => { setRunnerCode(code); setRunnerOpen(true); };

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative pb-32">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{lessonTitle}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Testing & Debugging</h3>
              <p className="text-neutral-700">Testing and debugging are essential skills for any developer. They help ensure your code works correctly and catches issues before they reach production.</p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Writing unit tests with pytest</li>
                    <li>Debugging techniques and tools</li>
                    <li>Test-driven development (TDD)</li>
                    <li>Code coverage and quality metrics</li>
                    <li>Common debugging strategies</li>
                  </ul>
                </div>
              </div>

              <MotivationFun 
                motivation="Professional developers spend 50% of their time testing and debugging. These skills are crucial for building reliable software."
                fun="Testing is like having a safety inspector for your code - it catches problems before they become disasters! "
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Unit Testing with pytest</h3>
              <p className="text-neutral-700">Unit tests verify that individual functions work correctly. <strong>pytest</strong> is the most popular testing framework for Python.</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Basic Test Example:</h4>
                  <CodeSnippet code={`# math_utils.py
def add_numbers(a, b):
    return a + b

def multiply_numbers(a, b):
    return a * b

# test_math_utils.py
import pytest
from math_utils import add_numbers, multiply_numbers

def test_add_numbers():
    assert add_numbers(2, 3) == 5
    assert add_numbers(-1, 1) == 0
    assert add_numbers(0, 0) == 0

def test_multiply_numbers():
    assert multiply_numbers(2, 3) == 6
    assert multiply_numbers(-2, 3) == -6
    assert multiply_numbers(0, 5) == 0`} language="python" />
                </div>
              </div>

              <MotivationFun 
                motivation="Companies like Google and Facebook run millions of tests daily to ensure their code works correctly."
                fun="Tests are like having a robot assistant that checks your work 24/7! "
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Debugging Techniques</h3>
              <p className="text-neutral-700">Debugging is the art of finding and fixing bugs. Good debugging skills save hours of frustration and make you a more effective developer.</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Debugging with print() and pdb:</h4>
                  <CodeSnippet code={`import pdb

def find_max(numbers):
    if not numbers:
        return None
    
    max_num = numbers[0]
    for num in numbers:
        print(f"Checking: {num}, Current max: {max_num}")  # Debug print
        if num > max_num:
            max_num = num
            print(f"New max found: {max_num}")  # Debug print
    
    return max_num

# Using pdb for interactive debugging
def debug_function():
    pdb.set_trace()  # Breakpoint - execution stops here
    result = find_max([3, 1, 4, 1, 5])
    return result`} language="python" />
                </div>
              </div>

              <MotivationFun 
                motivation="The best developers are often the best debuggers. It's a skill that improves with practice."
                fun="Debugging is like being a detective - you follow clues to solve the mystery of the bug! "
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Test-Driven Development (TDD)</h3>
              <p className="text-neutral-700">TDD is a development approach where you write tests <strong>before</strong> writing the actual code. It leads to better design and fewer bugs.</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">TDD Cycle:</h4>
                  <CodeSnippet code={`# 1. Write a failing test first
def test_calculate_discount():
    # This test will fail initially
    assert calculate_discount(100, 10) == 90
    assert calculate_discount(50, 20) == 40

# 2. Write minimal code to make test pass
def calculate_discount(price, discount_percent):
    return price * (1 - discount_percent / 100)

# 3. Refactor and improve
def calculate_discount(price, discount_percent):
    if price < 0 or discount_percent < 0:
        raise ValueError("Price and discount must be positive")
    return price * (1 - discount_percent / 100)`} language="python" />
                </div>
              </div>

              <MotivationFun 
                motivation="TDD leads to 40% fewer bugs and more maintainable code according to industry studies."
                fun="TDD is like building with a blueprint - you know exactly what you're building before you start! "
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Practice Problems</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">1. Write comprehensive tests</h4>
                  <p className="text-blue-700">Create unit tests for a calculator class with edge cases and error conditions.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">2. Debug a complex function</h4>
                  <p className="text-blue-700">Find and fix bugs in a sorting algorithm using debugging techniques.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">3. Practice TDD</h4>
                  <p className="text-blue-700">Build a simple banking system using test-driven development.</p>
                </div>
              </div>
            </div>
          )}

          <LessonNextButton 
            href={currentStep < 5 ? `/lesson/lesson-15/python-testing-${currentStep === 1 ? 'unit-tests' : currentStep === 2 ? 'debugging' : currentStep === 3 ? 'tdd' : 'practice'}` : `/lesson/lesson-15/python-testing-quiz`}
            label={currentStep < 5 ? `Next: ${currentStep === 1 ? 'Unit Tests' : currentStep === 2 ? 'Debugging' : currentStep === 3 ? 'TDD' : 'Practice'} ` : 'Next: Quiz '}
          />
        </div>
      </div>

      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-8 overflow-auto">
          <DialogTitle>Try Now (Python)</DialogTitle>
          <PythonCodeRunner initialCode={runnerCode} height={520} fontSizePx={15} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

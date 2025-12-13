"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PythonCodeRunner from "@/components/python-code-runner";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { LessonNextButton } from "@/components/lesson-next-button";
import { MotivationFun } from "@/components/motivation-fun";

export const PythonLesson14Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
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
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Python Best Practices</h3>
              <p className="text-neutral-700">Writing code that works is one thing, but writing <strong>clean, maintainable, and professional</strong> code is what separates good developers from great ones.</p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Best Practices:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Follow PEP 8 style guidelines</li>
                    <li>Write meaningful variable and function names</li>
                    <li>Use proper documentation (docstrings)</li>
                    <li>Handle errors gracefully</li>
                    <li>Write modular, reusable code</li>
                  </ul>
                </div>
              </div>

              <MotivationFun 
                motivation="Companies like Google, Facebook, and Netflix follow these practices to maintain millions of lines of code."
                fun="Best practices are like good manners for code - they make everything more pleasant to work with! "
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">PEP 8 Style Guidelines</h3>
              <p className="text-neutral-700">PEP 8 is the official style guide for Python code. Following it makes your code <strong>consistent and readable</strong>.</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Good vs Bad Examples:</h4>
                  <CodeSnippet code={`#  Bad: Inconsistent naming and spacing
def calculate_total_price(price,tax_rate):
    return price*(1+tax_rate)

#  Good: Clear naming and proper spacing
def calculate_total_price(price, tax_rate):
    return price * (1 + tax_rate)

#  Bad: Unclear variable names
x = 10
y = 5
z = x + y

#  Good: Descriptive variable names
base_price = 10
tax_amount = 5
total_cost = base_price + tax_amount`} language="python" />
                </div>
              </div>

              <MotivationFun 
                motivation="Consistent code style makes it easier for teams to collaborate and maintain codebases."
                fun="PEP 8 is like having a dress code for your code - everyone looks professional! "
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Documentation with Docstrings</h3>
              <p className="text-neutral-700">Good documentation helps others (and future you) understand what your code does. Python uses <strong>docstrings</strong> for this purpose.</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Well-Documented Function:</h4>
                  <CodeSnippet code={`def calculate_compound_interest(principal, rate, time, compound_frequency=12):
    """
    Calculate compound interest for an investment.
    
    Args:
        principal (float): Initial amount of money
        rate (float): Annual interest rate (as decimal, e.g., 0.05 for 5%)
        time (int): Time period in years
        compound_frequency (int): How many times per year interest is compounded
        
    Returns:
        float: Final amount after compound interest
        
    Example:
        >>> calculate_compound_interest(1000, 0.05, 2)
        1104.7130674412967
    """
    return principal * (1 + rate / compound_frequency) ** (compound_frequency * time)`} language="python" />
                </div>
              </div>

              <MotivationFun 
                motivation="Good documentation is like a good map - it helps you navigate complex code without getting lost."
                fun="Docstrings are like leaving helpful notes for your future self - you'll thank yourself later! "
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Error Handling Best Practices</h3>
              <p className="text-neutral-700">Proper error handling makes your programs <strong>robust and user-friendly</strong>. Always anticipate what could go wrong.</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Robust Error Handling:</h4>
                  <CodeSnippet code={`def safe_divide(a, b):
    """
    Safely divide two numbers with proper error handling.
    """
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Please provide numeric values!")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

# Example usage
print(safe_divide(10, 2))  # 5.0
print(safe_divide(10, 0))  # Error message, returns None`} language="python" />
                </div>
              </div>

              <MotivationFun 
                motivation="Proper error handling prevents crashes and provides meaningful feedback to users."
                fun="Error handling is like having a safety net - it catches you when things go wrong! "
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Practice Problems</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">1. Refactor messy code</h4>
                  <p className="text-blue-700">Take a poorly written function and rewrite it following PEP 8 guidelines.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">2. Add comprehensive documentation</h4>
                  <p className="text-blue-700">Write docstrings for a complex function with examples and type hints.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">3. Implement robust error handling</h4>
                  <p className="text-blue-700">Create a file processing function with proper exception handling.</p>
                </div>
              </div>
            </div>
          )}

          <LessonNextButton 
            href={currentStep < 5 ? `/lesson/lesson-14/python-best-practices-${currentStep === 1 ? 'pep8' : currentStep === 2 ? 'documentation' : currentStep === 3 ? 'error-handling' : 'practice'}` : `/lesson/lesson-14/python-best-practices-quiz`}
            label={currentStep < 5 ? `Next: ${currentStep === 1 ? 'PEP 8 Guidelines' : currentStep === 2 ? 'Documentation' : currentStep === 3 ? 'Error Handling' : 'Practice'} ` : 'Next: Quiz '}
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

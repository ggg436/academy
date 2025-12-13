"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OneCompilerEmbed from "@/components/onecompiler-embed";
import { CodeSnippet } from "@/components/ui/code-snippet";
import CCodeRunner from "@/components/c-code-runner";
import { saveLessonCompleteServer } from "@/actions/progress";

export const CLesson6Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerCode, setRunnerCode] = useState<string>("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("div.bg-gray-50 pre code")) as HTMLElement[];
    nodes.forEach(codeEl => {
      const container = codeEl.closest("div.bg-gray-50") as HTMLElement | null;
      if (!container) return;
      if (container.getAttribute("data-try-now-attached") === "1") return;
      container.setAttribute("data-try-now-attached", "1");
      const btn = document.createElement("button");
      btn.textContent = "Try Now";
      btn.className = "mt-3 inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide bg-green-500 text-white border-b-4 border-green-600 hover:bg-green-500/90 active:border-b-0 px-6 h-12";
      btn.onclick = () => { setRunnerCode((codeEl.innerText || "").trim()); setRunnerOpen(true); };
      const wrap = document.createElement("div"); wrap.className = "mt-3"; wrap.appendChild(btn);
      container.insertAdjacentElement("beforeend", wrap);
    });
  }, [currentStep]);

  const title = currentStep === 1 ? "Pointer to Pointer" : currentStep === 2 ? "Array of Pointers" : currentStep === 3 ? "Function Pointers" : "Advanced Examples";

  const handleFinish = async () => {
    try {
      setIsCompleting(true);
      await saveLessonCompleteServer("c", "lesson-6", 30);
      setShowCelebration(true);
    } finally {
      setIsCompleting(false);
    }
  };

  if (showCelebration) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="text-6xl"></div>
          <h1 className="text-4xl font-bold text-green-600">Lesson Complete!</h1>
          <p className="text-xl text-gray-600">You earned 30 points!</p>
          <div className="space-y-4">
            <Button size="lg" className="px-8" asChild>
              <a href="/lesson/lesson-7/c-data-types">Continue to Lesson 7 </a>
            </Button>
            <div>
              <Button variant="secondaryOutline" asChild>
                <a href="/learn">Back to Learn</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <div className="lg:min-h-[350px] lg:w-[1200px] w-full px-6 lg:px-0 flex flex-col ml-12 h-full relative text-[15.5px] leading-7 lg:text-base">
          <div className="text-left mt-4 ml-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">{title}</h1>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">A <strong>pointer to pointer</strong> (or double pointer) is a variable that stores the address of another pointer. This is a powerful concept in C programming used for dynamic memory management and complex data structures.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Basic Syntax:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`int **pp;  // Pointer to pointer to int
int *p;    // Pointer to int
int x = 10; // Integer variable`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Complete Example:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    int x = 10;
    int *p = &x;      // p points to x
    int **pp = &p;    // pp points to p
    
    printf("Value of x: %d\\n", x);
    printf("Value of *p: %d\\n", *p);
    printf("Value of **pp: %d\\n", **pp);
    
    printf("Address of x: %p\\n", &x);
    printf("Address stored in p: %p\\n", p);
    printf("Address stored in pp: %p\\n", pp);
    
    return 0;
}`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Memory Visualization:</p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-800">
                      <p><strong>Memory Layout:</strong></p>
                      <p>pp  p  x</p>
                      <p>pp stores address of p</p>
                      <p>p stores address of x</p>
                      <p>x stores the value 10</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800"><strong>Real-world Use:</strong> Double pointers are commonly used in functions that need to modify a pointer itself, such as dynamic memory allocation functions.</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">An <strong>array of pointers</strong> is an array where each element is a pointer. This is extremely useful for managing multiple strings or creating dynamic arrays of different sizes.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">String Array Example:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    // Array of pointers to strings
    char *fruits[] = {
        "Apple",
        "Banana", 
        "Cherry",
        "Date",
        "Elderberry"
    };
    
    int size = sizeof(fruits) / sizeof(fruits[0]);
    
    printf("Fruits list:\\n");
    for(int i = 0; i < size; i++) {
        printf("%d. %s\\n", i+1, fruits[i]);
    }
    
    return 0;
}`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Integer Array Example:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>

int main() {
    int a = 10, b = 20, c = 30;
    int *numbers[] = {&a, &b, &c};
    
    printf("Numbers through pointers:\\n");
    for(int i = 0; i < 3; i++) {
        printf("numbers[%d] = %d\\n", i, *numbers[i]);
    }
    
    // Modify values through pointers
    *numbers[0] = 100;
    printf("After modification: a = %d\\n", a);
    
    return 0;
}`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Dynamic Array of Pointers:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int **arr = (int**)malloc(n * sizeof(int*));
    
    // Allocate memory for each row
    for(int i = 0; i < n; i++) {
        arr[i] = (int*)malloc((i+1) * sizeof(int));
        for(int j = 0; j <= i; j++) {
            arr[i][j] = (i+1) * (j+1);
        }
    }
    
    // Print the jagged array
    for(int i = 0; i < n; i++) {
        for(int j = 0; j <= i; j++) {
            printf("%d ", arr[i][j]);
        }
        printf("\\n");
    }
    
    // Free memory
    for(int i = 0; i < n; i++) {
        free(arr[i]);
    }
    free(arr);
    
    return 0;
}`} />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-800"><strong>Advantage:</strong> Arrays of pointers allow you to create jagged arrays (arrays with different row lengths) and efficiently manage multiple strings without wasting memory.</p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700">A <strong>function pointer</strong> is a variable that stores the address of a function. This enables you to call functions dynamically and is the foundation of many advanced programming techniques.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Basic Function Pointer Syntax:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`// Function pointer syntax
return_type (*pointer_name)(parameter_types);

// Example
int (*func_ptr)(int, int);  // Points to function that takes 2 ints and returns int`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Complete Example with Math Operations:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>

// Math operation functions
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main() {
    int (*operation)(int, int);  // Function pointer
    int x = 20, y = 4;
    
    // Use function pointer to call different operations
    operation = add;
    printf("%d + %d = %d\\n", x, y, operation(x, y));
    
    operation = subtract;
    printf("%d - %d = %d\\n", x, y, operation(x, y));
    
    operation = multiply;
    printf("%d * %d = %d\\n", x, y, operation(x, y));
    
    operation = divide;
    printf("%d / %d = %d\\n", x, y, operation(x, y));
    
    return 0;
}`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Array of Function Pointers:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main() {
    // Array of function pointers
    int (*operations[])(int, int) = {add, subtract, multiply};
    char *names[] = {"Addition", "Subtraction", "Multiplication"};
    
    int a = 10, b = 5;
    
    for(int i = 0; i < 3; i++) {
        printf("%s: %d %s %d = %d\\n", 
               names[i], a, 
               i == 0 ? "+" : i == 1 ? "-" : "*", 
               b, operations[i](a, b));
    }
    
    return 0;
}`} />
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800"><strong>Real-world Applications:</strong> Function pointers are used in callback functions, event handling, plugin systems, and implementing polymorphism in C.</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-8 space-y-6">
              <p className="text-neutral-700 font-medium">Let's combine all these advanced pointer concepts in a practical example!</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Advanced Example: Dynamic String Manager:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CodeSnippet language="c" code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function pointer type for string operations
typedef int (*string_operation)(char**, int, char*);

// String operation functions
int add_string(char **arr, int count, char *str) {
    arr[count] = malloc(strlen(str) + 1);
    strcpy(arr[count], str);
    return count + 1;
}

int find_string(char **arr, int count, char *str) {
    for(int i = 0; i < count; i++) {
        if(strcmp(arr[i], str) == 0) {
            return i;
        }
    }
    return -1;
}

int main() {
    char **strings = malloc(10 * sizeof(char*));
    int count = 0;
    
    // Array of function pointers
    string_operation operations[] = {add_string, find_string};
    char *operation_names[] = {"Add", "Find"};
    
    // Add some strings
    count = operations[0](strings, count, "Hello");
    count = operations[0](strings, count, "World");
    count = operations[0](strings, count, "Advanced");
    count = operations[0](strings, count, "Pointers");
    
    // Display all strings
    printf("All strings:\\n");
    for(int i = 0; i < count; i++) {
        printf("%d. %s\\n", i+1, strings[i]);
    }
    
    // Find a string
    int index = operations[1](strings, count, "World");
    if(index != -1) {
        printf("\\n'World' found at index: %d\\n", index);
    }
    
    // Free memory
    for(int i = 0; i < count; i++) {
        free(strings[i]);
    }
    free(strings);
    
    return 0;
}`} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Key Concepts Demonstrated:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li> <strong>Double Pointers:</strong> <code>char **strings</code> for dynamic string array</li>
                      <li> <strong>Function Pointers:</strong> <code>string_operation operations[]</code> for dynamic function calls</li>
                      <li> <strong>Memory Management:</strong> Proper allocation and deallocation</li>
                      <li> <strong>Type Definitions:</strong> <code>typedef</code> for cleaner code</li>
                      <li> <strong>Dynamic Arrays:</strong> Runtime size determination</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-800"><strong> Important:</strong> Always free dynamically allocated memory to prevent memory leaks. Advanced pointer concepts require careful memory management!</p>
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            {currentStep >= 4 ? (
              <Button variant="secondary" size="lg" className="px-6" onClick={handleFinish} disabled={isCompleting}>{isCompleting ? "Saving..." : "Next: Lesson ?"}</Button>
            ) : null}
          </div>
        </div>
      </div>

      <Dialog open={runnerOpen} onOpenChange={setRunnerOpen}>
        <DialogContent>
          <DialogTitle>Try Now (C)</DialogTitle>
        <div className="space-y-3">
          <div className="pt-2">
            <CCodeRunner initialCode={runnerCode} height={420} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondaryOutline" onClick={() => setRunnerOpen(false)}>Close</Button>
            <Button variant="secondary" onClick={() => navigator.clipboard.writeText(runnerCode)}>Copy snippet</Button>
          </div>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

"use client";

export const PythonLesson2Content = ({ lessonTitle, currentStep }: { lessonTitle: string; currentStep: number }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-slate-800 mb-4">
                        {lessonTitle}
                    </h1>
                    <p className="text-slate-500">
                        Step {currentStep}
                    </p>
                </div>
            </div>
        </div>
    );
};

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sita Sharma",
    role: "Student",
    avatar: "/girl.svg",
    content: "यो प्लेटफर्म साँच्चै सजिलो छ। मैले HTML नेपाली भाषामै सिक्न पाएकोमा खुशी छु। अझै CSS र JavaScript को पनि थप सामग्री भए राम्रो हुन्थ्यो।",
    rating: 5
  },
  {
    id: 2,
    name: "Ramesh Adhikari",
    role: "Student",
    avatar: "/boy.svg",
    content: "खेल्दै खेल्दै प्रोग्रामिङ सिक्न पाइन्छ भन्ने कल्पना गरेको थिइनँ। एकदम रमाइलो लाग्यो। तर कहिलेकाहीँ लेभल लोड हुन ढिला हुन्छ, सुधार गर्न सकिन्छ।",
    rating: 4
  },
  {
    id: 3,
    name: "Anjali Koirala",
    role: "Student",
    avatar: "/girl.svg",
    content: "This site is awesome! Learning coding in Nepali makes it so easy. I finally understand HTML clearly.",
    rating: 5
  },
  {
    id: 4,
    name: "Prakash Thapa",
    role: "Student",
    avatar: "/boy.svg",
    content: "I really like the gamified style, feels like Duolingo but for coding. Maybe add more daily challenges.",
    rating: 4
  },
  {
    id: 5,
    name: "Manisha KC",
    role: "Student",
    avatar: "/girl.svg",
    content: "The quizzes are fun and simple. I enjoy playing and learning at the same time. Would love to see a leaderboard system.",
    rating: 5
  },
  {
    id: 6,
    name: "Kiran Shrestha",
    role: "Student",
    avatar: "/boy.svg",
    content: "This platform is very helpful for beginners. The language support is great. Sometimes small bugs come, but overall excellent.",
    rating: 4
  },
  {
    id: 7,
    name: "Sunita Bhandari",
    role: "Student",
    avatar: "/girl.svg",
    content: "I love the design, very clean and easy to use. Please add more programming languages like Python soon.",
    rating: 5
  },
  {
    id: 8,
    name: "Dipesh Gurung",
    role: "Student",
    avatar: "/boy.svg",
    content: "The idea is unique! It helps students like me who struggle with English. The explanations are very clear.",
    rating: 5
  },
  {
    id: 9,
    name: "Rohit Basnet",
    role: "Student",
    avatar: "/boy.svg",
    content: "Super fun! I never thought coding could be like a game. Suggestion: add some rewards like badges or coins.",
    rating: 4
  },
  {
    id: 10,
    name: "Sanjiv Maharjan",
    role: "Student",
    avatar: "/boy.svg",
    content: "This site motivates me to practice daily. It feels less boring than YouTube tutorials. Keep improving!",
    rating: 5
  }
];

const uiText = {
  en: {
    header: "What Our Nepali Learners Say",
    sub: "Join thousands of Nepali students who are learning to code in their own language",
    stats1: "Nepali Learners",
    stats2: "Success Rate",
    stats3: "Average Rating",
  },
  ne: {
    header: "हाम्रा नेपाली विद्यार्थीहरू के भन्छन्",
    sub: "आफ्नै भाषामै कोडिङ सिकिरहेका हजारौं नेपाली विद्यार्थीहरूको समूहमा सहभागी हुनुहोस्",
    stats1: "नेपाली विद्यार्थी",
    stats2: "सफलता दर",
    stats3: "औसत रेटिङ",
  },
  mai: {
    header: "हमर नेपाली सिखैया को कहब अछि",
    sub: "अपन भासामे कोडिंग सिखि रहल हजारौं नेपाली विद्यार्थी सं जुड़ू",
    stats1: "नेपाली सिखैया",
    stats2: "सफलता दर",
    stats3: "औसत रेटिंग",
  },
  new: {
    header: "हाम्रा नेपाली सिखैया काय् भन्छं",
    sub: "आफ्नै भासामे कोडिङ सिखिरा नेपाली विद्यार्थीम संलग्न हौं",
    stats1: "नेपाली सिखैया",
    stats2: "सफलता दर",
    stats3: "औसत रेटिङ",
  },
};

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  const t = (uiText as any)[language] || uiText.en;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="w-full py-20 relative overflow-hidden" style={{ backgroundColor: '#f2f7ff' }}>
      {/* Decorative Elements */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-neutral-800 mb-4">
            {t.header}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass hover:bg-white/90 rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass hover:bg-white/90 rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Testimonial Card */}
          <div className="glass rounded-3xl shadow-2xl p-8 lg:p-12 mx-8 transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-20 h-20 lg:w-24 lg:h-24 mb-6 rounded-full overflow-hidden ring-4 ring-green-100 shadow-lg">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg lg:text-xl text-neutral-700 mb-8 leading-relaxed italic font-medium">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div>
                <div className="font-bold text-neutral-800 text-xl">
                  {currentTestimonial.name}
                </div>
                <div className="text-neutral-500 text-sm mt-1">
                  {currentTestimonial.role}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "bg-green-600 w-8"
                    : "bg-gray-300 w-3 hover:bg-gray-400"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
              5K+
            </div>
            <div className="text-neutral-600 font-medium">{t.stats1}</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
              92%
            </div>
            <div className="text-neutral-600 font-medium">{t.stats2}</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
              4.6/5
            </div>
            <div className="text-neutral-600 font-medium">{t.stats3}</div>
          </div>
        </div>
      </div>
    </section>
  );
} 

"use client";

import Image from "next/image";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Loader, Sparkles, Users, Code, Rocket, BookOpen, Trophy, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthModal } from "@/store/use-auth-modal";
import { Testimonials } from "@/components/testimonials";
import { useLanguage } from "@/contexts/language-context";
import { Footer } from "./footer";
import { TypingEffect } from "@/components/typing-effect";

const strings: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  continue: string;
  getStarted: string;
  trustBadge1: string;
  trustBadge2: string;
  featuresTitle: string;
  featuresSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
  feature6Title: string;
  feature6Desc: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
}> = {
  en: {
    heroTitle: "Master Coding in Your Native Language",
    heroSubtitle: "Learn programming through interactive lessons, gamified challenges, and real-world projects - all in Nepali, Maithili, or Newari.",
    continue: "Continue Learning",
    getStarted: "Start Learning Free",
    trustBadge1: "Join 5K+ learners",
    trustBadge2: "4.6★ rating",
    featuresTitle: "Why Choose Gharti Academy?",
    featuresSubtitle: "Everything you need to become a confident programmer",
    feature1Title: "Learn in Your Language",
    feature1Desc: "Study programming in Nepali, Maithili, or Newari - making complex concepts easier to understand.",
    feature2Title: "Gamified Learning",
    feature2Desc: "Earn points, unlock achievements, and compete with friends while learning to code.",
    feature3Title: "Interactive Playground",
    feature3Desc: "Write and run code directly in your browser with our built-in coding environment.",
    feature4Title: "Step-by-Step Lessons",
    feature4Desc: "Follow structured lessons that take you from beginner to advanced at your own pace.",
    feature5Title: "Real-World Projects",
    feature5Desc: "Build actual applications and websites to showcase your skills.",
    feature6Title: "Community Support",
    feature6Desc: "Join thousands of learners and get help whenever you need it.",
    howItWorksTitle: "Start Your Coding Journey in 3 Simple Steps",
    step1Title: "Sign Up & Choose Language",
    step1Desc: "Create your free account and select your preferred learning language.",
    step2Title: "Learn Interactively",
    step2Desc: "Follow engaging lessons with hands-on coding exercises and instant feedback.",
    step3Title: "Build & Master",
    step3Desc: "Apply your skills by building real projects and earning certificates.",
  },
  ne: {
    heroTitle: "आफ्नै भाषामा कोडिङ सिक्नुहोस्",
    heroSubtitle: "अन्तरक्रियात्मक पाठ, खेलीकृत चुनौती र वास्तविक परियोजनाहरू मार्फत प्रोग्रामिङ सिक्नुहोस् - सबै नेपाली, मैथिली वा नेवारीमा।",
    continue: "सिक्न जारी राख्नुहोस्",
    getStarted: "निःशुल्क सुरु गर्नुहोस्",
    trustBadge1: "5K+ विद्यार्थी",
    trustBadge2: "4.6★ रेटिङ",
    featuresTitle: "घर्ती एकेडेमी किन रोज्ने?",
    featuresSubtitle: "आत्मविश्वासी प्रोग्रामर बन्नको लागि आवश्यक सबै कुरा",
    feature1Title: "आफ्नै भाषामा सिक्नुहोस्",
    feature1Desc: "नेपाली, मैथिली वा नेवारीमा प्रोग्रामिङ अध्ययन गर्नुहोस् - जटिल अवधारणाहरू बुझ्न सजिलो।",
    feature2Title: "खेलीकृत सिकाइ",
    feature2Desc: "अंक कमाउनुहोस्, उपलब्धिहरू अनलक गर्नुहोस्, र कोड सिक्दै साथीहरूसँग प्रतिस्पर्धा गर्नुहोस्।",
    feature3Title: "अन्तरक्रियात्मक प्लेग्राउन्ड",
    feature3Desc: "हाम्रो बिल्ट-इन कोडिङ वातावरणमा सीधै आफ्नो ब्राउजरमा कोड लेख्नुहोस् र चलाउनुहोस्।",
    feature4Title: "चरण-दर-चरण पाठहरू",
    feature4Desc: "संरचित पाठहरू पालना गर्नुहोस् जसले तपाईंलाई शुरुवातदेखि उन्नतसम्म लैजान्छ।",
    feature5Title: "वास्तविक परियोजनाहरू",
    feature5Desc: "आफ्नो सीप प्रदर्शन गर्न वास्तविक एप्लिकेसन र वेबसाइटहरू निर्माण गर्नुहोस्।",
    feature6Title: "समुदाय समर्थन",
    feature6Desc: "हजारौं शिक्षार्थीहरूसँग सामेल हुनुहोस् र आवश्यक पर्दा मद्दत पाउनुहोस्।",
    howItWorksTitle: "3 सरल चरणमा आफ्नो कोडिङ यात्रा सुरु गर्नुहोस्",
    step1Title: "साइन अप र भाषा छान्नुहोस्",
    step1Desc: "आफ्नो निःशुल्क खाता सिर्जना गर्नुहोस् र आफ्नो मनपर्ने सिकाइ भाषा चयन गर्नुहोस्।",
    step2Title: "अन्तरक्रियात्मक रूपमा सिक्नुहोस्",
    step2Desc: "ह्यान्ड्स-अन कोडिङ अभ्यास र तत्काल प्रतिक्रियाको साथ आकर्षक पाठहरू पालना गर्नुहोस्।",
    step3Title: "निर्माण र महारत",
    step3Desc: "वास्तविक परियोजनाहरू निर्माण गरेर र प्रमाणपत्रहरू कमाएर आफ्नो सीप लागू गर्नुहोस्।",
  },
  mai: {
    heroTitle: "अपन भासामे कोडिंग सिखू",
    heroSubtitle: "इंटरएक्टिव पाठ, गेमिफाइड चुनौती आ वास्तविक परियोजना सं प्रोग्रामिंग सिखू - सब नेपाली, मैथिली वा नेवारीमे।",
    continue: "सिखब जारी राखू",
    getStarted: "निःशुल्क शुरू करू",
    trustBadge1: "5K+ विद्यार्थी",
    trustBadge2: "4.6★ रेटिंग",
    featuresTitle: "घर्ती एकेडेमी किएक चुनू?",
    featuresSubtitle: "आत्मविश्वासी प्रोग्रामर बनबाक लेल आवश्यक सब किछु",
    feature1Title: "अपन भासामे सिखू",
    feature1Desc: "नेपाली, मैथिली वा नेवारीमे प्रोग्रामिंग अध्ययन करू - जटिल अवधारणा बुझब सहज।",
    feature2Title: "गेमिफाइड सिखाइ",
    feature2Desc: "अंक कमाऊ, उपलब्धि अनलॉक करू, आ कोड सिखैत मित्र सं प्रतिस्पर्धा करू।",
    feature3Title: "इंटरएक्टिव प्लेग्राउंड",
    feature3Desc: "हमर बिल्ट-इन कोडिंग वातावरणमे सीधा अपन ब्राउजरमे कोड लिखू आ चलाऊ।",
    feature4Title: "चरण-दर-चरण पाठ",
    feature4Desc: "संरचित पाठ पालन करू जे अहाँकेँ शुरुवातसँ उन्नतधरि लऽ जाइत अछि।",
    feature5Title: "वास्तविक परियोजना",
    feature5Desc: "अपन कौशल प्रदर्शन करबाक लेल वास्तविक एप्लिकेशन आ वेबसाइट निर्माण करू।",
    feature6Title: "समुदाय समर्थन",
    feature6Desc: "हजारों शिक्षार्थी सं जुड़ू आ आवश्यकता पड़लापर मदति पाऊ।",
    howItWorksTitle: "3 सरल चरणमे अपन कोडिंग यात्रा शुरू करू",
    step1Title: "साइन अप आ भाषा चुनू",
    step1Desc: "अपन निःशुल्क खाता बनाऊ आ अपन पसंदीदा सिखाइ भाषा चयन करू।",
    step2Title: "इंटरएक्टिव रूपसँ सिखू",
    step2Desc: "हैंड्स-ऑन कोडिंग अभ्यास आ तत्काल प्रतिक्रियाक संग आकर्षक पाठ पालन करू।",
    step3Title: "निर्माण आ महारत",
    step3Desc: "वास्तविक परियोजना निर्माण कऽ आ प्रमाणपत्र कमा कऽ अपन कौशल लागू करू।",
  },
  new: {
    heroTitle: "थ्व भायेया कोडिङ ज्या",
    heroSubtitle: "इन्टरएक्टिभ पाठ, गेमिफाइड च्यालेन्ज व वास्तविक परियोजना न्ह्याः प्रोग्रामिङ ज्या - सकल नेपाली, मैथिली वा नेवारीया।",
    continue: "ज्याये जुइगु यायेगु",
    getStarted: "निःशुल्क शुरु यानां",
    trustBadge1: "5K+ विद्यार्थी",
    trustBadge2: "4.6★ रेटिङ",
    featuresTitle: "घर्ती एकेडेमी छाय् छ्यनेगु?",
    featuresSubtitle: "आत्मविश्वासी प्रोग्रामर दुगु दुःगु सकल कथं",
    feature1Title: "थ्व भायेया ज्या",
    feature1Desc: "नेपाली, मैथिली वा नेवारीया प्रोग्रामिङ अध्ययन यानां - जटिल अवधारणा न्हापाः सजिलो।",
    feature2Title: "गेमिफाइड ज्याये",
    feature2Desc: "अंक कमानां, उपलब्धि अनलक यानां, व कोड ज्यायेत मित्रत प्रतिस्पर्धा यानां।",
    feature3Title: "इन्टरएक्टिभ प्लेग्राउन्ड",
    feature3Desc: "झिगु बिल्ट-इन कोडिङ वातावरणया सीधा थ्व ब्राउजरया कोड च्वयेगु व चलानां।",
    feature4Title: "चरण-दर-चरण पाठ",
    feature4Desc: "संरचित पाठ पालन यानां जुन छिं शुरुवातनं उन्नतधरि बयेगु।",
    feature5Title: "वास्तविक परियोजना",
    feature5Desc: "थ्व कौशल प्रदर्शन यायेत वास्तविक एप्लिकेशन व वेबसाइट निर्माण यानां।",
    feature6Title: "समुदाय समर्थन",
    feature6Desc: "हजारौं शिक्षार्थीत संलग्न दुगु व आवश्यकता जुइलिं मदत स्वयेगु।",
    howItWorksTitle: "3 सजिलो चरणया थ्व कोडिङ यात्रा शुरु यानां",
    step1Title: "साइन अप व भाषा छ्यनां",
    step1Desc: "थ्व निःशुल्क खाता सिर्जना यानां व थ्व मनपर्ने ज्याये भाषा चयन यानां।",
    step2Title: "इन्टरएक्टिभ रूपं ज्या",
    step2Desc: "ह्यान्ड्स-अन कोडिङ अभ्यास व तत्काल प्रतिक्रियात आकर्षक पाठ पालन यानां।",
    step3Title: "निर्माण व दक्षता",
    step3Desc: "वास्तविक परियोजना निर्माण यायेत व प्रमाणपत्र कमायेत थ्व कौशल लागू यानां।",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = strings[language] || strings.en;

  return (
    <>
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-radial min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-[1200px] mx-auto w-full px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full animate-fade-in">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Learn Coding in Your Language</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-extrabold max-w-[600px] leading-tight animate-fade-in-up">
                <span className="text-neutral-800">Master Coding in</span>
                <br />
                <span className="gradient-text inline-block min-w-[320px] sm:min-w-[400px] lg:min-w-[480px]">
                  <TypingEffect
                    phrases={[
                      "Your Native Language",
                      "Gamified Way",
                      "Interactive Style",
                      "Step by Step",
                      "Your Own Pace",
                      "Fun & Engaging"
                    ]}
                    className=""
                    typingSpeed={100}
                    deletingSpeed={50}
                    pauseTime={2000}
                  />
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-neutral-600 max-w-[550px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[400px] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <FirebaseAuthWrapper continueLabel={t.continue} getStartedLabel={t.getStarted} />
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-sm text-neutral-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{t.trustBadge1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{t.trustBadge2}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] animate-float">
              <Image src="/hero.svg" fill alt="Hero" className="drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-bounce">
          <ChevronDown className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-800 mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card group">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{t.feature1Title}</h3>
              <p className="text-neutral-600">{t.feature1Desc}</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card group">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{t.feature2Title}</h3>
              <p className="text-neutral-600">{t.feature2Desc}</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card group">
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{t.feature3Title}</h3>
              <p className="text-neutral-600">{t.feature3Desc}</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card group">
              <div className="w-14 h-14 bg-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{t.feature4Title}</h3>
              <p className="text-neutral-600">{t.feature4Desc}</p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card group">
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{t.feature5Title}</h3>
              <p className="text-neutral-600">{t.feature5Desc}</p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card group">
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{t.feature6Title}</h3>
              <p className="text-neutral-600">{t.feature6Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-800 mb-4">
              {t.howItWorksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">{t.step1Title}</h3>
              <p className="text-neutral-600">{t.step1Desc}</p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">{t.step2Title}</h3>
              <p className="text-neutral-600">{t.step2Desc}</p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">{t.step3Title}</h3>
              <p className="text-neutral-600">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Landing-only Footer */}
      <Footer />
    </>
  );
}

function FirebaseAuthWrapper({ continueLabel, getStartedLabel }: { continueLabel: string; getStartedLabel: string }) {
  const { user, loading } = useFirebaseAuth();
  const { open } = useAuthModal();

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <Button size="lg" variant="secondary" className="w-full" asChild>
        <Link href="/learn" prefetch={false}>
          {continueLabel}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      variant="secondary"
      className="w-full relative overflow-hidden animate-air-flow"
      onClick={() => open("signup")}
    >
      <span className="relative z-10">{getStartedLabel.toUpperCase()}</span>
    </Button>
  );
}

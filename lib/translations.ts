export const translations = {
  "html-introduction": {
    en: {
      title: "HTML Introduction",
      intro: "HTML is the standard markup language for creating Web pages.",
      whatIsHTML: "What is HTML?",
      whatIsHTMLDesc: "HTML stands for Hyper Text Markup Language",
      whatIsHTMLList: [
        "HTML stands for Hyper Text Markup Language",
        "HTML is the standard markup language for creating Web pages",
        "HTML describes the structure of a Web page",
        "HTML consists of a series of elements",
        "HTML elements tell the browser how to display the content",
        "HTML elements label pieces of content such as \"this is a heading\", \"this is a paragraph\", \"this is a link\", etc."
      ],
      whyLearn: "Why Learn HTML?",
      whyLearnDesc: "HTML is the foundation of web development. Every website you visit is built with HTML. Learning HTML gives you the power to:",
      whyLearnList: [
        "Create your own websites from scratch",
        "Understand how web pages are structured",
        "Customize existing websites and templates",
        "Build a strong foundation for learning CSS and JavaScript",
        "Pursue a career in web development"
      ],
      howItWorks: "How HTML Works",
      howItWorksDesc: "HTML works by using tags to mark up content. These tags tell web browsers how to display the information. For example:",
      codeExample: "<h1>This is a heading</h1>\n<p>This is a paragraph</p>\n<a href=\"...\">This is a link</a>",
      codeExplanation: "When a browser reads this HTML, it knows to display the first line as a large heading, the second as a paragraph, and the third as a clickable link.",
      whatYouWillLearn: "What You'll Learn",
      whatYouWillLearnDesc: "In this course, you'll learn how to:",
      whatYouWillLearnList: [
        "Write clean, semantic HTML code",
        "Structure web pages with proper headings and sections",
        "Create lists, links, and images",
        "Build forms for user input",
        "Understand HTML best practices and accessibility"
      ]
    },
    ne: {
      title: "HTML परिचय",
      intro: "HTML वेब पेजहरू बनाउन प्रयोग हुने मानक मार्कअप भाषा हो।",
      whatIsHTML: "HTML भनेको के हो?",
      whatIsHTMLDesc: "HTML को पुरा रूप Hyper Text Markup Language हो।",
      whatIsHTMLList: [
        "HTML को पुरा रूप Hyper Text Markup Language हो।",
        "HTML वेब पेजहरू बनाउन प्रयोग हुने मानक मार्कअप भाषा हो।",
        "HTML ले वेब पेजको संरचना वर्णन गर्छ।",
        "HTML विभिन्न तत्वहरूको श्रृंखलाबाट बनेको हुन्छ।",
        "HTML तत्वहरूले ब्राउजरलाई सामग्री कसरी देखाउने भनेर बताउँछन्।",
        "HTML तत्वहरूले सामग्रीका भागहरूलाई लेबल गर्छन्, जस्तै \"यो एउटा शीर्षक हो\", \"यो एउटा अनुच्छेद हो\", \"यो एउटा लिंक हो\" आदि।"
      ],
      whyLearn: "किन HTML सिक्ने?",
      whyLearnDesc: "HTML वेब विकासको आधार हो। तपाईंले हेर्ने हरेक वेबसाइट HTML बाट बनेको हुन्छ। HTML सिक्दा तपाईंले निम्न गर्न सक्नुहुन्छ:",
      whyLearnList: [
        "आफ्नै वेबसाइट सुरु देखि बनाउन",
        "वेब पेजहरू कसरी संरचित हुन्छन् भनेर बुझ्न",
        "पहिले बनाइएका वेबसाइट र टेम्प्लेटलाई परिमार्जन गर्न",
        "CSS र JavaScript सिक्नको लागि बलियो आधार बनाउन",
        "वेब विकास क्षेत्रमा करिअर बनाउन"
      ],
      howItWorks: "HTML कसरी काम गर्छ",
      howItWorksDesc: "HTML ले सामग्रीलाई ट्याग (tags) मार्फत चिन्ह लगाएर काम गर्छ। यी ट्यागहरूले वेब ब्राउजरलाई सूचना कसरी देखाउने भनेर बताउँछन्। उदाहरणका लागि:",
      codeExample: "<h1>यो एउटा शीर्षक हो</h1>\n<p>यो एउटा अनुच्छेद हो</p>\n<a href=\"...\">यो एउटा लिंक हो</a>",
      codeExplanation: "जब ब्राउजरले यो HTML पढ्छ, उसले पहिलो लाइनलाई ठूलो शीर्षक, दोस्रोलाई अनुच्छेद, र तेस्रोलाई क्लिक गर्न मिल्ने लिंकको रूपमा देखाउँछ।",
      whatYouWillLearn: "तपाईं के सिक्नुहुनेछ",
      whatYouWillLearnDesc: "यस कोर्समा, तपाईंले निम्न कुरा सिक्नुहुनेछ:",
      whatYouWillLearnList: [
        "सफा र अर्थपूर्ण (semantic) HTML कोड लेख्न",
        "उचित शीर्षक र खण्डहरूसँग वेब पेज संरचना बनाउन",
        "सूची, लिंक, र छविहरू बनाउन",
        "प्रयोगकर्ताको इनपुटका लागि फाराम बनाउन",
        "HTML का उत्कृष्ट अभ्यास (best practices) र पहुँचयोग्यता (accessibility) बुझ्न"
      ]
    }
  }
};

export const getTranslation = (key: string, language: string) => {
  const keys = key.split('.');
  let translation: any = translations;
  
  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k];
    } else {
      return null;
    }
  }
  
  return translation[language] || translation.en || null;
}; 
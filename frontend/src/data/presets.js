



export const PRESETS = [
  {
    id: "grocery",
    label: { en: "Grocery store, scan & pay", hi: "किराना दुकान, स्कैन करके भुगतान", mr: "किराणा दुकान, स्कॅन करून पैसे द्या", ta: "மளிகைக் கடை, ஸ்கேன் செய்து பணம் செலுத்துங்கள்", te: "కిరాణా దుకాణం, స్కాన్ చేసి చెల్లించండి", bn: "মুদি দোকান, স্ক্যান করে পেমেন্ট", kn: "ಕಿರಾಣಿ ಅಂಗಡಿ, ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಪಾವತಿಸಿ" },
    payee: "Sri Lakshmi Kirana Store",
    amount: 340,
    context: {
      request_type: "pay", framing: "normal", payee_relationship: "verified_business",
      entry_context: "qr_scan_paying", payee_handle_looks_personal: false,
      qr_amount_prefilled_mismatch: false, asked_to_install_remote_access_app: false,
      urgency_pressure: false,
    },
  },
  {
    id: "rent",
    label: { en: "Monthly rent, saved contact", hi: "मासिक किराया, सेव किया गया संपर्क", mr: "मासिक भाडे, सेव्ह केलेला संपर्क", ta: "மாத வாடகை, சேமிக்கப்பட்ட தொடர்பு", te: "నెలవారీ అద్దె, సేవ్ చేసిన కాంటాక్ట్", bn: "মাসিক ভাড়া, সংরক্ষিত পরিচিতি", kn: "ಮಾಸಿಕ ಬಾಡಿಗೆ, ಉಳಿಸಿದ ಸಂಪರ್ಕ" },
    payee: "Landlord — Ramesh K.",
    amount: 15000,
    context: {
      request_type: "pay", framing: "normal", payee_relationship: "saved_contact",
      entry_context: "typed_manually", payee_handle_looks_personal: false,
      qr_amount_prefilled_mismatch: false, asked_to_install_remote_access_app: false,
      urgency_pressure: false,
    },
  },
  {
    id: "olx_refund",
    label: { en: "OLX buyer sends a 'refund' request", hi: "OLX खरीदार 'रिफंड' का अनुरोध भेजता है", mr: "OLX खरेदीदार 'परतावा' विनंती पाठवतो", ta: "OLX வாங்குபவர் 'பணத்திருப்பி' கோரிக்கை அனுப்புகிறார்", te: "OLX కొనుగోలుదారు 'రీఫండ్' అభ్యర్థన పంపుతారు", bn: "OLX ক্রেতা একটি 'রিফান্ড' অনুরোধ পাঠায়", kn: "OLX ಖರೀದಿದಾರ 'ರೀಫಂಡ್' ವಿನಂತಿ ಕಳುಹಿಸುತ್ತಾರೆ" },
    payee: "unknown9482@okhdfc",
    amount: 1500,
    context: {
      request_type: "collect", framing: "refund", payee_relationship: "new_first_time",
      entry_context: "typed_manually", payee_handle_looks_personal: true,
      qr_amount_prefilled_mismatch: false, asked_to_install_remote_access_app: false,
      urgency_pressure: true,
    },
  },
  {
    id: "parking_qr",
    label: { en: "Parking QR shows a bigger amount", hi: "पार्किंग QR में बड़ी राशि दिख रही है", mr: "पार्किंग QR मध्ये मोठी रक्कम दिसते", ta: "பார்க்கிங் QR-இல் பெரிய தொகை தெரிகிறது", te: "పార్కింగ్ QR లో పెద్ద మొత్తం కనిపిస్తోంది", bn: "পার্কিং QR-এ বড় অঙ্ক দেখাচ্ছে", kn: "ಪಾರ್ಕಿಂಗ್ QR ದೊಡ್ಡ ಮೊತ್ತವನ್ನು ತೋರಿಸುತ್ತದೆ" },
    payee: "City Parking Services",
    amount: 4000,
    context: {
      request_type: "pay", framing: "normal", payee_relationship: "unknown",
      entry_context: "qr_scan_paying", payee_handle_looks_personal: false,
      qr_amount_prefilled_mismatch: true, asked_to_install_remote_access_app: false,
      urgency_pressure: false,
    },
  },
  {
    id: "fake_support",
    label: { en: "'Bank support' call asks to verify ₹1", hi: "'बैंक सपोर्ट' कॉल ₹1 वेरिफाई करने को कहता है", mr: "'बँक सपोर्ट' कॉल ₹1 पडताळण्यास सांगतो", ta: "'வங்கி ஆதரவு' அழைப்பு ₹1 சரிபார்க்கச் சொல்கிறது", te: "'బ్యాంక్ సపోర్ట్' కాల్ ₹1 ధృవీకరించమని అడుగుతోంది", bn: "'ব্যাংক সাপোর্ট' কল ₹1 যাচাই করতে বলছে", kn: "'ಬ್ಯಾಂಕ್ ಬೆಂಬಲ' ಕರೆ ₹1 ಪರಿಶೀಲಿಸಲು ಕೇಳುತ್ತಿದೆ" },
    payee: "KYC-verify-support",
    amount: 1,
    context: {
      request_type: "pay", framing: "verification", payee_relationship: "unknown",
      entry_context: "phone_call_guided", payee_handle_looks_personal: true,
      qr_amount_prefilled_mismatch: false, asked_to_install_remote_access_app: true,
      urgency_pressure: true,
    },
  },
  {
    id: "job_fee",
    label: { en: "Job offer asks a 'registration' refund", hi: "नौकरी का ऑफर 'रजिस्ट्रेशन' रिफंड मांगता है", mr: "नोकरीची ऑफर 'नोंदणी' परतावा मागते", ta: "வேலை வாய்ப்பு 'பதிவு' பணத்திருப்பி கேட்கிறது", te: "ఉద్యోగ ఆఫర్ 'రిజిస్ట్రేషన్' రీఫండ్ అడుగుతోంది", bn: "চাকরির অফার 'নিবন্ধন' রিফান্ড চাইছে", kn: "ಉದ್ಯೋಗ ಆಫರ್ 'ನೋಂದಣಿ' ರೀಫಂಡ್ ಕೇಳುತ್ತಿದೆ" },
    payee: "HR-TalentHire-Careers",
    amount: 2499,
    context: {
      request_type: "collect", framing: "salary_advance", payee_relationship: "new_first_time",
      entry_context: "payment_link", payee_handle_looks_personal: true,
      qr_amount_prefilled_mismatch: false, asked_to_install_remote_access_app: false,
      urgency_pressure: true,
    },
  },
  {
    id: "sell_scan",
    label: { en: "Selling online, buyer says 'scan to receive'", hi: "ऑनलाइन बेच रहे हैं, खरीदार कहता है 'पाने के लिए स्कैन करें'", mr: "ऑनलाइन विकत आहात, खरेदीदार म्हणतो 'मिळवण्यासाठी स्कॅन करा'", ta: "ஆன்லைனில் விற்கிறீர்கள், வாங்குபவர் 'பெற ஸ்கேன் செய்யுங்கள்' என்கிறார்", te: "ఆన్‌లైన్‌లో అమ్ముతున్నారు, కొనుగోలుదారు 'పొందడానికి స్కాన్ చేయండి' అంటున్నారు", bn: "অনলাইনে বিক্রি করছেন, ক্রেতা বলছেন 'পেতে স্ক্যান করুন'", kn: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಮಾರಾಟ ಮಾಡುತ್ತಿದ್ದೀರಿ, ಖರೀದಿದಾರ 'ಪಡೆಯಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' ಎನ್ನುತ್ತಾರೆ" },
    payee: "buyer_quick8871",
    amount: 3000,
    context: {
      request_type: "collect", framing: "normal", payee_relationship: "new_first_time",
      entry_context: "qr_scan_selling", payee_handle_looks_personal: true,
      qr_amount_prefilled_mismatch: false, asked_to_install_remote_access_app: false,
      urgency_pressure: false,
    },
  },
];

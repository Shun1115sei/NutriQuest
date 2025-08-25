# NutriQuest

NutriQuest is a **simple and intuitive nutrition management web application** for seniors in Singapore. As an IB CAS project, it empowers the elderly to easily track daily nutritional intake and promotes a healthier lifestyle.  
This project aims to contribute to the UN SDGs: Goal 3 (**Good Health and Well-being**) and Goal 4 (**Quality Education**) by providing an accessible health literacy tool.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Latest Fixes](#latest-fixes)
- [Accessibility](#accessibility)
- [Security](#security)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)
- [Links](#links)

---

## Features

- **Text Input**: Type a meal description for AI-powered nutritional analysis.
- **Voice Input**: Speak your meal; the AI recognizes food even with unclear pronunciation.
- **Camera Scan**: Take a photo of your meal; the AI identifies food and analyzes nutrients, with quantity confirmation.
- **Barcode Scanning**: Scan product barcodes to instantly fetch nutrition data from Open Food Facts.
- **Dashboard & Analytics**: View aggregated nutrition data (daily/weekly/monthly), gauge chart for goals, bar charts for trends.
- **Personalized Goals**: Automatically calculates recommended intake based on profile or allows manual goal setting.
- **Favorites**: Save frequently eaten meals for quick logging.
- **Multilingual Support**: Interface available in English and Simplified Chinese.
- **Offline Support**: Detects network status and displays friendly notifications when offline.
- **Progress Tracking**: Easily navigate to past dates, weeks, or months to review historical data.
- **Mobile Optimization**: Responsive design and touch-friendly controls for smartphones and tablets.
- **Accessibility**: Designed for ease of use by seniors, including large buttons, clear navigation, and voice support.

---

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend & Database**: Google Firebase (Firestore, Authentication)
- **APIs**: Google Gemini, Open Food Facts, Web Speech API

---

## Usage

1. **Sign up / Log in** (Google authentication or guest mode)
2. **Set your nutrition goals** (auto-calculated or manual) on your first visit
3. **Log meals** using text, voice, camera, or barcode
4. **Track your intake** and explore details/history in the dashboard

---

## Latest Fixes

- **Fixed manifest.json icon path** (PWA icons display correctly)
- **Changed dashboard button to text link**
- **Improved mobile header layout**
- **Added offline detection and notification**
- **Added cancel button to voice input modal**
- **Enlarged star and delete buttons for mobile**
- **Added event handlers to all interactive elements**

---

## Accessibility

NutriQuest is designed with accessibility in mind:
- Large, high-contrast buttons and text for easy visibility
- Simple navigation structure
- Voice input support for users who prefer speaking
- Multilingual interface (English, Simplified Chinese)
- Responsive layout for all device sizes

---

## Security

- User authentication is handled via Firebase Authentication (email/password and Google Sign-In).
- All nutrition logs and profile data are securely stored in Firestore.
- API keys and sensitive configuration should be managed securely and not exposed in public repositories.

---

## Contributors

- [@Shun1115sei](https://github.com/Shun1115sei)
- [@g6intdev](https://github.com/g6intdev)
- [@Liu200830](https://github.com/Liu200830)

---

## License

MIT

---

## Links

- [NutriQuest Web App](https://nutri-quest-five.vercel.app)

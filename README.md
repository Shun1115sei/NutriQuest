NutriQuest - A Simple Nutrition Tracker for Seniors

🌟 Overview:
NutriQuest is a simple and intuitive nutrition management web application designed specifically for seniors in Singapore. As part of an IB CAS project, its primary goal is to empower the elderly to easily track their daily nutritional intake, fostering a healthier and more informed lifestyle. The project aims to contribute to the UN's Sustainable Development Goals (SDGs), specifically Goal 3, "Good Health and Well-being," and Goal 4, "Quality Education," by providing an accessible tool for health literacy and management.

✨ Key Features:
Multi-Input Meal Logging:
  Text Input: Type a description of a meal for AI-powered nutritional analysis.
  Voice Input: Use your voice to describe your meal. The AI can even guess the food from unclear pronunciation.
  Camera Scan: Take a photo of your meal, and the AI will identify the food and analyze its nutrients. A confirmation step allows users to input the correct quantity for higher accuracy.
  Barcode Scanning: Scan product barcodes to instantly fetch nutritional data from the Open Food Facts database.
Intuitive Dashboard & Analytics:
  View aggregated nutritional data for the day, week, or month.
  Daily View: A gauge chart provides an intuitive look at progress toward daily goals.
  Weekly/Monthly View: Bar charts visualize calorie trends by day or by week, with goals clearly marked.
  Period Navigation: Easily navigate to past dates, weeks, or months to review historical data.
Personalization & Accessibility:
  Personalized Goals: Automatically calculates recommended daily intake based on user profile (age, gender, activity level) or allows for manual goal setting.
  Favorites: Save frequently eaten meals for quick, one-tap logging.
  Multilingual Support: The interface is available in English and Simplified Chinese (中文).
🛠️ Tech Stack:
  Frontend: HTML, Tailwind CSS, JavaScript (no frameworks)
  Backend & Database: Google Firebase
    Firestore: Stores user data, meal logs, and favorites.
    Authentication: Manages user sign-up and login via email/password and Google Sign-In.
  APIs:
    Google Gemini API: Powers the AI-based recognition and analysis for text, voice, and image inputs.
    Open Food Facts API: Used for retrieving product information via barcode scanning.
    Web Speech API: Enables the voice input functionality in the browser.
🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need a modern web browser like Google Chrome or Firefox.

Installation
1. Clone the repository:
  git clone https://github.com/Shun1115sei/NutriQuest.git
2. Configure Firebase:
  Open the index.html file.
  Navigate to the <script> tag at the bottom of the file.
  Find the firebaseConfig object and replace the placeholder values with your own Firebase project credentials.
3. Configure Gemini API Key:
  In the same <script> tag, find the GEMINI_API_KEY constant.
  Replace the placeholder string with your API key obtained from Google AI Studio.
4. Run the application:
  Simply open the index.html file in your web browser.

Usage
1. Sign Up / Log In: Create an account, sign in with Google, or continue as a guest.
2. Set Your Goals: On your first visit, you'll be prompted to set your daily nutritional goals, either automatically calculated or manually entered.
3. Log a Meal: Use the text, voice, camera, or barcode scanner to input your meal.
4. Track Your Progress: The dashboard will automatically update to reflect your intake. Use the "Show Details" button and period navigators to explore your data.

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
  Open the nqstatic.html file.
  Navigate to the <script> tag at the bottom of the file.
  Find the firebaseConfig object and replace the placeholder values with your own Firebase project credentials.
3. Configure Gemini API Key:
  In the same <script> tag, find the GEMINI_API_KEY constant.
  Replace the placeholder string with your API key obtained from Google AI Studio.
4. Run the application:
  Simply open the nqstatic.html file in your web browser.

## 最新修复内容 (Latest Fixes)

### 已修复的问题 (Fixed Issues):

1. **图标路径修复** - 修复了manifest.json中的图标路径，确保PWA图标正确显示
2. **View Dashboard按钮改为文本** - 将按钮样式改为文本链接样式，提升用户体验
3. **手机布局粘性头部优化** - 重新设计了手机布局的头部，将控件移到两端，提升可用性
4. **离线检测和弹窗** - 添加了完整的离线检测功能，当网络断开时显示友好的提示弹窗
5. **语音输入取消按钮** - 在语音输入模态框中添加了取消按钮，用户可以随时停止语音输入
6. **手机布局元素大小优化** - 增大了手机布局中星星和删除按钮的尺寸，提升触摸体验
7. **手机布局事件监听器** - 为手机布局的所有交互元素添加了完整的事件处理

### 技术改进 (Technical Improvements):

- 使用响应式设计，确保在不同设备上都有良好的用户体验
- 添加了完整的离线状态检测和处理
- 优化了手机布局的触摸目标大小
- 改进了语音输入的用户体验
- 增强了PWA的图标支持

Usage
1. Sign Up / Log In: Create an account, sign in with Google, or continue as a guest.
2. Set Your Goals: On your first visit, you'll be prompted to set your daily nutritional goals, either automatically calculated or manually entered.
3. Log a Meal: Use the text, voice, camera, or barcode scanner to input your meal.
4. Track Your Progress: The dashboard will automatically update to reflect your intake. Use the "Show Details" button and period navigators to explore your data.

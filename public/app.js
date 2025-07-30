// PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
const GEMINI_API_KEY = "AIzaSyCldW53rqjHejtKvuGyxyQM8R9kuEtgZN0";

const firebaseConfig = {
  apiKey: "AIzaSyB2uJs32bmnoOgHcB6GTZuu0eBanfZWLWE",
  authDomain: "nutriquest-6c40d.firebaseapp.com",
  projectId: "nutriquest-6c40d",
  storageBucket: "nutriquest-6c40d.firebasestorage.app",
  messagingSenderId: "893360379713",
  appId: "1:893360379713:web:4f7952bf9094caf139b3c0",
  measurementId: "G-C9V61B19G7"
};
// --- Firebase Initialization ---
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Language Translation Data ---
const translations = {
  en: {
    loginTitle: "Login", emailLabel: "Email", passwordLabel: "Password", loginButton: "Login", authToggle: "Need an account? Sign Up", guestButton: "Continue as Guest", forgotPassword: "Forgot Password?", enterEmailForReset: "Please enter your email address in the email field to reset your password.", passwordResetSent: "A password reset link has been sent to your email address. Please check your inbox.", healthTrackerTitle: "Health Tracker", tagline: "Your Journey to a Healthier You.", signOutButton: "Sign Out", loginToSyncButton: "Login to Sync Data", favouritesTitle: "Favourites", setGoalsTitle: "Set Your Daily Goals", googleSignIn: "Sign in with Google", foodInputPlaceholder: "e.g., 1 cup of rice and grilled chicken", voiceInputTitle: "Voice Input", scanWithCameraTitle: "Scan with Camera", breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", analyseMealButton: "Analyse Meal", quickAccess: "Quick Access", hainaneseChickenRice: "Hainanese Chicken Rice", laksa: "Laksa", kayaToast: "Kaya Toast", bakKutTeh: "Bak Kut Teh", today: "Today", thisWeek: "This Week", thisMonth: "This Month", todaysTotals: "Today's Totals", thisWeeksTotals: "This Week's Total Calories", thisMonthsTotals: "This Month's Total Calories", calories: "Calories", protein: "Protein", fat: "Fat", carbs: "Carbs", showDetails: "Show Details", closeDetails: "Close", nutritionAdvice: "Nutrition Advice", todaysCalories: "Today's Calories", nutritionBalance: "Nutrition Balance", mealList: "Meal List", noMeals: "No meals recorded for this period.", deleteAllData: "Delete All Data", scanMealButton: "Scan Meal with Camera", scanBarcodeButton: "Scan Barcode", closeButton: "Close", positionMeal: "Position your meal in the camera", captureButton: "Capture", scanBarcodeTitle: "Scan a Barcode", zoom: "Zoom", servingSizeTitle: "Enter Serving Size", servingSizeLabel: "Serving Size (grams)", cancelButton: "Cancel", addMealButton: "Add Meal", okButton: "OK", confirmButton: "Confirm", settingsDescription: "Let us calculate your needs, or set your own manual goal.", gender: "Gender", male: "Male", female: "Female", age: "Age", height: "Height (cm)", weight: "Weight (kg)", activityLevel: "Activity Level",
    activityLevel1: "Sedentary (mostly sitting, little to no exercise)",
    activityLevel2: "Lightly Active (light exercise/walks 1-2 times a week)",
    activityLevel3: "Moderately Active (regular exercise 3-5 times a week)",
    activityLevel4: "Very Active (vigorous exercise 6-7 times a week)",
    activityLevel5: "Extremely Active (strenuous exercise daily or physical job)",
    calculateAndSave: "Calculate & Save", or: "OR", setManualGoal: "Set Manual Calorie Goal", saveManualGoal: "Save Manual Goal",
    analysing: "Analysing...", noFavourites: "No favourite meals yet. Click the star on a meal to add it.",
    didYouMean: 'Did you mean "{foodName}"?', listening: 'Listening...', checkingSpeech: 'Checking your speech...', speechError: 'Could not recognize speech: {error}',
    deletingData: 'Deleting data...', signingIn: 'Signing in...', loadingData: 'Loading your data...', barcodeLookup: 'Found barcode: {barcode}. Looking up...',
    offlineTitle: "You're Offline", offlineMessage: "Please check your internet connection and try again.",
    nextMeal: "your next meal",
    goalSetMessage: "Your daily goal has been set to {calories} kcal.",
    adviceLowProtein: "For {nextMeal}, focus on a protein-rich food like grilled chicken, fish, or tofu to improve your balance.",
    adviceHighFat: "For {nextMeal}, try a lower-fat option. Steamed vegetables and a lean protein source would be a great choice.",
    adviceBalanced: "You're doing great! For {nextMeal}, a balanced meal with whole grains, lean protein, and colourful vegetables would be perfect to continue your streak.",
    adviceStart: "Let's get started! For your next meal, try to include a mix of protein, healthy fats, and complex carbs.",
    rateLimitError: "Requests are currently busy. Please wait a moment and try again.",
    removeFavouriteConfirm: "Are you sure you want to remove this favourite?",
    removeMealConfirm: "Are you sure you want to delete this meal record?",
    viewDashboard: "View Dashboard",
    hideDashboard: "Hide Dashboard",
    confirmFoodTitle: "Confirm Food & Quantity",
    quantityLabel: "Enter quantity (e.g., 1 piece, 100g)",
    deleteTodayData: "Delete Today's Data",
    deleteTodayConfirm: "Are you sure you want to delete all meals recorded today?",
    dangerZone: "Danger Zone",
    dangerZoneDesc: "This action cannot be undone. Please be certain.",
    sun: "S", mon: "M", tue: "T", wed: "W", thu: "T", fri: "F", sat: "S",
    week: "Week", periodGoal: "Period Goal", actualIntake: "Actual Intake"
  },
  zh: {
    loginTitle: "登录", emailLabel: "电子邮件", passwordLabel: "密码", loginButton: "登录", authToggle: "需要一个账户？ 注册", guestButton: "以访客身份继续", forgotPassword: "忘记密码？", enterEmailForReset: "请在电子邮件字段中输入您的电子邮件地址以重置密码。", passwordResetSent: "密码重置链接已发送到您的电子邮件地址。请检查您的收件箱。", healthTrackerTitle: "健康追踪器", tagline: "开启您的健康之旅。", signOutButton: "登出", loginToSyncButton: "登录以同步数据", favouritesTitle: "收藏", setGoalsTitle: "设定每日目标", googleSignIn: "使用谷歌登录", foodInputPlaceholder: "例如：一碗米饭和烤鸡", voiceInputTitle: "语音输入", scanWithCameraTitle: "用相机扫描", breakfast: "早餐", lunch: "午餐", dinner: "晚餐", snack: "点心", analyseMealButton: "分析膳食", quickAccess: "快速访问", hainaneseChickenRice: "海南鸡饭", laksa: "叻沙", kayaToast: "咖椰吐司", bakKutTeh: "肉骨茶", today: "今天", thisWeek: "本星期", thisMonth: "这个月", todaysTotals: "今日总计", thisWeeksTotals: "本周总热量", thisMonthsTotals: "本月总热量", calories: "卡路里", protein: "蛋白质", fat: "脂肪", carbs: "碳水化合物", showDetails: "显示详细信息", closeDetails: "关闭", nutritionAdvice: "营养建议", todaysCalories: "今日卡路里", nutritionBalance: "营养均衡", mealList: "膳食清单", noMeals: "此期间没有记录膳食。", deleteAllData: "删除所有数据", scanMealButton: "用相机扫描膳食", scanBarcodeButton: "扫描条形码", closeButton: "关闭", positionMeal: "将您的餐点放在相机中", captureButton: "捕获", scanBarcodeTitle: "扫描条形码", zoom: "变焦", servingSizeTitle: "输入份量", servingSizeLabel: "份量（克）", cancelButton: "取消", addMealButton: "添加膳食", okButton: "好", confirmButton: "确认", settingsDescription: "让我们计算您的需求，或设置您自己的手动目标。", gender: "性别", male: "男性", female: "女性", age: "年龄", height: "身高（厘米）", weight: "体重（公斤）", activityLevel: "活动水平",
    activityLevel1: "久坐 (主要坐着，很少或没有运动)",
    activityLevel2: "轻度活跃 (每周进行1-2次散步等轻度运动)",
    activityLevel3: "中度活跃 (每周进行3-5次定期运动)",
    activityLevel4: "非常活跃 (每周进行6-7次剧烈运动)",
    activityLevel5: "极度活跃 (每天进行剧烈运动或从事体力劳动)",
    calculateAndSave: "计算并保存", or: "要么", setManualGoal: "设置手动卡路里目标", saveManualGoal: "保存手动目标",
    analysing: "分析中...", noFavourites: "还没有喜欢的食物。点击星星添加。",
    didYouMean: '您是指“{foodName}”吗？', listening: '正在听...', checkingSpeech: '正在检查您的语音...', speechError: '无法识别语音: {error}',
    deletingData: '正在删除数据...', signingIn: '登录中...', loadingData: '正在加载您的数据...', barcodeLookup: '找到条形码: {barcode}。查询中...',
    offlineTitle: "您已离线", offlineMessage: "请检查您的网络连接并重试。",
    nextMeal: "下一餐",
    goalSetMessage: "您的每日目标已设定为 {calories} 大卡。",
    adviceLowProtein: "对于{nextMeal}，多吃一些富含蛋白质的食物，如烤鸡、鱼或豆腐，以改善您的平衡。",
    adviceHighFat: "对于{nextMeal}，尝试低脂的选择。蒸蔬菜和瘦肉蛋白是一个很好的选择。",
    adviceBalanced: "你做得很好！对于{nextMeal}，一顿均衡的膳食，包括全谷物、瘦肉蛋白和五颜六色的蔬菜，将是保持健康的完美选择。",
    adviceStart: "让我们开始吧！下一餐，试着摄入蛋白质、健康脂肪和复合碳水化合物的混合物。",
    rateLimitError: "请求繁忙。请稍后再试。",
    removeFavouriteConfirm: "您确定要删除这个收藏吗？",
    removeMealConfirm: "您确定要删除这条膳食记录吗？",
    viewDashboard: "查看仪表板",
    hideDashboard: "隐藏仪表板",
    confirmFoodTitle: "确认食物和数量",
    quantityLabel: "输入数量（例如：1个，100克）",
    deleteTodayData: "删除今日数据",
    deleteTodayConfirm: "您确定要删除今天记录的所有膳食吗？",
    dangerZone: "危险区域",
    dangerZoneDesc: "此操作无法撤销，请谨慎操作。",
    sun: "日", mon: "一", tue: "二", wed: "三", thu: "四", fri: "五", sat: "六",
    week: "周", periodGoal: "期间目标", actualIntake: "实际摄入"
  }
};

// --- DOM Elements ---
const mainContent = document.getElementById('main-content');
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const authForm = document.getElementById('auth-form');
const authToggleLink = document.getElementById('auth-toggle-link');
const authTitle = document.getElementById('auth-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authError = document.getElementById('auth-error');
const foodInput = document.getElementById('food-input');
const accountMenuBtn = document.getElementById('account-menu-btn');
const accountDropdown = document.getElementById('account-dropdown');
const userEmailDropdown = document.getElementById('user-email-dropdown');
const signOutBtnDropdown = document.getElementById('sign-out-btn-dropdown');
const analyseBtn = document.getElementById('analyse-btn');
const dashboard = document.getElementById('dashboard');
const mealList = document.getElementById('meal-list');
const resetAllBtn = document.getElementById('reset-all-btn');
const resetTodayBtn = document.getElementById('reset-today-btn');
const guestModeBtn = document.getElementById('guest-mode-btn');
const userHeader = document.getElementById('user-header');
const guestHeader = document.getElementById('guest-header');
const goToLoginBtn = document.getElementById('go-to-login-btn');
const googleSignInBtn = document.getElementById('google-signin-btn');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const toggleDashboardBtn = document.getElementById('toggle-dashboard-btn');
const voiceInputBtn = document.getElementById('voice-input-btn');
const cameraScanBtn = document.getElementById('camera-scan-btn');
const cameraChoiceModal = document.getElementById('camera-choice-modal');
const scanMealBtn = document.getElementById('scan-meal-btn');
const scanBarcodeBtn = document.getElementById('scan-barcode-btn');
const closeChoiceBtn = document.getElementById('close-choice-btn');
const toggleDetailsBtn = document.getElementById('toggle-details-btn');
const detailedDashboardView = document.getElementById('detailed-dashboard-view');
const cameraModal = document.getElementById('camera-modal');
const cameraView = document.getElementById('camera-view');
const cameraCanvas = document.getElementById('camera-canvas');
const captureBtn = document.getElementById('capture-btn');
const closeCameraBtn = document.getElementById('close-camera-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const diagnosisForm = document.getElementById('diagnosis-form');
const manualGoalForm = document.getElementById('manual-goal-form');
const barcodeModal = document.getElementById('barcode-modal');
const barcodeVideo = document.getElementById('barcode-video');
const closeBarcodeBtn = document.getElementById('close-barcode-btn');
const barcodeResultEl = document.getElementById('barcode-result');
const servingModal = document.getElementById('serving-modal');
const servingForm = document.getElementById('serving-form');
const cancelServingBtn = document.getElementById('cancel-serving-btn');
const servingProductName = document.getElementById('serving-product-name');
const favouritesBtn = document.getElementById('favourites-btn');
const favouritesModal = document.getElementById('favourites-modal');
const closeFavouritesBtn = document.getElementById('close-favourites-btn');
const favouritesList = document.getElementById('favourites-list');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingText = document.getElementById('loading-text');
const zoomControls = document.getElementById('zoom-controls');
const zoomSlider = document.getElementById('zoom-slider');
const mainAppContent = document.getElementById('main-app-content');
const splashScreen = document.getElementById('splash-screen');
const appHeader = document.getElementById('app-header');
const listeningModal = document.getElementById('listening-modal');
const listeningTextStatus = document.getElementById('listening-text-status');
const prevPeriodBtn = document.getElementById('prev-period-btn');
const nextPeriodBtn = document.getElementById('next-period-btn');
const periodTitleContainer = document.getElementById('period-title-container');
const periodTitle = document.getElementById('period-title');
const dynamicChartTitle = document.getElementById('dynamic-chart-title');
const calorieGaugeChartEl = document.getElementById('calorie-gauge-chart');
const periodBarChartEl = document.getElementById('period-bar-chart');
const smallGaugesContainer = document.getElementById('small-gauges-container');
const chartsGrid = document.getElementById('charts-grid');
const mainChartWrapper = document.getElementById('main-chart-wrapper');
const nutritionBalanceWrapper = document.getElementById('nutrition-balance-wrapper');
const nutritionChartEl = document.getElementById('nutrition-chart');
const nutritionBalanceTextEl = document.getElementById('nutrition-balance-text');
const barChartContainer = document.getElementById('bar-chart-container');
const periodGoalText = document.getElementById('period-goal-text');
const periodActualText = document.getElementById('period-actual-text');
const calendarModal = document.getElementById('calendar-modal');
const calendarMonthYear = document.getElementById('calendar-month-year');
const calendarGrid = document.getElementById('calendar-grid');
const calendarWeekdays = document.getElementById('calendar-weekdays');
const calendarPrevMonth = document.getElementById('calendar-prev-month');
const calendarNextMonth = document.getElementById('calendar-next-month');
const closeCalendarBtn = document.getElementById('close-calendar-btn');
const calendarMonthGrid = document.getElementById('calendar-month-grid');
const quantityModal = document.getElementById('quantity-modal');
const quantityForm = document.getElementById('quantity-form');
const identifiedFoodNameEl = document.getElementById('identified-food-name');
const quantityInput = document.getElementById('quantity-input');
const cancelQuantityBtn = document.getElementById('cancel-quantity-btn');
const offlineModal = document.getElementById('offline-modal');
const offlineCloseBtn = document.getElementById('offline-close-btn');
// Mobile Header Buttons
const accountMenuBtnMobile = document.getElementById('account-menu-btn-mobile');
const goToLoginBtnMobile = document.getElementById('go-to-login-btn-mobile');
const favouritesBtnMobile = document.getElementById('favourites-btn-mobile');
const settingsBtnMobile = document.getElementById('settings-btn-mobile');

let allMeals = [], favouriteMeals = [], userGoals = { calories: 2000, protein: 100, fat: 67, carbs: 250 }, nutritionChart = null, calorieGaugeChart = null, proteinGaugeChart = null, fatGaugeChart = null, carbsGaugeChart = null, periodChart = null, activePeriod = 'day', currentDate = new Date(), calendarDisplayDate = new Date(), calendarMode = 'day', isLoginMode = true, cameraStream = null, barcodeReader = null, currentScannedProduct = null, isDetailedView = false, identifiedFoodName = '';
if (typeof ZXing !== 'undefined') barcodeReader = new ZXing.BrowserMultiFormatReader();

// --- ALL FUNCTIONS (Keep all existing function definitions here) ---
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  const translation = translations[lang];
  document.querySelectorAll('[data-lang-key]').forEach(element => {
    const key = element.getAttribute('data-lang-key');
    if (translation[key]) element.textContent = translation[key];
  });
  document.querySelectorAll('[data-lang-key-placeholder]').forEach(element => {
    const key = element.getAttribute('data-lang-key-placeholder');
    if (translation[key]) element.placeholder = translation[key];
  });
  document.querySelectorAll('[data-lang-key-title]').forEach(element => {
    const key = element.getAttribute('data-lang-key-title');
    if (translation[key]) element.title = translation[key];
  });
  if (isLoginMode) {
    authToggleLink.textContent = lang === 'zh' ? '需要一个账户？ 注册' : 'Need an account? Sign Up';
    authTitle.textContent = lang === 'zh' ? '登录' : 'Login';
    authSubmitBtn.textContent = lang === 'zh' ? '登录' : 'Login';
  } else {
    authToggleLink.textContent = lang === 'zh' ? '已经有账户了？ 登录' : 'Have an account? Login';
    authTitle.textContent = lang === 'zh' ? '注册' : 'Sign Up';
    authSubmitBtn.textContent = lang === 'zh' ? '注册' : 'Sign Up';
  }
  if (!appContainer.classList.contains('hidden')) updateDashboard(activePeriod);
  syncToggleDashboardButton();
}
function setDefaultMealType() {
  const hour = new Date().getHours();
  let defaultMealType = (hour >= 5 && hour < 11) ? 'Breakfast' : (hour >= 11 && hour < 17) ? 'Lunch' : 'Dinner';
  if (hour < 5 || hour >= 21) defaultMealType = 'Snack';
  document.querySelectorAll('.meal-type-btn').forEach(btn => btn.classList.remove('active'));
  const activeButton = document.querySelector(`.meal-type-btn[data-type="${defaultMealType}"]`);
  if (activeButton) activeButton.classList.add('active');
}
function showLoader(messageKey) {
  const currentLang = localStorage.getItem('language') || 'en';
  loadingText.textContent = translations[currentLang][messageKey] || translations[currentLang].analysing;
  loadingOverlay.classList.remove('hidden');
}
function hideLoader() { loadingOverlay.classList.add('hidden'); }
function showAlert(message) {
  return new Promise(resolve => {
    const alertModal = document.getElementById('alert-modal');
    document.getElementById('alert-message').textContent = message;
    document.getElementById('alert-ok-btn').style.display = 'inline-block';
    document.getElementById('alert-confirm-btn').style.display = 'none';
    document.getElementById('alert-cancel-btn').style.display = 'none';
    alertModal.classList.remove('hidden');
    document.getElementById('alert-ok-btn').onclick = () => {
      alertModal.classList.add('hidden');
      resolve(true);
    };
  });
}
function showConfirm(message) {
  return new Promise(resolve => {
    const alertModal = document.getElementById('alert-modal');
    document.getElementById('alert-message').textContent = message;
    document.getElementById('alert-ok-btn').style.display = 'none';
    document.getElementById('alert-confirm-btn').style.display = 'inline-block';
    document.getElementById('alert-cancel-btn').style.display = 'inline-block';
    alertModal.classList.remove('hidden');
    document.getElementById('alert-confirm-btn').onclick = () => {
      alertModal.classList.add('hidden');
      resolve(true);
    };
    document.getElementById('alert-cancel-btn').onclick = () => {
      alertModal.classList.add('hidden');
      resolve(false);
    };
  });
}
async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try { await auth.signInWithPopup(provider); }
  catch (error) { authError.textContent = error.message; }
}
function showAppContainer(isLoggedIn) {
  authContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
  userHeader.style.display = isLoggedIn ? 'flex' : 'none';
  guestHeader.style.display = isLoggedIn ? 'none' : 'flex';
}
function showAuthContainer() {
  appContainer.classList.add('hidden');
  authContainer.classList.remove('hidden');
}
function setAndSaveGoals(calorieGoal) {
  userGoals = {
    calories: calorieGoal,
    protein: Math.round((calorieGoal * 0.20) / 4),
    fat: Math.round((calorieGoal * 0.30) / 9),
    carbs: Math.round((calorieGoal * 0.50) / 4)
  };
  saveUserGoals();
  updateDashboard(activePeriod);
}
async function saveUserGoals() {
  if (auth.currentUser) await db.collection('users').doc(auth.currentUser.uid).set({ goals: userGoals }, { merge: true });
  else localStorage.setItem('guestGoals', JSON.stringify(userGoals));
}
async function loadUserGoals() {
  let loadedGoals = null;
  if (auth.currentUser) {
    const doc = await db.collection('users').doc(auth.currentUser.uid).get();
    if (doc.exists && doc.data().goals) loadedGoals = doc.data().goals;
  } else {
    const storedGoals = localStorage.getItem('guestGoals');
    if (storedGoals) loadedGoals = JSON.parse(storedGoals);
  }
  if (loadedGoals) userGoals = loadedGoals;
  else settingsModal.classList.remove('hidden');
}
async function saveMeal(newMeal) {
  if (auth.currentUser) {
    const docRef = await db.collection('users').doc(auth.currentUser.uid).collection('meals').add(newMeal);
    allMeals.push({ id: docRef.id, ...newMeal });
  } else {
    const mealWithId = { ...newMeal, id: Date.now().toString() };
    allMeals.push(mealWithId);
    saveMealsToStorage();
  }
}
async function deleteMeal(mealId) {
  if (auth.currentUser) await db.collection('users').doc(auth.currentUser.uid).collection('meals').doc(mealId).delete();
  allMeals = allMeals.filter(m => m.id.toString() !== mealId.toString());
  if (!auth.currentUser) saveMealsToStorage();
  updateDashboard(activePeriod);
}
async function loadMealsFromFirestore() {
  if (!auth.currentUser) return;
  const snapshot = await db.collection('users').doc(auth.currentUser.uid).collection('meals').orderBy("timestamp", "desc").get();
  allMeals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (allMeals.length > 0) dashboard.classList.remove('hidden');
  syncToggleDashboardButton();
  updateDashboard(activePeriod);
}
function loadMealsFromStorage() {
  const storedMeals = localStorage.getItem('guestMeals');
  allMeals = storedMeals ? JSON.parse(storedMeals) : [];
  if (allMeals.length > 0) dashboard.classList.remove('hidden');
  syncToggleDashboardButton();
  updateDashboard(activePeriod);
}
function saveMealsToStorage() { localStorage.setItem('guestMeals', JSON.stringify(allMeals)); }
function syncToggleDashboardButton() {
  const isHidden = dashboard.classList.contains('hidden');
  const currentLang = localStorage.getItem('language') || 'en';
  const buttonTextSpan = toggleDashboardBtn.querySelector('span');
  buttonTextSpan.textContent = isHidden ? translations[currentLang].viewDashboard : translations[currentLang].hideDashboard;
  buttonTextSpan.setAttribute('data-lang-key', isHidden ? 'viewDashboard' : 'hideDashboard');
}
async function processNewMeal(mealData = null) {
  // Check for an internet connection first
  if (!navigator.onLine) {
    showOfflineModal();
    return;
  }

  let nutritionData;
  const query = foodInput.value.trim();
  if (!mealData && !query) {
    await showAlert("Please enter a meal to analyse.");
    return;
  }
  showLoader('analysing');
  try {
    nutritionData = mealData ? mealData : await getNutritionalInfo(query);
    if (!nutritionData) throw new Error("Could not retrieve nutritional data.");
    const mealType = document.querySelector('.meal-type-btn.active')?.dataset.type || 'Snack';
    const newMeal = {
      ...nutritionData,
      mealType,
      timestamp: new Date().toISOString()
    };
    await saveMeal(newMeal);
    foodInput.value = '';
    currentDate = new Date();
    activePeriod = 'day';
    if (dashboard.classList.contains('hidden')) {
      dashboard.classList.remove('hidden');
      syncToggleDashboardButton();
    }
  } catch (error) {
    if (error.message === "RATE_LIMIT_EXCEEDED") showAlert(translations[localStorage.getItem('language') || 'en'].rateLimitError);
    else {
      console.error('Error processing new meal:', error);
      await showAlert('Could not analyse meal. Please try again.');
    }
  } finally {
    updateDashboard(activePeriod);
    hideLoader();
    if (!dashboard.classList.contains('hidden')) setTimeout(() => dashboard.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    }), 100);
  }
}
async function openCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { await showAlert("Your browser does not support the camera feature."); return; }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    cameraView.srcObject = cameraStream;
    cameraModal.classList.remove('hidden');
  } catch (err) { console.error("Camera Error:", err); await showAlert("Could not access the camera. Please ensure you have given permission."); }
}
function closeCamera() {
  if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
  cameraModal.classList.add('hidden');
}
async function captureImage() {
  const context = cameraCanvas.getContext('2d');
  cameraCanvas.width = cameraView.videoWidth;
  cameraCanvas.height = cameraView.videoHeight;
  context.drawImage(cameraView, 0, 0, cameraCanvas.width, cameraCanvas.height);
  const imageDataUrl = cameraCanvas.toDataURL('image/jpeg');
  closeCamera();
  showLoader('analysing');
  try {
    identifiedFoodName = await identifyFoodFromImage(imageDataUrl.split(',')[1]);
    hideLoader();
    if (identifiedFoodName) {
      identifiedFoodNameEl.textContent = identifiedFoodName;
      quantityInput.value = '';
      quantityModal.classList.remove('hidden');
      quantityInput.focus();
    } else throw new Error("Could not identify the food.");
  } catch (error) {
    hideLoader();
    if (error.message === "RATE_LIMIT_EXCEEDED") showAlert(translations[localStorage.getItem('language') || 'en'].rateLimitError);
    else { console.error("Image identification error:", error); await showAlert("Sorry, we couldn't identify the food in the image. Please try typing it manually."); }
  }
}
async function identifyFoodFromImage(base64ImageData) {
  const prompt = "What food is in this image? Describe it in a short phrase. If it's not food, say 'not food'.";
  const payload = { contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64ImageData } }] }] };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (response.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    return text.toLowerCase().includes('not food') ? null : text;
  } catch (error) { console.error("Error fetching from Gemini Vision API:", error); if (error.message === "RATE_LIMIT_EXCEEDED") throw error; return null; }
}
async function getNutritionalInfo(prompt) {
  const chatHistory = [{ role: "user", parts: [{ text: `Provide the estimated nutritional information for "${prompt}" in a valid JSON format. The JSON object should only contain these keys: "food" (string), "calories" (number), "protein" (number, in grams), "fat" (number, in grams), and "carbs" (number, in grams).` }] }];
  const payload = { contents: chatHistory, generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "food": { "type": "STRING" }, "calories": { "type": "NUMBER" }, "protein": { "type": "NUMBER" }, "fat": { "type": "NUMBER" }, "carbs": { "type": "NUMBER" } }, required: ["food", "calories", "protein", "fat", "carbs"] } } };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (response.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (error) { console.error("Error fetching from Gemini API:", error); if (error.message === "RATE_LIMIT_EXCEEDED") throw error; return null; }
}
function setupDashboardListeners() {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => { activePeriod = btn.dataset.period; currentDate = new Date(); updateDashboard(activePeriod); }));
  resetAllBtn.addEventListener('click', resetAllData);
  if (resetTodayBtn) resetTodayBtn.addEventListener('click', resetTodayData);
  toggleDetailsBtn.addEventListener('click', () => { isDetailedView = !isDetailedView; updateDashboard(activePeriod); });
  prevPeriodBtn.addEventListener('click', () => navigatePeriod(-1));
  nextPeriodBtn.addEventListener('click', () => navigatePeriod(1));
  periodTitleContainer.addEventListener('click', () => {
    calendarDisplayDate = new Date(currentDate);
    calendarMode = (activePeriod === 'day' || activePeriod === 'week') ? 'day' : 'month';
    renderCalendar(calendarDisplayDate);
    calendarModal.classList.remove('hidden');
  });
}
function navigatePeriod(direction) {
  const newDate = new Date(currentDate);
  if (activePeriod === 'day') newDate.setDate(newDate.getDate() + direction);
  else if (activePeriod === 'week') newDate.setDate(newDate.getDate() + (7 * direction));
  else if (activePeriod === 'month') newDate.setMonth(newDate.getMonth() + direction);
  currentDate = newDate;
  updateDashboard(activePeriod);
}
function updateDashboard(period) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.period === period));
  updatePeriodTitleAndNav();
  const periodMeals = filterMealsByPeriod(period);
  const totals = calculateTotals(periodMeals);
  updateTotalsCard(totals);
  renderMealList(periodMeals);
  provideNutritionalAdvice(periodMeals);
  const currentLang = localStorage.getItem('language') || 'en';
  if (isDetailedView) {
    detailedDashboardView.classList.remove('hidden');
    toggleDetailsBtn.textContent = translations[currentLang].closeDetails;
    toggleDetailsBtn.setAttribute('data-lang-key', 'closeDetails');
    renderCharts(periodMeals, period, totals);
  } else {
    detailedDashboardView.classList.add('hidden');
    toggleDetailsBtn.textContent = translations[currentLang].showDetails;
    toggleDetailsBtn.setAttribute('data-lang-key', 'showDetails');
  }
}
function renderMealList(meals) {
  // Empty the list first.
  mealList.innerHTML = '';
  const currentLang = localStorage.getItem('language') || 'en';

  if (meals.length === 0) {
    // ▼▼▼ Processing when the list is empty. ▼▼▼
    // Add classes for centring and remove classes for stacking
    mealList.classList.add('flex', 'justify-center', 'items-center');
    mealList.classList.remove('space-y-4');

    // Display messages in a centred container.
    mealList.innerHTML = `<p id="no-meals-message" class="text-gray-500 text-center" data-lang-key="noMeals">${translations[currentLang].noMeals}</p>`;

  } else {
    // ▼▼▼ Processing when the list has contents. ▼▼▼
    // Remove classes for centring and restore classes for stacking
    mealList.classList.remove('flex', 'justify-center', 'items-center');
    mealList.classList.add('space-y-4');

    meals.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    meals.forEach(data => {
      const mealElement = document.createElement('div');
      const mealTypeColor = { Breakfast: 'bg-blue-100 text-blue-800', Lunch: 'bg-green-100 text-green-800', Dinner: 'bg-purple-100 text-purple-800', Snack: 'bg-yellow-100 text-yellow-800' };
      const isFavourited = favouriteMeals.some(fav => fav.food.toLowerCase() === data.food.toLowerCase());
      mealElement.className = 'bg-white p-4 border border-gray-200 rounded-lg';
      mealElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-800 capitalize">${data.food}</h3>
                    <div class="flex items-center gap-2">
                        <div class="favourite-star-container">
                            <span class="favourite-star ${isFavourited ? 'favourited' : 'text-gray-400 hover:text-yellow-400'}" title="Add to favourites">
                                <svg class="w-6 h-6 sm:w-5 sm:h-5" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                            </span>
                        </div>
                        <button data-id="${data.id}" class="delete-meal-btn text-xl sm:text-lg font-bold text-red-500 hover:text-red-700 w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-red-100" title="Delete">&times;</button>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-1">
                    <p class="text-xs text-gray-500">${new Date(data.timestamp).toLocaleString('en-US')}</p>
                    <span class="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${mealTypeColor[data.mealType] || mealTypeColor.Snack}">${translations[currentLang][data.mealType.toLowerCase()] || data.mealType}</span>
                </div>
                <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div><strong data-lang-key="calories">${translations[currentLang].calories}:</strong> ${Math.round(data.calories)}</div>
                    <div><strong data-lang-key="protein">${translations[currentLang].protein}:</strong> ${data.protein.toFixed(1)}g</div>
                    <div><strong data-lang-key="fat">${translations[currentLang].fat}:</strong> ${data.fat.toFixed(1)}g</div>
                    <div><strong data-lang-key="carbs">${translations[currentLang].carbs}:</strong> ${data.carbs.toFixed(1)}g</div>
                </div>
            `;

      mealElement.querySelector('.favourite-star').addEventListener('click', (e) => toggleFavourite(data, e.currentTarget));

      mealElement.querySelector('.delete-meal-btn').addEventListener('click', async () => {
        const currentLang = localStorage.getItem('language') || 'en';
        if (await showConfirm(translations[currentLang].removeMealConfirm)) {
          await deleteMeal(data.id);
        }
      });

      mealList.appendChild(mealElement);
    });
  }
}
async function resetAllData() {
  if (!await showConfirm('Are you sure you want to delete all your data? This action cannot be undone.')) return;
  showLoader('deletingData');
  if (auth.currentUser) {
    const snapshot = await db.collection('users').doc(auth.currentUser.uid).collection('meals').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  } else localStorage.removeItem('guestMeals');
  allMeals = [];
  dashboard.classList.add('hidden');
  updateDashboard(activePeriod);
  hideLoader();
}
async function resetTodayData() {
  const currentLang = localStorage.getItem('language') || 'en';
  if (!await showConfirm(translations[currentLang].deleteTodayConfirm)) return;

  showLoader('deletingData');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // Separate meals to be deleted from those to be retained.
  const mealsToDelete = allMeals.filter(meal => {
    const mealDate = new Date(meal.timestamp);
    return mealDate >= today && mealDate <= endOfToday;
  });
  const mealsToKeep = allMeals.filter(meal => {
    const mealDate = new Date(meal.timestamp);
    return mealDate < today || mealDate > endOfToday;
  });

  if (mealsToDelete.length === 0) {
    hideLoader();
    return; // No data to delete.
  }

  if (auth.currentUser) {
    const batch = db.batch();
    mealsToDelete.forEach(meal => {
      const mealRef = db.collection('users').doc(auth.currentUser.uid).collection('meals').doc(meal.id);
      batch.delete(mealRef);
    });
    await batch.commit();
  }

  // Update the local array and save it for guests
  allMeals = mealsToKeep;
  if (!auth.currentUser) {
    saveMealsToStorage();
  }

  // Updated UI.
  updateDashboard(activePeriod);
  hideLoader();
}
function provideNutritionalAdvice(periodMeals) {
  const adviceCard = document.getElementById('advice-card'), adviceIcon = document.getElementById('advice-icon'), adviceText = document.getElementById('advice-text'), currentLang = localStorage.getItem('language') || 'en';
  if (periodMeals.length === 0) { adviceCard.classList.add('hidden'); return; }
  const lastMeal = periodMeals.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0], totals = calculateTotals(periodMeals), proteinCalories = totals.protein * 4, fatCalories = totals.fat * 9, totalCalories = proteinCalories + fatCalories + (totals.carbs * 4);
  let suggestionKey = '', isBalanced = true, mealOrder = ['Breakfast', 'Lunch', 'Dinner'], lastMealIndex = mealOrder.indexOf(lastMeal.mealType), nextMealTypeKey = lastMealIndex !== -1 && lastMealIndex < 2 ? mealOrder[lastMealIndex + 1].toLowerCase() : 'nextMeal', nextMealTranslated = translations[currentLang][nextMealTypeKey];
  if (totalCalories > 0) {
    const proteinPercentage = (proteinCalories / totalCalories) * 100, fatPercentage = (fatCalories / totalCalories) * 100;
    if (proteinPercentage < 15) { suggestionKey = 'adviceLowProtein'; isBalanced = false; }
    else if (fatPercentage > 35) { suggestionKey = 'adviceHighFat'; isBalanced = false; }
    else suggestionKey = 'adviceBalanced';
  } else suggestionKey = 'adviceStart';
  adviceText.textContent = translations[currentLang][suggestionKey].replace('{nextMeal}', nextMealTranslated);
  adviceCard.classList.remove('hidden');
  if (isBalanced) { adviceCard.className = 'p-6 rounded-xl shadow-sm bg-green-50 border-l-4 border-green-400'; adviceIcon.textContent = '✅'; }
  else { adviceCard.className = 'p-6 rounded-xl shadow-sm bg-yellow-50 border-l-4 border-yellow-400'; adviceIcon.textContent = '💡'; }
}
function updateTotalsCard(totals) {
  document.getElementById('total-calories').textContent = Math.round(totals.calories);
  document.getElementById('total-protein').textContent = `${totals.protein.toFixed(1)} g`;
  document.getElementById('total-fat').textContent = `${totals.fat.toFixed(1)} g`;
  document.getElementById('total-carbs').textContent = `${totals.carbs.toFixed(1)} g`;
}
function updatePeriodTitleAndNav() {
  const lang = localStorage.getItem('language') || 'en', today = new Date();
  today.setHours(0, 0, 0, 0);
  let title = '', isFuture = false;
  if (activePeriod === 'day') {
    title = (currentDate.toDateString() === today.toDateString()) ? translations[lang].today : currentDate.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    isFuture = currentDate > today;
  } else if (activePeriod === 'week') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    const options = { month: 'short', day: 'numeric' };
    const startStr = startOfWeek.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { ...options, year: (startOfWeek.getFullYear() !== endOfWeek.getFullYear() ? 'numeric' : undefined) });
    const endStr = endOfWeek.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { ...options, year: 'numeric' });
    title = `${startStr} - ${endStr}`;
    isFuture = startOfWeek > today;
  } else if (activePeriod === 'month') {
    title = currentDate.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long' });
    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    isFuture = firstDayOfNextMonth > today;
  }
  periodTitle.textContent = title;
  nextPeriodBtn.disabled = isFuture;
}
function renderCharts(periodMeals, period, totals) {
  if (periodChart) periodChart.destroy();
  if (calorieGaugeChart) calorieGaugeChart.destroy();
  if (nutritionChart) nutritionChart.destroy();
  const currentLang = localStorage.getItem('language') || 'en';
  if (period === 'day') {
    chartsGrid.classList.remove('grid-cols-1');
    chartsGrid.classList.add('md:grid-cols-2');
    mainChartWrapper.classList.remove('md:col-span-2');
    nutritionBalanceWrapper.classList.remove('hidden');
    calorieGaugeChartEl.classList.remove('hidden');
    barChartContainer.classList.add('hidden');
    nutritionChartEl.classList.remove('hidden');
    nutritionBalanceTextEl.classList.add('hidden');
    smallGaugesContainer.classList.remove('hidden');
    periodGoalText.classList.add('hidden');
    periodActualText.classList.add('hidden');
    dynamicChartTitle.textContent = translations[currentLang].todaysCalories;
    renderAllGauges(totals, period);
    renderNutritionChart(totals);
  } else {
    chartsGrid.classList.add('grid-cols-1');
    chartsGrid.classList.remove('md:grid-cols-2');
    mainChartWrapper.classList.add('md:col-span-2');
    calorieGaugeChartEl.classList.add('hidden');
    barChartContainer.classList.remove('hidden');
    nutritionChartEl.classList.add('hidden');
    nutritionBalanceTextEl.classList.remove('hidden');
    smallGaugesContainer.classList.add('hidden');
    nutritionBalanceWrapper.classList.remove('hidden');
    periodGoalText.classList.remove('hidden');
    periodActualText.classList.remove('hidden');
    renderBarChart(period, periodMeals);
    renderNutritionBalanceText(totals, period);
  }
}
function renderBarChart(period, periodMeals) {
  if (periodChart) periodChart.destroy();
  const currentLang = localStorage.getItem('language') || 'en';
  let chartData, chartLabels, periodMultiplier, goalPerUnit;
  if (period === 'week') {
    dynamicChartTitle.textContent = translations[currentLang].thisWeeksTotals;
    chartLabels = [translations[currentLang].sun, translations[currentLang].mon, translations[currentLang].tue, translations[currentLang].wed, translations[currentLang].thu, translations[currentLang].fri, translations[currentLang].sat];
    const dailyTotals = Array(7).fill(0);
    periodMeals.forEach(meal => { dailyTotals[new Date(meal.timestamp).getDay()] += meal.calories; });
    chartData = dailyTotals;
    periodMultiplier = 7;
    goalPerUnit = userGoals.calories;
  } else {
    dynamicChartTitle.textContent = translations[currentLang].thisMonthsTotals;
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const numWeeks = Math.ceil((startOfMonth.getDay() + endOfMonth.getDate()) / 7);
    chartLabels = Array.from({ length: numWeeks }, (_, i) => `${translations[currentLang].week} ${i + 1}`);
    const weeklyTotals = Array(numWeeks).fill(0);
    periodMeals.forEach(meal => { const weekIndex = Math.floor((startOfMonth.getDay() + new Date(meal.timestamp).getDate() - 1) / 7); weeklyTotals[weekIndex] += meal.calories; });
    chartData = weeklyTotals;
    periodMultiplier = endOfMonth.getDate();
    goalPerUnit = userGoals.calories * 7;
  }
  const periodGoal = userGoals.calories * periodMultiplier, totalPeriodCalories = periodMeals.reduce((sum, meal) => sum + meal.calories, 0);
  periodGoalText.textContent = `${translations[currentLang].periodGoal}: ${Math.round(periodGoal)} kcal`;
  periodActualText.textContent = `${translations[currentLang].actualIntake}: ${Math.round(totalPeriodCalories)} kcal`;
  periodActualText.classList.remove('text-green-600', 'text-red-600');
  periodActualText.classList.add(totalPeriodCalories <= periodGoal ? 'text-green-600' : 'text-red-600');
  const withinGoalData = chartData.map(total => Math.min(total, goalPerUnit));
  const overGoalData = chartData.map(total => Math.max(0, total - goalPerUnit));
  periodChart = new Chart(periodBarChartEl.getContext('2d'), {
    type: 'bar',
    data: { labels: chartLabels, datasets: [{ label: 'Within Goal', data: withinGoalData, backgroundColor: '#3b82f6', borderRadius: 2 }, { label: 'Over Goal', data: overGoalData, backgroundColor: '#ef4444', borderRadius: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }
  });
}
function renderNutritionBalanceText(totals, period) {
  const lang = localStorage.getItem('language') || 'en';
  let periodMultiplier = (period === 'week') ? 7 : (period === 'month') ? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() : 1;
  const proteinGoal = Math.round(userGoals.protein * periodMultiplier), fatGoal = Math.round(userGoals.fat * periodMultiplier), carbsGoal = Math.round(userGoals.carbs * periodMultiplier);
  nutritionBalanceTextEl.innerHTML = `<div class="mt-4 space-y-3 text-gray-700 text-base"><div class="flex justify-between items-center bg-green-50 p-3 rounded-lg"><span class="font-semibold" data-lang-key="protein">${translations[lang].protein}</span><span class="font-mono">${totals.protein.toFixed(0)}g / ${proteinGoal}g</span></div><div class="flex justify-between items-center bg-orange-50 p-3 rounded-lg"><span class="font-semibold" data-lang-key="fat">${translations[lang].fat}</span><span class="font-mono">${totals.fat.toFixed(0)}g / ${fatGoal}g</span></div><div class="flex justify-between items-center bg-red-50 p-3 rounded-lg"><span class="font-semibold" data-lang-key="carbs">${translations[lang].carbs}</span><span class="font-mono">${totals.carbs.toFixed(0)}g / ${carbsGoal}g</span></div></div>`;
}
function renderNutritionChart(totals) {
  const ctx = document.getElementById('nutrition-chart').getContext('2d'), { protein, fat, carbs } = totals, totalPFC = protein + fat + carbs, currentLang = localStorage.getItem('language') || 'en';
  if (nutritionChart) nutritionChart.destroy();
  if (totalPFC === 0) { ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); return; }
  nutritionChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: [`${translations[currentLang].protein} (${((protein / totalPFC) * 100 || 0).toFixed(0)}%)`, `${translations[currentLang].fat} (${((fat / totalPFC) * 100 || 0).toFixed(0)}%)`, `${translations[currentLang].carbs} (${((carbs / totalPFC) * 100 || 0).toFixed(0)}%)`], datasets: [{ data: [protein, fat, carbs], backgroundColor: ['#22c55e', '#f97316', '#ef4444'], borderColor: '#fff' }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } }, tooltip: { callbacks: { label: (c) => `${c.label.split('(')[0].trim()}: ${c.parsed.toFixed(1)}g` } } } }
  });
}
function renderAllGauges(totals, period) {
  if (period !== 'day') return;
  renderGaugeChart('calorie-gauge-chart', calorieGaugeChart, totals.calories, userGoals.calories, 'kcal', (chartInstance) => { calorieGaugeChart = chartInstance; });
  renderGaugeChart('protein-gauge-chart', proteinGaugeChart, totals.protein, userGoals.protein, 'g', (chartInstance) => { proteinGaugeChart = chartInstance; }, '#22c55e');
  renderGaugeChart('fat-gauge-chart', fatGaugeChart, totals.fat, userGoals.fat, 'g', (chartInstance) => { fatGaugeChart = chartInstance; }, '#f97316');
  renderGaugeChart('carbs-gauge-chart', carbsGaugeChart, totals.carbs, userGoals.carbs, 'g', (chartInstance) => { carbsGaugeChart = chartInstance; }, '#ef4444');
}
function renderGaugeChart(canvasId, chartInstance, currentValue, goalValue, unit, setChartInstance, color = '#8b5cf6') {
  const canvasEl = document.getElementById(canvasId);
  if (!canvasEl) return;
  const ctx = canvasEl.getContext('2d'), current = Math.round(currentValue), goal = Math.round(goalValue), remaining = Math.max(0, goal - current), percentage = Math.round((current / goal) * 100 || 0);
  if (chartInstance) chartInstance.destroy();
  const newChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: { datasets: [{ data: [current, remaining], backgroundColor: [current > goal ? '#dc2626' : color, '#e2e8f0'], borderColor: '#fff', borderWidth: 2, circumference: 180, rotation: 270, }] },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, cutout: '70%', },
    plugins: [{
      id: 'gaugeText',
      afterDraw: (chart) => {
        const { ctx, chartArea: { top, width, height } } = chart;
        ctx.save();
        const x = width / 2, y = top + (height / 1.2), isMobile = window.innerWidth < 640, isCalorieGauge = canvasId === 'calorie-gauge-chart';
        let percentageFontSize = isCalorieGauge ? (isMobile ? (percentage >= 100 ? '1.5rem' : '1.75rem') : (percentage >= 100 ? '2.25rem' : '3rem')) : (percentage >= 100 ? '1.25rem' : '1.5rem');
        const detailsFontSize = isCalorieGauge ? (isMobile ? '0.875rem' : '1rem') : '0.75rem', ySpacing = isCalorieGauge ? (isMobile ? 3 : 5) : 2;
        ctx.font = `bold ${percentageFontSize} Inter`;
        ctx.fillStyle = current > goal ? '#dc2626' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${percentage}%`, x, y - ySpacing);
        ctx.font = `${detailsFontSize} Inter`;
        ctx.fillStyle = '#64748b';
        ctx.textBaseline = 'top';
        ctx.fillText(`${current} / ${goal} ${unit}`, x, y + ySpacing);
        ctx.restore();
      }
    }]
  });
  setChartInstance(newChartInstance);
}
function calculateTotals(meals) {
  return meals.reduce((acc, meal) => ({
    calories: acc.calories + (meal.calories || 0), protein: acc.protein + (meal.protein || 0),
    fat: acc.fat + (meal.fat || 0), carbs: acc.carbs + (meal.carbs || 0)
  }), { calories: 0, protein: 0, fat: 0, carbs: 0 });
}
function filterMealsByPeriod(period) {
  const start = new Date(currentDate), end = new Date(currentDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  if (period === 'week') {
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek);
    end.setDate(start.getDate() + 6);
  } else if (period === 'month') {
    start.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
  }
  return allMeals.filter(meal => { const mealDate = new Date(meal.timestamp); return mealDate >= start && mealDate <= end; });
}
function renderCalendar(date) {
  const lang = localStorage.getItem('language') || 'en', today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = date.getFullYear();
  calendarGrid.innerHTML = '';
  calendarWeekdays.innerHTML = '';
  calendarMonthGrid.innerHTML = '';
  if (calendarMode === 'month') {
    calendarMonthYear.textContent = year;
    calendarWeekdays.classList.add('hidden');
    calendarGrid.classList.add('hidden');
    calendarMonthGrid.classList.remove('hidden');
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short' }));
    months.forEach((monthName, index) => {
      const monthCell = document.createElement('button');
      monthCell.textContent = monthName;
      monthCell.className = 'p-3 rounded-lg hover:bg-blue-100 transition-colors';
      if (index === currentDate.getMonth() && year === currentDate.getFullYear()) monthCell.classList.add('bg-blue-500', 'text-white');
      monthCell.addEventListener('click', () => { currentDate = new Date(year, index, 1); calendarModal.classList.add('hidden'); updateDashboard('month'); });
      calendarMonthGrid.appendChild(monthCell);
    });
  } else {
    calendarMonthYear.textContent = date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long' });
    calendarWeekdays.classList.remove('hidden');
    calendarGrid.classList.remove('hidden');
    calendarMonthGrid.classList.add('hidden');
    const weekdays = (lang === 'zh') ? ['日', '一', '二', '三', '四', '五', '六'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    weekdays.forEach(day => { const dayEl = document.createElement('div'); dayEl.textContent = day; calendarWeekdays.appendChild(dayEl); });
    const month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDayOfMonth; i++) calendarGrid.appendChild(document.createElement('div'));
    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement('button'), cellDate = new Date(year, month, i);
      dayCell.textContent = i;
      dayCell.className = 'p-1 rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors';
      if (activePeriod === 'week') {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        if (cellDate >= startOfWeek && cellDate <= endOfWeek) dayCell.classList.add('bg-blue-200');
      }
      if (cellDate.toDateString() === today.toDateString()) dayCell.classList.add('border-2', 'border-gray-400');
      if (cellDate.toDateString() === currentDate.toDateString()) dayCell.classList.add('bg-blue-500', 'text-white', 'font-bold');
      else dayCell.classList.add('hover:bg-blue-100');
      dayCell.addEventListener('click', () => { currentDate = new Date(year, month, i); calendarModal.classList.add('hidden'); updateDashboard(activePeriod); });
      calendarGrid.appendChild(dayCell);
    }
  }
}
function startBarcodeScanner() {
  if (!barcodeReader) { showAlert('Barcode reader is not ready yet.'); return; }
  barcodeModal.classList.remove('hidden');
  barcodeReader.listVideoInputDevices().then((videoInputDevices) => {
    const selectedDeviceId = videoInputDevices[0].deviceId;
    barcodeReader.decodeFromVideoDevice(selectedDeviceId, 'barcode-video', (result, err) => { if (result) { barcodeReader.reset(); barcodeModal.classList.add('hidden'); processBarcode(result.getText()); } });
  }).catch((err) => { console.error(err); showAlert('Could not start camera.'); });
}
async function processBarcode(barcode) {
  const currentLang = localStorage.getItem('language') || 'en';
  showLoader(translations[currentLang].barcodeLookup.replace('{barcode}', barcode));
  const productData = await fetchProductFromAPI(barcode);
  hideLoader();
  if (productData) {
    currentScannedProduct = productData;
    servingProductName.textContent = productData.food;
    servingModal.classList.remove('hidden');
  } else showAlert(`Product with barcode ${barcode} not found in the database.`);
}
async function fetchProductFromAPI(barcode) {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
    const data = await response.json();
    if (data.status === 1 && data.product) {
      const p = data.product, nutriments = p.nutriments;
      return { food: p.product_name || 'Unknown Product', calories_100g: nutriments['energy-kcal_100g'] || 0, protein_100g: nutriments.proteins_100g || 0, fat_100g: nutriments.fat_100g || 0, carbs_100g: nutriments.carbohydrates_100g || 0, };
    }
    return null;
  } catch (error) { console.error("Error fetching product data:", error); return null; }
}
async function toggleFavourite(mealData, starElement) {
  if (starElement) {
    starElement.classList.add('star-pop');
    const container = starElement.parentElement;
    if (container) {
      container.classList.add('sparkling');
      container.addEventListener('animationend', () => container.classList.remove('sparkling'), { once: true });
    }
    starElement.addEventListener('animationend', () => starElement.classList.remove('star-pop'), { once: true });
  }
  const favIndex = favouriteMeals.findIndex(fav => fav.food.toLowerCase() === mealData.food.toLowerCase());
  if (favIndex > -1) {
    const favId = favouriteMeals[favIndex].id;
    favouriteMeals.splice(favIndex, 1);
    if (auth.currentUser) await db.collection('users').doc(auth.currentUser.uid).collection('favourites').doc(favId).delete();
  } else {
    const { food, calories, protein, fat, carbs } = mealData;
    const newFav = { food, calories, protein, fat, carbs };
    if (auth.currentUser) {
      const docRef = await db.collection('users').doc(auth.currentUser.uid).collection('favourites').add(newFav);
      newFav.id = docRef.id;
    } else newFav.id = Date.now();
    favouriteMeals.push(newFav);
  }
  saveFavouritesToStorage();
  renderMealList(filterMealsByPeriod(activePeriod));
}
async function removeFavourite(favId) {
  const favIndex = favouriteMeals.findIndex(fav => fav.id.toString() === favId.toString());
  if (favIndex > -1) {
    favouriteMeals.splice(favIndex, 1);
    if (auth.currentUser) await db.collection('users').doc(auth.currentUser.uid).collection('favourites').doc(favId).delete();
    saveFavouritesToStorage();
    renderFavouritesList();
    renderMealList(filterMealsByPeriod(activePeriod));
  }
}
function renderFavouritesList() {
  favouritesList.innerHTML = '';
  const currentLang = localStorage.getItem('language') || 'en';
  if (favouriteMeals.length === 0) { favouritesList.innerHTML = `<p class="text-gray-500 text-center" data-lang-key="noFavourites">${translations[currentLang].noFavourites}</p>`; return; }
  favouriteMeals.forEach(fav => {
    const favEl = document.createElement('div');
    favEl.className = 'flex justify-between items-center p-2 bg-gray-100 rounded-md';
    favEl.innerHTML = `<span class="capitalize cursor-pointer hover:text-blue-600 flex-grow text-left">${fav.food}</span><div class="flex items-center"><span class="text-xs text-gray-500 mr-4">${Math.round(fav.calories)} kcal</span><button data-id="${fav.id}" class="delete-favourite-btn text-xl font-bold text-red-400 hover:text-red-600 leading-none p-1">&times;</button></div>`;
    favEl.querySelector('span.capitalize').addEventListener('click', () => { processNewMeal(fav); favouritesModal.classList.add('hidden'); });
    favEl.querySelector('.delete-favourite-btn').addEventListener('click', async (e) => { const favId = e.currentTarget.dataset.id; if (await showConfirm(translations[localStorage.getItem('language') || 'en'].removeFavouriteConfirm)) await removeFavourite(favId); });
    favouritesList.appendChild(favEl);
  });
}
async function loadFavourites() {
  if (auth.currentUser) {
    const snapshot = await db.collection('users').doc(auth.currentUser.uid).collection('favourites').get();
    favouriteMeals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    const stored = localStorage.getItem('guestFavourites');
    favouriteMeals = stored ? JSON.parse(stored) : [];
  }
}
function saveFavouritesToStorage() {
  if (!auth.currentUser) localStorage.setItem('guestFavourites', JSON.stringify(favouriteMeals));
}
// 离线检测功能
let isOnline = navigator.onLine;

function checkOnlineStatus() {
  const wasOnline = isOnline;
  isOnline = navigator.onLine;

  if (wasOnline && !isOnline) {
    // 从在线变为离线
    showOfflineModal();
  }
}

function showOfflineModal() {
  const currentLang = localStorage.getItem('language') || 'en';
  const offlineModal = document.getElementById('offline-modal');
  const offlineTitle = offlineModal.querySelector('[data-lang-key="offlineTitle"]');
  const offlineMessage = offlineModal.querySelector('[data-lang-key="offlineMessage"]');

  offlineTitle.textContent = translations[currentLang].offlineTitle;
  offlineMessage.textContent = translations[currentLang].offlineMessage;
  offlineModal.classList.remove('hidden');
}

function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showAlert('Your browser does not support voice input.'); return; }
  const recognition = new SpeechRecognition();
  const currentLang = localStorage.getItem('language') || 'en';
  recognition.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  listeningTextStatus.textContent = translations[currentLang].listening;
  listeningModal.classList.remove('hidden');
  recognition.start();

  // 添加语音输入取消按钮事件监听
  const voiceCancelBtn = document.getElementById('voice-cancel-btn');
  voiceCancelBtn.addEventListener('click', () => {
    recognition.stop();
    listeningModal.classList.add('hidden');
  });

  recognition.onresult = async (event) => {
    listeningModal.classList.add('hidden');
    const speechResult = event.results[0][0].transcript;
    foodInput.placeholder = translations[currentLang].checkingSpeech;
    showLoader('checkingSpeech');
    try {
      const correctedFood = await getSimilarSoundingFood(speechResult);
      hideLoader();
      if (correctedFood && correctedFood.toLowerCase() !== speechResult.toLowerCase()) {
        const message = translations[currentLang].didYouMean.replace('{foodName}', correctedFood);
        if (await showConfirm(message)) foodInput.value = correctedFood;
        else foodInput.value = '';
      } else foodInput.value = speechResult;
    } catch (error) {
      console.error("Error correcting speech:", error);
      foodInput.value = speechResult;
      hideLoader();
    } finally { foodInput.placeholder = translations[currentLang].foodInputPlaceholder; }
  };
  recognition.onspeechend = () => { recognition.stop(); listeningModal.classList.add('hidden'); };
  recognition.onerror = (event) => {
    listeningModal.classList.add('hidden');
    showAlert(translations[currentLang].speechError.replace('{error}', event.error));
  };
}
async function getSimilarSoundingFood(prompt) {
  const chatHistory = [{ role: "user", parts: [{ text: `A user said "${prompt}" via voice input. If this is a common food item, return the food item's name. If it is not a food item, return the name of a common food item that sounds similar. Respond with only the food name in a valid JSON format. The JSON object should only contain the key "food".` }] }];
  const payload = { contents: chatHistory, generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "food": { type: "STRING" } }, required: ["food"] } } };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    return JSON.parse(text).food;
  } catch (error) { console.error("Error fetching from Gemini API for correction:", error); return null; }
}

// --- APPLICATION INITIALIZATION ---
function initializeAppEventListeners() {
  // --- General Listeners ---
  window.addEventListener('scroll', () => { if (appHeader) appHeader.classList.toggle('shadow-md', window.scrollY > 10); });
  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

  // --- Auth Page Listeners ---
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    authError.textContent = '';
    showLoader('signingIn');
    try {
      if (isLoginMode) await auth.signInWithEmailAndPassword(email, password);
      else await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) { authError.textContent = error.message; }
    finally { hideLoader(); }
  });
  googleSignInBtn.addEventListener('click', signInWithGoogle);
  authToggleLink.addEventListener('click', (e) => { e.preventDefault(); isLoginMode = !isLoginMode; setLanguage(localStorage.getItem('language') || 'en'); });
  forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const currentLang = localStorage.getItem('language') || 'en';
    if (!email) { await showAlert(translations[currentLang].enterEmailForReset); return; }
    try {
      await auth.sendPasswordResetEmail(email);
      await showAlert(translations[currentLang].passwordResetSent);
    } catch (error) { authError.textContent = error.message; }
  });
  guestModeBtn.addEventListener('click', () => {
    loadUserGoals();
    loadFavourites();
    showAppContainer(false);
    loadMealsFromStorage();
  });

  // --- Header Buttons ---
  signOutBtnDropdown.addEventListener('click', (e) => { e.preventDefault(); auth.signOut(); });
  accountMenuBtn.addEventListener('click', () => accountDropdown.classList.toggle('hidden'));
  window.addEventListener('click', (e) => {
    if (!accountMenuBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
      accountDropdown.classList.add('hidden');
    }
  });
  goToLoginBtn.addEventListener('click', showAuthContainer);
  settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
  favouritesBtn.addEventListener('click', () => { renderFavouritesList(); favouritesModal.classList.remove('hidden'); });

  // --- Main App Listeners ---
  analyseBtn.addEventListener('click', () => processNewMeal());
  foodInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processNewMeal(); });
  toggleDashboardBtn.addEventListener('click', () => {
    dashboard.classList.toggle('hidden');
    syncToggleDashboardButton();
    if (!dashboard.classList.contains('hidden')) setTimeout(() => dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  });
  document.querySelectorAll('.quick-food-btn').forEach(btn => btn.addEventListener('click', () => { foodInput.value = btn.textContent; processNewMeal(); }));
  document.querySelectorAll('.meal-type-btn').forEach(btn => btn.addEventListener('click', () => { document.querySelector('.meal-type-btn.active')?.classList.remove('active'); btn.classList.add('active'); }));
  cameraScanBtn.addEventListener('click', () => cameraChoiceModal.classList.remove('hidden'));
  voiceInputBtn.addEventListener('click', startVoiceRecognition);

  // --- Modals & Other Listeners ---
  closeChoiceBtn.addEventListener('click', () => cameraChoiceModal.classList.add('hidden'));
  scanMealBtn.addEventListener('click', () => { cameraChoiceModal.classList.add('hidden'); openCamera(); });
  scanBarcodeBtn.addEventListener('click', () => { cameraChoiceModal.classList.add('hidden'); startBarcodeScanner(); });
  captureBtn.addEventListener('click', captureImage);
  closeCameraBtn.addEventListener('click', closeCamera);
  closeBarcodeBtn.addEventListener('click', () => { if (barcodeReader) barcodeReader.reset(); barcodeModal.classList.add('hidden'); });
  servingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const servingSize = parseFloat(document.getElementById('serving-size').value);
    if (servingSize > 0 && currentScannedProduct) {
      const multiplier = servingSize / 100;
      processNewMeal({ food: currentScannedProduct.food, calories: currentScannedProduct.calories_100g * multiplier, protein: currentScannedProduct.protein_100g * multiplier, fat: currentScannedProduct.fat_100g * multiplier, carbs: currentScannedProduct.carbs_100g * multiplier });
      servingModal.classList.add('hidden');
      currentScannedProduct = null;
    }
  });
  cancelServingBtn.addEventListener('click', () => servingModal.classList.add('hidden'));
  quantityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = quantityInput.value.trim();
    if (quantity && identifiedFoodName) {
      foodInput.value = `${quantity} ${identifiedFoodName}`;
      quantityModal.classList.add('hidden');
      processNewMeal();
    }
  });
  cancelQuantityBtn.addEventListener('click', () => quantityModal.classList.add('hidden'));
  closeFavouritesBtn.addEventListener('click', () => favouritesModal.classList.add('hidden'));
  closeCalendarBtn.addEventListener('click', () => calendarModal.classList.add('hidden'));
  closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
  diagnosisForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const gender = document.getElementById('gender').value, age = parseInt(document.getElementById('age').value), height = parseInt(document.getElementById('height').value), weight = parseInt(document.getElementById('weight').value), activityLevel = parseFloat(document.getElementById('activity-level').value);
    const bmr = (gender === 'male') ? (10 * weight + 6.25 * height - 5 * age + 5) : (10 * weight + 6.25 * height - 5 * age - 161);
    const tdee = Math.round(bmr * activityLevel);
    setAndSaveGoals(tdee);
    settingsModal.classList.add('hidden');
    showAlert(translations[localStorage.getItem('language') || 'en'].goalSetMessage.replace('{calories}', tdee));
  });
  manualGoalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const manualCalories = parseInt(document.getElementById('manual-calories').value);
    if (manualCalories > 0) {
      setAndSaveGoals(manualCalories);
      settingsModal.classList.add('hidden');
      showAlert(translations[localStorage.getItem('language') || 'en'].goalSetMessage.replace('{calories}', manualCalories));
    }
  });

  // Offline Modal Listener
  if (offlineCloseBtn) {
    offlineCloseBtn.addEventListener('click', () => {
      offlineModal.classList.add('hidden');
    });
  }

  setupDashboardListeners();
}

const splashScreenFinished = new Promise(resolve => {
  window.addEventListener('load', () => {
    setTimeout(() => { splashScreen.style.opacity = '0'; }, 2200);
    setTimeout(() => {
      splashScreen.classList.add('hidden');
      mainAppContent.style.opacity = '1';
      resolve();
    }, 2700);
  });
});

auth.onAuthStateChanged(async user => {
  await splashScreenFinished;
  if (user) {
    await loadUserGoals();
    await loadFavourites();
    showAppContainer(true);
    userEmailDropdown.textContent = user.email;
    showLoader('loadingData');
    await loadMealsFromFirestore();
    hideLoader();
  } else {
    showAuthContainer();
  }
});

window.addEventListener('load', () => {
  setDefaultMealType();
  setLanguage(localStorage.getItem('language') || 'en');
  initializeAppEventListeners();
});

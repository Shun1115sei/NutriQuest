"use client"

import React, { useRef, useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { useFirebase } from '~/firebaseconfig';
import Dialog from "~/components/dialog"

interface NutritionInfo {
  food: string;
  calories: number;
  protein: number; // grams
  fat: number;     // grams
  carbs: number;   // grams
}

interface NutritionInfoWithMealType extends NutritionInfo {
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

interface NutritionInfoWithIdAndMealType extends NutritionInfoWithMealType {
  id: string;
}

export default function Dashboard2() {

  const [pwaInstallModalOpen, setPwaInstallModalOpen] = useState(false)
  const [cameraChoiceModalOpen, setCameraChoiceModalOpen] = useState(false)
  const [barcodeScannerModalOpen, setBarcodeScannerModalOpen] = useState(false)
  const [servingSizeModalOpen, setServingSizeModalOpen] = useState(false)
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [alertModalOpen, setAlertModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [voiceListeningModalOpen, setVoiceListeningModalOpen] = useState(false)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [loaderOverlayOpen, setLoaderOverlayOpen] = useState(false)

  const [confirmMessage, setConfirmMessage] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [loaderMessage, setLoaderMessage] = useState("")
  const [currentMeal, setCurrentMeal] = useState("")
  const [portionSize, setPortionSize] = useState(2);
  const [allMeals, setAllMeals] = useState<NutritionInfoWithIdAndMealType[]>([])

  const { auth, db, isLoggedIn, getCollection, addDocument } = useFirebase();

  function showAlert(alertMessage: string) {
    setAlertMessage(alertMessage)
    setAlertModalOpen(true)
  }

  function showConfirm(confirmMessage: string) {
    setConfirmMessage(confirmMessage)
    setConfirmModalOpen(true)
  }

  function alertOffline() {
    showAlert("Sorry, you seem to be offline.")
  }

  function showLoader(messageKey: string) {
    setLoaderMessage(messageKey)
    setLoaderOverlayOpen(true)
  }

  /**
  * Gets nutritional information for food items using Google Gemini API
  * Uses Google Gemini AI for food recognition and nutrition analysis
  *
  * @param {any} foodItem - The food we are analysing
  * @returns {Promise} Promise that resolves when the operation completes
  * @throws {Error} When API request fails or rate limit is exceeded
  */
  async function getNutritionalInfo(foodItem: string) {
    try {
      const response = await fetch('/api/gemini/getnutriinfo/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "prompt": foodItem })
      });

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      // Parse successful result
      const result: NutritionInfo = await response.json();
      function isValidNutritionInfo(obj: any) {
        if (typeof obj.food !== 'string') return false;
        if (typeof obj.calories !== 'number') return false;
        if (typeof obj.protein !== 'number') return false;
        if (typeof obj.fat !== 'number') return false;
        if (typeof obj.carbs !== 'number') return false;
        return true;
      }

      if (!isValidNutritionInfo(result)) {
        throw new Error('Invalid nutrition info format');
      }

      return result;

    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("unknown error occured when getting nuritional info");
      }
    }
  }

  /**
 * Saves meal data to localStorage for guest users
 */
  function copyMealsToLocalStorage() {
    localStorage.setItem('guestMeals', JSON.stringify(allMeals));
  }

  /**
  * Saves a new meal entry to Firebase (authenticated users) or localStorage (guests)
  * Handles both authenticated (Firebase) and guest (localStorage) users
  *
  * @param {any} newMeal - The newmeal parameter
  * @returns {Promise} Promise that resolves when the operation completes
  * @async
  */
  async function saveMeal(newMeal: NutritionInfoWithMealType) {
    if (auth.currentUser) {
      const mealsCollectionRef = getCollection('users', auth.currentUser.uid, 'meals');
      const docRef = await addDocument(mealsCollectionRef, newMeal);
      setAllMeals(prevMeals => [...prevMeals, { id: docRef.id, ...newMeal }]);
    } else {
      const mealWithId = { ...newMeal, id: Date.now().toString() };
      setAllMeals((prevMeals) => [...prevMeals, mealWithId]);
      copyMealsToLocalStorage();
    }
  }

  async function processNewMeal(foodName: string, mealType: "breakfast" | "lunch" | "dinner" | "snack", bypassQuantityCheck = false) {
    const hasNumber = /\d/.test(foodName);
    if (!hasNumber && !bypassQuantityCheck) {
      setCurrentMeal(foodName)
      setServingSizeModalOpen(true)
      return;
    } else {
      showLoader("analysing")
      try {
        const nutritionData = await getNutritionalInfo(foodName);
        if (!nutritionData) throw new Error("Could not retrieve nutritional data.");
        const newMeal = {
          ...nutritionData,
          mealType,
          timestamp: new Date().toISOString()
        };
        await saveMeal(newMeal)
        setLoaderOverlayOpen(false)

      } catch (error) {
        if (error instanceof Error) {
          showAlert(error.message)
        } else {
          showAlert("sorry, something went wrong. ")
        }
      }
    }
  }

  async function processNewMealFromTextBox(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const mealName = formData.get("food-input")
    if (typeof mealName === "string" && mealName !== "") {
      await processNewMeal(mealName, "snack", false)
    } else {
      showAlert("An error occured. Is the text box empty?")
    }
  }

  async function processNewMealFromPortionSize(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const specificPortion = formData.get("specific-portion")
    if (typeof specificPortion === "string" && specificPortion !== "") {
      setServingSizeModalOpen(false)
      await processNewMeal(`${currentMeal} - ${specificPortion}`, "snack", true)
    } else {
      setServingSizeModalOpen(false)
      await processNewMeal(`${currentMeal} - ${portionSize === 0 ? "Very Small (0.5x)"
        : portionSize === 1 ? "A Little Less (0.8x)"
          : portionSize === 3 ? "A Little More (1.2x)"
            : portionSize === 4 ? "Very Large (1.5x)"
              : "Regular Portion (1x)"}`, "snack", true)
    }
  }

  function handlePortionSizeChange(event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPortionSize(event.target.valueAsNumber)
  }

  return (
    <>
      {/*Navbar */}
      <header className="custom-titlebar navbar bg-base-100 shadow sticky top-0 z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <svg className="w-6 h-6 sm:w-10 sm:h-10 header-heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="headerHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(239,68,68)" />
                <stop offset="100%" stopColor="rgb(236,72,153)" />
              </linearGradient>
            </defs>
            <path fill="url(#headerHeartGradient)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z">
            </path>
          </svg>
          <div className="sm:text-left header-greeting-wrapper">
            <h1 id="header-greeting" className="text-lg sm:text-2xl font-bold text-base-700"></h1>
            <p id="header-date-subtitle" className="text-base-500 text-sm"></p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 ml-auto">

          <div className="join">
            <input type="radio" name="navbar-language" value="en" className="lang-radio join-item btn btn-sm" aria-label="EN"
              checked />
            <input type="radio" name="navbar-language" value="zh" className="lang-radio join-item btn btn-sm" aria-label="中" />
          </div>

          <div id="guest-header" className="flex-none">
            <Link to="/login/" className="btn btn-primary btn-sm">
              <span data-lang-key="loginButton">Login</span>
            </Link>
          </div>

          <div id="user-header" className="dropdown dropdown-end">
            <div tabIndex={0} role="button" id="account-menu-btn"
              className="btn btn-ghost btn-circle text-base-content/60 hover:text-primary/80">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <ul tabIndex={0} id="account-dropdown"
              className="menu dropdown-content bg-base-100 rounded-box z-1 w-64 max-w-xs p-2 shadow">
              <li>
                <div id="user-email-dropdown" className="text-sm font-medium text-base-700 break-words whitespace-normal"></div>
              </li>
              <li>
                <a href="#" id="sign-out-btn-dropdown" data-lang-key="signOutButton">Sign Out</a>
              </li>
            </ul>
          </div>

          <button id="favourites-btn" className="btn btn-ghost btn-circle text-base-content/60 hover:text-warning/80"
            onClick={() => setFavoritesModalOpen(true)} data-lang-key-title="favouritesTitle" title="Favourites">
            <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button id="settings-btn" className="btn btn-ghost btn-circle text-base-content/60 hover:text-primary/80"
            onClick={() => setSettingsModalOpen(true)} data-lang-key-title="setGoalsTitle" title="Set Your Daily Goals">
            <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/*mainUI*/}
      <div className="p-4 sm:p-8 bg-base-300">
        <div className="w-full max-w-6xl mx-auto pt-16 sm:pt-24">

          <img src="/icons/NutriQuest_Logo.png" alt="NutriQuest Logo" className="mx-auto h-16 md:h-20 w-auto" />

          <div className="flex items-center justify-center gap-2 mt-2">
            <p data-lang-key="tagline" className="text-base-content/50 text-lg">Your Journey to a Healthier You.</p>

            <button className="btn btn-ghost btn-circle text-base-content/50 hover:text-primary/80" onClick={() => setAboutModalOpen(true)} >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="search-container max-w-xl mx-auto text-center">
          <form onSubmit={processNewMealFromTextBox}>
            <div
              className="relative bg-base-100 border border-base-300 rounded-full shadow-md hover:shadow-lg focus-within:shadow-lg over-3d">
              <div className="flex gap-1 sm:gap-2 items-center mr-2">
                <div className="pl-5"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/50" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
                <input type="text" id="food-input" name="food-input"
                  className="w-full bg-transparent p-4 pl-2 text-lg rounded-full focus:outline-none border-none shadow-none"
                  data-lang-key-placeholder="foodInputPlaceholder" placeholder="e.g., 1 cup of rice and grilled chicken" />
                <button id="voice-input-btn" type="button" className="btn btn-ghost btn-circle text-base-content/60 hover:text-primary/80"
                  onClick={() => setVoiceListeningModalOpen(true)} data-lang-key-title="voiceInputTitle" title="Voice Input">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z">
                    </path>
                  </svg>
                </button>
                <button id="camera-scan-btn" type="button" className=" btn btn-ghost btn-circle text-base-content/60 hover:text-primary/80"
                  onClick={() => setCameraChoiceModalOpen(true)} data-lang-key-title="scanWithCameraTitle" title="Scan with Camera">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div id="meal-type-selector" className="flex flex-wrap justify-center gap-2 mt-4">
              <button data-type="Breakfast"
                className="btn btn-lg rounded-full text-base"
                data-lang-key="breakfast">Breakfast</button>
              <button data-type="Lunch"
                className="btn btn-lg rounded-full text-base"
                data-lang-key="lunch">Lunch</button>
              <button data-type="Dinner"
                className="btn btn-lg rounded-full text-base"
                data-lang-key="dinner">Dinner</button>
              <button data-type="Snack"
                className="btn btn-lg rounded-full text-base"
                data-lang-key="snack">Snack</button>
            </div>

            <div className="mt-6">
              <button id="analyse-btn" type="submit"
                className="over-3d analyse-btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 text-lg rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-px transition-all">
                <span className="relative z-10 " data-lang-key="analyseMealButton">Analyse Meal</span>
              </button>
            </div>
          </form>

          <div id="quick-access" className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-base-content/80 mb-3" data-lang-key="quickAccess">Quick
              Access</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                className="btn btn-sm rounded-full"
                data-lang-key="hainaneseChickenRice">Hainanese Chicken Rice</button>
              <button
                className="btn btn-sm rounded-full"
                data-lang-key="laksa">Laksa</button>
              <button
                className="btn btn-sm rounded-full"
                data-lang-key="kayaToast">Kaya Toast</button>
              <button
                className="btn btn-sm rounded-full"
                data-lang-key="bakKutTeh">Bak Kut Teh</button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a className="text-lg link link-hover link-primary font-bold" id="toggle-dashboard-btn">
            <span data-lang-key="viewDashboard">View Dashboard</span>
          </a>
        </div>

        {/*Dashboard*/}
        <div id="dashboard" className="mt-10 w-full max-w-6xl mx-auto p-4">
          <div className="flex justify-center space-x-2 mb-6">
            <button data-period="day" className="btn" data-lang-key="day">Day</button>
            <button data-period="week" className="btn" data-lang-key="week">Week</button>
            <button data-period="month" className="btn" data-lang-key="month">Month</button>
          </div>

          {/*calendar box*/}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div id="period-totals-card" className="bg-base-100 border border-base-200 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <button id="prev-period-btn"
                    className="btn btn-ghost btn-circle"
                    title="Previous Period">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7">
                      </path>
                    </svg>
                  </button>
                  <div id="period-title-container"
                    className="flex items-center justify-center cursor-pointer hover:text-primary/60 transition-colors group">
                    <h2 id="period-title"
                      className="text-xl sm:text-2xl font-bold text-base-800 text-center px-2 group-hover:text-primary/60 transition-colors">
                    </h2>
                    <svg className="w-5 h-5 ml-1 text-base-500 group-hover:text-primary/60 transition-colors" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
                      </path>
                    </svg>

                    <input type="date" id="calendar-date-input" value="2025-11-11" className="opacity-0 w-0 h-0 absolute" />
                    <input type="week" id="calendar-week-input" value="2025-W47" className="opacity-0 w-0 h-0 absolute" />
                    <input type="month" id="calendar-month-input" value="2025-11" className="opacity-0 w-0 h-0 absolute" />

                  </div>
                  <button id="next-period-btn"
                    className="btn btn-ghost btn-circle"
                    title="Next Period">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                <div id="period-totals" className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-base-600" data-lang-key="calories">Calories</p>
                    <p id="total-calories" className="text-2xl font-semibold text-primary">0
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-600" data-lang-key="protein">Protein</p>
                    <p id="total-protein" className="text-2xl font-semibold text-success">0 g
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-600" data-lang-key="fat">Fat</p>
                    <p id="total-fat" className="text-2xl font-semibold text-warning">0 g</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-600" data-lang-key="carbs">Carbs</p>
                    <p id="total-carbs" className="text-2xl font-semibold text-error">0 g</p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button id="toggle-details-btn" className="text-primary hover:underline" data-lang-key="showDetails">Show
                    Details</button>
                </div>
              </div>

              {/*detailed dashboard view within calendar*/}
              <div id="detailed-dashboard-view" className="space-y-6">
                <div className="bg-base-100 border border-base-200 p-6 rounded-xl shadow-sm">
                  <div id="charts-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div id="main-chart-wrapper">
                      <h3 id="dynamic-chart-title" className="text-lg font-bold text-center text-base-800 mb-2"></h3>
                      <p id="period-goal-text" className="text-center text-base-500 text-sm mb-1 hidden"></p>
                      <p id="period-actual-text" className="text-center font-semibold text-sm mb-2 hidden"></p>
                      <canvas id="calorie-gauge-chart"></canvas>
                      <div id="bar-chart-container" className="relative h-80 hidden">
                        <canvas id="period-bar-chart"></canvas>
                      </div>
                    </div>
                    <div id="nutrition-balance-wrapper">
                      <h3 className="text-lg font-bold text-center text-base-800 mb-2" data-lang-key="nutritionBalance">
                        Nutrition Balance</h3>
                      <canvas id="nutrition-chart"></canvas>
                      <div id="nutrition-balance-text" className="hidden text-left"></div>
                    </div>
                  </div>
                  <div id="small-gauges-container" className="grid grid-cols-3 gap-4 mt-6">
                    <div>
                      <h3 className="text-md font-bold text-center text-base-800 mb-1" data-lang-key="protein">Protein
                      </h3>
                      <canvas id="protein-gauge-chart"></canvas>
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-center text-base-800 mb-1" data-lang-key="fat">Fat</h3>
                      <canvas id="fat-gauge-chart"></canvas>
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-center text-base-800 mb-1" data-lang-key="carbs">Carbs</h3>
                      <canvas id="carbs-gauge-chart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*nutrition advice*/}
            <div id="advice-card" className="card over-3d shadow-sm">
              <h2 className="card-title mb-2" data-lang-key="nutritionAdvice">Nutrition Advice
              </h2>
              <div id="advice-content" className="flex items-start space-x-4">
                <span id="advice-icon" className="text-3xl"></span>
                <div>
                  <p id="advice-text" className="text-base-700"></p>
                  <p id="advice-food" className="text-base-600 text-sm mt-2 hidden"></p>
                </div>
              </div>
            </div>

            {/*meal list*/}
            <div className="lg:col-span-3">
              <div className="bg-base-100 border border-base-200 p-6 rounded-xl shadow-sm min-h-full flex flex-col">
                <h2 className="text-2xl font-bold text-base-800 mb-4" data-lang-key="mealList">
                  Meal List
                </h2>
                <div id="meal-list" className="flex-grow space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  <p id="no-meals-message" className="text-base-500" data-lang-key="noMeals">
                    No meals recorded for this period.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*reset button*/}
          <div className="mt-8 text-center">
            <button id="reset-all-btn" className="btn btn-warning" data-lang-key="deleteTodayData">
              Delete Today's Data
            </button>
          </div>
        </div>
      </div>

      <input type="file" id="image-upload-input" accept="image/*" className="hidden" />
      <input type="file" id="new-cam-module" accept="image/*" capture="environment" className="hidden" />

      {/* Loader Overlay */}
      {loaderOverlayOpen ? (
        <div id="loading-overlay"
          className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-[1000]">
          <div className="flex flex-col items-center justify-center text-white">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="loader"></div>
              <svg className="ecg-line" width="120" height="80" viewBox="0 0 120 80">
                <path className="ecg-path" d="M0 40 H30 L35 20 L45 60 L50 35 L55 40 H120" stroke-width="3" fill="none">
                </path>
              </svg>
            </div>
            <p id="loading-text" className="mt-8 text-lg font-semibold" data-lang-key="analyzing">{loaderMessage}</p>
          </div>
        </div>
      ) : null}

      {/*pwa install modal*/}
      <Dialog open={pwaInstallModalOpen} onClose={() => setPwaInstallModalOpen(false)}>
        <div className="flex flex-col justify-center">
          <p>Install NutriQuest on your device for best experience!</p>
          <button id="install-btn" className="btn btn-primary mt-4">Install </button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost" data-lang-key="closeButton">Close</button>
          </form>
        </div>
      </Dialog>

      {/*camera choice modal */}
      <Dialog open={cameraChoiceModalOpen} onClose={() => setCameraChoiceModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-6" data-lang-key="scanWithCameraTitle">Scan with Camera Options</h2>
        <div className="space-y-4">
          <button id="scan-meal-btn" className="w-full btn btn-primary" data-lang-key="scanMealButton">
            Scan Meal with Camera (mobile)
          </button>
          <button id="scan-barcode-btn" className="w-full btn btn-accent" data-lang-key="scanBarcodeButton">
            Scan Barcode
          </button>
          <button id="upload-image-btn" className="w-full btn btn-secondary" data-lang-key="uploadFromLibrary">
            Upload from Library
          </button>
          <form method="dialog">
            <button className="w-full btn btn-ghost" data-lang-key="closeButton">Close</button>
          </form>
        </div>
      </Dialog>

      {/*barcode scanner modal */}
      <Dialog open={barcodeScannerModalOpen} onClose={() => setBarcodeScannerModalOpen(false)}>
        <h3 className="text-2xl font-bold mb-4 text-center" data-lang-key="scanBarcodeTitle">Scan a Barcode</h3>
        <div id="html5-qrcode-barcode" className="w-full rounded-lg"></div>
        <p id="barcode-result" className="mt-2 text-gray-600 text-center"></p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost" data-lang-key="closeButton">Close</button>
          </form>
        </div>
      </Dialog>

      {/*serving size modal*/}
      <Dialog open={servingSizeModalOpen} onClose={() => setServingSizeModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-2 text-center" data-lang-key="specifyQuantityTitle">
          Specify Quantity
        </h2>
        <form onSubmit={processNewMealFromPortionSize}>
          <p className="text-center text-base-content/50 mb-6">
            For: <a className="font-bold">{currentMeal}</a>
          </p>
          <div className="flex justify-center">
            <fieldset className="fieldset w-full max-w-xs">
              <legend className="fieldset-legend" data-lang-key="intuitiveQuantity">Intuitive Quantity</legend>
              <input type="range" className="range range-primary w-full" id="quantity-slider" min="0" max="4" value={portionSize}          // Controlled by state
                onChange={handlePortionSizeChange}
                step="1" />
              <div className="flex justify-between px-2.5 mt-2 text-xs w-full">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
              <div id="slider-label" className="text-center font-semibold text-primary mt-2">
                {portionSize === 0 ? "Very Small (0.5x)"
                  : portionSize === 1 ? "A Little Less (0.8x)"
                    : portionSize === 3 ? "A Little More (1.2x)"
                      : portionSize === 4 ? "Very Large (1.5x)"
                        : "Regular Portion (1x)"}
              </div>
            </fieldset>
          </div>

          <div className="divider" data-lang-key="or">OR</div>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend" data-lang-key="specificQuantity">Specific Quantity</legend>
            <input type="text" name="specific-portion" id="quantity-spec-text" className="input" data-lang-key-placeholder="quantityPlaceholder"
              placeholder="e.g., 1 bowl, 200g, half" />
          </fieldset>

          <div className="flex items-center justify-between mt-6 w-full">
            <button type="submit" id="unsure-quantity-spec-btn" className="btn btn-secondary" data-lang-key="imNotSure">
              I'm not sure
            </button>
            <div className="flex gap-2">
              <form method="dialog">
                <button className="btn btn-ghost" data-lang-key="cancelButton">Cancel</button>
              </form>
              <button type="submit" id="confirm-quantity-spec-btn" className="btn btn-primary" data-lang-key="confirmButton">
                Confirm
              </button>
            </div>
          </div>
        </form>
      </Dialog>

      {/*favorites modal*/}
      <Dialog open={favoritesModalOpen} onClose={() => setFavoritesModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center" data-lang-key="favouritesTitle">Your Favourite Meals</h2>
        <div id="favourites-list" className="space-y-2 max-h-96 overflow-y-auto">
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost" data-lang-key="closeButton">Close</button>
          </form>
        </div>
      </Dialog>

      {/*confirm Modal */}
      <Dialog open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <p id="alert-message" className="text-lg mb-6 text-center">{confirmMessage}</p>
        <div id="alert-buttons" className="modal-action justify-center">
          <button id="alert-confirm-btn" className="btn btn-primary px-8" data-lang-key="confirmButton">Confirm</button>
          <form method="dialog">
            <button className="btn btn-ghost px-8" data-lang-key="cancelButton">Cancel</button>
          </form>
        </div>
      </Dialog>

      {/*alert Modal */}
      <Dialog open={alertModalOpen} onClose={() => setAlertModalOpen(false)}>
        <p id="alert-message" className="text-lg mb-6 text-center">{alertMessage}</p>
        <div className="modal-action justify-center">
          <form method="dialog">
            <button className="btn btn-ghost" data-lang-key="closeButton">Close</button>
          </form>
        </div>
      </Dialog>

      {/*settings Modal */}
      <Dialog open={settingsModalOpen} onClose={() => setSettingsModalOpen(false)}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center" data-lang-key="setGoalsTitle">Set Your Daily
            Goals
          </h2>
        </div>

        <div className="overflow-x-hidden overflow-y-auto p-4">
          <p data-lang-key="settingsDescription">
            Let us calculate your needs, or set your own manual goal.
          </p>
          <form id="diagnosis-form" className="mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend" data-lang-key="gender">Gender</legend>
                <select id="gender" className="select">
                  <option value="male" data-lang-key="male">Male</option>
                  <option value="female" data-lang-key="female">Female</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend" data-lang-key="age">Age</legend>
                <input type="number" id="age" value="30" className="input" />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend" data-lang-key="height">Height (cm)</legend>
                <input type="number" id="height" value="170" className="input" />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend" data-lang-key="weight">Weight (kg)</legend>
                <input type="number" id="weight" value="70" className="input" />
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend" data-lang-key="activityLevel">Activity Level</legend>
              <select id="activity-level" className="select">
                <option value="1.2" data-lang-key="activityLevel1">
                  Sedentary (mostly sitting, little to no exercise)
                </option>
                <option value="1.375" data-lang-key="activityLevel2" selected>
                  Lightly Active (light exercise/walks 1-2 times a week)
                </option>
                <option value="1.55" data-lang-key="activityLevel3">
                  Moderately Active (regular exercise 3-5 times a week)
                </option>
                <option value="1.725" data-lang-key="activityLevel4">
                  Very Active (vigorous exercise 6-7 times a week)
                </option>
                <option value="1.9" data-lang-key="activityLevel5">
                  Extremely Active (strenuous exercise daily or physical job)
                </option>
              </select>
            </fieldset>

            <button type="submit" className="btn btn-primary w-full mt-6" data-lang-key="calculateAndSave">
              Calculate &amp; Save
            </button>
          </form>

          <div className="divider" data-lang-key="or">OR</div>
          <form id="manual-goal-form">
            <fieldset className="fieldset">
              <legend className="fieldset-legend" data-lang-key="setManualGoal">Set Manual Calorie Goal</legend>
              <input type="number" id="manual-calories" value="2000" className="input" />
              <button type="submit" className="btn btn-soft w-full mt-4" data-lang-key="saveManualGoal">
                Save Manual Goal
              </button>
            </fieldset>
          </form>

          <div className="divider"></div>

          <div>
            <h3 className="text-lg font-semibold text-error" data-lang-key="dangerZone">Danger Zone</h3>
            <p className="text-sm mt-1" data-lang-key="dangerZoneDesc">
              This action cannot be undone. Please be certain.
            </p>
            <button id="delete-all-data-btn" className="btn btn-error w-full mt-4" data-lang-key="deleteAllData">
              Delete All Data
            </button>
          </div>
          <div className="divider"></div>
          <div className="text-center">
            <form method="dialog">
              <button className="btn w-full btn-ghost" data-lang-key="closeButton">Close</button>
            </form>
          </div>
        </div>
      </Dialog>

      {/*voice listening modal */}
      <Dialog open={voiceListeningModalOpen} onClose={() => setVoiceListeningModalOpen(false)}>
        <div className="text-center">
          <svg className="w-16 h-16 text-blue-500 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z">
            </path>
          </svg>
          <p id="listening-text-status" className="text-lg mt-4" data-lang-key="listeningStatus">Listening...</p>
        </div>

        <div className="modal-action justify-center">
          <form method="dialog">
            <button className="btn btn-ghost">
              <span data-lang-key="cancelButton">Cancel</span>
            </button>
          </form>
        </div>
      </Dialog>

      {/*about Modal */}
      <Dialog open={aboutModalOpen} onClose={() => setAboutModalOpen(false)}>
        <h1 className="text-3xl font-bold text-center">Nutriquest</h1>
        <p className="text-center">Version 1.0 Beta, 11 Nov 2025 Build</p>
        <div className="divider">COPYRIGHT INFO</div>
        <p>Copyright (c) 2025 Shun1115sei</p>
        <p>This project is licensed under the MIT license, and the source code is freely accessible at the following link.
        </p>
        <a className="link link-primary"
          href="https://github.com/Shun1115sei/NutriQuest">https://github.com/Shun1115sei/NutriQuest</a>
        <div className="divider">ABOUT</div>
        <p>Just take a photo of your meal, talk about it, or type it in. NutriQuest is a new type of nutrition management
          tool that uses the cutting edge technologies to automatically analyse and record your meals. It eliminates the
          hassle of manual input, making it easy for anyone to start managing their health.</p>

        <div className="modal-action justify-center">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSea7FPGg8jfparcjMRra1KjXl_op3Qj-nJlGTlV94EV3xGyug/viewform"
            className="btn btn-primary">
            <span>Send feedback</span>
          </a>
          <form method="dialog">
            <button className="btn btn-ghost">
              <span>Done</span>
            </button>
          </form>
        </div>
      </Dialog>

      {/*feedback modal */}
      <Dialog open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)}>
        <h1 className="text-3xl font-bold text-center">Hi there!</h1>
        <div className="divider"></div>
        <p>Would you want to submit a feedback to this app? This will mean a lot in the development of this application!
          Thanks! With love, from the NutriQuest developers.</p>
        <label className="label mt-4">
          <input type="checkbox" id="feedbackModalBlock" className="checkbox" />
          Don't show this again
        </label>
        <div className="modal-action justify-center">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSea7FPGg8jfparcjMRra1KjXl_op3Qj-nJlGTlV94EV3xGyug/viewform"
            className="btn btn-primary">
            <span>Send feedback</span>
          </a>
          <form method="dialog">
            <button className="btn btn-ghost">
              <span>Dismiss</span>
            </button>
          </form>
        </div>
      </Dialog>
    </>
  )
}

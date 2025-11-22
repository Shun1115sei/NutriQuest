export default function Splash(){
  return(
      <div id="splash-screen"
    className="transition-opacity duration-500 ease-out overflow-hidden fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50">
    <div id="recovery-message" className="hidden text-center p-4">
      <svg className="w-12 h-12 text-blue-500 mx-auto animate-spin mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <p className="text-lg text-gray-600"></p>
    </div>
    <div id="splash-title-container" className="relative h-[80px] flex items-center justify-center">
      <h1 id="splash-title" className="flex relative z-10 text-5xl font-bold text-gray-700">
        <span id="splash-nutri">Nutri</span><span id="splash-quest">Quest</span>
      </h1>
      <svg id="splash-heart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <svg id="splash-heart-shockwave" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
    <div className="relative w-96 h-12">
      <svg id="splash-ecg-line" className="absolute inset-0 w-full h-full opacity-0" viewBox="0 0 300 60">
        <path className="splash-ecg-path" d="M0 30 H80 L95 10 L125 50 L145 20 L155 30 H300" stroke-width="3"
          stroke="#E8204E" fill="none"></path>
      </svg>
    </div>
    <p id="splash-tagline" data-lang-key="tagline" className="text-lg text-gray-500 mt-2 opacity-0">Your Journey to a
      Healthier You.</p>
  </div>
  )
}

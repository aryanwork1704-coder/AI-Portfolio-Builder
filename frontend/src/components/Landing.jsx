import { useTheme } from '../context/ThemeContext'

const Landing = ({ onStartBuilding }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
          AI Portfolio Builder
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12">
          Create stunning portfolios powered by AI. Just add your details, and we'll generate professional descriptions automatically.
        </p>
        <button
          onClick={onStartBuilding}
          className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Generate My Portfolio
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-4">
        <div
          role="button"
          tabIndex={0}
          onClick={() => { localStorage.setItem('landingAction', 'ai'); onStartBuilding() }}
          onKeyPress={(e) => e.key === 'Enter' && (localStorage.setItem('landingAction', 'ai'), onStartBuilding())}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">AI-Powered</h3>
          <p className="text-gray-600 dark:text-gray-400">Automatic descriptions generated using advanced AI technology</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => { localStorage.setItem('landingAction', 'preview'); onStartBuilding() }}
          onKeyPress={(e) => e.key === 'Enter' && (localStorage.setItem('landingAction', 'preview'), onStartBuilding())}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Real-Time Preview</h3>
          <p className="text-gray-600 dark:text-gray-400">See your portfolio come to life as you type</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => { localStorage.setItem('landingAction', 'export'); onStartBuilding() }}
          onKeyPress={(e) => e.key === 'Enter' && (localStorage.setItem('landingAction', 'export'), onStartBuilding())}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Export & Share</h3>
          <p className="text-gray-600 dark:text-gray-400">Download as HTML or PDF and share with the world</p>
        </div>
      </div>
    </div>
  )
}

export default Landing


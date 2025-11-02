import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Form from './Form'
import Preview from './Preview'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'

const PortfolioBuilder = ({ initialData, onBack, initialAction }) => {
  const { isDark, toggleTheme } = useTheme()
  const [portfolioData, setPortfolioData] = useState({
    name: initialData?.name || '',
    title: initialData?.title || '',
    skills: initialData?.skills || [],
    projects: initialData?.projects || [],
    about: initialData?.about || '',
    loading: false
  })

  useEffect(() => {
    // Save to localStorage whenever portfolioData changes
    const { loading, ...dataToSave } = portfolioData
    if (dataToSave.name || dataToSave.title || dataToSave.skills.length > 0 || dataToSave.projects.length > 0) {
      localStorage.setItem('portfolioData', JSON.stringify(dataToSave))
    }
  }, [portfolioData])

  const handleGenerateDescriptions = async () => {
    if (!portfolioData.name || !portfolioData.title) {
      document.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Please enter your name and title first', type: 'error' } }))
      return
    }

    setPortfolioData(prev => ({ ...prev, loading: true }))

    try {
      const response = await axios.post('/api/ai/generate', {
        name: portfolioData.name,
        title: portfolioData.title,
        skills: portfolioData.skills,
        projects: portfolioData.projects.map(p => ({ name: p.name, technologies: p.technologies || [] }))
      })

      setPortfolioData(prev => ({
        ...prev,
        about: response.data.about || prev.about,
        projects: prev.projects.map((project, idx) => ({
          ...project,
          description: response.data.projectDescriptions?.[idx] || project.description || ''
        })),
        loading: false
      }))
    } catch (error) {
      console.error('Error generating descriptions:', error)
      document.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Failed to generate descriptions. Please try again.', type: 'error' } }))
      setPortfolioData(prev => ({ ...prev, loading: false }))
    }
  }

  // Handle actions coming from the landing page (ai / preview / export)
  useEffect(() => {
    if (!initialAction) return

    // Small delay to allow the page to render
    const t = setTimeout(() => {
      if (initialAction === 'ai') {
        if (!portfolioData.name || !portfolioData.title) {
          // Auto-fill sensible example values and then run generation
          setPortfolioData(prev => ({ ...prev, name: prev.name || 'Jane Doe', title: prev.title || 'Full Stack Developer' }))
          setTimeout(() => {
            handleGenerateDescriptions()
          }, 600)
        } else {
          handleGenerateDescriptions()
        }
      } else if (initialAction === 'preview') {
        const previewEl = document.getElementById('portfolio-preview')
        previewEl?.scrollIntoView({ behavior: 'smooth' })
        if (previewEl) {
          previewEl.classList.add('preview-highlight')
          setTimeout(() => previewEl.classList.remove('preview-highlight'), 2000)
        }
      } else if (initialAction === 'export') {
        // Notify Header to open the export menu
        document.dispatchEvent(new Event('openExportMenu'))
      }
    }, 300)

    return () => clearTimeout(t)
  }, [initialAction])

  const updatePortfolioData = (updates) => {
    setPortfolioData(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen">
      <Header 
        portfolioData={portfolioData}
        onBack={onBack}
        onThemeToggle={toggleTheme}
        isDark={isDark}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Form 
              portfolioData={portfolioData}
              updatePortfolioData={updatePortfolioData}
              onGenerateDescriptions={handleGenerateDescriptions}
              loading={portfolioData.loading}
            />
          </div>
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Preview portfolioData={portfolioData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PortfolioBuilder


import { useState } from 'react'

const Form = ({ portfolioData, updatePortfolioData, onGenerateDescriptions, loading }) => {
  const [skillInput, setSkillInput] = useState('')
  const [projectInput, setProjectInput] = useState({ name: '', technologies: '', description: '' })

  const addSkill = () => {
    if (skillInput.trim() && !portfolioData.skills.includes(skillInput.trim())) {
      updatePortfolioData({
        skills: [...portfolioData.skills, skillInput.trim()]
      })
      setSkillInput('')
    }
  }

  const removeSkill = (skill) => {
    updatePortfolioData({
      skills: portfolioData.skills.filter(s => s !== skill)
    })
  }

  const addProject = () => {
    if (projectInput.name.trim()) {
      updatePortfolioData({
        projects: [
          ...portfolioData.projects,
          {
            name: projectInput.name.trim(),
            technologies: projectInput.technologies.split(',').map(t => t.trim()).filter(Boolean),
            description: projectInput.description.trim()
          }
        ]
      })
      setProjectInput({ name: '', technologies: '', description: '' })
    }
  }

  const removeProject = (index) => {
    updatePortfolioData({
      projects: portfolioData.projects.filter((_, i) => i !== index)
    })
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...portfolioData.projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    updatePortfolioData({ projects: updatedProjects })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Portfolio Details</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          value={portfolioData.name}
          onChange={(e) => updatePortfolioData({ name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Professional Title *
        </label>
        <input
          type="text"
          value={portfolioData.title}
          onChange={(e) => updatePortfolioData({ title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Full Stack Developer"
        />
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          About Me
        </label>
        <textarea
          value={portfolioData.about}
          onChange={(e) => updatePortfolioData({ about: e.target.value })}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="A brief description about yourself..."
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="React, Python, etc."
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {portfolioData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Projects
        </label>
        <div className="space-y-3 mb-3">
          <input
            type="text"
            value={projectInput.name}
            onChange={(e) => setProjectInput({ ...projectInput, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Project Name"
          />
          <input
            type="text"
            value={projectInput.technologies}
            onChange={(e) => setProjectInput({ ...projectInput, technologies: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Technologies (comma-separated)"
          />
          <textarea
            value={projectInput.description}
            onChange={(e) => setProjectInput({ ...projectInput, description: e.target.value })}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Project description (optional - will be auto-generated)"
          />
          <button
            onClick={addProject}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add Project
          </button>
        </div>

        {portfolioData.projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">{project.name}</h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              value={project.technologies?.join(', ') || ''}
              onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              className="w-full px-3 py-1 mb-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="Technologies"
            />
            <textarea
              value={project.description || ''}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              rows="2"
              className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="Description"
            />
          </div>
        ))}
      </div>

      {/* AI Generate Button */}
      <button
        onClick={onGenerateDescriptions}
        disabled={loading || !portfolioData.name || !portfolioData.title}
        className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating with AI...
          </span>
        ) : (
          '✨ Generate Descriptions with AI'
        )}
      </button>
    </div>
  )
}

export default Form


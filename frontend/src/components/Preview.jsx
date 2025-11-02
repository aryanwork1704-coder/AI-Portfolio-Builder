const Preview = ({ portfolioData }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div id="portfolio-preview" className="p-8 space-y-8">
        {/* Header */}
        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {portfolioData.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {portfolioData.title || 'Your Professional Title'}
          </p>
        </div>

        {/* About */}
        {portfolioData.about && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {portfolioData.about}
            </p>
          </section>
        )}

        {/* Skills */}
        {portfolioData.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolioData.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Projects</h2>
            <div className="space-y-6">
              {portfolioData.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {project.name}
                  </h3>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!portfolioData.name && !portfolioData.title && portfolioData.skills.length === 0 && portfolioData.projects.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Start filling in your details to see the preview</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Preview


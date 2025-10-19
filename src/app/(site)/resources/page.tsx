'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Lightbulb, 
  PenTool, 
  Globe, 
  Heart, 
  Star,
  ExternalLink,
  Download,
  Play,
  FileText,
  Camera,
  Mic,
  Palette,
  Search,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface ResourceItem {
  id: number
  title: string
  description: string
  type: 'article' | 'video' | 'book' | 'podcast' | 'workshop' | 'template' | 'example'
  category: 'writing' | 'inspiration' | 'technique' | 'culture' | 'community'
  url?: string
  author?: string
  duration?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  icon: React.ReactNode
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedResource, setExpandedResource] = useState<number | null>(null)

  const resources: ResourceItem[] = [
    // Writing Techniques
        // {
    //   id: 1,
    //   title: "The Art of Personal Narrative",
    //   description: "Learn how to craft compelling personal stories that resonate with readers. This comprehensive guide covers structure, voice, and emotional authenticity.",
    //   type: "article",
    //   category: "writing",
    //   url: "https://example.com/personal-narrative",
    //   author: "Sarah Ahmed",
    //   difficulty: "beginner",
    //   tags: ["personal story", "narrative structure", "voice", "authenticity"],
    //   icon: <PenTool className="w-5 h-5" />
    // },

    // Inspiration & Culture
    {
        id: 1,
        title: "Master Class in Fiction Writing",
        description: "This is a book by Adam Sexton that is a collection of his observed writing tips and techniques. This will be a great resource for you to learn from.",
        type: "book",
        category: "culture",
        url: "https://drive.google.com/file/d/1jb2NVPYB88tvtOynW8Ro3gdeVGhgeC04/view?usp=sharing",
        author: "Adam Sexton",
        difficulty: "beginner",
        tags: ["example", "writing tips", "inspiration", "technique"],
        icon: <BookOpen className="w-5 h-5" />
      },
  

    // Templates & Examples
    {
        id: 2,
        title: "Story Guidelines Document",
        description: "This will give you the guidelines for the story submission. This will be a great guidance for you to follow the structure and requirements for the story submission.",
        type: "template",
        category: "writing",
        url: "https://docs.google.com/document/d/1AINjc2_43vHdWrBNFrzzXxlRIw6qnxwOMGnV2vNQJGE/edit?usp=sharing",
        difficulty: "beginner",
        tags: ["structure", "template", "organization", "pacing"],
        icon: <FileText className="w-5 h-5" />
    },

    // Community & Support
    {
        id: 3,
        title: "Workshop Video with Adam Sexton",
        description: "This is a workshop video with Adam Sexton, Yale University English Professor. He answered questions about the writing process and how to improve your writing.",
        type: "video",
        category: "community",
        url: "https://drive.google.com/file/d/YOUR_VIDEO_FILE_ID/view?usp=sharing",
        duration: "90 minutes",
        difficulty: "beginner",
        tags: ["workshop", "video", "writing process", "Yale professor", "Q&A"],
        icon: <Play className="w-5 h-5" />
    },

    {
      id: 4,
      title: "Workshop Video with Afghanistan Student Association at University of Toronto",
      description: "This is a workshop video lecturer, Ferdouse Asefi (PhD Candidate in Sociology, UofT), this interactive workshop will guide you through techniques to craft compelling stories for the A Thousand Voices global competition.",
      type: "video",
      category: "community",
      url: "https://drive.google.com/file/d/1vPX3W6q99zk5IwxpA3vuLSUmfe0dBubM/view?usp=sharing",
      duration: "60 minutes",
      difficulty: "beginner",
      tags: ["workshop", "video", "writing process", "Yale professor", "Q&A"],
      icon: <Play className="w-5 h-5" />
  },
  ]

  const categories = [
    { id: 'all', label: 'All Resources', icon: <Globe className="w-4 h-4" /> },
    { id: 'writing', label: 'Writing', icon: <PenTool className="w-4 h-4" /> },
    { id: 'technique', label: 'Technique', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'culture', label: 'Culture', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'inspiration', label: 'Inspiration', icon: <Star className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> }
  ]

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'article', label: 'Articles' },
    { id: 'video', label: 'Videos' },
    { id: 'book', label: 'Books' },
    { id: 'podcast', label: 'Podcasts' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'template', label: 'Templates' },
    { id: 'example', label: 'Examples' }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesType && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'video': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'book': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'podcast': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'workshop': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'template': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'example': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" style={{ paddingTop: '120px' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Writing{' '}
              <span className="instrument-font italic font-normal text-purple_blue">
                Resources
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Find inspiration, learn techniques, and connect with the Afghan writing community. 
              Everything you need to craft your story and share your voice with the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple_blue focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple_blue focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple_blue focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple_blue/10 rounded-lg flex items-center justify-center text-purple_blue">
                      {resource.icon}
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  {resource.author && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By {resource.author}
                    </p>
                  )}
                  {resource.duration && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Duration: {resource.duration}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      +{resource.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setExpandedResource(expandedResource === resource.id ? null : resource.id)}
                    className="text-purple_blue hover:text-purple_blue/80 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    {expandedResource === resource.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple_blue text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit</span>
                    </a>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedResource === resource.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">All Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs bg-purple_blue/10 text-purple_blue rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {resource.type === 'template' && (
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple_blue text-white rounded-lg hover:bg-purple_blue/90 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Download Template</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </motion.div>
        )}

        
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  ExternalLink,
  MapPin,
  Star,
  Phone,
  Calendar,
  Sparkles,
  Bot,
  Mic,
  Globe,
  FileText,
  Calculator,
  Upload,
  Award,
  ChevronRight,
  LayoutGrid,
  List,
  X
} from 'lucide-react'
import clinicsData from '../data/clinics.json'

const featureIcons = {
  'appointment-booking': Calendar,
  'bill-generation': Calculator,
  'file-upload': Upload,
  'ai-chatbot': Bot,
  'voice-assistant': Mic,
  'seo-geo': Globe,
  'multi-language': Globe,
  'smile-assessment': Sparkles,
}

const colorSchemeColors = {
  'trust-blue': '#0EA5E9',
  'calm-teal': '#14B8A6',
  'fresh-green': '#22C55E',
  'professional-slate': '#6366F1',
  'warm-coral': '#F97316',
}

const archetypeLabels = {
  'ethereal-flow': 'Ethereal & Organic',
  'clean-saas': 'Modern Structural',
  'playful-interactive': 'Playful Interactive',
}

export default function PortfolioPage() {
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterFeature, setFilterFeature] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Get unique areas for filter
  const areas = useMemo(() => {
    const areaSet = new Set(clinicsData.websites.map(c => c.area))
    return Array.from(areaSet).sort()
  }, [])

  // Get unique features for filter
  const allFeatures = useMemo(() => {
    const featureSet = new Set()
    clinicsData.websites.forEach(c => {
      c.features.forEach(f => featureSet.add(f.id))
    })
    return Array.from(featureSet)
  }, [])

  // Filter clinics
  const filteredClinics = useMemo(() => {
    return clinicsData.websites.filter(clinic => {
      const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.area.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesArea = !filterArea || clinic.area === filterArea
      const matchesFeature = !filterFeature || clinic.features.some(f => f.id === filterFeature)
      return matchesSearch && matchesArea && matchesFeature
    })
  }, [searchQuery, filterArea, filterFeature])

  // Stats
  const stats = useMemo(() => ({
    total: clinicsData.totalWebsites,
    areas: areas.length,
    avgFeatures: (clinicsData.websites.reduce((sum, c) => sum + c.featureCount, 0) / clinicsData.websites.length).toFixed(1)
  }), [areas])

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                  <span className="text-white text-xl">🦷</span>
                </div>
                <div>
                  <h1 className="font-display font-bold text-gray-900">Dental Portfolio</h1>
                  <p className="text-sm text-gray-500">{stats.total} Websites</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clinics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter className="w-4 h-4" />
                Filters
              </div>
              <select
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-primary outline-none"
              >
                <option value="">All Areas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <select
                value={filterFeature}
                onChange={(e) => setFilterFeature(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-primary outline-none"
              >
                <option value="">All Features</option>
                {allFeatures.map(feature => (
                  <option key={feature} value={feature}>
                    {feature.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Clinic List */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="text-xs text-gray-400 px-3 py-2">
                {filteredClinics.length} clinics found
              </div>
              <div className="space-y-1">
                {filteredClinics.map((clinic, index) => (
                  <motion.button
                    key={clinic.folder}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => setSelectedClinic(clinic)}
                    className={`sidebar-item w-full text-left ${selectedClinic?.folder === clinic.folder ? 'active' : ''}`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: colorSchemeColors[clinic.design?.colorScheme] || '#6366F1' }}
                    >
                      {clinic.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {clinic.name}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${selectedClinic?.folder === clinic.folder ? 'text-white/70' : 'text-gray-500'}`}>
                        <MapPin className="w-3 h-3" />
                        {clinic.area}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${selectedClinic?.folder === clinic.folder ? 'text-white' : 'text-gray-300'}`} />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <List className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-display font-bold text-xl text-gray-900">
                  {selectedClinic ? selectedClinic.name : 'Dental Websites Showcase'}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedClinic ? `${selectedClinic.area}, Delhi` : `${stats.total} professionally designed websites`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {selectedClinic ? (
            <ClinicDetail clinic={selectedClinic} onClose={() => setSelectedClinic(null)} />
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <StatsCard icon={Award} label="Total Websites" value={stats.total} color="brand-primary" />
                <StatsCard icon={MapPin} label="Areas Covered" value={stats.areas} color="green-500" />
                <StatsCard icon={Sparkles} label="Avg. Features" value={stats.avgFeatures} color="amber-500" />
                <StatsCard icon={Star} label="Design Styles" value="3" color="purple-500" />
              </div>

              {/* Websites Grid */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredClinics.map((clinic, index) => (
                  <WebsiteCard
                    key={clinic.folder}
                    clinic={clinic}
                    index={index}
                    viewMode={viewMode}
                    onClick={() => setSelectedClinic(clinic)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

function StatsCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card p-6">
      <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

function WebsiteCard({ clinic, index, viewMode, onClick }) {
  const colorScheme = colorSchemeColors[clinic.design?.colorScheme] || '#6366F1'

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        onClick={onClick}
        className="card p-4 cursor-pointer flex items-center gap-4"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: colorScheme }}
        >
          {clinic.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{clinic.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {clinic.area}
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {clinic.featureCount} features
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {clinic.features.slice(0, 3).map(f => {
            const Icon = featureIcons[f.id] || Sparkles
            return (
              <div key={f.id} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center" title={f.name}>
                <Icon className="w-4 h-4 text-gray-600" />
              </div>
            )
          })}
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="card cursor-pointer group"
    >
      {/* Preview Header */}
      <div
        className="h-32 relative"
        style={{ background: `linear-gradient(135deg, ${colorScheme} 0%, ${colorScheme}99 100%)` }}
      >
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-5xl mb-2">🦷</div>
            <div className="text-sm font-medium opacity-80">
              {archetypeLabels[clinic.design?.archetype] || 'Modern Design'}
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-white/20 text-white backdrop-blur-sm">
            {clinic.featureCount} features
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-primary transition-colors">
          {clinic.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <MapPin className="w-3 h-3" />
          {clinic.area}, Delhi
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {clinic.features.slice(0, 4).map(f => {
            const Icon = featureIcons[f.id] || Sparkles
            return (
              <div
                key={f.id}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600"
                title={f.name}
              >
                <Icon className="w-3 h-3" />
                <span className="truncate max-w-[80px]">{f.name.split(' ')[0]}</span>
              </div>
            )
          })}
          {clinic.features.length > 4 && (
            <div className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-500">
              +{clinic.features.length - 4}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ClinicDetail({ clinic, onClose }) {
  const colorScheme = colorSchemeColors[clinic.design?.colorScheme] || '#6366F1'

  // Internal route to view the clinic website
  const siteUrl = `/site/${clinic.folder}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to all websites
      </button>

      {/* Hero Section */}
      <div
        className="rounded-3xl p-8 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colorScheme} 0%, ${colorScheme}CC 100%)` }}
      >
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-4xl">🦷</span>
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold">{clinic.name}</h1>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  {clinic.area}, Delhi
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="badge bg-white/20 text-white backdrop-blur-sm">
                {archetypeLabels[clinic.design?.archetype] || 'Modern Design'}
              </span>
              <span className="badge bg-white/20 text-white backdrop-blur-sm">
                {clinic.design?.colorScheme?.replace(/-/g, ' ')}
              </span>
            </div>
          </div>
          <Link
            href={siteUrl}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Visit Website
          </Link>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Info Card */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Clinic Information</h3>
          <div className="space-y-3">
            {clinic.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{clinic.phone}</span>
              </div>
            )}
            {clinic.experience > 0 && (
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <span>{clinic.experience}+ years experience</span>
              </div>
            )}
            {clinic.rating > 0 && (
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>{clinic.rating}/5 ({clinic.reviews} reviews)</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-gray-400" />
              <span>Consultation: {clinic.consultationFee}</span>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="card p-6 col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Integrated Features ({clinic.featureCount})</h3>
          <div className="grid grid-cols-2 gap-3">
            {clinic.features.map(feature => {
              const Icon = featureIcons[feature.id] || Sparkles
              return (
                <div
                  key={feature.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colorScheme}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: colorScheme }} />
                  </div>
                  <span className="font-medium text-gray-700">{feature.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Technical Stack</h3>
        <div className="flex items-center gap-4">
          {Object.entries(clinic.framework || {}).map(([key, value]) => (
            <div key={key} className="px-4 py-2 rounded-lg bg-gray-100">
              <div className="text-xs text-gray-500 capitalize">{key}</div>
              <div className="font-medium text-gray-900">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* File Path */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Website Location</h3>
        <code className="block p-4 rounded-lg bg-gray-900 text-green-400 text-sm font-mono">
          websites/{clinic.folder}/
        </code>
        <p className="text-sm text-gray-500 mt-3">
          This website is served directly from the portfolio. Click "Visit Website" above to view it.
        </p>
      </div>
    </motion.div>
  )
}

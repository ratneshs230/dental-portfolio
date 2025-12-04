'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, Trash2, Download, Printer, Calculator } from 'lucide-react'

const treatmentPrices = {
  'Dental Checkup': 500,
  'Teeth Cleaning': 1500,
  'Teeth Whitening': 5000,
  'Root Canal': 8000,
  'Tooth Extraction': 2000,
  'Cavity Filling': 1500,
  'Dental X-Ray': 500,
  'Dental Crown': 12000,
  'Dental Bridge': 15000,
  'Braces Consultation': 1000,
  'Scaling & Polishing': 2000,
  'Gum Treatment': 3000
}

export function BillGenerator() {
  const [items, setItems] = useState([
    { id: 1, treatment: 'Dental Checkup', quantity: 1, price: 500 }
  ])
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [discount, setDiscount] = useState(0)
  const billRef = useRef(null)

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), treatment: 'Dental Checkup', quantity: 1, price: 500 }
    ])
  }

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'treatment') {
          return { ...item, treatment: value, price: treatmentPrices[value] || 0 }
        }
        return { ...item, [field]: value }
      }
      return item
    }))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="dental-card" ref={billRef}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-dental-foreground flex items-center gap-2">
              <FileText className="w-7 h-7 text-dental-primary" />
              Expert Dental Clinic
            </h2>
            <p className="text-gray-600 mt-1">729, Kirti Nagar, New Delhi - 11071</p>
            <p className="text-gray-600">Phone: +91-11-24715016</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-dental-primary">INVOICE</div>
            <div className="text-gray-500">#{Date.now().toString().slice(-8)}</div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-dental-primary outline-none"
              placeholder="Patient name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={patientInfo.phone}
              onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-dental-primary outline-none"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={patientInfo.date}
              onChange={(e) => setPatientInfo({ ...patientInfo, date: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-dental-primary outline-none"
            />
          </div>
        </div>

        {/* Treatment Items */}
        <div className="mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-semibold text-gray-700">Treatment</th>
                <th className="text-center py-3 font-semibold text-gray-700 w-24">Qty</th>
                <th className="text-right py-3 font-semibold text-gray-700 w-32">Price</th>
                <th className="text-right py-3 font-semibold text-gray-700 w-32">Amount</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <select
                      value={item.treatment}
                      onChange={(e) => updateItem(item.id, 'treatment', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-dental-primary outline-none"
                    >
                      {Object.keys(treatmentPrices).map((treatment) => (
                        <option key={treatment} value={treatment}>{treatment}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-center focus:border-dental-primary outline-none"
                    />
                  </td>
                  <td className="py-3 text-right">₹{item.price.toLocaleString()}</td>
                  <td className="py-3 text-right font-semibold">₹{(item.price * item.quantity).toLocaleString()}</td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-2 text-dental-primary hover:underline"
          >
            <Plus className="w-4 h-4" />
            Add Treatment
          </button>
        </div>

        {/* Totals */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Discount</span>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Math.min(100, parseInt(e.target.value) || 0))}
                className="w-16 px-2 py-1 rounded border border-gray-200 text-center text-sm"
              />
              <span className="text-gray-500">%</span>
            </div>
            <span className="text-green-600">-₹{discountAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-xl font-bold text-dental-foreground">Total</span>
            <span className="text-2xl font-bold text-dental-primary">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6 print:hidden">
          <button onClick={handlePrint} className="flex-1 dental-btn-secondary">
            <Printer className="w-5 h-5 mr-2" />
            Print Bill
          </button>
          <button className="flex-1 dental-btn-primary">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export function QuickCostEstimate() {
  const [selectedTreatments, setSelectedTreatments] = useState([])

  const treatments = [
    { name: 'Dental Checkup', price: 500 },
    { name: 'Teeth Cleaning', price: 1500 },
    { name: 'Teeth Whitening', price: 5000 },
    { name: 'Root Canal', price: 8000 },
    { name: 'Tooth Extraction', price: 2000 },
    { name: 'Cavity Filling', price: 1500 }
  ]

  const toggleTreatment = (treatment) => {
    if (selectedTreatments.find(t => t.name === treatment.name)) {
      setSelectedTreatments(selectedTreatments.filter(t => t.name !== treatment.name))
    } else {
      setSelectedTreatments([...selectedTreatments, treatment])
    }
  }

  const total = selectedTreatments.reduce((sum, t) => sum + t.price, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="dental-card"
    >
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-dental-primary" />
        <h3 className="text-xl font-bold text-dental-foreground">Quick Cost Estimate</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {treatments.map((treatment) => (
          <button
            key={treatment.name}
            onClick={() => toggleTreatment(treatment)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedTreatments.find(t => t.name === treatment.name)
                ? 'border-dental-primary bg-dental-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-sm">{treatment.name}</div>
            <div className="text-dental-primary font-bold">₹{treatment.price.toLocaleString()}</div>
          </button>
        ))}
      </div>

      {selectedTreatments.length > 0 && (
        <div className="bg-dental-primary/5 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">{selectedTreatments.length} treatment(s) selected</div>
            <div className="text-2xl font-bold text-dental-primary">₹{total.toLocaleString()}</div>
          </div>
          <button className="dental-btn-primary">
            Book Now
          </button>
        </div>
      )}
    </motion.div>
  )
}

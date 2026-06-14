'use client'

import { useState, type FormEvent } from 'react'
import type { ReactNode } from 'react'
import {
  ShoppingBag,
  Users,
  Package,
  FileText,
  Headphones,
  Download,
  Plus,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  School,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

type TabId = 'orders' | 'students' | 'kits' | 'invoices' | 'support'

interface Order {
  id: string
  date: string
  items: string
  total: number
  status: 'Delivered' | 'Processing' | 'Shipped'
}

interface Student {
  id: string
  name: string
  kit: string
  completion: 'Complete' | 'In Progress' | 'Not Started'
}

// ── Static data ────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  { id: 'ORD-2024-001', date: '12 Mar 2024', items: '15× Arduino Uno, 10× Breadboard', total: 10485, status: 'Delivered' },
  { id: 'ORD-2024-002', date: '28 Apr 2024', items: '8× ESP32, 8× HC-SR04 Ultrasonic', total: 3184, status: 'Delivered' },
  { id: 'ORD-2024-003', date: '02 Jun 2024', items: '1× 4WD Chassis Kit, 5× SG90 Servo', total: 4744, status: 'Processing' },
]

const STUDENTS: Student[] = [
  { id: 'S001', name: 'Aarav Sharma', kit: 'Arduino Starter Kit', completion: 'Complete' },
  { id: 'S002', name: 'Priya Nair', kit: 'Arduino Starter Kit', completion: 'In Progress' },
  { id: 'S003', name: 'Rohan Patel', kit: 'ESP32 IoT Kit', completion: 'In Progress' },
  { id: 'S004', name: 'Sneha Iyer', kit: 'Arduino Starter Kit', completion: 'Not Started' },
  { id: 'S005', name: 'Kiran Mehta', kit: 'Robotics Chassis Kit', completion: 'Complete' },
]

const NAV_ITEMS: { id: TabId; label: string; icon: ReactNode }[] = [
  { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
  { id: 'students', label: 'Students', icon: <Users size={18} /> },
  { id: 'kits', label: 'Kits', icon: <Package size={18} /> },
  { id: 'invoices', label: 'Invoices', icon: <FileText size={18} /> },
  { id: 'support', label: 'Support', icon: <Headphones size={18} /> },
]

const KIT_OPTIONS = ['Arduino Starter Kit', 'ESP32 IoT Kit', 'Robotics Chassis Kit', 'Sensor Exploration Kit', 'Advanced Robotics Kit']

// ── Status badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Order['status'] | Student['completion'] }) {
  const map: Record<string, string> = {
    Delivered: 'bg-green-100 text-green-700',
    Processing: 'bg-orange-100 text-orange-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Complete: 'bg-green-100 text-green-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Not Started': 'bg-gray-100 text-gray-500',
  }
  const icons: Record<string, ReactNode> = {
    Delivered: <CheckCircle2 size={12} />,
    Processing: <Clock size={12} />,
    Shipped: <ChevronRight size={12} />,
    Complete: <CheckCircle2 size={12} />,
    'In Progress': <Clock size={12} />,
    'Not Started': <AlertCircle size={12} />,
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {icons[status]}
      {status}
    </span>
  )
}

// ── New Order Modal ────────────────────────────────────────────────────────────

interface ModalProps {
  onClose: () => void
}

function NewOrderModal({ onClose }: ModalProps) {
  const [form, setForm] = useState({ students: '', kit: KIT_OPTIONS[0], school: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#0f2744]">New Class Order</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0f2744] mb-2">Order Request Submitted!</h3>
              <p className="text-gray-500 text-sm mb-6">
                Our team will send you a quote within 24 hours at your registered email.
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  School / Institution Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Public School, Noida"
                  value={form.school}
                  onChange={(e) => setForm({ ...form, school: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Kit Type
                </label>
                <select
                  value={form.kit}
                  onChange={(e) => setForm({ ...form, kit: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {KIT_OPTIONS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Number of Students
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={500}
                  placeholder="e.g. 30"
                  value={form.students}
                  onChange={(e) => setForm({ ...form, students: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Submit Order Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Tab content ────────────────────────────────────────────────────────────────

function OrdersTab({ onNewOrder }: { onNewOrder: () => void }) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: '3', icon: <ShoppingBag size={20} className="text-blue-600" /> },
          { label: 'Kits Ordered', value: '24', icon: <Package size={20} className="text-orange-500" /> },
          { label: 'Total Spent', value: '₹18,413', icon: <FileText size={20} className="text-green-600" /> },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0f2744]">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f2744]">Past Orders</h3>
          <button
            onClick={onNewOrder}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={15} />
            New Class Order
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Order ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Items</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#0f2744] font-semibold">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs">{order.items}</td>
                  <td className="px-6 py-4 font-semibold text-[#0f2744]">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors">
                      <Download size={13} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StudentsTab() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#0f2744]">Student Progress</h3>
        <span className="text-sm text-gray-400">{STUDENTS.length} students</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student ID</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kit Assigned</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {STUDENTS.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{s.id}</td>
                <td className="px-6 py-4 font-semibold text-[#0f2744]">{s.name}</td>
                <td className="px-6 py-4 text-gray-600">{s.kit}</td>
                <td className="px-6 py-4"><StatusBadge status={s.completion} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
      <Package size={40} className="text-gray-200 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-400">{label}</h3>
      <p className="text-gray-400 text-sm mt-1">This section is coming soon.</p>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('orders')
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login notice banner */}
      <div className="bg-orange-50 border-b border-orange-200 px-4 py-2.5">
        <p className="text-center text-sm text-orange-700 font-medium">
          <AlertCircle size={14} className="inline mr-1.5 mb-0.5" />
          Demo mode — you are not logged in. Data shown is sample data only.{' '}
          <a href="/login" className="underline font-semibold hover:text-orange-800">
            Log in to see your real dashboard
          </a>
        </p>
      </div>

      <div className="container-xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0f2744] flex items-center justify-center">
            <School size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0f2744]">Teacher Dashboard</h1>
            <p className="text-sm text-gray-500">Manage class kits, student progress, and school invoices.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-[#0f2744] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </aside>

          {/* Mobile tab bar */}
          <div className="md:hidden w-full mb-4 overflow-x-auto flex gap-2 pb-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#0f2744] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {activeTab === 'orders' && <OrdersTab onNewOrder={() => setShowModal(true)} />}
            {activeTab === 'students' && <StudentsTab />}
            {activeTab === 'kits' && <PlaceholderTab label="Kits" />}
            {activeTab === 'invoices' && <PlaceholderTab label="Invoices" />}
            {activeTab === 'support' && <PlaceholderTab label="Support" />}
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && <NewOrderModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

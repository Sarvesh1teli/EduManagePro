# School Management System Design Guidelines

## Design Approach: Material Design System

**Rationale**: School management systems are utility-focused, data-intensive applications where clarity, efficiency, and consistency drive user success. Material Design provides the robust component library and established patterns needed for complex administrative interfaces.

**Core Principles**:
- **Clarity over decoration**: Information hierarchy through typography and spacing, not visual flourish
- **Functional efficiency**: Quick data entry, easy scanning, logical workflows
- **Professional consistency**: Reliable, stable interface appropriate for daily administrative use

---

## Color Palette

### Light Mode
- **Primary**: 220 90% 56% (Professional blue for headers, primary actions)
- **Primary Variant**: 220 85% 48% (Hover states, selected items)
- **Background**: 0 0% 98% (Main surface)
- **Surface**: 0 0% 100% (Cards, dialogs, elevated components)
- **Surface Variant**: 220 15% 96% (Table headers, subtle sections)
- **Text Primary**: 220 20% 20%
- **Text Secondary**: 220 10% 50%
- **Border**: 220 15% 88%

### Dark Mode
- **Primary**: 220 90% 65% (Adjusted for dark backgrounds)
- **Primary Variant**: 220 85% 58%
- **Background**: 220 20% 12%
- **Surface**: 220 18% 16% (Cards, dialogs)
- **Surface Variant**: 220 16% 20% (Table headers)
- **Text Primary**: 220 10% 92%
- **Text Secondary**: 220 8% 70%
- **Border**: 220 12% 28%

### Semantic Colors
- **Success**: 142 70% 45% (Payment received, approved status)
- **Warning**: 38 92% 50% (Pending actions, overdue fees)
- **Error**: 0 72% 51% (Failed payments, errors)
- **Info**: 199 89% 48% (Informational alerts)

---

## Typography

**Font Family**: 
- Primary: 'Inter', system-ui, sans-serif (via Google Fonts)
- Monospace: 'JetBrains Mono', monospace (for financial figures, IDs)

**Scale**:
- **Display**: text-4xl font-bold (Dashboard headings)
- **H1**: text-3xl font-semibold (Page titles)
- **H2**: text-2xl font-semibold (Section headings)
- **H3**: text-xl font-medium (Card headers, subsections)
- **Body Large**: text-base (Primary content, table data)
- **Body**: text-sm (Secondary content, labels)
- **Caption**: text-xs (Metadata, timestamps)

**Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** exclusively
- Component padding: p-4 or p-6
- Section spacing: gap-6 or gap-8
- Page margins: p-6 to p-8
- Card spacing: p-6

**Grid System**:
- Dashboard: 12-column responsive grid
- Forms: max-w-4xl centered, 2-column on desktop (grid-cols-1 md:grid-cols-2)
- Tables: Full-width with horizontal scroll on mobile

**Container Widths**:
- Main content: max-w-7xl mx-auto
- Forms/Detail views: max-w-4xl mx-auto
- Modals: max-w-2xl

---

## Component Library

### Navigation
- **Sidebar Navigation**: Fixed left sidebar (w-64) with collapsible sections
  - Logo/School name at top (h-16)
  - Role-based menu items with icons (Heroicons)
  - Active state: bg-primary-50 dark:bg-primary-900/20 with left border
  - Hover: bg-surface-variant
- **Top Bar**: Fixed header (h-16) with search, notifications, user profile
  - Right-aligned user menu with avatar
  - Breadcrumb navigation for context

### Data Display
- **Tables**: 
  - Zebra striping for rows (even:bg-surface-variant)
  - Sticky header with sort indicators
  - Row hover: bg-surface-variant
  - Pagination at bottom-right
  - Action buttons in last column (icon buttons, text-primary)
- **Cards**: Elevated surface (shadow-sm) with p-6
  - Card header with title and optional action button
  - Divider between header and content
  - Use for dashboard widgets, detail views
- **Stats Cards**: Compact cards for dashboard metrics
  - Large number (text-3xl font-bold)
  - Label (text-sm text-secondary)
  - Icon in top-right corner
  - Trend indicator (↑↓ with success/error color)

### Forms
- **Input Fields**: 
  - Label above (text-sm font-medium mb-2)
  - Input: border rounded-lg p-3, focus:ring-2 focus:ring-primary
  - Helper text below (text-xs text-secondary)
  - Error state: border-error with error text
- **Select Dropdowns**: Consistent styling with inputs
- **Date Pickers**: Icon prefix, calendar popup
- **Submit Buttons**: Primary button (bg-primary text-white) at bottom-right of forms
- **Form Layout**: Two-column grid with full-width fields for textareas

### Modals & Dialogs
- **Modal Overlay**: bg-black/50 backdrop-blur-sm
- **Modal Container**: max-w-2xl bg-surface rounded-lg shadow-xl p-6
- **Modal Header**: text-xl font-semibold with close button (×)
- **Modal Actions**: Right-aligned button group at bottom

### Buttons
- **Primary**: bg-primary text-white rounded-lg px-4 py-2 font-medium
- **Secondary**: border border-border text-primary rounded-lg px-4 py-2
- **Icon Buttons**: p-2 rounded-lg hover:bg-surface-variant (for table actions)
- No animations on hover/active states

### Dashboard Widgets
- **Quick Stats**: 4-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- **Charts**: Use Chart.js with Material color palette
- **Recent Activity**: List with avatar, action text, timestamp
- **Financial Summary**: Card with income/expense comparison

---

## Role-Based Dashboard Layouts

### Admin Dashboard
- Full access: 4 stat cards (Students, Staff, Revenue, Pending Payments)
- Chart row: Income vs Expense trend
- Two columns: Recent Admissions | Outstanding Fees
- Bottom section: Recent vendor payments

### Teacher Dashboard  
- 3 stat cards: My Classes, Total Students, Attendance Rate
- Student performance chart
- My class list table with quick attendance marking

### Accountant Dashboard
- 4 financial stat cards: Today's Collection, Pending Fees, Monthly Expenses, Net Balance
- Payment trend chart
- Two columns: Recent Payments | Pending Invoices

---

## Page-Specific Layouts

### Student Management
- List View: Filterable table with search, add student button (top-right)
- Detail View: Tabs for Personal Info | Academic Records | Fee History
- Each tab: Form layout with edit mode toggle

### Financial Management
- Tab navigation: Fee Collection | Expenses | Income | Reports
- Each section: Filter bar + data table or form
- Reports: Parameter selection form → generate button → printable output

### Vendor Management
- Split view: Vendor list (left, w-96) | Vendor details (right, flex-1)
- Details: Contact info card, contracts list, payment history

---

## Responsive Behavior
- **Desktop (lg:)**: Full sidebar, multi-column layouts
- **Tablet (md:)**: Collapsible sidebar, 2-column forms reduce to 1 column
- **Mobile (base)**: Hidden sidebar with hamburger menu, all tables horizontal scroll, stacked layouts

---

## Accessibility & Dark Mode
- All interactive elements: min-h-[44px] for touch targets
- Form inputs: Always white background in dark mode for contrast
- Focus indicators: 2px ring in primary color
- Dark mode toggle in user menu (top-right)
- Maintain WCAG AA contrast ratios (4.5:1 text, 3:1 UI components)

---

## Icons
**Library**: Heroicons (via CDN) - use outline variant for navigation, solid for status indicators

---

**No Images Required**: This is an internal administrative tool; focus on data clarity and functional design over visual imagery.
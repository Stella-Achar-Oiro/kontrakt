import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Receipt, FileText, ClipboardList, FolderOpen, HardHat } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/contracts', icon: Briefcase, label: 'Contracts' },
  { to: '/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/invoices', icon: FileText, label: 'Invoices' },
  { to: '/lpos', icon: ClipboardList, label: 'LPOs' },
  { to: '/documents', icon: FolderOpen, label: 'Documents' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-[280px] h-screen bg-sidebar flex flex-col py-6 px-4 overflow-y-auto z-50">
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
          <HardHat className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">BuildTrack Pro</h1>
          <p className="text-text-muted text-xs">Construction Management</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 border-t border-sidebar-hover">
        <p className="px-4 text-text-muted text-xs">Njuguna Construction Ltd</p>
        <p className="px-4 text-text-muted text-xs mt-1">PIN: P051111111C</p>
      </div>
    </aside>
  );
}

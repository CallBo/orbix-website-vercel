import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardMobileNav } from '@/components/dashboard/DashboardMobileNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-base">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

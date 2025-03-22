import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import ActiveTenantPageContent from './ActiveTenantPageContent'

function Page() {
  return (
      <DashboardPage title='Active Tenants'>
          <ActiveTenantPageContent/>
          
   </DashboardPage>
  )
}

export default Page
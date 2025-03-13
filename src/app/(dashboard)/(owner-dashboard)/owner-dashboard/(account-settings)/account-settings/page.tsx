import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import AccountPageContent from './AccountPageContent'

function Page() {
  return (
      <DashboardPage title='Account Settings'>
          <AccountPageContent/> 
   </DashboardPage>
  )
}

export default Page
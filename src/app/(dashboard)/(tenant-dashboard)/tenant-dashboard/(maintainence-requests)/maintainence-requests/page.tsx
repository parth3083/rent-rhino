import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import MaintainenceRequestPageContent from './MaintainenceRequestPageContent'

function Page() {
  return (
      <DashboardPage title='Maintainence Requests'>
          <MaintainenceRequestPageContent/>
    </DashboardPage>
  )
}

export default Page
import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import AllPropertiesPageContent from '../AllPropertiesPageContent'

function Page() {
  return (
      <DashboardPage title='Explore Rentals'>
         <AllPropertiesPageContent/>
    </DashboardPage>
  )
}

export default Page
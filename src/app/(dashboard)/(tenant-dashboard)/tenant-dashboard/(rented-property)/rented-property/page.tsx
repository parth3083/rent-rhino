import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import RentedPropertyPageContent from './RentedPropertyPageContent'

function Page() {
  return (
      <DashboardPage title='Rented Property Details'>
          <RentedPropertyPageContent/>
   </DashboardPage>
  )
}

export default Page
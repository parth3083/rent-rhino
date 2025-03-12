import React from 'react'
import EmptyStateContent from '../../EmptyStateContent';

function RentedPropertyPageContent() {
    const bool: boolean = true;
    if (bool) {
        return (
            <EmptyStateContent/>
        )
    }

  return (
    <div className='w-full flex flex-col'>RentedPropertyPageContent</div>
  )
}

export default RentedPropertyPageContent
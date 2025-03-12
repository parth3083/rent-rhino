import React from 'react'
import EmptyStateContent from '../../EmptyStateContent';

function MaintainenceRequestPageContent() {
    const bool: boolean = true;
    if (bool) {
        return (
            <EmptyStateContent/>
        )
    }
  return (
    <div className='w-full flex flex-col'>MaintainenceRequestPageContent</div>
  )
}

export default MaintainenceRequestPageContent
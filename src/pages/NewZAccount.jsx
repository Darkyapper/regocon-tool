import React from 'react'
import HeaderJustIcon from '../components/headerJustIcon/HeaderJustIcon'
import SimpleFooter from '../components/simpleFooter/SimpleFooter'
import ConfNewAcc from '../components/confNewAcc/ConfNewAcc'

export default function NewZAccount() {
  return (
    <div>
        <div className="flex flex-col min-h-screen">
            <HeaderJustIcon />
            <div className="flex-grow">
                <ConfNewAcc />
            </div>
            <SimpleFooter />
        </div>
    </div>
  )
}

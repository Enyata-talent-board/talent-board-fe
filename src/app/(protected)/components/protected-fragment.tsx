'use client';
import React from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProtectedFragment = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProgressBar
                height="3px"
                color="#7557D3"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </>
    )
}

export default ProtectedFragment

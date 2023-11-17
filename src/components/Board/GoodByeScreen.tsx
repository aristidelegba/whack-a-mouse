'use client'
import { useGlobalContext } from '@/contexts'
import React from 'react'

const GoodByeScreen = () => {
    const { showGoodByeScreen } = useGlobalContext()
    return (
        <>
            {showGoodByeScreen && (
                <div className="w-screen h-screen fixed inset-0 bg-white grid items-center justify-center text-4xl font-bold leading-5">
                    Thanks You for playing !
                </div>
            )}
        </>
    )
}

export default GoodByeScreen
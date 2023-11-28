"use client"
import { useGlobalContext } from '@/contexts'
import React, { useEffect } from 'react'

const Score = () => {
    const { score, resetGame, setShowGoodByeScreen } = useGlobalContext()
    useEffect(() => {
        if (score >=15) {
            if (confirm("Voulez vous continuer?")) {
                resetGame()
            }else{
                setShowGoodByeScreen(true)
            }
        }
    }, [score])

    return (
        <div className='text-5xl font-bold'>{score}</div>
    )
}

export default Score
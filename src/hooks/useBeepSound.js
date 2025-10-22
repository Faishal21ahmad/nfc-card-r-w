'use client'
import { useEffect, useRef } from 'react'

export default function useBeepSound() {
    const successAudioRef = useRef(null)

    useEffect(() => {
        // Buat dan preload audio
        const audio = new Audio('/sounds/beep1.wav')
        audio.volume = 0.9
        audio.preload = 'auto'
        successAudioRef.current = audio

        // optional: load lebih awal (agar cepat main)
        audio.load()

        console.log('Beep sound loaded and ready')

        return () => {
            audio.pause()
            audio.src = ''
        }
    }, [])

    const playAudioSafe = async (audioRef) => {
        const audio = audioRef?.current
        if (!audio) return
        try {
            audio.pause()
            audio.currentTime = 0
            await audio.play()
        } catch (err) {
            console.warn('Audio play failed:', err)
        }
    }

    const soundBeep = () => playAudioSafe(successAudioRef)
    return { soundBeep }
}

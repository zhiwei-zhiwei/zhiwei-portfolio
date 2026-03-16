"use client"

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  words: string[]
  loop?: boolean
  className?: string
}

export default function TypeWriter({ words, loop = true, className }: TypeWriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false)
        const nextIndex = (currentWordIndex + 1) % words.length
        if (!loop && nextIndex === 0) return
        setCurrentWordIndex(nextIndex)
        return
      }
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1))
      }, 50)
      return () => clearTimeout(timeout)
    }

    if (currentText.length === currentWord.length) {
      setIsPaused(true)
      return
    }

    const timeout = setTimeout(() => {
      setCurrentText(currentWord.slice(0, currentText.length + 1))
    }, 100)
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, loop])

  return (
    <span className={className}>
      {currentText}
      <span className="typing-cursor" />
    </span>
  )
}

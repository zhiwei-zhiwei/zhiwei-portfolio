"use client"

import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset: number = 80): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const observerOptions = {
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    }

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        })
      }, observerOptions)

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds, offset])

  return activeId
}

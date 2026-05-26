import React, { useState, useCallback, useRef } from 'react'
import Slidesection from '../component/Slidesection'
import OfferSection from '../component/Offersection'

export const Home = () => {
  const [loaded, setLoaded] = useState(false)
  const loadedRef = useRef({ offers: false, slides: false })

  const handleLoad = useCallback((section) => {
    loadedRef.current[section] = true
    if (loadedRef.current.offers && loadedRef.current.slides) {
      setLoaded(true)
    }
  }, [])

  return (
    <>
      {!loaded && (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center">
          <span className="text-emerald-500 font-black animate-pulse text-xl">
            LOADING HOMEPAGE...
          </span>
        </div>
      )}
      <OfferSection onLoad={() => handleLoad('offers')} />
      <Slidesection onLoad={() => handleLoad('slides')} />
    </>
  )
}

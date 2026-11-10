
import { useEffect, useState } from 'react'

const leds = [
  { x: 18, y: 28, delay: '0s' },
  { x: 35, y: 24, delay: '.7s' },
  { x: 47, y: 33, delay: '1.4s' },
  { x: 76, y: 41, delay: '.4s' },
  { x: 48, y: 55, delay: '2s' },
  { x: 64, y: 56, delay: '1.1s' },
  { x: 16, y: 78, delay: '2.6s' },
  { x: 80, y: 20, delay: '1.8s' },
]

export default function GlobeNetwork() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const update = () => {
      setReducedMotion(media.matches)
    }

    update()
    media.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
    }
  }, [])

  return (
    <div
      className={`globe-led ${
        reducedMotion ? 'globe-led--still' : ''
      }`}
      role="img"
      aria-label="Globo digital luminoso com conexões e LEDs pulsantes"
    >
      <div className="globe-led__art">
        <img
          className="globe-led__image"
          src="/images/globo-vivo-luzes-transparentes.png"
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        <div
          className="globe-led__lights"
          aria-hidden="true"
        >
          {leds.map((led, index) => (
            <span
              key={index}
              className="globe-led__dot"
              style={{
                left: `${led.x}%`,
                top: `${led.y}%`,
                animationDelay: led.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { type CSSProperties, useEffect, useState } from 'react'

const thirdParticles = [
  { left: 9, top: 75, size: 4, opacity: 0.42, duration: 8, delay: -1, drift: 16 },
  { left: 18, top: 58, size: 3, opacity: 0.36, duration: 11, delay: -7, drift: -18 },
  { left: 29, top: 83, size: 5, opacity: 0.3, duration: 14, delay: -5, drift: 21 },
  { left: 42, top: 68, size: 3, opacity: 0.4, duration: 10, delay: -3, drift: -14 },
  { left: 57, top: 79, size: 4, opacity: 0.34, duration: 12, delay: -9, drift: 20 },
  { left: 74, top: 61, size: 3, opacity: 0.38, duration: 9, delay: -2, drift: -16 },
  { left: 86, top: 72, size: 5, opacity: 0.28, duration: 15, delay: -11, drift: 18 },
  { left: 63, top: 42, size: 3, opacity: 0.32, duration: 13, delay: -6, drift: -20 },
] as const

const thirdCopy = 'мы — причина чужого\nдискомфорта в ресторане'

const loveReasons = [
  'ты умеешь делать обычные дни лучше',
  'твоя улыбка — моё любимое зрелище',
  'ты поддерживаешь меня даже в мелочах',
  'с тобой я могу быть сам собой',
  'ты — моё спокойствие',
] as const

const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`

const fifthMoments = [
  { src: publicAsset('moment-1.png'), className: 'fifth-polaroid-a', tapeClass: 'fifth-tape-a' },
  { src: publicAsset('moment-2.png'), className: 'fifth-polaroid-b', tapeClass: 'fifth-tape-b' },
  { src: publicAsset('moment-3.png'), className: 'fifth-polaroid-c', tapeClass: 'fifth-tape-c' },
  { src: publicAsset('moment-4.png'), className: 'fifth-polaroid-d', tapeClass: 'fifth-tape-d' },
  { src: publicAsset('moment-5.png'), className: 'fifth-polaroid-e', tapeClass: 'fifth-tape-e' },
] as const

function HeartOutline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="-1 -1 26 26"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.8s-7.4-4.7-9.9-8.9C.2 8.7 2.1 6 5.4 6c2 0 3.7 1.1 4.6 2.6C10.9 7.1 12.6 6 14.6 6c3.3 0 5.2 2.7 3.3 5.9-2.5 4.2-9.9 8.9-9.9 8.9Z" />
    </svg>
  )
}

function App() {
  const [screen, setScreen] = useState(0)
  const [heartBurstId, setHeartBurstId] = useState(0)
  const [thirdReady, setThirdReady] = useState(false)
  const [thirdTextReady, setThirdTextReady] = useState(false)
  const [thirdAnimationKey, setThirdAnimationKey] = useState(0)
  const [thirdHeartBurstId, setThirdHeartBurstId] = useState(0)
  const [thirdTypedText, setThirdTypedText] = useState('')
  const [thirdTypingDone, setThirdTypingDone] = useState(false)
  const [activeReasonIndex, setActiveReasonIndex] = useState<number | null>(null)
  const [fourthReady, setFourthReady] = useState(false)
  const [fifthReady, setFifthReady] = useState(false)
  const [sixthReady, setSixthReady] = useState(false)
  const isSecondScreen = screen === 1
  const isThirdScreen = screen === 2
  const isFourthScreen = screen === 3
  const isFifthScreen = screen === 4
  const isSixthScreen = screen === 5
  const [thirdTypedFirstLine = '', thirdTypedSecondLine = ''] = thirdTypedText.split('\n')
  const isTypingSecondLine = thirdTypedText.includes('\n')
  const screenClass = isSixthScreen
    ? 'screen-slider-sixth'
    : isFifthScreen
    ? 'screen-slider-fifth'
    : isFourthScreen
    ? 'screen-slider-fourth'
    : isThirdScreen
    ? 'screen-slider-third'
    : isSecondScreen
      ? 'screen-slider-second'
      : ''

  useEffect(() => {
    const activeScreen = isSixthScreen
      ? 'sixth'
      : isFifthScreen
      ? 'fifth'
      : isFourthScreen
      ? 'fourth'
      : isThirdScreen
        ? 'third'
        : isSecondScreen
          ? 'second'
          : 'first'
    const themeColor = isSixthScreen
      ? '#FFF7FA'
      : isFifthScreen
      ? '#FFF2F7'
      : isFourthScreen
      ? '#FFF3F7'
      : isThirdScreen
        ? '#1C130E'
        : isSecondScreen
          ? '#F4C7D3'
          : '#FAF1F5'
    const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')

    document.documentElement.dataset.activeScreen = activeScreen
    document.body.dataset.activeScreen = activeScreen
    themeMeta?.setAttribute('content', themeColor)

    return () => {
      delete document.documentElement.dataset.activeScreen
      delete document.body.dataset.activeScreen
    }
  }, [isSecondScreen, isThirdScreen, isFourthScreen, isFifthScreen, isSixthScreen])

  useEffect(() => {
    let revealFrame = 0
    let textTimer = 0
    let typingInterval = 0

    const resetFrame = window.requestAnimationFrame(() => {
      if (!isThirdScreen) {
        setThirdReady(false)
        setThirdTextReady(false)
        setThirdTypedText('')
        setThirdTypingDone(false)
        return
      }

      setThirdReady(false)
      setThirdTextReady(false)
      setThirdTypedText('')
      setThirdTypingDone(false)
      setThirdAnimationKey((currentKey) => currentKey + 1)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealFrame = window.requestAnimationFrame(() => {
          setThirdReady(true)
          setThirdTextReady(true)
          setThirdTypedText(thirdCopy)
          setThirdTypingDone(true)
        })
        return
      }

      revealFrame = window.requestAnimationFrame(() => {
        setThirdReady(true)
      })
      textTimer = window.setTimeout(() => {
        setThirdTextReady(true)
        let characterIndex = 0

        typingInterval = window.setInterval(() => {
          characterIndex += 1
          setThirdTypedText(thirdCopy.slice(0, characterIndex))

          if (characterIndex >= thirdCopy.length) {
            window.clearInterval(typingInterval)
            setThirdTypingDone(true)
          }
        }, 46)
      }, 560)
    })

    return () => {
      window.cancelAnimationFrame(resetFrame)
      window.cancelAnimationFrame(revealFrame)
      window.clearTimeout(textTimer)
      window.clearInterval(typingInterval)
    }
  }, [isThirdScreen])

  useEffect(() => {
    let cycleInterval = 0
    let revealFrame = 0
    let cycleTimer = 0

    const startFrame = window.requestAnimationFrame(() => {
      if (!isFourthScreen) {
        setFourthReady(false)
        setActiveReasonIndex(null)
        return
      }

      setFourthReady(false)
      setActiveReasonIndex(null)

      revealFrame = window.requestAnimationFrame(() => {
        setFourthReady(true)
      })

      cycleTimer = window.setTimeout(() => {
        setActiveReasonIndex(0)
        cycleInterval = window.setInterval(() => {
          setActiveReasonIndex((currentIndex) => {
            if (currentIndex === null) {
              return 0
            }

            return (currentIndex + 1) % loveReasons.length
          })
        }, 2400)
      }, 1900)
    })

    return () => {
      window.cancelAnimationFrame(startFrame)
      window.cancelAnimationFrame(revealFrame)
      window.clearTimeout(cycleTimer)
      window.clearInterval(cycleInterval)
    }
  }, [isFourthScreen])

  useEffect(() => {
    let revealFrame = 0

    const startFrame = window.requestAnimationFrame(() => {
      if (!isFifthScreen) {
        setFifthReady(false)
        return
      }

      setFifthReady(false)
      revealFrame = window.requestAnimationFrame(() => {
        setFifthReady(true)
      })
    })

    return () => {
      window.cancelAnimationFrame(startFrame)
      window.cancelAnimationFrame(revealFrame)
    }
  }, [isFifthScreen])

  useEffect(() => {
    let revealFrame = 0

    const startFrame = window.requestAnimationFrame(() => {
      if (!isSixthScreen) {
        setSixthReady(false)
        return
      }

      setSixthReady(false)
      revealFrame = window.requestAnimationFrame(() => {
        setSixthReady(true)
      })
    })

    return () => {
      window.cancelAnimationFrame(startFrame)
      window.cancelAnimationFrame(revealFrame)
    }
  }, [isSixthScreen])

  return (
    <main
      className={`page-shell ${isSecondScreen ? 'page-shell-second' : ''} ${isThirdScreen ? 'page-shell-third' : ''} ${isFourthScreen ? 'page-shell-fourth' : ''} ${isFifthScreen ? 'page-shell-fifth' : ''} ${isSixthScreen ? 'page-shell-sixth' : ''} relative h-[100dvh] min-h-[100svh] overflow-hidden text-[#D783A2]`}
    >
      <div className={`screen-slider ${screenClass}`}>
        <section className="relative h-[100dvh] min-h-[100svh] overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="anim-bg-drift absolute left-1/2 top-[43%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6bfd2]/35 blur-[120px]" />
            <div className="anim-glow-pulse absolute left-1/2 top-[36%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4A8BF]/40 blur-[70px]" />
            <div className="anim-glow-pulse absolute left-1/2 top-[40%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-[90px]" />
          </div>

          <div className="relative flex h-[100dvh] min-h-[100svh] w-full flex-col px-6 pt-[max(18px,env(safe-area-inset-top))] pb-[max(22px,env(safe-area-inset-bottom))] text-left">
            <header className="anim-fade-up flex items-center justify-between">
              <div className="font-['Montserrat'] text-[14px] font-semibold tracking-[0.18em]">
                для тебя
              </div>

              <div className="mt-1 flex h-9 w-9 items-center justify-center">
                <HeartOutline className="h-[22px] w-[22px] overflow-visible" />
              </div>
            </header>

            <div className="relative flex flex-1 translate-y-[50px] flex-col items-start justify-center text-left">
              <div
                aria-hidden="true"
                className="anim-soft-float pointer-events-none absolute left-[53%] top-[36%] opacity-90 blur-[20px]"
              >
                <div className="anim-glow-pulse">
                  <svg
                    viewBox="0 0 24 24"
                    className="anim-heart-beat h-[380px] w-[380px] text-[#EE87A9]/85 min-[430px]:h-[460px] min-[430px]:w-[460px]"
                    fill="currentColor"
                  >
                    <path d="M12 21s-7.5-4.8-10.2-9.2C-.4 8.4 1.8 5 5.3 5c2 0 3.7 1 4.7 2.4C11 6 12.7 5 14.7 5c3.5 0 5.7 3.4 3.5 6.8C19.5 16.2 12 21 12 21z" />
                  </svg>
                </div>
              </div>
              <span aria-hidden="true" className="sparkle sparkle-a" />
              <span aria-hidden="true" className="sparkle sparkle-b" />
              <span aria-hidden="true" className="sparkle sparkle-c" />
              <span aria-hidden="true" className="sparkle sparkle-d" />

              <div className="relative z-10 w-full pl-3 min-[430px]:pl-4">
                <h1 className="anim-fade-up anim-fade-up-delay-1 w-full font-['Great_Vibes'] text-[72px] font-normal leading-[0.86] tracking-[0.01em] text-[#D783A2] min-[430px]:text-[86px]">
                  Я сделал
                  <br />
                  кое-что
                  <br />
                  маленькое
                </h1>

                <p className="anim-fade-up anim-fade-up-delay-2 mt-9 w-full max-w-[22rem] font-['Montserrat'] text-[16px] font-medium leading-[1.5] tracking-[0.06em] text-[#D98EAA] min-[430px]:mt-11 min-[430px]:text-[17px]">
                  просто потому,
                  <br />
                  что ты особенная
                </p>
              </div>
            </div>

            <footer className="anim-fade-up anim-fade-up-delay-3 flex justify-center pb-1">
              <button
                type="button"
                className="flex flex-col items-center gap-3 text-[#D98EAA] outline-none focus-visible:ring-2 focus-visible:ring-[#D783A2]/60"
                aria-label="Перейти к следующему экрану"
                onClick={() => setScreen(1)}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="anim-arrow h-5 w-5 text-[#D98EAA]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M7 14l5 5 5-5" />
                </svg>

                <div className="font-['Montserrat'] text-[12px] font-medium tracking-[0.18em] text-[#D98EAA]">
                  нажми, чтобы открыть
                </div>
              </button>
            </footer>
          </div>
        </section>

        <section className="second-screen relative h-[100dvh] min-h-[100svh] overflow-hidden px-6 pt-[max(18px,env(safe-area-inset-top))] pb-[max(22px,env(safe-area-inset-bottom))] text-center">
          <button
            type="button"
            className="second-back-button absolute left-6 top-[max(20px,env(safe-area-inset-top))] z-20 flex h-9 w-9 items-center justify-center text-[#E991AE] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Вернуться к первому экрану"
            onClick={() => setScreen(0)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[21px] w-[21px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            className="second-heart-button absolute right-6 top-[max(20px,env(safe-area-inset-top))] z-20 flex h-9 w-9 items-center justify-center text-[#E991AE] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Показать маленькие сердечки"
            onClick={() => setHeartBurstId((currentId) => currentId + 1)}
          >
            <HeartOutline className="second-heart-icon h-[22px] w-[22px] overflow-visible" />
            {heartBurstId > 0 && (
              <span key={heartBurstId} className="heart-burst" aria-hidden="true">
                <span className="heart-burst-piece heart-burst-piece-1" />
                <span className="heart-burst-piece heart-burst-piece-2" />
                <span className="heart-burst-piece heart-burst-piece-3" />
                <span className="heart-burst-piece heart-burst-piece-4" />
                <span className="heart-burst-piece heart-burst-piece-5" />
                <span className="heart-burst-piece heart-burst-piece-6" />
                <span className="heart-burst-piece heart-burst-piece-7" />
              </span>
            )}
          </button>

          <div className="second-atmosphere" aria-hidden="true">
            <span className="light-leak light-leak-a" />
            <span className="light-leak light-leak-b" />
            <span className="light-leak light-leak-c" />
            <span className="dream-particle dream-particle-1" />
            <span className="dream-particle dream-particle-2" />
            <span className="dream-particle dream-particle-3" />
            <span className="dream-particle dream-particle-4" />
            <span className="dream-particle dream-particle-5" />
            <span className="dream-particle dream-particle-6" />
            <span className="dream-particle dream-particle-7" />
            <span className="dream-particle dream-particle-8" />
            <span className="dream-particle dream-particle-9" />
            <span className="dream-particle dream-particle-10" />
            <span className="dream-particle dream-particle-11" />
            <span className="dream-particle dream-particle-12" />
          </div>

          <div className="relative z-10 flex h-full min-h-[inherit] items-center justify-center">
            <article className="quote-card">
              <div className="quote-mark" aria-hidden="true">
                “
              </div>

              <h2 className="font-['Cormorant_Garamond'] text-[36px] font-semibold leading-[1.12] tracking-[0.01em] text-[#BE6F8D] min-[430px]:text-[42px]">
                <span className="quote-line quote-line-1">ты делаешь</span>
                <span className="quote-line quote-line-2">мои дни</span>
                <span className="quote-line quote-line-3">спокойнее</span>
              </h2>

              <p className="quote-small mt-7 font-['Montserrat'] text-[17px] font-normal leading-[1.5] tracking-[0.02em] text-[#CF819C] min-[430px]:text-[18px]">
                спасибо за это
              </p>

              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="quote-heart mx-auto mt-6 h-5 w-5 text-[#F4A0B8]"
                fill="currentColor"
              >
                <path d="M12 21s-7.5-4.8-10.2-9.2C-.4 8.4 1.8 5 5.3 5c2 0 3.7 1 4.7 2.4C11 6 12.7 5 14.7 5c3.5 0 5.7 3.4 3.5 6.8C19.5 16.2 12 21 12 21z" />
              </svg>
            </article>
          </div>

          <button
            type="button"
            className="second-next-button absolute bottom-[max(22px,env(safe-area-inset-bottom))] left-0 z-20 flex w-full flex-col items-center justify-center gap-3 text-center text-[#D487A2] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Перейти к следующему экрану"
            onClick={() => setScreen(2)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="second-next-arrow h-5 w-5 text-[#D487A2]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M7 14l5 5 5-5" />
            </svg>

            <div className="font-['Montserrat'] text-[12px] font-medium tracking-[0.18em] text-[#D487A2]">
              ещё немного дальше
            </div>
          </button>
        </section>

        <section
          className={`third-screen relative h-[100dvh] min-h-[100svh] overflow-hidden text-white ${thirdReady ? 'third-screen-ready' : ''} ${thirdTextReady ? 'third-text-ready' : ''}`}
        >
          <div className="third-photo-stage absolute inset-0">
            <img
              className="third-photo h-full w-full object-cover"
              src={publicAsset('moment-cafe.png')}
              alt=""
              aria-hidden="true"
            />
          </div>

          {isThirdScreen && (
            <div key={thirdAnimationKey} className="third-react-atmosphere" aria-hidden="true">
              <span className="third-light-bloom" />
              {thirdParticles.map((particle, index) => (
                <span
                  key={`${thirdAnimationKey}-${index}`}
                  className="third-warm-particle"
                  style={
                    {
                      '--third-particle-left': `${particle.left}%`,
                      '--third-particle-top': `${particle.top}%`,
                      '--third-particle-size': `${particle.size}px`,
                      '--third-particle-opacity': particle.opacity,
                      '--third-particle-duration': `${particle.duration}s`,
                      '--third-particle-delay': `${particle.delay}s`,
                      '--third-particle-drift': `${particle.drift}px`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          )}

          <header className="third-header absolute left-0 top-0 z-20 flex w-full items-center justify-between px-5 pt-[max(18px,env(safe-area-inset-top))]">
            <button
              type="button"
              className="third-back-button flex h-9 w-9 items-center justify-center text-white/78 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Вернуться ко второму экрану"
              onClick={() => setScreen(1)}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-[21px] w-[21px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <button
              type="button"
              className="third-heart-button flex h-9 w-9 items-center justify-center text-white/72 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Оживить сердечко"
              onClick={() => setThirdHeartBurstId((currentId) => currentId + 1)}
            >
              <HeartOutline className="third-heart-icon h-[22px] w-[22px] overflow-visible" />
              {thirdHeartBurstId > 0 && (
                <span key={thirdHeartBurstId} className="third-heart-burst" aria-hidden="true">
                  <span className="third-heart-burst-piece third-heart-burst-piece-1" />
                  <span className="third-heart-burst-piece third-heart-burst-piece-2" />
                  <span className="third-heart-burst-piece third-heart-burst-piece-3" />
                  <span className="third-heart-burst-piece third-heart-burst-piece-4" />
                  <span className="third-heart-burst-piece third-heart-burst-piece-5" />
                </span>
              )}
            </button>
          </header>

          <div className="third-copy-wrap">
            <p className={`third-copy ${thirdTypingDone ? 'third-copy-done' : ''}`}>
              <span className="third-copy-line third-copy-line-1">
                {thirdTypedFirstLine}
                {!isTypingSecondLine && thirdTextReady && <span className="third-type-cursor" />}
              </span>
              <span className="third-copy-line third-copy-line-2">
                {thirdTypedSecondLine}
                {isTypingSecondLine && thirdTextReady && <span className="third-type-cursor" />}
              </span>
            </p>
          </div>

          <button
            type="button"
            className="third-next-button absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-0 z-20 flex w-full flex-col items-center justify-center gap-3 text-center text-white/72 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Перейти к следующему экрану"
            onClick={() => setScreen(3)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="third-next-arrow h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M7 14l5 5 5-5" />
            </svg>

            <div className="font-['Montserrat'] text-[12px] font-medium tracking-[0.18em]">
              что было дальше
            </div>
          </button>
        </section>

        <section
          className={`fourth-screen relative h-[100dvh] min-h-[100svh] overflow-hidden px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] text-[#D57D9C] ${fourthReady ? 'fourth-screen-ready' : ''}`}
        >
          <div className="fourth-atmosphere" aria-hidden="true">
            <span className="fourth-glow fourth-glow-a" />
            <span className="fourth-glow fourth-glow-b" />
            <span className="fourth-glow fourth-glow-c" />
            <span className="fourth-floating-heart fourth-floating-heart-1" />
            <span className="fourth-floating-heart fourth-floating-heart-2" />
            <span className="fourth-floating-heart fourth-floating-heart-3" />
            <span className="fourth-floating-heart fourth-floating-heart-4" />
            <span className="fourth-floating-heart fourth-floating-heart-5" />
            <span className="fourth-floating-heart fourth-floating-heart-6" />
          </div>

          <header className="fourth-header relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="fourth-back-button flex h-9 w-9 items-center justify-center text-[#D989A5] outline-none focus-visible:ring-2 focus-visible:ring-[#D989A5]/50"
                aria-label="Вернуться к предыдущему экрану"
                onClick={() => setScreen(2)}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[20px] w-[20px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>

              <div className="font-['Montserrat'] text-[13px] font-semibold tracking-[0.02em] text-[#E291AB]">
                несколько причин
              </div>
            </div>

            <div className="fourth-heart flex h-9 w-9 items-center justify-center text-[#F0A6BD]">
              <HeartOutline className="h-[22px] w-[22px] overflow-visible" />
            </div>
          </header>

          <div className="fourth-content relative z-10">
            <h2 className="fourth-title font-['Cormorant_Garamond'] text-[42px] font-semibold leading-[0.98] tracking-[0.01em] text-[#CF7192] min-[430px]:text-[48px]">
              люблю тебя
              <br />
              потому что...
            </h2>

            <div className={`fourth-reason-list ${fourthReady ? 'fourth-reason-list-live' : ''}`}>
              {loveReasons.map((reason, index) => (
                <article
                  key={reason}
                  className={`fourth-reason-card ${activeReasonIndex === index ? 'fourth-reason-card-active' : ''}`}
                  style={{ '--reason-delay': `${420 + index * 95}ms` } as CSSProperties}
                >
                  <div className="fourth-reason-card-surface">
                    <p>{reason}</p>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="fourth-card-heart"
                      fill="currentColor"
                    >
                      <path d="M12 21s-7.5-4.8-10.2-9.2C-.4 8.4 1.8 5 5.3 5c2 0 3.7 1 4.7 2.4C11 6 12.7 5 14.7 5c3.5 0 5.7 3.4 3.5 6.8C19.5 16.2 12 21 12 21z" />
                    </svg>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="fourth-next-button absolute left-0 z-20 flex w-full flex-col items-center justify-center gap-3 text-center text-[#DC89A5] outline-none focus-visible:ring-2 focus-visible:ring-[#E6A0B8]/50"
            aria-label="Перейти к следующему экрану"
            onClick={() => setScreen(4)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="fourth-next-arrow h-5 w-5 text-[#DC89A5]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M7 14l5 5 5-5" />
            </svg>

            <span className="font-['Montserrat'] text-[12px] font-semibold tracking-[0.18em] text-[#DC89A5]">
              дальше
            </span>
          </button>
        </section>

        <section
          className={`fifth-screen relative h-[100dvh] min-h-[100svh] overflow-hidden px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] text-[#D77A99] ${fifthReady ? 'fifth-screen-ready' : ''}`}
        >
          <div className="fifth-atmosphere" aria-hidden="true">
            <span className="fifth-glow fifth-glow-a" />
            <span className="fifth-glow fifth-glow-b" />
            <span className="fifth-glow fifth-glow-c" />
          </div>

          <header className="fifth-header relative z-20 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <button
                type="button"
                className="fifth-back-button flex h-9 w-9 items-center justify-center text-[#D989A5] outline-none focus-visible:ring-2 focus-visible:ring-[#D989A5]/50"
                aria-label="Вернуться к предыдущему экрану"
                onClick={() => setScreen(3)}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[21px] w-[21px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>

              <div className="fifth-kicker font-['Cormorant_Garamond'] text-[24px] font-semibold leading-[0.95] tracking-[0.01em] text-[#D87B9B]">
                наши маленькие
                <br />
                моменты
              </div>
            </div>

            <div className="fifth-heart flex h-9 w-9 items-center justify-center text-[#F0A6BD]">
              <HeartOutline className="h-[22px] w-[22px] overflow-visible" />
            </div>
          </header>

          <div className="fifth-collage relative z-10" aria-label="Коллаж маленьких моментов">
            {fifthMoments.map((moment) => (
              <figure key={moment.className} className={`fifth-polaroid ${moment.className}`}>
                <span className={`fifth-tape ${moment.tapeClass}`} aria-hidden="true" />
                <div className="fifth-photo-frame">
                  <img className="fifth-photo" src={moment.src} alt="" aria-hidden="true" />
                </div>
              </figure>
            ))}
          </div>

          <div className="fifth-doodle-hearts" aria-hidden="true">
            <HeartOutline className="fifth-doodle-heart fifth-doodle-heart-a" />
            <HeartOutline className="fifth-doodle-heart fifth-doodle-heart-b" />
            <HeartOutline className="fifth-doodle-heart fifth-doodle-heart-c" />
          </div>

          <footer className="fifth-footer relative z-20 flex flex-col items-center gap-3 text-center">
            <p className="font-['Montserrat'] text-[15px] font-semibold tracking-[0.01em] text-[#DC89A5]">
              спасибо за всё
            </p>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="fifth-footer-heart h-5 w-5 text-[#F0A6BD]"
              fill="currentColor"
            >
              <path d="M12 21s-7.5-4.8-10.2-9.2C-.4 8.4 1.8 5 5.3 5c2 0 3.7 1 4.7 2.4C11 6 12.7 5 14.7 5c3.5 0 5.7 3.4 3.5 6.8C19.5 16.2 12 21 12 21z" />
            </svg>
          </footer>

          <button
            type="button"
            className="fifth-next-button absolute left-0 z-20 flex w-full flex-col items-center justify-center gap-2 text-center text-[#DC89A5] outline-none focus-visible:ring-2 focus-visible:ring-[#E6A0B8]/50"
            aria-label="Перейти к финальному экрану"
            onClick={() => setScreen(5)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="fifth-next-arrow h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M7 14l5 5 5-5" />
            </svg>

            <span className="font-['Montserrat'] text-[11px] font-semibold tracking-[0.18em]">
              финал
            </span>
          </button>
        </section>

        <section
          className={`sixth-screen relative h-[100dvh] min-h-[100svh] overflow-hidden px-6 pt-[max(18px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] text-center text-[#D982A1] ${sixthReady ? 'sixth-screen-ready' : ''}`}
        >
          <div className="sixth-atmosphere" aria-hidden="true">
            <span className="sixth-light sixth-light-a" />
            <span className="sixth-light sixth-light-b" />
            <span className="sixth-particle sixth-particle-1" />
            <span className="sixth-particle sixth-particle-2" />
            <span className="sixth-particle sixth-particle-3" />
            <span className="sixth-particle sixth-particle-4" />
            <span className="sixth-particle sixth-particle-5" />
            <span className="sixth-particle sixth-particle-6" />
          </div>

          <header className="sixth-header relative z-20 flex items-center justify-between">
            <button
              type="button"
              className="sixth-back-button flex h-9 w-9 items-center justify-center text-[#D989A5] outline-none focus-visible:ring-2 focus-visible:ring-[#D989A5]/50"
              aria-label="Вернуться к предыдущему экрану"
              onClick={() => setScreen(4)}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-[21px] w-[21px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <div className="sixth-heart-top flex h-9 w-9 items-center justify-center text-white/90">
              <HeartOutline className="h-[22px] w-[22px] overflow-visible" />
            </div>
          </header>

          <div className="sixth-content relative z-10 flex min-h-[calc(100dvh-120px)] flex-col items-center justify-center">
            <div className="sixth-heart-stage" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className="sixth-big-heart"
                fill="currentColor"
              >
                <path d="M12 21s-7.5-4.8-10.2-9.2C-.4 8.4 1.8 5 5.3 5c2 0 3.7 1 4.7 2.4C11 6 12.7 5 14.7 5c3.5 0 5.7 3.4 3.5 6.8C19.5 16.2 12 21 12 21z" />
              </svg>
            </div>

            <div className="sixth-copy">
              <h2 className="font-['Cormorant_Garamond'] text-[38px] font-semibold leading-[1.04] tracking-[0.01em] text-white drop-shadow-[0_12px_26px_rgba(213,125,156,0.18)] min-[430px]:text-[44px]">
                спасибо,
                <br />
                что ты есть
              </h2>

              <HeartOutline className="sixth-copy-heart mx-auto mt-5 h-[22px] w-[22px] text-white/90" />
            </div>
          </div>

          <p className="sixth-bottom-text relative z-20 font-['Montserrat'] text-[15px] font-semibold tracking-[0.01em] text-[#D982A1]">
            я тебя очень люблю
          </p>
        </section>
      </div>
    </main>
  )
}

export default App

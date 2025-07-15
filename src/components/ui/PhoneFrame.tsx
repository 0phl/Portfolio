import React, { useState, useEffect } from "react"

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
  model?: "iphone" | "android"
  time?: string
  isGridPreview?: boolean
  isModal?: boolean
  color?: "purple" | "silver" | "black" | "gold"
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = "",
  model = "iphone",
  isGridPreview = false,
  isModal = false,
  color = "purple"
}) => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isSmall = isGridPreview
  const isMedium = isModal && !isGridPreview

  const frameHeight = isSmall
    ? "h-[260px] sm:h-[320px]"
    : isMedium
    ? "h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px]"
    : isDesktop
    ? "h-[900px]"
    : "h-[700px] sm:h-[800px]"

  const frameWidth = isSmall
    ? "w-[128px] sm:w-[168px]"
    : isMedium
    ? "w-[200px] sm:w-[225px] md:w-[250px] lg:w-[275px] xl:w-[300px]"
    : isDesktop
    ? "w-[450px]"
    : "w-[350px] sm:w-[400px]"

  const screenHeight = isSmall
    ? "h-[251px] sm:h-[307px]"
    : isMedium
    ? "h-[382px] sm:h-[432px] md:h-[482px] lg:h-[532px] xl:h-[577px]"
    : isDesktop
    ? "h-[862px]"
    : "h-[670px] sm:h-[770px]"

  const screenWidth = isSmall
    ? "w-[120px] sm:w-[155px]"
    : isMedium
    ? "w-[185px] sm:w-[210px] md:w-[230px] lg:w-[255px] xl:w-[275px]"
    : isDesktop
    ? "w-[410px]"
    : "w-[320px] sm:w-[365px]"

  const colorVariants = {
    purple: {
      frame: "#342C3F",
      frameDark: "#2a2235",
      frameLight: "#8a7d96",
      buttons: "#2a2235"
    },
    silver: {
      frame: "#e2e3e4",
      frameDark: "#c8c9ca",
      frameLight: "#ffffff",
      buttons: "#c8c9ca"
    },
    black: {
      frame: "#76726F",
      frameDark: "#5e5a57",
      frameLight: "#c4c0bd",
      buttons: "#5e5a57"
    },
    gold: {
      frame: "#F6EEDB",
      frameDark: "#d1c4a3",
      frameLight: "#ffffff",
      buttons: "#d1c4a3"
    }
  }

  const currentColor = colorVariants[color]

  const buttonWidth = isSmall
    ? "w-[0.7px] sm:w-[1px]"
    : isMedium
    ? "w-[1.5px] sm:w-[1.8px] md:w-[2px] lg:w-[2.2px] xl:w-[2.5px]"
    : "w-[3px]"

  const muteButtonHeight = isSmall
    ? "h-[7px] sm:h-[11px]"
    : isMedium
    ? "h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"
    : "h-[32px]"

  const volumeButtonHeight = isSmall
    ? "h-[14px] sm:h-[21px]"
    : isMedium
    ? "h-[30px] sm:h-[35px] md:h-[38px] lg:h-[42px] xl:h-[45px]"
    : "h-[62px]"

  const powerButtonHeight = isSmall
    ? "h-[23px] sm:h-[35px]"
    : isMedium
    ? "h-[48px] sm:h-[55px] md:h-[60px] lg:h-[65px] xl:h-[70px]"
    : "h-[100px]"

  const muteButtonTop = isSmall
    ? "top-[26px] sm:top-[40px]"
    : isMedium
    ? "top-[50px] sm:top-[58px] md:top-[65px] lg:top-[72px] xl:top-[80px]"
    : "top-[115px]"

  const volumeUpTop = isSmall
    ? "top-[40px] sm:top-[60px]"
    : isMedium
    ? "top-[75px] sm:top-[85px] md:top-[95px] lg:top-[105px] xl:top-[115px]"
    : "top-[175px]"

  const volumeDownTop = isSmall
    ? "top-[72px] sm:top-[109px]"
    : isMedium
    ? "top-[130px] sm:top-[145px] md:top-[160px] lg:top-[175px] xl:top-[190px]"
    : "top-[315px]"

  const powerButtonTop = isSmall
    ? "top-[46px] sm:top-[69px]"
    : isMedium
    ? "top-[85px] sm:top-[95px] md:top-[105px] lg:top-[115px] xl:top-[125px]"
    : "top-[200px]"

  const homeIndicator = isSmall
    ? "w-13 h-0.5 sm:w-20 sm:h-1"
    : isMedium
    ? "w-16 h-1 sm:w-20 sm:h-1.5 md:w-24 md:h-1.5 lg:w-28 lg:h-2 xl:w-32 xl:h-2"
    : "w-32 h-1.5"

  const borderRadius = isSmall ? '15px' : isMedium ? '35px' : '68px'
  const screenBorderRadius = isSmall ? '11px' : isMedium ? '27px' : '49px'

  const framePadding = isSmall ? '4.5px' : isMedium ? '12px' : '19px'

  const shadowBlur = isSmall ? '1px' : isMedium ? '3px' : '4px'
  const shadowSpread = isSmall ? '0.5px' : isMedium ? '1.5px' : '2px'
  const insetBorder = isSmall ? '1.5px' : isMedium ? '4px' : '6px'

return (
  <div className={`w-full max-w-full flex justify-center items-center overflow-hidden ${className}`}>
    <div
      className={`relative ${frameHeight} ${frameWidth} flex-shrink-0`}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        boxSizing: "border-box",
        background: '#010101',
        border: `1px solid ${currentColor.frameDark}`,
        borderRadius: borderRadius,
        boxShadow: `inset 0 0 ${shadowBlur} ${shadowSpread} ${currentColor.frameLight}, inset 0 0 0 ${insetBorder} ${currentColor.frame}`,
        padding: `${framePadding}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        className={`${screenHeight} ${screenWidth} relative overflow-hidden flex-shrink-0`}
        style={{
          borderRadius: screenBorderRadius,
          width: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        <div className="h-full w-full overflow-hidden relative">
          {children}
        </div>

        {model === "iphone" && (
          <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 ${homeIndicator} bg-white/30 rounded-full`} />
        )}
      </div>

      {model === "iphone" && (
        <>
          <div className={`absolute ${muteButtonTop} -left-0.5 ${buttonWidth} ${muteButtonHeight} z-10`} style={{ background: currentColor.buttons, borderRadius: '2px' }} />
          <div className={`absolute ${volumeUpTop} -left-0.5 ${buttonWidth} ${volumeButtonHeight} z-10`} style={{ background: currentColor.buttons, borderRadius: '2px' }} />
          <div className={`absolute ${volumeDownTop} -left-0.5 ${buttonWidth} ${volumeButtonHeight} z-10`} style={{ background: currentColor.buttons, borderRadius: '2px' }} />
          <div className={`absolute ${powerButtonTop} -right-0.5 ${buttonWidth} ${powerButtonHeight} z-10`} style={{ background: currentColor.buttons, borderRadius: '2px' }} />
        </>
      )}
    </div>
  </div>
)


}

export default PhoneFrame

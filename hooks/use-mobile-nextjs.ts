"use client"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

export const IS_SERVER = typeof window === "undefined"
export const MOBILE_SCREEN_MAX_WIDTH = 640
export const SERVER_SIDE_MOBILE_FIRST = true // true - for mobile, false - for desktop

/**
 * Hook to detect isMobile vs. isDesktop using Media Query
 * @param {number} [maxWidth] - max width for mobile screen, default is MOBILE_SCREEN_MAX_WIDTH
 * @returns {boolean} true when the screen size is matching isMobile criteria
 */
function useIsMobileByMediaQuery(maxWidth = MOBILE_SCREEN_MAX_WIDTH) {
  const isMobile = useMediaQuery({ maxWidth })
  return isMobile
}

/**
 * Hook to detect isMobile vs. isDesktop with Next.js workaround
 * @param {number} [maxWidth] - max width for mobile screen, default is MOBILE_SCREEN_MAX_WIDTH
 * @returns {boolean} true when the screen size is matching isMobile criteria
 */
function useIsMobileForNextJs(maxWidth = MOBILE_SCREEN_MAX_WIDTH) {
  const isMobile = useIsMobileByMediaQuery(maxWidth)
  const [isMobileDelayed, setIsMobileDelayed] = useState(
    SERVER_SIDE_MOBILE_FIRST
  )

  useEffect(() => {
    setIsMobileDelayed(isMobile) // Next.js don't allow to use useIsMobileXxx() directly, so we need to use this workaround
  }, [isMobile])

  return isMobileDelayed
}

/**
 * We need a "smart export wrappers", because we can not use hooks on the server side
 */
export const useIsMobile = IS_SERVER
  ? () => SERVER_SIDE_MOBILE_FIRST
  : useIsMobileForNextJs

import { useEffect } from 'react'

export default function useBrandColor(logoSrc) {
  useEffect(() => {
    if (typeof window === 'undefined' || !logoSrc) return

    const setBrand = async () => {
      try {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = logoSrc
        await new Promise((res, rej) => {
          img.onload = res
          img.onerror = rej
        })

        const canvas = document.createElement('canvas')
        const w = (canvas.width = img.naturalWidth || 64)
        const h = (canvas.height = img.naturalHeight || 64)
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Unable to create canvas context')

        ctx.drawImage(img, 0, 0, w, h)
        const data = ctx.getImageData(0, 0, w, h).data

        let r = 0,
          g = 0,
          b = 0,
          count = 0

        // Sample pixels, filtering out transparent and near-white background pixels
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3]
          const red = data[i]
          const green = data[i + 1]
          const blue = data[i + 2]

          // Ignore transparent and pure/near-white pixels
          if (alpha > 80 && !(red > 235 && green > 235 && blue > 235)) {
            // Prioritize saturated/vibrant colors from the logo
            r += red
            g += green
            b += blue
            count++
          }
        }

        let hex = '#0ea5a4'
        if (count > 0) {
          const avgR = Math.round(r / count)
          const avgG = Math.round(g / count)
          const avgB = Math.round(b / count)
          const toHex = (v) => v.toString(16).padStart(2, '0')
          hex = `#${toHex(avgR)}${toHex(avgG)}${toHex(avgB)}`
        }

        // Ensure primary accent is vibrant
        const primaryBrand = count > 0 ? hex : '#0ea5a4'
        const brandSecondary = '#38bdf8'

        document.documentElement.style.setProperty('--brand', primaryBrand)
        document.documentElement.style.setProperty('--brand-secondary', brandSecondary)
        document.documentElement.style.setProperty('--brand-contrast', '#ffffff')
        document.documentElement.style.setProperty('--brand-soft', 'rgba(14, 165, 164, 0.16)')
        document.documentElement.style.setProperty('--brand-600', '#0d9488')
        document.documentElement.style.setProperty('--brand-400', '#2dd4bf')
      } catch {
        document.documentElement.style.setProperty('--brand', '#0ea5a4')
        document.documentElement.style.setProperty('--brand-secondary', '#38bdf8')
        document.documentElement.style.setProperty('--brand-contrast', '#ffffff')
        document.documentElement.style.setProperty('--brand-soft', 'rgba(14, 165, 164, 0.16)')
      }
    }

    void setBrand()
  }, [logoSrc])
}

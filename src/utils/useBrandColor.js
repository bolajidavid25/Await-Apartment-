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
        // sample every 4th pixel to be faster
        for (let i = 0; i < data.length; i += 16) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)

        const toHex = (v) => v.toString(16).padStart(2, '0')
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        const contrast = luminance > 0.5 ? '#0f172a' : '#ffffff'

        document.documentElement.style.setProperty('--brand', hex)
        document.documentElement.style.setProperty('--brand-contrast', contrast)
        document.documentElement.style.setProperty('--brand-600', hex)
        document.documentElement.style.setProperty('--brand-400', hex)
      } catch {
        document.documentElement.style.setProperty('--brand', '#0ea5a4')
        document.documentElement.style.setProperty('--brand-contrast', '#ffffff')
      }
    }

    void setBrand()
  }, [logoSrc])
}

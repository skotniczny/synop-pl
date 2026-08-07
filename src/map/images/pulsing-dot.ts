const size = 140
const minRadius = 35
const maxRadius = 65
const duration = 1200

export function pulsingDot(map: maplibregl.Map): maplibregl.StyleImageInterface {
  let context: CanvasRenderingContext2D | null = null
  let start = 0

  const image: maplibregl.StyleImageInterface = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      context = canvas.getContext("2d")
    },

    render() {
      if (!context) return false

      const now = performance.now()
      if (now - start > duration) start = now
      const t = (now - start) / duration
      const radius = minRadius + t * (maxRadius - minRadius)

      context.clearRect(0, 0, this.width, this.height)
      context.beginPath()
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
      context.fillStyle = `rgba(225, 29, 72, ${1 - t})`
      context.fill()

      image.data = context.getImageData(0, 0, this.width, this.height).data
      map.triggerRepaint()
      return true
    },
  }

  return image
}

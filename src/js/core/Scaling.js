export default class Scaling {
	constructor(opt = {}) {
		this.scale = 1
		this.minScale = opt.minScale || 0.65
		this.maxScale = opt.maxScale || 1
		this.minWidth = opt.minWidth || 360
		this.maxWidth = opt.maxWidth || 1920
	}

	get(width) {
		const { minScale, maxScale, minWidth, maxWidth } = this

		if (width <= maxWidth && width >= minWidth) {
			this.scale = minScale + (width - minWidth) * ((maxScale - minScale) / (maxWidth - minWidth))
		} else if (width < minWidth) {
			this.scale = minScale
		}

		return this.scale
	}
}
export default class Tools {

	/**
	 * Возвращает рандомное число от min до max включительно
	 *
	 * @param {number} min Минимальное число
	 * @param {number} max Максимальное число
	 * @return {number} Рандомное число
	 */

	static randomInteger(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min))
	}


	/**
	 * Возвращает перемешанный массив (алгоритм тасования Фишера-Йейтса)
	 *
	 * @param  {array} arr Исходный массив
	 * @return {array} Перемешанный массив
	 */

	static arrShuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr
	}


	/**
	 * Возвращает группу тайлов
	 *
	 * @param  {array}  field Двумерный массив
	 * @param  {number} row Строка
	 * @param  {number} col Колонка
	 * @param  {string} id Должен быть строкой
	 * @return {array}
	 */

	static getGroup(field, row, col, id) {
		const arr = [{ row, col }]
		field[row][col] = '0'

		if (field?.[row-1]?.[col] === id) arr.push(...this.getGroup(field, row-1, col, id))
		if (field?.[row+1]?.[col] === id) arr.push(...this.getGroup(field, row+1, col, id))
		if (field[row][col-1]     === id) arr.push(...this.getGroup(field, row, col-1, id))
		if (field[row][col+1]     === id) arr.push(...this.getGroup(field, row, col+1, id))

		return arr
	}


	/**
	 * Возвращает ближний тайл сверху или false если тайла сверху нет
	 *
	 * @param {array} field Поле (двумерный массив)
	 * @param {number} row Строка
	 * @param {number} col Колонка
	 * @returns {object|boolean}
	 */

	static getTileTop(field, row, col) {
		if (!row)
			return false

		if (field[row-1][col] === '0' || field[row-1][col] === 'X')
			return this.getTileTop(field, row-1, col)

		return { row: row-1, col }
	}


	/**
	 * Возвращает группу тайлов вокруг бомбы (каскад)
	 *
	 * @param field Поле (двумерный массив)
	 * @param row Строка
	 * @param col Колонка
	 * @param id Колонка
	 * @param bombRadiusTemplate [object]
	 * @returns {array}
	 */

	static getBomb(field, row, col, id, bombRadiusTemplate) {
		const group = bombRadiusTemplate
		const arr = [{ row, col }]
		let R = row
		let C = col

		field[R][C] = '0'

		for (let i = 0; i < group.length; i++) {
			R = row+group[i][0]
			C = col+group[i][1]

			if (field?.[R]?.[C]) {
				if (field[R][C] === '0' || field[R][C] === 'X')
					continue

				if (field[R][C] === id) {
					field[R][C] = '0'
					arr.push(...this.getBomb(field, R, C, id, bombRadiusTemplate))
					continue
				}

				field[R][C] = '0'
				arr.push({ row:R, col:C })
			}
		}

		return arr
	}
}

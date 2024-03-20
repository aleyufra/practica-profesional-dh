/**
 * Obtener las paginaciones segun el limit y el total de resultados
 * @param {number} limit limite de resultados por página
 * @param {number} results total de resultados encontrados
 * @return {object} Objeto con las paginaciones
 */
function paginationHelper(page, limit, results) {
	// Calculamos el total de páginas
	let totalPages = Math.ceil(results / limit);
	totalPages = totalPages <= 0 ? 0 : totalPages;

	// Calculamos el número de página
	let pageNumber = parseInt(page);
	pageNumber = isNaN(pageNumber) ? 1 : pageNumber;
	pageNumber = pageNumber < 1 ? 1 : pageNumber;
	pageNumber = pageNumber > totalPages ? totalPages : pageNumber;

	// Calculamos el offset
	let offset = limit * (pageNumber - 1);
	offset = offset < 0 ? 0 : offset;

	// Asignamos el número de pagina actual
	const currentPage = pageNumber;

	const pagination = {
		totalPages: totalPages,
		currentPage: currentPage,
		offset: offset,
	};

	return pagination;
}

module.exports = paginationHelper;

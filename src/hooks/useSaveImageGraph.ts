import html2canvas from 'html2canvas';

export const useSaveImageGraph = () => {
	// const handleDownloadImage = (id: string) => {
	// 	const graphElement = document.getElementById(id);
	// 	if (graphElement) {
	// 		// html2canvas(graphElement).then(canvas => {
	// 		// 	const link = document.createElement('a');
	// 		// 	link.href = canvas.toDataURL('image/png');
	// 		// 	link.download = 'graph.png'; // Название скачиваемого файла
	// 		// 	link.click();
	// 		// });
	// 		html2canvas(graphElement, {
	// 			scale: 2, // Увеличивает разрешение (может быть больше 2 при необходимости)
	// 			useCORS: true, // Для обработки кросс-доменных изображений
	// 			logging: true, // Логирование для отладки
	// 			scrollY: -window.scrollY, // Учитывает прокрутку страницы
	// 		}).then(canvas => {
	// 			const link = document.createElement('a');
	// 			link.href = canvas.toDataURL('image/png');
	// 			link.download = 'graph.png';
	// 			link.click();
	// 		});
	// 	}
	// };

	const handleDownloadImage = async (id: string) => {
		const graphElement = document.getElementById(id);

		if (graphElement) {
			// Сохранение текущих стилей
			const originalStyle = graphElement.style.cssText;

			// Временные стили для захвата
			graphElement.style.position = 'static';
			graphElement.style.transform = 'none';
			graphElement.style.overflow = 'visible';

			// Захват содержимого
			await html2canvas(graphElement, {
				scale: 3, // Увеличиваем качество
				useCORS: true,
				allowTaint: true,
				scrollY: 0, // Убираем скролл
				logging: true, // Включаем логирование
			}).then(canvas => {
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = 'graph.png';
				link.click();
			});

			// Восстановление оригинальных стилей
			graphElement.style.cssText = originalStyle;
		}
	};

	return handleDownloadImage;
};

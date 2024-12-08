import html2canvas from 'html2canvas';

// import domtoimage from 'dom-to-image';

export const useSaveImageGraph = (
	setIsScaleDownload: (bol: boolean) => void,
) => {
	const handleDownloadImage = async (id: string) => {
		const graphElement = document.getElementById(id);

		if (graphElement) {
			const originalStyle = graphElement.style.cssText;

			// Временные стили для масштабирования
			graphElement.style.overflow = 'visible';

			// Ждем изменения состояния
			setIsScaleDownload(true);
			await new Promise(resolve => setTimeout(resolve, 10));

			// Захват содержимого с учетом масштаба
			await html2canvas(graphElement, {
				scale: 3, // Увеличиваем качество
				useCORS: true,
				allowTaint: true,
				logging: true, // Включаем логирование
			}).then(canvas => {
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = 'graph.png'; // Название скачиваемого файла
				link.click();
			});

			// Восстановление оригинальных стилей
			graphElement.style.cssText = originalStyle;
			setIsScaleDownload(false);
		}
	};

	return handleDownloadImage;
};

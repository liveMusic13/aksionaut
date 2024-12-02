export const getFormattedDate = () => {
	const date = new Date();
	const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль, если нужно
	const monthNames = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];
	const month = monthNames[date.getMonth()]; // Получаем название месяца
	const year = date.getFullYear(); // Получаем год

	return `${day} ${month} ${year}`;
};

const monthMap: Record<string, string> = {
	Январь: '01',
	Февраль: '02',
	Март: '03',
	Апрель: '04',
	Май: '05',
	Июнь: '06',
	Июль: '07',
	Август: '08',
	Сентябрь: '09',
	Октябрь: '10',
	Ноябрь: '11',
	Декабрь: '12',
};

export const formatDateStringToNumber = (
	dateString1: string,
	dateString2: string,
) => {
	const [month1, year1] = dateString1.split(' ');
	const [month2, year2] = dateString2.split(' ');
	const formattedDate1 = `${monthMap[month1]}.${year1}`;
	const formattedDate2 = `${monthMap[month2]}.${year2}`;
	return `${formattedDate1} - ${formattedDate2}`;
};

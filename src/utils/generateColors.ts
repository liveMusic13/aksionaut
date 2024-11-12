// Функция для преобразования цвета из HEX в RGB
const hexToRgb = (hex: string): [number, number, number] => {
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
};

// Функция для преобразования цвета из RGB в HEX
const rgbToHex = (r: number, g: number, b: number): string => {
	const toHex = (c: number) => c.toString(16).padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Функция для генерации тусклых и темных оттенков
export const generateColors = (baseColor: string, steps: number): string[] => {
	const [r, g, b] = hexToRgb(baseColor);
	const colors = [];

	for (let i = 0; i < steps; i++) {
		const factor = 1 - (i / steps) * 0.5; // Уменьшаем яркость и насыщенность на каждом шаге
		const newR = Math.max(0, Math.round(r * factor));
		const newG = Math.max(0, Math.round(g * factor));
		const newB = Math.max(0, Math.round(b * factor));
		colors.push(rgbToHex(newR, newG, newB));
	}

	return colors;
};

/**
 * convert pixels to rem
 * @param size
 * @returns
 */
const pxToRem = (size: number): string => {
	return `${(size / 16) * 1}rem`;
};

export { pxToRem };

function hexToRgb(hex: string): number[] {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export default (color: string, text: string) => {
    const colorCode = color ? `\x1b[48;2;${hexToRgb(color).join(";")}m` : "";

    console.log(`${colorCode}${text}\x1b[0m`);
};

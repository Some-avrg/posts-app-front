//считаем количество линий в названии поста, чтобы знать размер карточки
const getCountOfLines = (sentence: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if(!context) return -1;
  context.font = `14px sans-serif`;
  const words = sentence.split(" ");
  let lineCount = 0;
  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    const wordWidth = context?.measureText(words[i] + " ").width;
    const lineWidth = context?.measureText(currentLine).width ? context?.measureText(currentLine).width : 0;
    if (!wordWidth) continue;

    if (lineWidth + wordWidth > 450) {
      lineCount++;
      currentLine = words[i] + " ";
    } else {
      currentLine += (words[i] + " ");
    }
  }

  if (currentLine.trim() !== "") {
    lineCount++;
  }
  return lineCount;
}

export {getCountOfLines}
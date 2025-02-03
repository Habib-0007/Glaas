"use strict";
const glassBox = document.getElementById("glass-box");
const cssOutput = document.getElementById("css-output");
const tailwindOutput = document.getElementById("tailwind-output");
const blurInput = document.getElementById("blur");
const opacityInput = document.getElementById("opacity");
const borderRadiusInput = document.getElementById("border-radius");
const bgColorInput = document.getElementById("bg-color");
const copyCssBtn = document.getElementById("copy-css");
const copyTailwindBtn = document.getElementById("copy-tailwind");
function updateGlass() {
  const blur = blurInput.value;
  const opacity = opacityInput.value;
  const borderRadius = borderRadiusInput.value;
  const bgColor = bgColorInput.value;
  const rgbaColor = hexToRGBA(bgColor, parseFloat(opacity));
  glassBox.style.backdropFilter = `blur(${blur}px)`;
  glassBox.style.background = rgbaColor;
  glassBox.style.borderRadius = `${borderRadius}px`;
  generateCSS(blur, opacity, borderRadius, rgbaColor);
  generateTailwind(blur, opacity, borderRadius, bgColor);
}
function generateCSS(blur, opacity, borderRadius, bgColor) {
  const cssCode = `
.glass {
    backdrop-filter: blur(${blur}px);
    background: ${bgColor};
    border-radius: ${borderRadius}px;
}`;
  cssOutput.textContent = cssCode;
}
function generateTailwind(blur, opacity, borderRadius, bgColor) {
  const tailwindCode = `backdrop-blur-[${blur}px] bg-[${bgColor}] bg-opacity-${parseInt(opacity) * 100} rounded-[${borderRadius}px]`;
  tailwindOutput.textContent = tailwindCode;
}
function hexToRGBA(hex, opacity) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
copyCssBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(cssOutput.textContent || "");
  alert("CSS copied!");
});
copyTailwindBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(tailwindOutput.textContent || "");
  alert("Tailwind copied!");
});
blurInput.addEventListener("input", updateGlass);
opacityInput.addEventListener("input", updateGlass);
borderRadiusInput.addEventListener("input", updateGlass);
bgColorInput.addEventListener("input", updateGlass);
updateGlass();

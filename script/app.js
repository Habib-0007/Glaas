var glassBox = document.getElementById("glass-box");
var cssOutput = document.getElementById("css-output");
var tailwindOutput = document.getElementById("tailwind-output");
var blurInput = document.getElementById("blur");
var opacityInput = document.getElementById("opacity");
var borderRadiusInput = document.getElementById("border-radius");
var bgColorInput = document.getElementById("bg-color");
var copyCssBtn = document.getElementById("copy-css");
var copyTailwindBtn = document.getElementById("copy-tailwind");
function updateGlass() {
  var blur = blurInput.value;
  var opacity = opacityInput.value;
  var borderRadius = borderRadiusInput.value;
  var bgColor = bgColorInput.value;
  var rgbaColor = hexToRGBA(bgColor, parseFloat(opacity));
  glassBox.style.backdropFilter = "blur(".concat(blur, "px)");
  glassBox.style.background = rgbaColor;
  glassBox.style.borderRadius = "".concat(borderRadius, "px");
  generateCSS(blur, opacity, borderRadius, rgbaColor);
  generateTailwind(blur, opacity, borderRadius, bgColor);
}
function generateCSS(blur, opacity, borderRadius, bgColor) {
  var cssCode = "\n.glass {\n    backdrop-filter: blur("
    .concat(blur, "px);\n    background: ")
    .concat(bgColor, ";\n    border-radius: ")
    .concat(borderRadius, "px;\n}");
  cssOutput.textContent = cssCode;
}
function generateTailwind(blur, opacity, borderRadius, bgColor) {
  var tailwindCode = "backdrop-blur-["
    .concat(blur, "px] bg-[")
    .concat(bgColor, "] bg-opacity-")
    .concat(parseInt(opacity) * 100, " rounded-[")
    .concat(borderRadius, "px]");
  tailwindOutput.textContent = tailwindCode;
}
function hexToRGBA(hex, opacity) {
  var r = parseInt(hex.substring(1, 3), 16);
  var g = parseInt(hex.substring(3, 5), 16);
  var b = parseInt(hex.substring(5, 7), 16);
  return "rgba("
    .concat(r, ", ")
    .concat(g, ", ")
    .concat(b, ", ")
    .concat(opacity, ")");
}
copyCssBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(cssOutput.textContent || "");
  alert("CSS copied!");
});
copyTailwindBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(tailwindOutput.textContent || "");
  alert("Tailwind copied!");
});
blurInput.addEventListener("input", updateGlass);
opacityInput.addEventListener("input", updateGlass);
borderRadiusInput.addEventListener("input", updateGlass);
bgColorInput.addEventListener("input", updateGlass);
updateGlass();

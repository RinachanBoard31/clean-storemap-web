export const changeVideoBoxShadowColor = () => {
  const video = document.getElementsByTagName("video")[0] as HTMLElement;
  if (video === undefined) {
    return;
  }
  const boxShadow = window.getComputedStyle(video, "").boxShadow;
  // 正規表現でRGB値を取得
  const rgbaMatch = boxShadow.match(/rgba\(([^)]+)\)/);
  if (rgbaMatch === null || rgbaMatch.length < 1) {
    return;
  }
  let [r, g, b, a] = rgbaMatch[1]
    .split(",")
    .map((value) => value.trim())
    .map((x) => {
      return parseFloat(x);
    });
  // 青 -> 緑 -> 赤と変化させる
  const step = 1;
  if (b > 0 && g < 200 && r === 0) {
    b -= step;
    g += step;
  }
  // 緑 -> 赤
  else if (g > 0 && r < 200 && b === 0) {
    g -= step;
    r += step;
  }
  // 赤 -> 青
  else if (r > 0 && b < 200 && g === 0) {
    r -= step;
    b += step;
  }

  video.style.boxShadow = `0px 5px 18px 11px rgba(${r}, ${g}, ${b}, ${a})`;
};

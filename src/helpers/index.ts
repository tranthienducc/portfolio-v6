import * as THREE from "three";

export const rgbaToVec4 = (rgba: string) => {
  const match = rgba.match(/rgba?\(([^]+)\)/);
  if (!match) return [1, 1, 1, 1];
  return match[1]
    .split(",")
    .map((v, i) =>
      i < 3 ? parseFloat(v.trim()) / 255 : parseFloat(v.trim() || "1")
    );
};

export const createTextTexture = (
  title: string,
  year: { toString: () => string }
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2D context from canvas.");
  }
  const config = {
    cellSize: 0.75,
    zoomLevel: 1.25,
    lerpFactor: 0.075,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(0, 0, 0, 1)",
    textColor: "rgba(128, 128, 128, 1)",
    hoverColor: "rgba(255, 255, 255, 0)",
  };

  ctx.clearRect(0, 0, 2048, 256);
  ctx.font = "80px";
  ctx.fillStyle = config.textColor;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingEnabled = false;

  ctx.textAlign = "left";
  ctx.fillText(title.toUpperCase(), 30, 128);
  ctx.textAlign = "right";
  ctx.fillText(year.toString().toUpperCase(), 2048 - 30, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.flipY = false;
  texture.generateMipmaps = false;
  texture.format = THREE.RGBAFormat;

  return texture;
};

export const createTextureAtlas = (
  textures: THREE.Texture[],
  isText = false
) => {
  const atlasSize = Math.ceil(Math.sqrt(textures.length));
  const textureSize = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = atlasSize * textureSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2D context from canvas.");
  }
  if (isText) ctx.clearRect(0, 0, canvas.width, canvas.height);
  else {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  textures.forEach((texture, index) => {
    const x = (index % atlasSize) * textureSize;
    const y = Math.floor(index / atlasSize) * textureSize;
    if (isText && texture.image) ctx.drawImage(texture.image, x, y);
    else if (!isText && texture.image?.complete)
      ctx.drawImage(texture.image, x, y);
  });

  const atlasTexture = new THREE.CanvasTexture(canvas);
  atlasTexture.wrapS = atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
  atlasTexture.minFilter = atlasTexture.magFilter = THREE.LinearFilter;
  atlasTexture.flipY = false;

  return atlasTexture;
};

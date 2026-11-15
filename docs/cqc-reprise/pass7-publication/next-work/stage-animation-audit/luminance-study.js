/* Isolated study only. Does not modify source PNGs, stage metadata or production. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CQC_STAGE_LUMINANCE_STUDY = api;
})(typeof globalThis === 'object' ? globalThis : this, function (root) {
  'use strict';
  const finite = Number.isFinite;
  function selected(r, g, b, a, color) {
    if (a < 128) return false;
    if (color === 'red') return r >= g + 25 && r >= b + 20;
    if (color === 'cyan') return g >= r + 18 && b >= r + 18;
    if (color === 'ochre') return r >= g + 6 && g >= b + 18;
    return false;
  }
  function dimming(config, index, time) {
    const period = config.authoredPeriodSeconds[index];
    if (!finite(time) || !finite(period) || period <= 0) return 0;
    const maximum = Math.min(.03, Math.max(0, config.maximumDimmingFraction || 0));
    return maximum * (.5 - .5 * Math.cos(2 * Math.PI * time / period));
  }
  function nativeToWorld(config, region) {
    const rect = config.worldRect;
    return { x: rect.x + region.x * rect.width / config.nativeWidth,
      y: rect.y + region.y * rect.height / config.nativeHeight,
      width: region.width * rect.width / config.nativeWidth,
      height: region.height * rect.height / config.nativeHeight };
  }
  function createMasks(image, config, canvasFactory) {
    if ((image.naturalWidth || image.width) !== config.nativeWidth ||
        (image.naturalHeight || image.height) !== config.nativeHeight)
      throw new Error('Native dimensions must match the frozen architecture PNG.');
    const makeCanvas = canvasFactory || (() => root.document.createElement('canvas'));
    return config.sourcePixelRegions.map(region => {
      const canvas = makeCanvas(); canvas.width = region.width; canvas.height = region.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      // Read a copy in memory. No PNG file is rewritten or transformed on disk.
      ctx.drawImage(image, region.x, region.y, region.width, region.height,
                    0, 0, region.width, region.height);
      const pixels = ctx.getImageData(0, 0, region.width, region.height);
      let selectedPixels = 0;
      for (let i = 0; i < pixels.data.length; i += 4) {
        const p = pixels.data;
        const chosen = selected(p[i], p[i+1], p[i+2], p[i+3], config.maskColor);
        p[i] = p[i+1] = p[i+2] = 0;
        if (!chosen) p[i+3] = 0;
        else selectedPixels++;
      }
      ctx.putImageData(pixels, 0, 0);
      return { canvas, region, world: nativeToWorld(config, region), selectedPixels };
    });
  }
  function paint(ctx, config, masks, layerTransform, options = {}) {
    const reduced = options.reducedMotion === undefined ?
      Boolean(root.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) : options.reducedMotion;
    if (!options.enabled || options.animate === false || options.motion === false || reduced) return 0;
    const transform = layerTransform({ parallax: config.parallax }, options);
    let painted = 0;
    for (let index = 0; index < masks.length; index++) {
      const strength = dimming(config, index, options.time);
      if (!strength) continue;
      const { canvas, world } = masks[index];
      ctx.save();
      ctx.translate(transform.x, transform.y); ctx.scale(transform.scale, transform.scale);
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = strength;
      ctx.drawImage(canvas, world.x, world.y, world.width, world.height);
      ctx.restore(); painted++;
    }
    return painted;
  }
  return Object.freeze({ selected, dimming, nativeToWorld, createMasks, paint });
});

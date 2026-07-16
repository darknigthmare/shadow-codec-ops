"""Build the MGS1 VR environment pack from the OpenAI-authored source atlases.

The source boards deliberately use a solid magenta background so every prop can
be extracted with binary alpha. Runtime assets are resized to their exact Phaser
dimensions and keep a deliberately small PS1-style colour palette.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "art_sources" / "mgs1-vr"
OUTPUT = ROOT / "public" / "vr" / "mgs1" / "environment"


@dataclass(frozen=True)
class SpriteSpec:
    source: str
    columns: int
    rows: int
    index: int
    output: str
    size: tuple[int, int]


SPRITES = (
    # Canon VR target family: CUBE-B/R, KOKESHI-B/G, MOVE-B/R, WALL and UFO.
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 0, "targets/cube-b.png", (32, 32)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 1, "targets/cube-r.png", (32, 32)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 2, "targets/kokeshi-b.png", (24, 36)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 3, "targets/kokeshi-g.png", (24, 36)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 4, "targets/move-b.png", (32, 40)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 5, "targets/move-r.png", (32, 40)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 6, "targets/wall.png", (40, 32)),
    SpriteSpec("vr-targets-openai-atlas.png", 4, 2, 7, "targets/ufo.png", (48, 28)),
    # Shared modular gameplay/decor props.
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 0, "props/platform-tile.png", (64, 16)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 1, "props/checkpoint-frame.png", (42, 68)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 2, "props/camera-node.png", (30, 20)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 3, "props/secret-node.png", (16, 16)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 4, "props/route-marker.png", (28, 56)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 5, "props/wall-block.png", (64, 64)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 6, "props/data-crate.png", (40, 40)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 7, "props/boundary-pillar.png", (24, 92)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 8, "props/target-pedestal.png", (48, 16)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 9, "props/hazard-strip.png", (64, 8)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 10, "props/glass-cover.png", (64, 64)),
    SpriteSpec("vr-modular-props-openai-atlas.png", 4, 3, 11, "props/laser-beacon.png", (24, 48)),
    # Canon stage construction vocabulary, adapted to the side-view runtime.
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 0, "structures/raised-platform.png", (96, 64)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 1, "structures/low-wall.png", (96, 32)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 2, "structures/stairs.png", (96, 48)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 3, "structures/ramp.png", (96, 48)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 4, "structures/bridge.png", (128, 32)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 5, "structures/air-duct.png", (96, 48)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 6, "structures/suspended-slab.png", (96, 16)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 7, "structures/pit-edge.png", (128, 48)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 8, "structures/glass-panel.png", (64, 64)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 9, "structures/glass-broken.png", (64, 64)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 10, "structures/wall-cracked.png", (64, 48)),
    SpriteSpec("vr-structures-openai-atlas.png", 4, 3, 11, "structures/wall-rubble.png", (64, 32)),
    # Objectives, surveillance and hazards.
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 0, "hazards/goal-beacon.png", (32, 64)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 1, "hazards/gun-camera.png", (30, 20)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 2, "hazards/spotlight.png", (32, 24)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 3, "hazards/laser-emitter.png", (24, 56)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 4, "hazards/laser-beam.png", (64, 8)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 5, "hazards/claymore.png", (24, 18)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 6, "hazards/ammo-package.png", (28, 20)),
    SpriteSpec("vr-objectives-hazards-openai-atlas.png", 4, 2, 7, "hazards/mystery-package.png", (24, 28)),
)


SURFACES = (
    (0, "tiles/grid-cyan.png", (128, 128)),
    (1, "tiles/grid-green.png", (128, 128)),
    (2, "tiles/grid-amber.png", (128, 128)),
    (3, "tiles/matrix-void.png", (256, 256)),
    (4, "tiles/water.png", (128, 64)),
    (5, "tiles/lava.png", (128, 64)),
    (6, "tiles/hazard-red.png", (128, 128)),
    (7, "tiles/glass-data.png", (128, 128)),
)

STRETCH_TO_CANVAS = {
    "props/platform-tile.png",
    "props/target-pedestal.png",
    "props/hazard-strip.png",
    "structures/suspended-slab.png",
    "hazards/laser-beam.png",
}

_GRID_BOUNDS_CACHE: dict[tuple[str, int, int], tuple[list[int], list[int]]] = {}


def is_magenta_chroma(red: int, green: int, blue: int) -> bool:
    """Accept the small pink variations introduced around the generated key."""
    return red > 160 and blue > 140 and green < 160 and red + blue > green * 2.4


def is_hot_magenta_key(red: int, green: int, blue: int) -> bool:
    """Catch leaked chroma-key pixels without rejecting normal red/orange VFX."""
    return red > 220 and blue > 220 and green < 40


def count_hot_magenta_pixels(image: Image.Image) -> int:
    rgba = image.convert("RGBA")
    channels = [channel.tobytes() for channel in rgba.split()]
    return sum(1 for red, green, blue, alpha in zip(*channels) if alpha > 0 and is_hot_magenta_key(red, green, blue))


def detect_grid_bounds(image: Image.Image, cell_count: int, vertical: bool) -> list[int]:
    """Find the bright atlas separators; fall back to equal cells for swatch boards."""
    if cell_count <= 1:
        return [0, image.width if vertical else image.height]
    rgb = image.convert("RGB")
    pixels = rgb.load()
    span = image.width if vertical else image.height
    cross_span = image.height if vertical else image.width
    candidates: list[int] = []
    for coordinate in range(span):
        bright = 0
        for cross in range(cross_span):
            red, green, blue = pixels[coordinate, cross] if vertical else pixels[cross, coordinate]
            if red > 150 and green > 180 and blue > 150:
                bright += 1
        if bright > cross_span * 0.7:
            candidates.append(coordinate)

    clusters: list[list[int]] = []
    for coordinate in candidates:
        if not clusters or coordinate > clusters[-1][-1] + 1:
            clusters.append([coordinate])
        else:
            clusters[-1].append(coordinate)
    dividers = [round(sum(cluster) / len(cluster)) for cluster in clusters]
    if len(dividers) != cell_count - 1:
        dividers = [round(index * span / cell_count) for index in range(1, cell_count)]
    return [0, *dividers, span]


def grid_cell(image: Image.Image, atlas_key: str, columns: int, rows: int, index: int, inset: int = 5) -> Image.Image:
    column = index % columns
    row = index // columns
    cache_key = (atlas_key, columns, rows)
    if cache_key not in _GRID_BOUNDS_CACHE:
        _GRID_BOUNDS_CACHE[cache_key] = (
            detect_grid_bounds(image, columns, vertical=True),
            detect_grid_bounds(image, rows, vertical=False),
        )
    x_bounds, y_bounds = _GRID_BOUNDS_CACHE[cache_key]
    left = x_bounds[column] + inset
    top = y_bounds[row] + inset
    right = x_bounds[column + 1] - inset
    bottom = y_bounds[row + 1] - inset
    return image.crop((left, top, right, bottom))


def chroma_to_alpha(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    channels = [channel.tobytes() for channel in rgba.split()]
    keyed = [
        (0, 0, 0, 0) if is_magenta_chroma(red, green, blue) else (red, green, blue, alpha)
        for red, green, blue, alpha in zip(*channels)
    ]
    result = Image.new("RGBA", rgba.size)
    result.putdata(keyed)
    return result


def trim_alpha(image: Image.Image) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("Source cell became fully transparent")
    return image.crop(bbox)


def quantize_rgba(image: Image.Image, colours: int = 32) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A").point(lambda value: 255 if value >= 96 else 0)
    opaque_rgb = Image.new("RGB", rgba.size, (0, 0, 0))
    opaque_rgb.paste(rgba.convert("RGB"), mask=alpha)
    quantized = opaque_rgb.quantize(colors=colours, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert("RGB")
    result = quantized.convert("RGBA")
    result.putalpha(alpha)
    return result


def fit_sprite(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_width, target_height = size
    padding = 1 if min(size) <= 20 else 2
    usable_width = max(1, target_width - padding * 2)
    usable_height = max(1, target_height - padding * 2)
    scale = min(usable_width / image.width, usable_height / image.height)
    resized_size = (max(1, round(image.width * scale)), max(1, round(image.height * scale)))
    resized = image.resize(resized_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    x = (target_width - resized.width) // 2
    y = (target_height - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return quantize_rgba(canvas)


def find_surface_swatch(cell: Image.Image) -> Image.Image:
    rgb = cell.convert("RGB")
    channels = [channel.tobytes() for channel in rgb.split()]
    column_counts = [0] * rgb.width
    row_counts = [0] * rgb.height
    for offset, (red, green, blue) in enumerate(zip(*channels)):
        if is_magenta_chroma(red, green, blue):
            continue
        x = offset % rgb.width
        y = offset // rgb.width
        column_counts[x] += 1
        row_counts[y] += 1
    active_columns = [x for x, count in enumerate(column_counts) if count > rgb.height * 0.5]
    active_rows = [y for y, count in enumerate(row_counts) if count > rgb.width * 0.5]
    if not active_columns or not active_rows:
        raise RuntimeError("No surface swatch found")
    left, right = min(active_columns), max(active_columns) + 1
    top, bottom = min(active_rows), max(active_rows) + 1
    # Discard the antialiased magenta fringe that surrounds each generated swatch.
    fringe = 4
    if right - left > fringe * 2 and bottom - top > fringe * 2:
        left += fringe
        top += fringe
        right -= fringe
        bottom -= fringe
    return cell.crop((left, top, right, bottom))


def make_seamless(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    edge = 2
    for y in range(height):
        for offset in range(edge):
            left = pixels[offset, y]
            right_index = width - 1 - offset
            right = pixels[right_index, y]
            average = tuple((left[channel] + right[channel]) // 2 for channel in range(3)) + (255,)
            pixels[offset, y] = average
            pixels[right_index, y] = average
    for x in range(width):
        for offset in range(edge):
            top = pixels[x, offset]
            bottom_index = height - 1 - offset
            bottom = pixels[x, bottom_index]
            average = tuple((top[channel] + bottom[channel]) // 2 for channel in range(3)) + (255,)
            pixels[x, offset] = average
            pixels[x, bottom_index] = average
    return rgba


def save(image: Image.Image, relative_path: str) -> None:
    destination = OUTPUT / relative_path
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "PNG", optimize=True)


def build_sprites() -> None:
    loaded: dict[str, Image.Image] = {}
    for spec in SPRITES:
        atlas = loaded.setdefault(spec.source, Image.open(SOURCE / spec.source).convert("RGBA"))
        cell = grid_cell(atlas, spec.source, spec.columns, spec.rows, spec.index)
        sprite = trim_alpha(chroma_to_alpha(cell))
        if spec.output in STRETCH_TO_CANVAS:
            runtime = quantize_rgba(sprite.resize(spec.size, Image.Resampling.LANCZOS))
        else:
            runtime = fit_sprite(sprite, spec.size)
        save(runtime, spec.output)


def build_surfaces() -> None:
    atlas_key = "vr-surfaces-openai-atlas.png"
    atlas = Image.open(SOURCE / atlas_key).convert("RGBA")
    for index, relative_path, size in SURFACES:
        cell = grid_cell(atlas, atlas_key, 4, 2, index, inset=8)
        swatch = find_surface_swatch(cell)
        resized = swatch.resize(size, Image.Resampling.LANCZOS)
        opaque = resized.convert("RGB").quantize(colors=64, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert("RGBA")
        save(make_seamless(opaque), relative_path)


def validate_runtime_assets() -> None:
    required_large_bbox = {
        "props/boundary-pillar.png": (0.28, 0.58),
        "props/route-marker.png": (0.25, 0.58),
        "props/data-crate.png": (0.5, 0.5),
        "props/platform-tile.png": (0.9, 0.55),
        "props/hazard-strip.png": (0.9, 0.5),
        "hazards/laser-beam.png": (0.9, 0.45),
    }
    for spec in SPRITES:
        runtime = Image.open(OUTPUT / spec.output).convert("RGBA")
        hot_magenta_pixels = count_hot_magenta_pixels(runtime)
        if hot_magenta_pixels:
            raise RuntimeError(f"Leaked chroma-key pixels in runtime sprite: {spec.output} ({hot_magenta_pixels})")
        bbox = runtime.getchannel("A").getbbox()
        if bbox is None:
            raise RuntimeError(f"Empty runtime sprite: {spec.output}")
        left, top, right, bottom = bbox
        width_ratio = (right - left) / runtime.width
        height_ratio = (bottom - top) / runtime.height
        if max(width_ratio, height_ratio) < 0.45:
            raise RuntimeError(f"Sprite was reduced to a tiny island: {spec.output} ({width_ratio:.2f}, {height_ratio:.2f})")
        minimum = required_large_bbox.get(spec.output)
        if minimum and (width_ratio < minimum[0] or height_ratio < minimum[1]):
            raise RuntimeError(f"Sprite does not fill its gameplay canvas: {spec.output} ({width_ratio:.2f}, {height_ratio:.2f})")
    for _index, relative_path, _size in SURFACES:
        runtime = Image.open(OUTPUT / relative_path).convert("RGBA")
        hot_magenta_pixels = count_hot_magenta_pixels(runtime)
        if hot_magenta_pixels:
            raise RuntimeError(f"Leaked chroma-key pixels in runtime tile: {relative_path} ({hot_magenta_pixels})")


def main() -> None:
    build_sprites()
    build_surfaces()
    validate_runtime_assets()
    count = len(SPRITES) + len(SURFACES)
    print(f"Built {count} MGS1 VR environment assets in {OUTPUT}")


if __name__ == "__main__":
    main()

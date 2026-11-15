#!/usr/bin/env python3
"""Produce a guarded, isolated renderer candidate and three-record catalog overlay.
Never edits the authoring tree or Shadow runtime; raster files are read-only.
"""
import copy
import hashlib
import json
from pathlib import Path

ROOT = Path('/workspace/cqc-game-working/cqc-versus-v056')
OUT = Path(__file__).resolve().parent
AUDIT = Path('/workspace/cqc-next-stage-animation-audit')
TARGETS = ['outer_heaven', 'zanzibar', 'arsenal_corridor']

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def write(name, value):
    path = OUT / name
    if path.exists():
        raise RuntimeError('Refusing to overwrite a prepared artifact: ' + str(path))
    path.write_text(value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, indent=2) + '\n')

def replace_once(text, before, after):
    if text.count(before) != 1:
        raise RuntimeError('Renderer splice is not unique: ' + before[:70])
    return text.replace(before, after, 1)

def prepare():
    catalog = json.loads((ROOT / 'data/stage-layer-catalog-reprise.json').read_text())
    configs = {s['id']: s for s in json.loads((AUDIT / 'PROTOTYPE_CONFIG.json').read_text())['stages']}
    overlay = []
    pinpaths = [ROOT / p for p in ['src/cqc-stage-layers.js', 'src/cqc-stage-layer-data.js', 'data/stage-layer-catalog-reprise.json']]
    views = []
    refs = json.loads((AUDIT / 'references-review/EXISTING_STAGE_REFERENCE_ANIMATION_REVIEW.json').read_text())
    for stage in catalog['stages']:
        if stage['id'] not in TARGETS:
            continue
        cfg = configs[stage['id']]
        architecture = next(l for l in stage['layers'] if l['id'] == 'architecture')
        assert architecture['sha256'] == cfg['anchorSha256']
        assert architecture['file'] == cfg['anchorFile']
        assert architecture['rect'] == cfg['worldRect']
        assert [architecture['width'], architecture['height']] == [cfg['nativeWidth'], cfg['nativeHeight']]
        notes = stage['review']['notes']
        if stage['id'] == 'arsenal_corridor':
            assert notes.startswith('Capture originale PS2 réellement examinée')
            notes = notes.replace('Capture originale PS2 réellement examinée', 'Capture originale Substance PC2003 réellement examinée', 1)
        new = copy.deepcopy(stage)
        notes += (' Préparation PASS9 : aucune modulation de luminance n’est activée ; '
                  'la fonction lumineuse des marques ocre reste inconnue. Aucun PNG ni placement n’est modifié.'
                  if stage['id'] == 'zanzibar' else
                  ' Préparation PASS9 : le rythme de luminance local est une adaptation d’auteur, '
                  'sans cadence canonique établie par les captures fixes. Aucun PNG ni placement n’est modifié.')
        new['review']['notes'] = notes
        if stage['id'] == 'zanzibar':
            new['review']['localLuminanceDecision'] = {
                'policy': 'static', 'enabled': False, 'sourceCanonicalTiming': False,
                'reason': 'Fonction lumineuse des marques ocre inconnue ; aucune modulation active.',
                'reviewOnlyNativeRegions': cfg['sourcePixelRegions']}
        else:
            next(l for l in new['layers'] if l['id'] == 'architecture')['localLuminance'] = {
                'enabled': True, 'anchorSha256': architecture['sha256'],
                'maskColor': cfg['maskColor'], 'maximumDimmingFraction': cfg['maximumDimmingFraction'],
                'authoredPeriodSeconds': cfg['authoredPeriodSeconds'],
                'sourcePixelRegions': cfg['sourcePixelRegions'], 'sourceCanonicalTiming': False,
                'sourceStatus': 'fixed_capture_temporal_reference_not_established',
                'operation': 'source_color_selected_local_composite_dimming',
                'maskResampling': 'nearest_neighbor',
                'qualification': 'Authored cycle; selected original alpha bounds composite darkening. Original PNG untouched.'}
        overlay.append({'id': stage['id'], 'beforeStageSha256': hashlib.sha256(json.dumps(stage,ensure_ascii=False,separators=(',',':')).encode()).hexdigest(),
                        'afterStage': new})
        pinpaths += [ROOT / l['file'] for l in stage['layers']]
        refstage = next(s for s in refs['stageReviews'] if s['id'] == stage['id'])
        for item in refstage['references']:
            pinpaths.append(Path(item['path']))
            views.append({'path': item['path'], 'sha256': item['sha256'], 'role': 'original_capture', 'physicallyViewed': True})
        for l in stage['layers']:
            views.append({'path': str(ROOT / l['file']), 'sha256': l['sha256'], 'role': l['id'] + '_native_plane', 'physicallyViewed': True})

    text = (ROOT / 'src/cqc-stage-layers.js').read_text()
    text = replace_once(text, '      if (layer.motion) {', '''      if (layer.localLuminance) {
        const glow = layer.localLuminance;
        const cap = stage.id === 'outer_heaven' ? .02 : stage.id === 'arsenal_corridor' ? .03 : 0;
        const color = stage.id === 'outer_heaven' ? 'red' : 'cyan';
        if (!cap || layer.id !== 'architecture' || layer.role !== 'architecture' || layer.ambient ||
            layer.motion || layer.phase !== 'background' || glow.enabled !== true ||
            glow.maskColor !== color || glow.anchorSha256 !== layer.sha256 || glow.sourceCanonicalTiming !== false ||
            glow.operation !== 'source_color_selected_local_composite_dimming' || glow.maskResampling !== 'nearest_neighbor')
          errors.push('Local luminance requires its reviewed, frozen architecture anchor.');
        if (!finite(glow.maximumDimmingFraction) || glow.maximumDimmingFraction <= 0 || glow.maximumDimmingFraction > cap)
          errors.push('Local luminance exceeds its stage-specific dimming limit.');
        const regions = glow.sourcePixelRegions;
        if (!Array.isArray(regions) || regions.length !== 4 || !Array.isArray(glow.authoredPeriodSeconds) ||
            glow.authoredPeriodSeconds.length !== 4 || glow.authoredPeriodSeconds.some(period => !finite(period) || period < 4 || period > 12))
          errors.push('Four bounded local regions and authored periods are required.');
        if (Array.isArray(regions) && regions.some(region => !region ||
            ![region.x, region.y, region.width, region.height].every(Number.isInteger) ||
            region.x < 0 || region.y < 0 || region.width < 1 || region.height < 1 ||
            region.width * region.height > 1024 || region.x + region.width > layer.width || region.y + region.height > layer.height))
          errors.push('Local luminance region must fit the native PNG.');
        if (Array.isArray(regions) && regions.some((a, i) => a && regions.slice(i+1).some(b => b &&
            a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height)))
          errors.push('Local luminance regions must not overlap or compound dimming.');
      }
      if (layer.motion) {''')
    text = replace_once(text, '      animate: options.motion !== false && !reducedMotion', '''      animate: options.motion !== false && options.animate !== false && !reducedMotion,
      allowAmbientLuminance: options.allowAmbientLuminance !== false && options.ambient !== false''')
    text = replace_once(text, "time: finite(options.time) && options.motion !== false && !reducedMotion ? options.time : 0,", "time: finite(options.time) && options.motion !== false && options.animate !== false && !reducedMotion ? options.time : 0,")
    text = replace_once(text, '    const ImageClass = dependencies.Image || root.Image;', '''    const ImageClass = dependencies.Image || root.Image;
    const createCanvas = dependencies.createCanvas || (() => root.document.createElement('canvas'));''')
    text = replace_once(text, '      for (const {image} of record.images) {', '''      for (const item of record.images) {
        const {image} = item;
        for (const mask of item.luminanceMasks || []) { mask.canvas.width = 0; mask.canvas.height = 0; }
        item.luminanceMasks = null; item.luminanceFailed = false;''')
    text = replace_once(text, '    function paint(ctx, record, phase, options) {\n      for (const { layer, image } of record.images) {', '''    function selectedColor(r, g, b, alpha, color) {
      if (alpha < 128) return false;
      return color === 'red' ? r >= g + 25 && r >= b + 20 :
        color === 'cyan' ? g >= r + 18 && b >= r + 18 : false;
    }
    function makeLuminanceMasks(item) {
      const {layer, image} = item, glow = layer.localLuminance;
      const created = [];
      try {
        for (const region of glow.sourcePixelRegions) {
          const canvas = createCanvas(); created.push({canvas});
          canvas.width = region.width; canvas.height = region.height;
          const context = canvas.getContext('2d', {willReadFrequently: true});
          context.drawImage(image, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);
          const pixels = context.getImageData(0, 0, region.width, region.height);
          for (let i = 0; i < pixels.data.length; i += 4) {
            const p = pixels.data;
            const selected = selectedColor(p[i], p[i+1], p[i+2], p[i+3], glow.maskColor);
            p[i] = p[i+1] = p[i+2] = 0;
            if (!selected) p[i+3] = 0;
          }
          context.putImageData(pixels, 0, 0);
          Object.assign(created[created.length-1], {region, world: {
            x: layer.rect.x + region.x * layer.rect.width / layer.width,
            y: layer.rect.y + region.y * layer.rect.height / layer.height,
            width: region.width * layer.rect.width / layer.width,
            height: region.height * layer.rect.height / layer.height}});
        }
      } catch (error) {
        for (const mask of created) { mask.canvas.width = 0; mask.canvas.height = 0; }
        throw error;
      }
      return created;
    }
    function paintLocalLuminance(ctx, record, item, options) {
      const glow = item.layer.localLuminance;
      if (!glow?.enabled || !options.animate || !options.allowAmbientLuminance || item.luminanceFailed) return;
      // Masks are allocated lazily. A cold render with motion disabled allocates none.
      if (!item.luminanceMasks) {
        try { item.luminanceMasks = makeLuminanceMasks(item); }
        catch (_) { item.luminanceFailed = true; record.errors.push('Local luminance masks unavailable: ' + item.layer.file); return; }
      }
      for (let index = 0; index < item.luminanceMasks.length; index++) {
        const strength = glow.maximumDimmingFraction * (.5 - .5 * Math.cos(2 * Math.PI * options.time / glow.authoredPeriodSeconds[index]));
        if (!strength) continue;
        const mask = item.luminanceMasks[index], world = mask.world;
        ctx.save();
        ctx.globalAlpha *= strength; ctx.globalCompositeOperation = 'source-over';
        ctx.imageSmoothingEnabled = false;
        // Same architecture transform, no position or shape animation; no halo is added.
        ctx.drawImage(mask.canvas, world.x, world.y, world.width, world.height);
        ctx.restore();
      }
    }
    function paint(ctx, record, phase, options) {
      for (const item of record.images) {
        const {layer, image} = item;''')
    text = replace_once(text, '        ctx.drawImage(image, layer.rect.x + dx, layer.rect.y + dy, layer.rect.width, layer.rect.height);\n        ctx.restore();', '''        ctx.drawImage(image, layer.rect.x + dx, layer.rect.y + dy, layer.rect.width, layer.rect.height);
        paintLocalLuminance(ctx, record, item, options);
        ctx.restore();''')
    text = replace_once(text, '      if (options.time !== marker.options.time || options.camera !== marker.options.camera || options.zoom !== marker.options.zoom)', '''      if (options.time !== marker.options.time || options.camera !== marker.options.camera || options.zoom !== marker.options.zoom ||
          options.animate !== marker.options.animate || options.allowAmbientLuminance !== marker.options.allowAmbientLuminance)''')
    text = replace_once(text, "          decodedBytesMethod:'Retained PNG width × height × 4 estimate; browser allocations may differ.'", '''          luminanceMaskCanvases: readyRecords.reduce((sum, record) => sum + record.images.reduce((n, item) => n + (item.luminanceMasks?.length || 0), 0), 0),
          luminanceMaskBytes: readyRecords.reduce((sum, record) => sum + record.images.reduce((n, item) => n + (item.luminanceMasks || []).reduce((size, mask) => size + mask.canvas.width * mask.canvas.height * 4, 0), 0), 0),
          decodedBytesMethod:'Retained PNG width × height × 4 estimate; browser allocations may differ.' ''')
    write('cqc-stage-layers.candidate.js', text)
    write('THREE_STAGE_OVERLAY.json', {'schema':'cqc.pass9.stage-local-luminance-overlay/1','productionMutated':False,'rows':overlay})
    write('SOURCE_PINS.json', {'schema':'cqc.pass9.stage-source-pins/1','files':[{'path':str(p),'bytes':p.stat().st_size,'sha256':sha(p)} for p in dict.fromkeys(pinpaths)], 'authoritativeSourceTree':str(ROOT)})
    write('PHYSICAL_REVIEW.json', {'schema':'cqc.pass9.stage-physical-review/1','images':views,'physicallyViewedCount':len(views),'originalImagesEdited':False,
            'observations':['Outer Heaven red centers remain at four side boxes; center zoom1 crops them out, never relocate.',
                            'Zanzibar retains eight generated wall groups versus four original ones, existing perspective adaptation; ochre luminous function unproved, strict static choice.',
                            'Arsenal screenshot visible cyan fixtures; provenance PC2003 Substance, PS2 temporal or texture fidelity unproved.',
                            'Native sky, ground, architecture and foreground for each target physically viewed; no PNG changed.']})
    print(json.dumps({'status':'isolated_candidates_created','overlayRows':len(overlay),'pinnedFiles':len(dict.fromkeys(pinpaths)),'rOrShadowMutation':False}))

if __name__ == '__main__':
    prepare()

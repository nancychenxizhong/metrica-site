/* Metrica Design 3 — original scenes, adapted to standalone browser JavaScript. */
(() => {
"use strict";
// Original scene geometry. Shared by the canvas animation and generated still.
const SIZE = 600;
const WIDE_SIZE = 960;
// A single navy hue family, led by the Metrica wordmark/text colour.
const ink = ['#093171', '#31568d', '#6080ad', '#91a9ca', '#c2d0e4'];
const path = (d, tone = 1, opacity = 1) => `<path d="${d}" fill="${ink[tone]}" opacity="${opacity}"/>`;
const line = (d, width = 8, tone = 2, opacity = 1) => `<path d="${d}" fill="none" stroke="${ink[tone]}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
const oval = (x, y, rx, ry, tone = 1) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${ink[tone]}"/>`;
const group = (content, x, y, scale = 1, opacity = 1, rotation = 0) => `<g transform="translate(${x} ${y}) scale(${scale}) rotate(${rotation})" opacity="${opacity}">${content}</g>`;
// Profile, hair, neck and shirt collar provide more character than icon silhouettes.
function head(turn = 1) {
    return `<g transform="scale(${turn} 1)">` +
        path('M-11 45 L-12 65 Q1 76 17 64 L12 40Z', 2) +
        path('M-23 5 Q-18 -13 3 -13 Q27 -9 29 10 L29 21 L37 30 L28 34 Q30 52 14 57 Q-6 57 -17 39 Q-27 25 -23 5Z', 2) +
        path('M-24 25 Q-37 10 -28 -8 Q-18 -26 5 -22 Q33 -23 32 9 Q14 -4 -1 7 L-8 25 L-12 40 L-22 37Z', 0) +
        path('M10 9 Q25 8 26 21 L33 30 L23 32 Q26 47 13 49 L8 40Z', 3) +
        oval(-8, 27, 5, 8, 1) + oval(23, 20, 2.8, 2.8, 0) + '</g>';
}
function seated(x, y, scale = 1, primary = false, phase = 0, facing = 1) {
    const sleeve = primary ? 1 : 2;
    const body = line('M-39 123 L-38 202 L18 210', 12, 3) +
        line('M-39 196 L-51 269 M15 204 L27 270', 7, 3) +
        path('M-17 63 Q-46 68 -43 109 L-35 165 Q-3 185 35 169 L28 109 Q20 77 7 66Z', sleeve) +
        path('M-21 73 Q-34 107 -24 157 L-8 164 L-2 77Z', primary ? 0 : 1, .7) +
        path('M-33 161 Q-14 179 29 164 Q65 172 74 193 L48 218 L22 203 L-15 199 Q-39 190 -33 161Z', 1) +
        line('M61 207 L50 263 L72 267', 20, primary ? 0 : 1) +
        line('M-6 195 L-9 257 L12 266', 18, 1) +
        group(head(facing), phase * 1.8, 0, 1, 1, 6 + phase * 1.5) +
        line(`M14 82 Q36 99 42 132 L${82 + phase * 3} ${139 + phase}`, 20, sleeve) +
        line(`M${80 + phase * 3} ${139 + phase} L${103 + phase * 3} ${135 + phase}`, 11, 2) +
        line('M-25 95 Q-18 131 10 139 L61 142', 18, sleeve) + oval(69, 142, 13, 6, 2);
    return group(body, x, y, scale, primary ? 1 : .66);
}
function standing(x, y, scale = 1, pose = 'guide', phase = 0) {
    const arm = pose === 'guide'
        ? line(`M-27 82 Q-57 103 -68 140 L${-112 + phase * 3} ${157 + phase * 2}`, 19, 1) + oval(-118 + phase * 3, 159 + phase * 2, 12, 7, 2)
        : pose === 'walk'
            ? line(`M-28 83 Q-43 130 ${-23 + phase * 4} 172`, 19, 1) + oval(-23 + phase * 4, 180, 7, 12, 2)
            : line(`M-28 83 Q-48 109 -74 111 L${-90 + phase * 2} ${77 - phase * 3}`, 19, 1) + oval(-92 + phase * 2, 67 - phase * 3, 7, 13, 2);
    return group(path('M-35 189 L-28 272 L-32 332 L-8 337 L5 266 L12 199Z', 0) +
        path('M5 191 L15 269 L32 329 L55 328 L41 256 L37 185Z', 1) +
        path('M-33 327 Q-47 334 -47 342 L-8 345 L-7 330Z', 0) +
        path('M30 323 L54 323 Q68 332 67 339 L31 339Z', 0) +
        path('M-17 61 Q-45 65 -44 97 L-37 155 L-42 198 Q0 211 42 193 L32 117 Q39 75 13 61Z', 1) +
        path('M-15 71 L-19 133 L-7 196 L10 197 L12 74Z', 2, .65) +
        path('M-13 63 L0 86 L15 63 L13 59 L-9 59Z', 4) +
        group(head(-1), phase * 1.2, 0, 1, 1, pose === 'guide' ? -8 + phase : -2 + phase) + arm +
        line('M25 85 Q42 112 39 150 L29 184', 19, 1) + oval(27, 193, 7, 12, 2), x, y, scale, 1, pose === 'guide' ? -5 : phase * .3);
}
function desk(x, y, width, opacity = .6) {
    return group(path(`M0 0 L${width - 17} 0 L${width} 17 L12 20Z`, 2) +
        line(`M18 22 L9 134 M${width - 17} 20 L${width - 8} 134`, 8, 2) +
        line(`M20 29 L${width - 18} 28`, 6, 3), x, y, 1, opacity);
}
const paper = (x, y, rotation = 0) => group(path('M0 0 L51 -4 L67 18 L12 24Z', 3) + line('M8 3 L47 0', 2, 4), x, y, 1, .9, rotation);
// Mirroring the whole pose (not just the head) lets students genuinely face
// one another. The darker teacher remains the focal point in every scene.
function learner(x, y, scale, phase, left = false, opacity = .9) {
    const body = seated(0, 0, scale, false, phase);
    return group(left ? `<g transform="scale(-1 1)">${body}</g>` : body, x, y, 1, opacity);
}
function books(x, y, opacity = .5) {
    return group(line('M0 0 L42 0 M4 -6 L38 -6 M2 -12 L35 -12', 4, 2) + line('M6 -5 L35 -5', 2, 4), x, y, 1, opacity);
}
function windowLight(x, y, width = 130) {
    return group(line(`M0 116 L0 0 L${width} 0 L${width} 104 M${width / 2} 4 L${width / 2} 112 M4 54 L${width - 4} 54`, 4, 3), x, y, 1, .27);
}
function shelf(x, y) {
    return group(line('M0 0 L104 0 M0 59 L104 59 M5 3 L5 115 M99 3 L99 115 M0 116 L104 116', 5, 3) +
        line('M16 -3 L16 -30 M26 -3 L26 -36 M38 -3 L45 -31 M64 -3 L64 -24', 7, 2, .7) +
        books(17, 53, .8) + books(48, 110, .65), x, y, 1, .34);
}
function plant(x, y, phase) {
    return group(path('M-18 0 L19 0 L13 36 L-12 36Z', 3) +
        line(`M0 0 Q${-5 + phase} -42 ${2 + phase} -86`, 4, 2) +
        path(`M0 -28 Q-37 -28 -35 -56 Q-9 -59 0 -28Z`, 2, .8) +
        path(`M0 -49 Q31 -43 35 -76 Q12 -78 0 -49Z`, 3) +
        path(`M${2 + phase} -74 Q-20 -86 -9 -107 Q14 -98 ${2 + phase} -74Z`, 2, .7), x, y, 1, .48);
}
function wideClassroom(scene, phase) {
    // Three horizontal tableaux with distinct depth planes, rather than a
    // stretched central vignette. Peripheral details stay quiet behind glass.
    let content = '';
    if (scene === 1) {
        content += windowLight(185, 143, 132) + windowLight(752, 118, 118);
        content += shelf(95, 337);
        content += learner(220, 248, .65, -phase * .6, false, .64);
        content += desk(180, 345, 154, .30) + paper(256, 335, -5);
        content += learner(413, 221, .88, phase);
        content += standing(647, 139, 1.02, 'guide', phase);
        content += desk(358, 353, 259, .62) + paper(483, 340, -6) + books(374, 350, .48);
        content += learner(840, 252, .71, -phase * .7, true, .80);
        content += desk(723, 354, 179, .40) + paper(753, 342, 4);
        content += plant(929, 421, phase * .6);
    }
    else if (scene === 2) {
        content += windowLight(165, 132, 150) + windowLight(707, 128, 145);
        content += shelf(69, 346);
        content += learner(278, 235, .79, phase * .7);
        content += desk(221, 351, 205, .49) + paper(350, 339, -4) + books(237, 348);
        content += standing(532 + phase * 2.2, 136, 1.02, 'walk', phase);
        content += learner(743, 231, .78, -phase, true, .87);
        content += desk(593, 348, 213, .46) + paper(629, 335, 6);
        content += learner(897, 252, .64, phase * .6, true, .59);
        content += desk(801, 348, 132, .27) + paper(826, 338, 2);
    }
    else {
        content += windowLight(169, 133, 125) + windowLight(760, 133, 121);
        content += shelf(79, 337) + plant(179, 432, phase * .5);
        content += learner(330, 235, .81, phase);
        content += learner(814, 239, .79, -phase, true);
        content += standing(576, 145, .97, 'lab', phase);
        content += desk(273, 359, 596, .52);
        // Teaching objects provide a visual rhythm across the long shared bench.
        content += paper(367, 346, -4) + books(778, 352, .6);
        content += group(path('M0 0 L12 0 L11 26 L28 51 Q30 60 20 61 L-12 61 Q-21 58 -16 49 L1 25Z', 3) +
            path('M-5 39 L16 39 L25 53 L-14 53Z', 2, .8) + line('M-1 0 L13 0', 4, 1), 477, 297, .86);
        content += group(line('M0 0 L0 61 M-20 61 L25 61 M0 10 L30 10', 5, 2) +
            line('M24 13 L24 34', 3, 3) + oval(24, 42, 11, 13, 3), 714, 293, .9, .62);
        content += plant(928, 426, phase * .6);
    }
    content += line('M75 494 Q327 511 467 499 M559 498 Q758 508 932 488', 4, 4, .22);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDE_SIZE}" height="600" viewBox="0 0 ${WIDE_SIZE} 600">${content}</svg>`;
}
function sceneSvg(scene, compact = false, phase = 0) {
    if (!compact && scene > 0)
        return wideClassroom(scene, phase);
    let content = '';
    // Soft environmental fragments, never an enclosing box or a full background.
    if (!compact)
        content += group(line('M81 113 L81 265 M86 114 L159 114 M86 179 L157 179 M151 119 L151 256', 5, 4), 0, 0, 1, .33);
    if (scene === 1) {
        content += seated(174, 238, .77, false, phase, 1);
        content += standing(355, 142, 1, 'guide', phase);
        content += desk(112, 361, 260, .57) + paper(244, 347, -5);
    }
    else if (scene === 2) {
        if (!compact)
            content += seated(432, 220, .66, false, -phase) + desk(414, 319, 119, .3);
        content += seated(119, 258, .69, false, phase) + desk(94, 357, 163, .45);
        content += standing(315 + phase * 3, 135, 1.04, 'walk', phase);
    }
    else {
        content += seated(147, 249, .7, false, phase);
        if (!compact)
            content += seated(461, 249, .67, false, -phase, -1);
        content += standing(331, 155, .94, 'lab', phase);
        content += desk(106, 359, compact ? 298 : 407, .6);
        content += group(path('M0 0 L12 0 L11 26 L28 51 Q30 60 20 61 L-12 61 Q-21 58 -16 49 L1 25Z', 3) +
            path('M-5 39 L16 39 L25 53 L-14 53Z', 2, .8) + line('M-1 0 L13 0', 4, 1), 242, 296, .86);
        if (!compact)
            content += group(line('M0 0 L0 51 M-18 51 L22 51 M0 7 L25 7', 5, 2), 407, 307, 1, .55);
    }
    content += line('M72 488 Q284 511 540 479', 5, 4, .18);
    const width = compact ? SIZE : WIDE_SIZE;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="600" viewBox="0 0 ${width} 600">${content}</svg>`;
}
function sampleDots(data, step = 5.5, width = SIZE) {
    const dots = [];
    for (let y = step / 2; y < SIZE; y += step)
        for (let x = step / 2; x < width; x += step) {
            const i = (Math.floor(y) * width + Math.floor(x)) * 4;
            const edge = Math.min(1, x / 105, (width - x) / 70, (SIZE - y) / 125);
            const a = data[i + 3] / 255 * Math.max(0, edge);
            if (a < .045)
                continue;
            const variation = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453 % 1;
            dots.push({ x, y, r: data[i], g: data[i + 1], b: data[i + 2], a: a * (.84 + Math.abs(variation) * .16), radius: step * (.32 + Math.abs(variation) * .055) });
        }
    return dots;
}
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const SCENES = [1, 2, 3]; // Feedback, classroom support and practical learning.
const SCENE_MS = 6500;
const FADE_MS = 240;
const POSES = 24;
const MOTION_MS = 4800;
// Match samples by their grid location within one scene, never across scenes.
// The figures move through small articulated poses while the dot grid stays stable.
function alignPoses(poses) {
    const key = (dot) => `${dot.x},${dot.y}`;
    const positions = new Map(poses.flat().map(dot => [key(dot), dot]));
    return poses.map(pose => {
        const samples = new Map(pose.map(dot => [key(dot), dot]));
        return [...positions].map(([id, dot]) => samples.get(id) || { ...dot, a: 0 });
    });
}
function startAnimation() {
    const glassRef = { current: document.getElementById("glass-refraction") };
    const paneRef = { current: document.getElementById("pane-refraction") };
    const canvas = document.getElementById("scene-canvas");
    const frame = document.getElementById("scene-frame");
    if (!canvas || !frame)
        return;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 700px)');
    let scenes = [];
    let alive = true;
    let visible = true;
    let raf = 0;
    let previous = 0;
    let elapsed = 0; // Begin with a teacher and student sharing feedback.
    let lastDraw = 0;
    let generation = 0;
    let scaleX = 1;
    let scaleY = 1;
    let viewTop = 0;
    let viewHeight = SIZE;
    let viewWidth = SIZE;
    let lenses = [];
    function resizeGlass() {
        lenses = [];
        if (!frame)
            return;
        const sceneBounds = frame.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        for (const [ref, pane] of [[glassRef, false], [paneRef, true]]) {
            const glass = ref.current;
            if (!glass)
                continue;
            const bounds = glass.getBoundingClientRect();
            glass.width = Math.max(1, Math.round(bounds.width * ratio));
            glass.height = Math.max(1, Math.round(bounds.height * ratio));
            const context = glass.getContext('2d');
            if (context)
                lenses.push({ canvas: glass, context, pane, x: sceneBounds.left - bounds.left, y: sceneBounds.top - bounds.top, width: bounds.width, height: bounds.height, sx: sceneBounds.width / viewWidth, sy: sceneBounds.height / viewHeight, ratio });
        }
    }
    function render(time, still = false) {
        if (!ctx || !canvas || !scenes.length)
            return;
        const current = still ? 0 : Math.floor(time / SCENE_MS) % SCENES.length;
        const fade = still ? 0 : smooth(Math.max(0, (time % SCENE_MS - (SCENE_MS - FADE_MS)) / FADE_MS));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const lens of lenses) {
            const glassContext = lens.context;
            glassContext.setTransform(1, 0, 0, 1, 0, 0);
            glassContext.clearRect(0, 0, lens.canvas.width, lens.canvas.height);
            glassContext.setTransform(lens.ratio, 0, 0, lens.ratio, 0, 0);
        }
        ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
        function drawScene(index, opacity) {
            if (!ctx || opacity <= 0)
                return;
            const offsetX = 0; // Positioning now lives in the wider scene composition.
            const poseTime = still ? 0 : (time % MOTION_MS) / MOTION_MS * POSES;
            const pose = Math.floor(poseTime);
            const blend = poseTime % 1;
            const from = scenes[index][pose];
            const to = scenes[index][(pose + 1) % POSES];
            for (let i = 0; i < from.length; i++) {
                const a = from[i];
                const b = to[i];
                const alpha = mix(a.a, b.a, blend) * opacity;
                if (alpha < .025)
                    continue;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = `rgb(${Math.round(mix(a.r, b.r, blend))},${Math.round(mix(a.g, b.g, blend))},${Math.round(mix(a.b, b.b, blend))})`;
                ctx.beginPath();
                ctx.arc(a.x + offsetX, a.y - viewTop, a.radius, 0, Math.PI * 2);
                ctx.fill();
                // Refract the actual scene behind each glass surface, leaving the UI sharp.
                for (const lens of lenses) {
                    const glassContext = lens.context;
                    const gx = lens.x + (a.x + offsetX) * lens.sx;
                    const gy = lens.y + (a.y - viewTop) * lens.sy;
                    if (gx > -18 && gx < lens.width + 18 && gy > -18 && gy < lens.height + 18) {
                        const nx = (gx - lens.width / 2) / (lens.width / 2);
                        const ny = (gy - lens.height / 2) / (lens.height / 2);
                        const bend = Math.max(0, 1 - ny * ny);
                        // Keep the text-bearing centre quiet; lensing intensifies in a
                        // narrow band along the four straight edges of the larger pane.
                        const edgeX = Math.exp(-Math.max(0, Math.min(gx, lens.width - gx)) / 26);
                        const edgeY = Math.exp(-Math.max(0, Math.min(gy, lens.height - gy)) / 26);
                        const edge = Math.max(edgeX, edgeY);
                        glassContext.globalAlpha = alpha * (lens.pane ? .045 + edge * .38 : .72);
                        glassContext.fillStyle = ctx.fillStyle;
                        glassContext.beginPath();
                        const dx = lens.pane ? -Math.sign(nx) * edgeX * 30 : nx * bend * 14;
                        const dy = lens.pane ? -Math.sign(ny) * edgeY * 30 : -ny * bend * 15;
                        const stretchX = lens.pane ? 1 + edgeX * 1.05 : 1.28;
                        const stretchY = lens.pane ? 1 + edgeY * 1.05 : 1 + bend * .5;
                        glassContext.ellipse(gx + dx, gy + dy, a.radius * lens.sx * stretchX, a.radius * lens.sy * stretchY, 0, 0, Math.PI * 2);
                        glassContext.fill();
                        if (lens.pane && edge > .08) {
                            // A restrained blue/white split gives the displaced background
                            // depth and dispersion, without drawing a stroke around the UI.
                            for (const direction of [-1, 1]) {
                                glassContext.globalAlpha = alpha * edge * .12;
                                glassContext.fillStyle = direction < 0 ? '#b6d6ff' : '#ffffff';
                                glassContext.beginPath();
                                glassContext.ellipse(gx + dx + direction * edgeX * 2.4, gy + dy - direction * edgeY * 2.4, a.radius * lens.sx * stretchX, a.radius * lens.sy * stretchY, 0, 0, Math.PI * 2);
                                glassContext.fill();
                            }
                        }
                    }
                }
            }
        }
        // Brief opacity-only crossfade: no point morphing, drifting or scattering.
        drawScene(current, 1 - fade);
        if (fade > 0)
            drawScene((current + 1) % SCENES.length, fade);
        ctx.globalAlpha = 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    function tick(now) {
        raf = 0;
        if (!alive || !visible || document.hidden || motion.matches)
            return;
        if (previous)
            elapsed += Math.min(now - previous, 100);
        previous = now;
        if (now - lastDraw >= 1000 / 30) {
            render(elapsed);
            lastDraw = now;
        }
        raf = requestAnimationFrame(tick);
    }
    function sync() {
        cancelAnimationFrame(raf);
        raf = 0;
        previous = 0;
        if (!alive || !scenes.length)
            return;
        if (motion.matches)
            render(0, true);
        else if (visible && !document.hidden)
            raf = requestAnimationFrame(tick);
    }
    function resize() {
        if (!canvas || !frame)
            return;
        // Trim empty source space so the visible figures track the copy pane's height.
        viewTop = compact.matches ? 0 : 80;
        viewHeight = compact.matches ? SIZE : 460;
        viewWidth = compact.matches ? SIZE : WIDE_SIZE;
        const bounds = frame.getBoundingClientRect();
        const width = Math.max(1, bounds.width);
        const pixels = Math.min(1200, Math.round(width * Math.min(window.devicePixelRatio || 1, 2)));
        canvas.width = pixels;
        canvas.height = Math.round(pixels * bounds.height / width);
        scaleX = pixels / viewWidth;
        scaleY = canvas.height / viewHeight;
        resizeGlass();
        render(elapsed, motion.matches);
    }
    async function loadScenes() {
        const batch = ++generation;
        const smaller = compact.matches;
        const buffer = document.createElement('canvas');
        const sourceWidth = smaller ? SIZE : WIDE_SIZE;
        buffer.width = sourceWidth;
        buffer.height = SIZE;
        const sample = buffer.getContext('2d', { willReadFrequently: true });
        if (!sample)
            return;
        const results = [];
        try {
            for (const scene of SCENES) {
                const poses = [];
                for (let pose = 0; pose < POSES; pose++) {
                    const phase = Math.sin(pose / POSES * Math.PI * 2) * 2.4;
                    const img = new window.Image();
                    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sceneSvg(scene, smaller, phase))}`;
                    await img.decode();
                    if (!alive || batch !== generation)
                        return;
                    sample.clearRect(0, 0, sourceWidth, SIZE);
                    sample.drawImage(img, 0, 0);
                    poses.push(sampleDots(sample.getImageData(0, 0, sourceWidth, SIZE).data, smaller ? 7 : 5.5, sourceWidth));
                }
                results.push(alignPoses(poses));
            }
            scenes = results;
            resize();
            document.getElementById("scene-still").style.opacity = "0";
            sync();
        }
        catch { /* Keep the original SVG still if Canvas or image decoding fails. */ }
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    if (glassRef.current?.parentElement)
        resizeObserver.observe(glassRef.current.parentElement);
    if (paneRef.current?.parentElement)
        resizeObserver.observe(paneRef.current.parentElement);
    // Also catch font loading / wrapping that moves the form without resizing it.
    if (frame.closest('section'))
        resizeObserver.observe(frame.closest('section'));
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
    observer.observe(frame);
    motion.addEventListener('change', sync);
    compact.addEventListener('change', loadScenes);
    document.addEventListener('visibilitychange', sync);
    void loadScenes();
    return () => {
        alive = false;
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        observer.disconnect();
        motion.removeEventListener('change', sync);
        compact.removeEventListener('change', loadScenes);
        document.removeEventListener('visibilitychange', sync);
    };
}
startAnimation();

})();

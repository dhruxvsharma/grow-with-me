# Assets

The prototype draws its plants in code. Replace them with your own art by adding files to `plants/` and mapping them in `assets.js`.

## Required set (minimum)

| Plant | Stages | Moods | Files |
|-------|--------|-------|-------|
| Sprig | 1 seed, 2 sprout, 3 young, 4 full bloom | happy + sad | 8 |
| Blossom | 4 full bloom | happy + sad | 2 |
| Prickle (cactus) | 4 full bloom | happy + sad | 2 |

For the best result, also provide stages 1 to 3 for Blossom and Prickle (6 more files each), since the Home screen grows whichever plant you pick.

## Naming

`<kind>_<stage>_<mood>.png`, for example `sprig_2_happy.png`, `cactus_4_sad.png`.

## Specs

- Transparent PNG, WebP or SVG
- Square canvas, around 800 × 800 px
- Same pot, same framing and same baseline across every file so states swap without jumping
- Sad version: drooping leaves, desaturated colour, a tear or frown
- Soft pastel palette to match the UI (see the main README)

## Suggested prompt

> cute minimal potted sprout, soft pastel colours, 2.5D illustration, transparent background, centered, [stage], [happy / droopy and sad]

## `concepts/`

Early SVG explorations (plants, backgrounds, icons) kept for reference only. You can delete this folder.

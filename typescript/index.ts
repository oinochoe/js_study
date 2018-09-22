const tween = TyrannoScrollus({
    targets: '#container',
    direction: 'x'
})

// create renderers for animation
const renderLegFront = renderRotation('#legFront', 14, 25, -95, 185, 295);
const renderLegBack = renderRotation('#legBack', 14, -25, 75, 205, 285);
const renderArmFront = renderRotation('#armFront', 14, -15, 15, 230, 225);
const renderArmBack = renderRotation('#armBack', 14, 15, -15, 225, 220);
const renderTail = renderTranslation('#tail', 6, 0, 0, 2, -2);
const renderTorso = renderTranslation('#torso', 8, 0, 0, 2, -2);
const renderUpperLower = renderTranslation('#headUpper', 14, 0, 0, 2, -2);
const renderHeadLower = renderTranslation('#headLower', 8, 0, 0, 2, -2);


tween.subscribe(o => {
    renderLegFront(o)
    renderLegBack(o)
    renderArmFront(o)
    renderArmBack(o)
    renderTail(o)
    renderTorso(o)
    renderHeadLower(o)
    renderUpperLower(o)
})

tween.play();

function renderTranslation(selector, steps, x1, x2, y1, y2) {
    // find the target
    const target = document.querySelector(selector);

    // create a value renderer to translate 0-1 into a concrete rotational value
    const xRenderer = calculateValue(target, steps, x1, x2);
    const yRenderer = calculateValue(target, steps, y1, y2);

    // return a render function to set transform each cycle
    return o => {
        target.setAttribute('transform', `translate(${xRenderer(o)} ${yRenderer(o)})`)
    }
}

function renderRotation(selector, steps, from, to, x, y) {
    // dealing with rotation on SVG animations is cumbersome

    // find the target
    const target = document.querySelector(selector);

    // create a value renderer to translate 0-1 into a concrete rotational value
    const valueRenderer = calculateValue(target, steps, from, to);

    // return a render function to set transform each cycle
    return o => {
        target.setAttribute('transform', `rotate(${valueRenderer(o)} ${x} ${y})`)
    }
}

function calculateValue(selector, steps, from, to) {
    // pre-calculate distance
    const d = to - from
    return o => {
        // get the current value in between all steps
        const value = o * steps;

        // get the beginning of the step
        const step = Math.floor(value);

        // on even steps, reverse direction, on odd go forward
        return step % 2 ? from + (d - (d * (value - step))) : from + (d * (value - step))
    }
}
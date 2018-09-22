'use strict';

console.clear();

var tween = TyrannoScrollus({
    targets: '#container',
    direction: 'x'
});

var steps = 12.5;

// create renderers for animation
var renderLegFront = renderRotation('#leftLeg', steps, 15, -28, 300, 390);
var renderLegBack = renderRotation('#rightLeg', steps, -17, 7, 420, 380);

var renderArmFront = renderRotation('#leftArm', steps, 4, 20, 335, 315);
var renderArmBack = renderRotation('#rightArm', steps, -20, -4, 425, 305);

var renderTorso = renderRotation('#body', steps, -2, 2, 260, 300); // 295, 185);
var renderHead = renderRotation('#head', steps, -5, 6, 380, 200);

tween.subscribe(function (o) {
    renderLegFront(o);
    renderLegBack(o);
    renderArmFront(o);
    renderArmBack(o);
    renderTorso(o);
    renderHead(o);
});

tween.play();

function renderTranslation(selector, steps, x1, x2, y1, y2) {
    // find the target
    var target = document.querySelector(selector);

    // create a value renderer to translate 0-1 into a concrete rotational value
    var xRenderer = calculateValue(target, steps, x1, x2);
    var yRenderer = calculateValue(target, steps, y1, y2);

    // return a render function to set transform each cycle
    return function (o) {
        target.setAttribute('transform', 'translate(' + xRenderer(o) + ' ' + yRenderer(o) + ')');
    };
}

function renderRotation(selector, steps, from, to, x, y) {
    // dealing with rotation on SVG animations is cumbersome

    // find the target
    var target = document.querySelector(selector);

    // make a marker to indicate where the transform origin will be
    makeMarker(target, x, y);

    // create a value renderer to translate 0-1 into a concrete rotational value
    var valueRenderer = calculateValue(target, steps, from, to);

    // return a render function to set transform each cycle
    return function (o) {
        target.setAttribute('transform', 'rotate(' + valueRenderer(o) + ' ' + x + ' ' + y + ')');
    };
}

document.body.addEventListener('click', function () {
    document.body.classList.toggle('show-markers');
});

function makeMarker(target, x, y) {
    var c = Math.random() * 360;
    var hsl = 'hsl( ' + c + ', 80%, 60%)';
    var marker = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    marker.setAttribute('x', x);
    marker.setAttribute('y', y);
    marker.setAttribute('width', 10);
    marker.setAttribute('height', 10);
    marker.setAttribute('class', 'marker');
    marker.setAttribute('fill', hsl);

    var parent = target.parentNode;
    while (parent && parent.tagName !== 'svg') {
        parent = parent.parentNode;
    }
    parent.appendChild(marker);

    target.setAttribute('class', target.getAttribute('class') + ' marker-target');
    target.setAttribute('stroke', hsl);
    target.setAttribute('stroke-width', 3);

    return marker;
}

function calculateValue(selector, steps, from, to) {
    // pre-calculate distance
    var d = to - from;
    return function (o) {
        // get the current value in between all steps
        var value = o * steps;

        // get the beginning of the step
        var step = Math.floor(value);

        // on even steps, reverse direction, on odd go forward
        return step % 2 ? from + (d - d * (value - step)) : from + d * (value - step);
    };
}
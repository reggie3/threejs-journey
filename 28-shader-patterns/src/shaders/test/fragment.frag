#define PI 3.1415926538

precision mediump float;

varying vec2 vUv;

float round(float number)
{
    return floor(number + 0.5);
}

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 132.652);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main()
{
    // Pattern 3
    // float strength = vUv.x;

    // Pattern 4
    // float strength = vUv.y;

    // Pattern 5
    // float strength = 1. - vUv.y;

    // Pattern 6
    // float strength = vUv.y * 10.;

    // Pattern 7
    // float strength = mod(vUv.y * 10., 1.);
    // float strength = abs(sin(vUv.y * 40.)); not correct

    // Pattern 9
    // float strength = step(.5, mod(vUv.y * 10., 1.));

    // Pattern 10
    // float strength = step(.9, mod(vUv.x * 10., 1.));

    // Pattern 11 : Grid
    // float strength = step(.9, mod(vUv.x * 10., 1.)) + step(.9, mod(vUv.y * 10., 1.));

    // Pattern 12
   // float strength = 0.;
    // strength += step(.8, mod(vUv.x * 10., 1.)) * .49; //vertical lines
    // strength += step(.8, mod(vUv.y * 10., 1.)) * .49; // horizontal lines
    // strength = step(.5, strength);

    // Pattern 13
    //float strength = -step(.8, mod(vUv.x * 10., 1.)) + step(.8, mod(vUv.y * 10., 1.));

    // Pattern 14: adding two patterns together to create a grid of "arrows"
    // float barX = step(.4, mod(vUv.x * 10., 1.));
    // barX *= step(.8, mod(vUv.y * 10., 1.));

    // float barY = step(.4, mod(vUv.y * 10., 1.));
    // barY *= step(.8, mod(vUv.x * 10., 1.));

    // float strength = barY + barX;

    // Pattern 15 - grid of crosses

    // float positiveStrength = 0.;
    // positiveStrength += step(.8, mod((vUv.x) * 10., 1.));
    // positiveStrength += step(.8, mod((vUv.y) * 10., 1.));

    // vec2 shiftedUv = vec2(vUv) + vec2(.45);

    // float negativeStength = 0.;
    // negativeStength += step(.8, mod((shiftedUv.x) * 10., 1.));
    // negativeStength += step(.8, mod((shiftedUv.y) * 10., 1.));

    // float strength = positiveStrength - negativeStength;

    // Pattern 16: fuzzy vertical line down the center
    // float strength = 0.;
    // strength = abs(vUv.x - .5);

    // strength = step(.5, abs(vUv.x - .5) * 2.);

    // Pattern 17: cross +
    // this incorrect attempt looks cool, but is not right
    // float strength = 0.;
    // strength = abs(vUv.x - .5);
    // strength *= abs(vUv.y - .5);

    // float strength = 0.;
    // float vStrength = abs(vUv.x - .5);
    // float hStrength = abs(vUv.y - .5);

    // strength = min(hStrength, vStrength);

    // Pattern 18: cross x
    // float strength = 0.;
    // float vStrength = abs(vUv.x - .5);
    // float hStrength = abs(vUv.y - .5);

    // strength = max(hStrength, vStrength);

    // Pattern 19: black square in white field
    // float strength = 0.;
    // float vStrength = abs(vUv.x - .5);
    // float hStrength = abs(vUv.y - .5);

    // strength = step(.25, max(hStrength, vStrength));

    // Pattern 20: black square with a white frame that is smaller than our plane
    // float strength = 0.;
    // float vStrength = abs(vUv.x - .5);
    // float hStrength = abs(vUv.y - .5);

    // float blackSquare = step(.2, max(hStrength, vStrength));
    // float whiteFrame = 1. - step(.3, max(hStrength, vStrength));

    // strength = whiteFrame * blackSquare;

    // Pattern 21: step gradient across the x axis
    // https://www.desmos.com/calculator/ulqq7qfttp
    // float strength = floor(vUv.x * 10.0) / 10.;

    // Pattern 22: grid of stepped gradients
    // float hStrength = floor(vUv.x * 10.0) / 10.;
    // float vStrength = floor(vUv.y * 10.0) / 10.;

    // float strength = hStrength * vStrength;

    // Pattern 23: static
    // float strength = rand(vUv);

    // Pattern 24: 10x10 random blocks
    // float hStrength = floor(vUv.x * 10.0) / 10.;
    // float vStrength = floor(vUv.y * 10.0) / 10.;

    // float strength = rand(vec2(hStrength, vStrength));

    // Pattern 25: 10x10 slanted random blocks
    // float hStrength = floor(vUv.x * 10.0) / 10.;
    // float vStrength = floor((vUv.y + vUv.x * .8) * 10.0) / 10.;

    // float strength = rand(vec2(hStrength, vStrength));

    // Pattern 26: gradient dark bottom left, white top right
    // float strength = length(vUv );

    // Pattern 27: dark gradient circle originating from the center
    // float strength = length(vUv - .5);

    // Pattern 28: gradient white from cetner
    // float strength = 1. - length(vUv - .5);

    // Pattern 29: bright white in the center with quick drop-off
    // https://www.desmos.com/calculator/oiy8a1fxwr
    // float strength = 0.015 / length(vUv - .5);

    // Pattern 30: horizontally streched light spot in center
    // float strength = 0.015 / length((vUv - .5) / vec2(8., 1.5));

    // Pattern 31: star
    // float skinnyPower = .6;
    // float widePower = 3.;

    // float hStrength = 0.015 / length((vUv - .5) / vec2(widePower, skinnyPower));
    // float vStrength = 0.015 / length((vUv - .5) / vec2(skinnyPower, widePower));

    // float strength = hStrength * vStrength;

    // Pattern 32:  star rotated 45 degrees
    vec2 rotatedUv = rotate(vUv, PI / 4., vec2(.5));

    vec2 lightUvX = vec2(rotatedUv.x * .1 + 0.45, rotatedUv.y * .5 + .25);
    float lightX = 0.015 / distance(lightUvX, vec2(.5));

    vec2 lightUvY = vec2(rotatedUv.y * .1 + 0.45, rotatedUv.x * .5 + .25);
    float lightY = 0.015 / distance(lightUvY, vec2(.5));

    float strength = lightX * lightY;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
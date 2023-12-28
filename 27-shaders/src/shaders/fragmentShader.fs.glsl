precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    // vec3 color = vec3(1.0 - vRandom, 1.0 - vRandom, 1.0);
    // vec3 color = vec3(1.0, 0.0, 0.0);

    vec4 textureColor = texture2D(uTexture, vUv);

    textureColor.rgb *= vElevation * 2. + .5;

    gl_FragColor = vec4(textureColor);

}
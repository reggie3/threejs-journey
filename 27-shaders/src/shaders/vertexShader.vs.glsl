uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    vRandom = aRandom;
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime * 3.) * .1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime * 3.) * .1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y) * .1;
    // modelPosition.z += aRandom * .1;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vElevation = elevation;

}
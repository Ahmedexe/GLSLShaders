#ifdef GL_ES

precision mediump float;

#endif

varying vec2 pos;

uniform float u_time;

uniform vec2 u_resolution;

vec3 palette(in float t) {

    vec3 a = vec3(0.098, 0.448, 0.500);
    vec3 b = vec3(0.318, 0.228, 0.188);
    vec3 c = vec3(1.388, 1.828, 0.898);
    vec3 d = vec3(0.098, 2.188, 0.667);

    return a + b * cos(6.28318 * (c * t + d));

}

vec2 rotate(vec2 v, float a) {

    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;

}

float sdCircle(vec2 p, float r) {
    return length(p) - r;

}

void main() {

    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2. - 1.;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 uv0 = uv * .5;

    uv.y += sin(1.5 * u_time) / 2.;
    uv.x += sin(u_time) / 2.;

    float d = abs(sdCircle(uv, 0.5));
    d += abs(sdCircle(uv0, 0.5));
    // d = smoothstep(0.01, 0.03, d);

    d = 0.09 / d;

    vec3 col = vec3(d);
    col *= palette(u_time * .2);
    gl_FragColor = vec4(col, 1.);
}

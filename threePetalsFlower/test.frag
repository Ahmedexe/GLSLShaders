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

float sdCircle(vec2 p, float r, vec2 c) {
    return length(p - c) - r;

}

void main() {

    float d = 0.;
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2. - 1.;
    uv.x *= u_resolution.x / u_resolution.y;
    vec2 uv0 = uv;

    for(float i = 0.; i < 3.; i++) {

        // uv = fract(uv) - .5;

        float r = sqrt(pow(uv.x, 2.) + pow(uv.y, 2.));
        float theta = atan(uv.y, uv.x);

        d = -cos(3. * theta + .75 * u_time) + 3. * r;
        d = 0.04 / abs(d);
        // d = smoothstep(.1, .95, d);
    }

    vec3 col = vec3(d);
    col *= palette(u_time * .2 - .75 * length(uv0));
    gl_FragColor = vec4(col, 1.);
}

// d = sin(8. * sdCircle(uv, .4, vec2(0., 0.)) - u_time) / 8.;
// d = 0.02 / abs(d);
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
    // uv = 2. * (fract(uv * 2.) - .5);

    float w = u_time;
    w *= 1.;

    for(float j = 0.; j < 1.; j++) {

        // uv = 2. * (fract(uv * .5) - 0.5);
        uv *= .75;
        for(float i = 0.; i < 42.; i++) { // best size for a cycle is 21
        // uv.y += sin(1.5 * u_time) / 2.;
        // uv.x += sin(u_time) / 2.;

            float t = i * .3;

            // vec2 c = vec2(sin(w + t) / 2., sin(1.5 * w + t) / 2.);

            vec2 c2 = vec2(sin(w - t) / 2., sin(1.5 * (w + t)) / 2.);

            // c = rotate(c2, .7 * u_time);
            c2 = rotate(c2, 4. * cos(u_time * .2));

            // d += 0.0035 / (abs(sdCircle(uv, 0.02, c)));
            d += 0.05 / (abs(sdCircle(uv, 0.05 * cos(2. * length(uv)) /* dynamize circle size*/, c2)));
        // d = pow(0.003, d);
        }
        d *= .08 * exp(-length(uv));
    }

    // d += abs(sdCircle(uv0, 0.5, vec2(0.)));
    // d = .02 / d;

    //d = atan(d * 90.);
    // d = smoothstep(0.01, 0.08, d);

    vec3 col = vec3(d);
    col *= palette(u_time * .2 - .75 * length(uv));
    gl_FragColor = vec4(col, 1.);
}

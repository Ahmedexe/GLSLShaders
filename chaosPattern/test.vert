attribute vec3 a_position;
attribute vec2 a_texture;

varying vec2 pos;

void main() {
    pos = a_texture;

    vec4 position = vec4(a_position, 1.);
    position.xy = position.xy * 2. - 1.;

    gl_Position = position;
}
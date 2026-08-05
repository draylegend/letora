// ponytail: three ships an `exports` map with no "types" condition, so
// TS's bundler resolution can't fall back to the installed @types/three
// (transitive dep of electrobun/bun, which we don't use directly). Shim it
// away rather than fighting module resolution for a package we never call.
declare module 'three';

import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
  // UMD build for browsers
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'OSZoom',
      sourcemap: true
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '**/*.test.ts']
      }),
      terser()
    ]
  },
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '**/*.test.ts']
      })
    ]
  },
  // React adapter
  {
    input: 'src/adapters/ReactAdapter.ts',
    external: ['react'],
    output: [
      {
        file: 'dist/adapters/ReactAdapter.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/adapters/ReactAdapter.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json'
      })
    ]
  },
  // Vue adapter
  {
    input: 'src/adapters/VueAdapter.ts',
    external: ['vue'],
    output: [
      {
        file: 'dist/adapters/VueAdapter.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/adapters/VueAdapter.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json'
      })
    ]
  },
  // Angular adapter
  {
    input: 'src/adapters/AngularAdapter.ts',
    external: ['@angular/core', 'rxjs'],
    output: [
      {
        file: 'dist/adapters/AngularAdapter.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/adapters/AngularAdapter.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json'
      })
    ]
  }
];


import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import typescriptLib from 'typescript';

export default [
  // UMD build for browsers (vanilla only, no framework dependencies)
  {
    input: 'src/vanilla.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'OSZoom',
      sourcemap: true,
      exports: 'default' // Use default export as main export for UMD
    },
    plugins: [
      typescript({
        typescript: typescriptLib,
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '**/*.test.ts'],
        check: false // Skip type checking during build (use 'npm run lint' for type checking)
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
        typescript: typescriptLib,
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '**/*.test.ts'],
        check: false // Skip type checking during build (use 'npm run lint' for type checking)
      })
    ]
  },
  // React adapter (direct)
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
        typescript: typescriptLib,
        tsconfig: './tsconfig.json',
        check: false // Skip type checking during build (use 'npm run lint' for type checking)
      })
    ]
  },
  // React entry point (with useOSZoomReact export name)
  {
    input: 'src/react.ts',
    external: ['react'],
    output: [
      {
        file: 'dist/react.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/react.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        typescript: typescriptLib,
        tsconfig: './tsconfig.json',
        check: false
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
        typescript: typescriptLib,
        tsconfig: './tsconfig.json',
        check: false // Skip type checking during build (use 'npm run lint' for type checking)
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
        typescript: typescriptLib,
        tsconfig: './tsconfig.json',
        check: false // Skip type checking during build (use 'npm run lint' for type checking)
      })
    ]
  }
];


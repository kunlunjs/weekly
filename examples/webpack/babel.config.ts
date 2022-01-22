export default ({ isDevelopment = true }: { isDevelopment?: boolean }) => {
  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      // Enable development transform of React with new automatic runtime
      [
        '@babel/preset-react',
        { development: isDevelopment, runtime: 'automatic' }
      ]
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(isDevelopment && { plugins: ['react-refresh/babel'] })
  }
}

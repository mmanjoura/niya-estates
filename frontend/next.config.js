/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    );
    return config;
  },
  images: {
    domains: ['storage.googleapis.com'],
  },

};

module.exports = nextConfig;

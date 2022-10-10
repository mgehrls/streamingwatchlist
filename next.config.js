/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {...nextConfig,
 env: {
  KEY: process.env.KEY
 },
  images:{
    domains:['image.tmdb.org']
  }}

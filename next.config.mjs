/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "utfs.io",
            port: "",
        }, {
            protocol: "https",
            hostname: "ik.imagekit.io",
            port: "",
        },],
    },
};

export default nextConfig;
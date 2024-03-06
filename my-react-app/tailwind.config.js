/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 這會匹配 src 目錄下所有的 js, jsx, ts, tsx 文件
    "./public/index.html", // 也包括 public 目錄下的 index.html 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


export const SNIPPETS = [
  {
    id: 1,
    language: "javascript",
    label: "JS: Arrow Function",
    difficulty: "easy",
    code: "const calculateWPM = (chars, time) => (chars / 5) / (time / 60);",
  },
  {
    id: 2,
    language: "python",
    label: "Python: List Comp",
    difficulty: "easy",
    code: "squares = [x**2 for x in range(10) if x % 2 == 0]",
  },
  {
    id: 3,
    language: "react",
    label: "React: UseEffect",
    difficulty: "medium",
    code: "useEffect(() => {\n  const timer = setInterval(() => tick(), 1000);\n  return () => clearInterval(timer);\n}, []);",
  },
  {
    id: 4,
    language: "html",
    label: "HTML: Boilerplate",
    difficulty: "easy",
    code: "<div className='flex items-center justify-between p-4'>\n  <h1 className='text-xl font-bold'>KeyRush</h1>\n</div>",
  },
  {
    id: 5,
    language: "javascript",
    label: "JS: Async Fetch",
    difficulty: "hard",
    code: "async function fetchData(url) {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n}",
  },
  {
    id: 6,
    language: "css",
    label: "CSS: Glassmorphism",
    difficulty: "medium",
    code: "background: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(10px);\nborder: 1px solid rgba(255, 255, 255, 0.2);",
  }
];
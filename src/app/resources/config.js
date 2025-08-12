const baseURL = "rudikarakelyan.com";


/** @type {{ [key: string]: boolean }} */
const routes = {
  "/": true,
  "/about": true,
  "/projects": true,
  "/skills": true,
};  


// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "dark", // dark | light - not needed when using ThemeProvider
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const effects = {
  mask: {
    cursor: true,
    x: 0,
    y: 0,
    radius: 75,
  },
  gradient: {
    display: true,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    width: "24",
    height: "24",
    opacity: 100,
  },
};

const display = {
  location: true,
  time: true,
};

// default metadata
const meta = {
  title: "Once UI for Next.js",
  description:
    "An open-source design system and component library for Next.js that emphasizes easy styling and accessibility in UI development.",
};

// default open graph data
const og = {
  title: meta.title,
  description: meta.description,
  image: "/images/cover.jpg",
};

// default schema data
const schema = {
  logo: "",
  type: "Organization",
  name: "Rudik Arakelyan",
  description: meta.description,
  email: "rudik.arakelyan777@gmail.com",
};

// social links
const social = {
  twitter: "https://www.twitter.com/_onceui",
  linkedin: "https://www.linkedin.com/company/once-ui/",
  discord: "https://discord.com/invite/5EyAQ4eNdS",
};

export { routes, baseURL, style, display, meta, og, schema, social, effects };

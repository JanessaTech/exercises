type NextFontResult = {
  variable: string;
  className?: string;
};

export function Geist(): NextFontResult {
  return { variable: "--mock-geist-sans" };
}

export function Geist_Mono(): NextFontResult {
  return { variable: "--mock-geist-mono" };
}


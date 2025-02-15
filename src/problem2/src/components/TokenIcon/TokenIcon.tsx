import { TOKEN_BASE_IMAGE_URL, TOKEN_FALLBACK } from "@/const";
import { useCallback, useEffect, useState } from "react";

interface TokenIconProps {
  name: string;
  size?: number;
}

export default function TokenIcon({ name, size = 24 }: TokenIconProps) {
  const [url, setUrl] = useState(() => `${TOKEN_BASE_IMAGE_URL}/${name}.svg`);
  const handleError = useCallback(() => {
    setUrl(`${TOKEN_BASE_IMAGE_URL}/${TOKEN_FALLBACK}.svg`);
  }, []);

  useEffect(() => {
    setUrl(`${TOKEN_BASE_IMAGE_URL}/${name}.svg`);
  }, [name]);

  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: "contain", objectPosition: "center" }}
      onError={handleError}
    />
  );
}

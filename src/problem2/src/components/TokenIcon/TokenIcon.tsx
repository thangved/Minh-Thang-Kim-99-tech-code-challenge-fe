import { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import { TOKEN_BASE_IMAGE_URL, TOKEN_FALLBACK } from "../../const";

const useStyles = createUseStyles({
  tokenIcon: {
    objectFit: "contain",
    objectPosition: "center",
  },
});

interface TokenIconProps {
  name: string;
  size?: number;
}

export default function TokenIcon({ name, size = 24 }: TokenIconProps) {
  const classes = useStyles();
  const [url, setUrl] = useState(() => `${TOKEN_BASE_IMAGE_URL}/${name}.svg`);
  const handleError = useCallback(() => {
    setUrl(`${TOKEN_BASE_IMAGE_URL}/${TOKEN_FALLBACK}.svg`);
  }, []);

  return (
    <img
      src={url}
      className={classes.tokenIcon}
      alt={name}
      width={size}
      height={size}
      onError={handleError}
    />
  );
}

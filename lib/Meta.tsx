import Head from "next/head";
import { useRouter } from "next/router";

const publicDomain = "blog.mitsunee.com";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  imageLarge?: boolean;
  isError?: boolean;
}

export function Meta({
  title = "Mitsunee | Blog",
  description = "Web Developer, music-addict and Linux user (Fedora/KDE) who plays FGO and watches entirely too much YouTube",
  image = "/assets/icons/icon-192.png",
  imageLarge = false,
  isError = false
}: MetaProps) {
  const router = useRouter();
  const imagePath = `${image.startsWith("/") ? "" : "/"}${image}`;
  const imageUrl = `https://${publicDomain}${imagePath}`;

  return (
    <Head>
      <meta name="application-name" content="Mitsunee | Blog" />
      <meta property="og:site_name" content="Mitsunee | Blog" />

      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:image" content={imageUrl} />

      {imageLarge && <meta name="twitter:card" content="summary_large_image" />}
      <meta name="twitter:author" content="@Mitsunee" />

      <meta name="theme-color" content="#ffbb5c" />
      {isError && <meta name="robots" content="noindex,noarchive,none" />}
      <link rel="canonical" href={`https://${publicDomain}${router.asPath}`} />
    </Head>
  );
}

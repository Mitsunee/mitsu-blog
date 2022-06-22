import Head from "next/head";
import { useRouter } from "next/router";

const publicDomain = "blog.mitsunee.com";

export function Meta({
  title = "Mitsunee | Blog",
  description = "Web Developer, music-addict and Linux user (Fedora/KDE) who plays FGO and watches entirely too much YouTube",
  image = "/assets/icons/icon-192.png",
  imageLarge = false,
  isError = false
}) {
  const router = useRouter();
  const imagePath = `${image.startsWith("/") ? "" : "/"}${image}`;
  const imageUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
      : ""
  }${imagePath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="application-name" content="Mitsunee | Blog" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {imageLarge && <meta name="twitter:card" content="summary_large_image" />}
      <meta name="twitter:author" content="@Mitsunee" />
      <meta name="theme-color" content="#ffbb5c" />
      {isError && <meta name="robots" content="noindex,noarchive,none" />}
      <link rel="canonical" href={`https://${publicDomain}${router.asPath}`} />
    </Head>
  );
}

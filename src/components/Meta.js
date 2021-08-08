import Head from "next/head";
import { useRouter } from "next/router";

const Meta = props => {
  const title = props.title ? `${props.title} | Mitsunee` : "Mitsunee";
  const image = props.image || "assets/avi_small.jpg"; // PLACEHOLDER
  const description = props.description || "Mitsunee";
  const { asPath: route } = useRouter();
  // TODO favicon
  // TODO default image

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key={"og:title"} />
      <meta
        property="og:description"
        content={description}
        key={"og:description"}
      />
      <meta
        property="og:image"
        content={`https://www.mitsunee.com/${image}`}
        key={"og:image"}
      />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@Mitsunee" />
      <meta property="og:type" content="website" key={"og:type"} />
      <link
        rel="canonical"
        href={`https://www.mitsunee.com${route === "/" ? "" : route}`}
        key={"canonical"}
      />
    </Head>
  );
};

export default Meta;

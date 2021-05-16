const Meta = props => {
  const title = props.title || "Mitsunee";
  const image = props.image || "assets/avi_small.jpg"; // PLACEHOLDER
  const description = props.description || "Mitsunee";
  // TODO favicon
  // TODO default image

  return (
    <>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        property="og:site_name"
        content="Mitsunee.com"
        key={"og:site_name"}
      />
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
      <meta
        name="twitter:card"
        content={props.twitterCard || "summary_large_image"}
      />
      <meta name="twitter:creator" content="@Mitsunee" />
      <meta property="og:type" content="website" key={"og:type"} />
      <link
        rel="canonical"
        href={`https://www.mitsunee.com/${props.route}/`}
        key={"canonical"}
      />
    </>
  );
};

export default Meta;

const Meta = props => {
  const title = props.title || "Mitsunee";
  return (
    <>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} key={"og:title"} />

      {props.description && (
        <>
          <meta name="description" content={props.description} />
          <meta name="twitter:description" content={props.description} />
          <meta
            property="og:description"
            content={props.description}
            key={"og:description"}
          />
        </>
      )}

      {props.image && (
        <>
          <meta
            name="twitter:image"
            content={`https://www.mitsunee.com/${props.image}`}
          />
          <meta
            property="og:image"
            content={`https://www.mitsunee.com/${props.image}`}
            key={"og:image"}
          />
        </>
      )}

      <meta name="twitter:card" content={props.twitterCard || "summary"} />
      <meta name="twitter:creator" content="@Mitsunee" />
    </>
  );
};

export default Meta;

import { Meta } from "lib/Meta";
import { Section } from "lib/Section";
import { Headline } from "lib/Headline";

export default function Error() {
  return (
    <Section>
      <Meta
        title="Error | Mitsunee | Blog"
        description="Page not Found"
        isError={true}
      />
      <Headline>404 Page Not Found</Headline>
      <p>This page could not be found.</p>
    </Section>
  );
}

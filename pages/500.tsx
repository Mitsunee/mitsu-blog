import { Meta } from "lib/Meta";
import { Section } from "lib/Section";
import { Headline } from "lib/Headline";

export default function Error() {
  return (
    <Section>
      <Meta
        title="Error | Mitsunee | Blog"
        description="An Error has occurred"
        isError={true}
      />
      <Headline>500 Internal Server Error</Headline>
      <p>Something went wrong.</p>
    </Section>
  );
}

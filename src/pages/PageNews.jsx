
import Helmet from '../components/Helmet'


import Section, { SectionTitle, SectionBody } from '../components/Section'

import Grid from '../components/Grid'


function PageNews() {
  return (
    <Helmet title="Tin tức ">

      <Section>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >

          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}
      <Section>
        <SectionTitle>
          Danh mục tin tức
        </SectionTitle>
        <SectionBody>
          <Grid
            col={8}
            mdCol={4}
            smCol={4}
            gap={20}
          >

          </Grid>
        </SectionBody>
      </Section>



      <Section>
        <SectionTitle>
          tin tức
        </SectionTitle>


      </Section>

    </Helmet>
  );
}

export default PageNews;
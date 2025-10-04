import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';

export default function FAQ() {
  return (
    <div>
      <Container sx={{ pt: 5 }}>
        {/* Question 1 */}
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">What topics does this blog cover?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Our blog publishes articles about Technology, Startups, Lifestyle, and Finance. 
              The goal is to share knowledge in a simple, practical way that adds value to your daily life or business.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 2 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Can I filter articles by category?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can filter by categories like "Technology" or "Finance" using the top menu. 
              Only articles from the selected category will be displayed.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 3 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">Are the articles free to read?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              All articles are free and open to read. In the future, we may add premium content 
              for subscribers, but the main content will always remain accessible to everyone.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 4 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography component="span">Can I share the blog articles?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Absolutely! You are welcome to share any article on social media or with friends. 
              Our goal is to reach as many readers as possible.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

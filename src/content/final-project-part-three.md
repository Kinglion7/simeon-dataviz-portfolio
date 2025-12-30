# The final data story
> Include a link to your final data story on Shorthand, Esri StoryMaps, etc. here. 

**Live Visualization:** [https://kinglion7.github.io/fencing_final_visualization](https://kinglion7.github.io/fencing_final_visualization)

# Changes made since Part II
> Include few paragraphs that reflects on changes you made since the completion of Part II. 

Based on the user research findings from Part II, I implemented several key changes to improve the clarity, consistency, and narrative flow of the data story. The most significant improvements focused on standardizing the design language and enhancing narrative guidance throughout the middle sections of the story.

To address the inconsistent color palette mentioned by multiple interviewees, I built a consistent three-weapon color palette that is used uniformly across all visualizations. This creates a cohesive visual system where each weapon (Foil, Epee, and Saber) has its own distinct color that appears consistently throughout the story. Additionally, I increased the visual hierarchy by making the cost and progression charts larger and more prominent, ensuring that key insights are not missed by readers.

The middle sections of the story received substantial narrative improvements. I added a real fencer persona section with a detailed timeline showing an actual progression path, which addresses the feedback about wanting more personal connection to the data. I also rewrote transitions between sections to be smoother and more interpretive, helping readers understand why certain patterns matter and what they mean in context. To further guide readers through the Next.js/GSAP scrollable website, I added chapter markers that help orient readers and provide clear navigation points throughout the story.

## The audience
> Talk about who you identified as the audience for your final data story.  Include any other information you've used that helped you narrow the focus (e.g. insights from your interviews, personas, etc.).  Note any specific adjustments you made to your final project to make it work for your audience.

My story is aimed at four primary audiences:

**Beginner and intermediate fencers trying to understand rating progression** - These fencers are actively competing and working toward higher ratings, but may not have a clear understanding of the realistic time and financial investment required. They need concrete data about tournament counts and costs to set appropriate expectations for their journey.

**Parents evaluating cost commitments** - Parents of young fencers need transparent information about the financial investment required to support their child's fencing goals. This audience is particularly concerned with understanding realistic cost expectations and whether the investment is justified.

**Coaches and club owners who want to communicate expectations** - These stakeholders need data-driven insights to help set realistic expectations for their fencers and families. They can use this information to guide conversations about progression timelines and financial planning.

**General sports analytics enthusiasts curious about skill progression** - This broader audience is interested in understanding how skill progression systems work across different sports and what factors influence advancement rates.

This target audience was identified through the user research process in Part II, where interviews with a parent of a competitive fencer, a college fencer, and a data-curious sports fan revealed that while the story appeals to multiple groups, each has specific information needs. To accommodate these diverse audiences, I ensured the story includes both technical details for experienced fencers and clear explanations for those new to fencing. The addition of the fencer persona section and improved narrative transitions help make the data more relatable and accessible across all audience segments.

## Final design decisions
> You can specifically break out your design decisions here, or include it under *Changes made since Part II* and delete this section. Talk about the design decisions you had to make along the way, and reflect on anything in particular that stands out to you that you learned working through the process.  Include any other information that helps round out your data story. 

One of the most important design decisions was determining how much context to provide about fencing itself. Fencing is a sport with three distinct weapons—Foil, Epee, and Saber—each with different rules, target areas, and competitive characteristics. The sport also has a rating classification system with five main levels: Unrated (U), E, D, C, B, and A, where A represents the highest achievement. Additionally, tournaments are classified into 13 different event types (Unrated, E1, D1, C1, C2, C3, B1, B2, B3, A1, A2, A3, A4) that determine the level of competition and what ratings can be earned.

I needed to strike a balance between providing enough context for non-fencers to understand the story while not overwhelming readers with technical details that aren't essential to the narrative. I chose to introduce the three weapons and the five-level rating classification system early in the story, as these are fundamental to understanding the comparisons being made. However, I deliberately avoided going into intricate details like explaining the "right of way" rules for Saber and Foil, as these technical aspects aren't necessary for understanding the cost and progression analysis. Similarly, I provided enough information about the 13 event classifications to help readers understand why certain tournament types matter for rating progression, without diving into the specific rules governing each classification level.

This balance was crucial because user research revealed that both fencing-experienced and non-fencing audiences needed different levels of explanation. By providing the essential context about weapons and ratings upfront, and then using the event classifications as supporting detail throughout the analysis, I was able to create a story that is accessible to all audiences while maintaining the depth needed for meaningful insights.

## References
> **You should have already included detailed references on your Shorthand story** - if so, you do not need to list them twice, unless you used additional references for specific to your writeup. Use this section to capture any additional special notes or information necessary. If there is additional information for your shorthand readers that you've placed on this page, link from Shorthand to this page. Make sure to double-check that you aren't using copyright material and that you have added / updated any citations or other content that you used to create your data story.  Make sure you have cited external sources correctly. 

- **Next.js**: Framework for building the scrollable website
- **GSAP**: Library for scrollable animations and interactions
- **React Charts**: Library for interactive data visualizations
- **Fencingtimelive**: Source of tournament data

## AI acknowledgements
> If you used AI to help you complete this assignment (within the parameters of the instruction and course guidelines), detail your use of AI for this assignment here.

I used **Cursor** and the AI models integrated within it (including Claude and other language models) to assist with this project in the following ways:

- **Documentation and structure**: Assistance in organizing the wireframes, storyboards, and user research findings into a clear, structured format
- **Content refinement**: Help in refining interview questions and synthesizing user feedback
- **Template formatting**: Guidance in maintaining the template structure while integrating new content

All research insights, design decisions, and user feedback interpretations are my own work, with AI serving as a collaborative tool for documentation and organization support.

# Final thoughts
> You can summarize any final thoughts / reflections that don't fit well in the previous sections here.  How did it go?  What did you run out of time for, or wish you had a chance to revisit?  What were you most excited about?  Include any final reflections as you think they might help us understand your process.  If you already included such reflections elsewhere, you can delete this section. 

The findings from this analysis were quite interesting, and revealed that the weapon with the smallest target area—Foil—appears to be the hardest to  progress in, as it takes more time and money to reach the top rating levels compared to the other weapons. This insight was particularly compelling because it suggests that the technical difficulty of a weapon may correlate with the investment required to achieve mastery.

Unfortunately, I was limited by the dataset. Since the data only covers 5 years (2021-2025), we are limiting the timeframe of progression analysis. If data was available for 10 years of fencing tournaments, the findings would be more accurate and may push or lower averages and tournament costs. With the current data, Epee and Foil data cover 5 years, however Saber data only covers 3 years. This means the findings cannot be fairly compared with Saber, as the shorter timeframe may not capture the full progression patterns for that weapon.

In the future, it would be interesting to see if fencing is becoming more competitive by analyzing whether the average time for getting to the highest rating was smaller in different time periods. For example, comparing progression rates from 2015-2020 versus 2021-2025 could reveal trends in the sport's competitiveness and whether the path to higher ratings is becoming more or less accessible over time. This type of longitudinal analysis would provide valuable insights into how the sport is evolving and whether the barriers to advancement are changing.


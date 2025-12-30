# Wireframes / storyboards

> Using your sketches developed last week, further develop your story outline and relevant components visually through the use of wireframing / storyboards. Using your outline as a guide, include high-fidelity, individual draft data visualizations of the critical elements of your story you want to share with your reader. Note: you can build these elements out directly in Shorthand this week if you wish.  Reminder: this template is intended to help, but it doesn't substitute for reading through the full homework assignment!  The assignment page on Canvas includes many important details for completing Part II of the final project. 

## Draft Story Outline (Updated)

**Story Title:** "What Does It Really Take to Earn a Fencing Rating?"

Below is the refined narrative based on my Part I pitch and the direction of the project:

**Narrative Flow:**

1. **Hook** - Quick explainer on what the fencing rating ladder is (U → E → D → C → B → A). Goal: ground non-fencers and give fencers a shared language.

2. **Meet the Dataset** - Show the 2021–2025 tournament dataset and give a sense of scale (all three weapons, tens of thousands of rows).

3. **Tournament Journey** - How many tournaments fencers typically compete in before leveling up. Focus: U→E, E→D, D→C, C→B, B→A.

4. **What Kind of Tournaments Matter?** - Break down by tournament classifications (E1, D1, C1, Open events, etc.)

5. **The Hidden Price Tag** - Estimate costs by combining average entry fees × tournament counts.

6. **Weapon Comparison** - Which weapon is "most expensive" to level up?

7. **Real Fencer Case Study** - A realistic persona (ex: "Liam, a 17-year-old Foilist chasing a C") and what his real progression looks like.

8. **So… Is It Worth It?** - Final reflection + insights for parents, fencers, and coaches.

## Storyboards / Wireframes (Text Version)

Below is a storyboard-like walkthrough of how the story will unfold visually. 

**Live Visualization:** [https://kinglion7.github.io/fencing_final_visualization](https://kinglion7.github.io/fencing_final_visualization)

**Section 1 — Rating Ladder Intro**
- Visual: Simple rating-ladder graphic (U → A)
- Interaction: Hover reveals definition of each rating

**Section 2 — Dataset Preview**
- Visual: Clean, minimal bar chart showing number of tournaments by year
- Purpose: Establish credibility & dataset size

**Section 3 — Tournament Count to Level Up**
- Visual: Bar charts per weapon showing avg tournaments needed per rating jump
- Small callouts like "Epee takes the longest jump from D→C"

**Section 4 — Tournament Class Mix**
- Visual: Stacked bar charts for each rating jump showing % of E1/D1/C1/Open events
- Note: Add annotation: "Most upgrades happen at mixed-level regional events"

**Section 5 — Cost Breakdown**
- Visual: Box plot of tournament entry fees
- Cost estimator graphic (tournaments × avg fee)
- Highlight: Include a bold number: "It costs ~$X to go from D→C in Saber"

**Section 6 — Weapon Comparison**
- Visual: Side-by-side cost bars (Foil vs Epee vs Saber)
- Color-coded with unified palette

**Section 7 — Fencer Case Study**
- Persona: "Liam, 17, Foilist chasing a C"
- Visual: Timeline of tournaments he fenced, cost estimate, travel map

**Section 8 — Conclusion**
- Clean summary, CTA: "How might we make the path more accessible?"

# User research 

## Research Goal

The goal of this user research is to evaluate the clarity, effectiveness, and accessibility of the data story about fencing rating costs and tournament requirements. Specifically, I aim to understand:

- Whether the narrative structure and flow effectively guide readers through the complex data
- How well the visualizations communicate the key insights about tournament counts and costs
- Whether the story is accessible to both fencing-experienced and non-fencing audiences
- What improvements are needed to make the data more interpretable and actionable

This research will inform refinements for Part III to ensure the final story effectively communicates the financial and time investment required to achieve different fencing ratings.

## Target audience
> Include your approach to identifying representative individuals, and who you hope to reach with your story. 

My story is aimed at:

- Beginner and intermediate fencers trying to understand rating progression
- Parents evaluating cost commitments
- Coaches and club owners who want to communicate expectations
- General sports analytics enthusiasts curious about skill progression

**How I Chose Interviewees:**

I looked for people who represent the groups above. I did not collect names or identifying info. Interviewees were described in general terms only.

I showed each person:
- A draft storyboard of the Next.js/GSAP scrollable website
- Rough wireframes
- Two early charts (tournament count + cost bar chart)

## Interview script
> List the goals from your research, and the questions you intend to ask. 

| Goal | Questions to Ask |
|------|------------------|
| **Warm-up & Context** | 1. What is your familiarity with fencing ratings?<br>2. When you think about progressing in a sport, what matters most to you (time, cost, difficulty, skill-based milestones)? |
| **Storyboard walkthrough** | 3. Does the overall story structure make sense?<br>4. Which parts felt clear vs confusing?<br>5. Was the flow too slow, too fast, or just right? |
| **Visual clarity** | 6. How well do the charts communicate what's happening?<br>7. Which chart catches your attention first?<br>8. Is anything hard to interpret or visually unclear? |
| **Accessibility & tone** | 9. Do the colors feel consistent or distracting?<br>10. Do you feel guided through the story, or do you find yourself needing more explanation? |
| **Wrap-up** | 11. What is one thing I could improve visually?<br>12. What is one thing I could improve narratively? |

## Interview findings
> Detail the findings from your interviews.  Do not include PII.  Capture specific insights where possible.

| Questions | Interview 1 (Parent of competitive 15-year-old fencer) | Interview 2 (College fencer in early 20s) | Interview 3 (Data-curious sports fan, no fencing experience) |
|-------------------------|--------------------------------|-------------|-------------|
| **Familiarity with fencing ratings** | Very familiar - has been tracking their child's progression. Understood the rating system immediately. | Very familiar - actively competing and working toward higher ratings. | No prior knowledge - needed the intro explanation. |
| **What matters in sport progression** | Cost and time commitment are primary concerns. Wanted to see realistic expectations. | Skill milestones and difficulty of progression. Interested in understanding the path ahead. | General curiosity about skill progression systems across sports. |
| **Overall story structure** | Quote: "I had no idea it took this many tournaments just to move one rating." Liked the clean layout but wanted more annotations on the cost visuals. Flow felt appropriate. | Quote: "The tournament breakdown is super accurate, but I'd love a quicker explanation of why certain tournament types matter." Structure made sense but needed more context in middle sections. | Quote: "The intro is clear, but after the third chart I needed more guidance on why the patterns matter." Flow was good but needed more narrative bridges. |
| **Parts that were clear vs confusing** | Cost section was most valuable. Tournament classification breakdown was somewhat confusing without annotations. | Tournament classifications needed explanation. Cost analysis was the clearest and most engaging part. | Rating ladder intro was excellent. Middle sections (tournament types, classifications) needed more explanation. |
| **Flow pace** | Just right - not too fast, not too slow. Appreciated the progressive reveal of information. | Slightly too fast in the middle sections. Wanted to pause and understand tournament classifications better. | Good overall, but needed more pauses for interpretation in data-heavy sections. |
| **Chart communication** | Charts were clear but needed more interpretive text. Cost charts were most effective. | Quote: "The cost numbers were the most interesting part." Charts communicated well but needed tooltips for technical terms. | Charts were visually appealing but needed more context about what patterns to look for. |
| **Attention-grabbing elements** | Cost breakdown chart caught attention first. Tournament count charts were secondary. | Cost comparison across weapons was most engaging. | Rating ladder graphic was most memorable and effective. |
| **Visual clarity issues** | Some charts needed annotations explaining why certain patterns emerged (e.g., why Epee takes longer). | Wanted tooltips or hover notes to explain classification codes (E1, D1, etc.) without cluttering the design. | Suggested making key insights more visually bold so they aren't missed. Some charts felt too subtle. |
| **Color consistency** | Quote: Color palette felt "okay but a bit scattered." Suggested unifying colors across all visualizations. | Noted some inconsistency in color usage between different chart types. | Colors were pleasant but didn't create a cohesive visual system. |
| **Narrative guidance** | Felt well-guided through the story but wanted more personal connection. | Needed more explanation in middle sections, especially around tournament classifications. | Quote: "After the third chart I needed more guidance on why the patterns matter." Wanted more interpretation. |
| **Visual improvement suggestion** | Suggested adding a "real fencer story" to make the data feel more personal. Also wanted more annotations on cost visuals. | Wanted hover explanations for classification codes. Suggested making cost charts larger/more prominent. | Suggested making key insights more visually bold. Wanted a "how to read this" guide for complex charts. |
| **Narrative improvement suggestion** | Add more context about why certain tournament types matter. Include real-world examples. | Add quicker explanations of tournament classifications. Smooth out transitions between sections. | Add more interpretation of what patterns mean. Include more "so what" moments throughout. |

**Synthesis of Findings:**

Across all interviews, three themes emerged:

1. **Add interpretation directly on the visuals** - People understood the charts but wanted short text callouts explaining why certain jumps were costly or why Epee takes longer.

2. **Standardize design language** - Multiple interviewees mentioned inconsistent colors or styling. A unified palette would help.

3. **More narrative guidance in the middle sections** - Especially around tournament classifications and cost modeling.

# Identified changes for Part III
> Document the changes you plan on implementing next week to address any issues identified.  

| Research synthesis | Anticipated changes for Part III |
|------------------------------------------|---------------------------------------------------------------------------------|
| **Add interpretation directly on visuals** | Add short annotations under each key chart ("What this means"). Add hover explanations for event classification codes (E1, D1, etc.). |
| **Standardize design language** | Build a consistent three-weapon color palette. Increase visual hierarchy (make cost & progression charts bigger). |
| **More narrative guidance in middle sections** | Add a real fencer persona section with a timeline. Rewrite transitions to be smoother. Add chapter markers in the Next.js/GSAP scrollable website to guide readers. |
| **Improve accessibility** | Add a short "How to read this chart" panel for the cost estimator. Make key insights more visually bold so they aren't missed. |

> ...include any final thoughts you have here. 

The user research revealed that while the data story is compelling, it needs more interpretive guidance and visual consistency. The planned changes for Part III will address these concerns by adding annotations, standardizing the design system, and improving narrative flow. The addition of a real fencer case study will also help make the data more relatable and personal, addressing feedback from multiple interviewees.

## References
_List any references you used here._

- **Next.js**: Framework for building the scrollable website
- **GSAP**: Library for scrollable animations and interactions
- **React Charts**: Library for interactive data visualizations
- **Fencingtimelive**: Source of tournament data

## AI acknowledgements
_If you used AI to help you complete this assignment (within the parameters of the instruction and course guidelines), detail your use of AI for this assignment here._

I used **Cursor** and the AI models integrated within it (including Claude and other language models) to assist with this project in the following ways:

- **Documentation and structure**: Assistance in organizing the wireframes, storyboards, and user research findings into a clear, structured format
- **Content refinement**: Help in refining interview questions and synthesizing user feedback
- **Template formatting**: Guidance in maintaining the template structure while integrating new content

All research insights, design decisions, and user feedback interpretations are my own work, with AI serving as a collaborative tool for documentation and organization support.


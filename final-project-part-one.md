| [home page](https://cmustudent.github.io/tswd-portfolio-templates/) | [data viz examples](dataviz-examples) | [critique by design](critique-by-design) | [fencing visualization](fencing-visualization) | [final project I](final-project-part-one) | [final project II](final-project-part-two) | [final project III](final-project-part-three) |

# Final Project Part I: The Cost of Fencing Ratings

## Outline

This project aims to reveal the hidden financial and time investment required to achieve different fencing ratings across the three weapons (Foil, Epee, and Saber). The story will demonstrate the sheer number of tournaments fencers must compete in to earn each rating level (E, D, C, B, and A), calculate the average tournament entry fees, and ultimately show the total cost required to achieve each rating. By comparing these costs across weapons, we will answer a critical question: which weapon rating costs the most, and more importantly, is it really worth it?

The narrative will unfold through a scrollable data story that guides readers through the journey of a fencer's progression. We'll start by establishing the context of the fencing rating system and why it matters. Then we'll reveal the tournament requirements for each rating level, showing both the quantity of tournaments needed and the composition of tournament classifications (Unrated, E1, D1, C1, etc.) required. Next, we'll introduce the financial dimension by calculating average entry fees and total costs. The story will culminate in a comparison across weapons, highlighting which weapon requires the greatest investment, and conclude with a reflection on whether the pursuit of higher ratings justifies the financial and time commitment.

**Story Structure:**
1. **Hook/Introduction**: The hidden cost of fencing excellence - what does it really take to earn a rating?
2. **Setting the Stage**: Understanding the fencing rating system (U → E → D → C → B → A)
3. **The Tournament Journey**: Visualizing how many tournaments are needed for each rating level
4. **The Price Tag**: Calculating average entry fees and total costs per rating
5. **The Comparison**: Which weapon costs the most? Side-by-side comparison of Foil, Epee, and Saber
6. **The Question**: Is it worth it? Reflection on the investment required

## Initial sketches

The initial data exploration and visualization sketches can be found in the `Rating_Analysis.ipynb` notebook. The analysis includes:

- **Box plots** showing the distribution of tournaments required to achieve each rating level across the three weapons. These visualizations reveal the variability in tournament requirements and help identify outliers and typical paths fencers take.

- **Pie charts** displaying the composition of tournament event classifications (Unrated, E1, D1, C1, C2, C3, B1, B2, B3, A1, A2, A3, A4) that fencers participate in to earn each rating. This shows the mix of tournament types needed at each level.

These initial visualizations will be refined and integrated into the final scrollable story format, with additional charts showing cost analysis and cross-weapon comparisons.

![Initial Analysis - Box Plot](Fill_db_data/Fill_db_data/Rating_Analysis.ipynb)
![Initial Analysis - Pie Chart](Fill_db_data/Fill_db_data/Rating_Analysis.ipynb)

*Note: The box plot and pie chart outputs from Rating_Analysis.ipynb demonstrate the tournament requirements and classification composition for achieving different ratings.*

# The data

The dataset for this project comes from Fencingtimelive, an online platform that maintains comprehensive records of fencing tournaments across the United States. The data was provided by Dan Berke, the creator of Fencingtimelive, and includes detailed tournament results spanning from 2021 to 2025.

The dataset consists of three CSV files—one for each weapon:
- `EpeeResults.csv` - Tournament results for Epee fencers
- `FoilResults.csv` - Tournament results for Foil fencers  
- `SaberResults.csv` - Tournament results for Saber fencers

Each file contains comprehensive tournament information including tournament name, location, date, event classification level, fencer names, initial and final ratings, earned ratings, and club affiliations. The key columns for our analysis are:
- `weaponRating`: The fencer's rating at the start of the tournament
- `earned`: The rating earned at the tournament (if any)
- `classification`: The tournament event classification (U, E1, D1, C1, C2, C3, B1, B2, B3, A1, A2, A3, A4)
- `name` and `club1Name`: Used together to uniquely identify individual fencers

This data allows us to track individual fencers' progression from unrated (U) through each rating level (E, D, C, B, A) and calculate the average number of tournaments and tournament classification composition required to achieve each rating. We will also incorporate average tournament entry fee data to calculate the total financial investment required.

| Name | URL | Description |
|------|-----|-------------|
| Fencingtimelive Tournament Data | Provided by Dan Berke | Tournament results data for Foil, Epee, and Saber from 2021-2025, including fencer ratings, tournament classifications, and competition outcomes |
| EpeeResults.csv | [Fill_db_data/Fill_db_data/EpeeResults.csv](Fill_db_data/Fill_db_data/EpeeResults.csv) | Epee tournament results with fencer progression data |
| FoilResults.csv | [Fill_db_data/Fill_db_data/FoilResults.csv](Fill_db_data/Fill_db_data/FoilResults.csv) | Foil tournament results with fencer progression data |
| SaberResults.csv | [Fill_db_data/Fill_db_data/SaberResults.csv](Fill_db_data/Fill_db_data/SaberResults.csv) | Saber tournament results with fencer progression data |

# Method and medium

This project will be built using **React Charts** to create an interactive, scrollable data story. The narrative will unfold as users scroll through the page, with charts and visualizations appearing at key moments to support the story. This scroll-triggered approach allows for a cinematic storytelling experience where data visualizations are revealed progressively, maintaining reader engagement and guiding them through the analysis.

The story will feature multiple chart types including:
- Bar charts comparing tournament requirements across weapons and ratings
- Box plots showing the distribution of tournaments needed
- Pie/donut charts displaying tournament classification composition
- Cost comparison visualizations
- Interactive elements allowing users to explore specific weapons or rating levels

The scrollable format with narrative text interspersed between visualizations will help readers understand both the quantitative findings and their implications for the fencing community. This medium is well-suited for presenting a data-driven story that builds understanding progressively while maintaining visual interest throughout the journey.

## References

- **React Charts**: [https://react-charts.tanstack.com/](https://react-charts.tanstack.com/) - Library for building interactive, responsive charts in React
- **Fencingtimelive**: [https://www.fencingtimelive.com/](https://www.fencingtimelive.com/) - Online platform for fencing tournament records and results
- **Dan Berke**: Creator of Fencingtimelive and provider of the tournament data used in this analysis
- **USA Fencing**: National governing body for the sport of fencing in the United States

## AI acknowledgements

I used **Cursor** and the AI models integrated within it (including Claude and other language models) to assist with this project in the following ways:

- **Code development**: Assistance with React Charts implementation, data processing scripts, and visualization code structure
- **Data analysis guidance**: Help with data manipulation approaches and statistical analysis methods for calculating tournament requirements and averages
- **Documentation**: Assistance in structuring and refining the project outline and documentation

All analytical insights, design decisions, and final interpretations are my own work, with AI serving as a collaborative tool for implementation and documentation support.

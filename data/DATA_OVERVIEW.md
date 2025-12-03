# Data Dictionary

This document describes the structure, fields, and meaning of each dataset used in the project. All datasets are located in the `/data` folder.

---

## 1. `datingapps.csv`
**Description:** Survey data showing dating app usage across demographic groups (age, sexuality). Used in: What dating apps people are using visualization (`project-root/viz/datingapps.html`)

| Field | Format | Type | Description |
|-------|------|------|-------------|
| Group | text | categorical | Demographic group ("All", "Ages 18–29", "Ages 30-49", "Ages 50-64", "Ages 65+", "Straight" "LGB"). |
| Tinder | number | continuous | % using Tinder. |
| Bumble | number | continuous | % using Bumble. |
| Hinge | number | continuous | % using Hinge. |
| OkCupid | number | continuous | % using OkCupid. |
| Match | number | continuous | % using Match. |
| eHarmony | number | continuous | % using eHarmony. |
| Grindr | number | continuous | % using Grindr. |
| HER | number | continuous | % using HER. |
| Other | number | continuous | % using any other app. |

**Source:** Data cleaned and derived from 2022 Pew Research Center's American Trends Panel (Wave 111 July 2022). Filtered for respondents who have ever used a dating app or website to arrive at final analytic sample (n=3128).

---

## 2. `essays.csv`
**Description:** OKCupid essay fields for linguistic analysis. OKCupid uses responses to short answer questions and three essay questions to match people. Essay responses to the following question: "You should message me if_". Used in: People still value connection (`project-root/viz/wordmap.html`)

| Field | Type | Description |
|-------|------|-------------|
| essay9 | text | User responses to essay questions for matching. |

**Source:** Data derived from OKCupid Dating Site Dataset, hosted on Kaggle (by user Subham Yadav). Essay responses were cleaned and compiled into one column (n=47343). 

---

## 3. `HarvardData.csv`
**Description:** Harvard-specific survey responses on dating app usage. Used in: What dating apps people are using (`project-root/viz/datingapps.html`) and How do your online dating habits compare with those of Harvard students? (`project-root/viz/endingsurvey.html`)

### Auto-collected Respondent Metadata
| Field | Type |
|-------|------|
| `StartDate` | text |
| `EndDate` | text | 
| `Status` | text |
| `IPAddress` | text | 
| `Progress` | text |
| `Duration (in seconds)` | text |
| `Finished` | text |
| `RecordedDate` | text |
| `ResponseId` | text |
| `RecipientLastName` | text |
| `RecipientFirstName` | text |
| `RecipientEmail` | text |
| `ExternalReference` | text |
| `LocationLatitude` | text |
| `LocationLongitude` | text |
| `DistributionChannel` | text |
| `UserLanguage` | text |
### Survey Questions
| Field | Format | Type | Description |
|-------|------|------|-------------|
| `Q1` | number | continuous | Respondent age |
| `Q6` | text | ordinal | Year at Harvard ("First-year", "Sophomore", "Junior", "Senior", "Graduate student", "Other / non-degree") |
| `Q7` | text| categorical | Gender identity ("Man", "Woman", "Nonbinary / genderqueer", "Prefer to self-describe", "Prefer not to say") |
| `Q7_5_TEXT` | text | Self-described gender identity. |
| `Q8` | text| categorical | Sexual orientation: "Straight / heterosexual", "Gay / Lesbian", "Bisexual", "Queer", "Pansexual", "Questioning / Not sure", "Prefer not to say". |
| `Q8_9_TEXT` | text | | Self-described sexual orientation. |
| `Q9` | text| categorical (multi-select) | Race/ethnicity ("Asian", "White", "Black / African American", "Hispanic or Latino/a/x") |
| `Q9_8_TEXT` | text | | Self-described race/ethnicity. |
| `Q19_1` | text | categorical | "Does your partner / most recent partner go or did they go to Harvard?" ("Yes", "No", "Not applicable") |
| `Q20` | text | categorical | Where partner is based |
| `Q16` | text | categorical | "Have you used dating apps?" ("Yes", "No") |
| `Q8.1` | text | categorical | "Does your sexual identity influence your dating app experience?" ("Yes", "No", "Not sure") |
| `Q39` | text | categorical | "Have you ever been on a date with someone you met online?": "Yes", "No". |
| `Q42_1` | text | ordinal | Comfort using dating apps (Likert scale) ("Very comfortable", "Somewhat comfortable", "Neutral", "Somewhat uncomfortable", "Very uncomfortable") |
| `Q43` | text | ordinal | Comfort meeting people online (Likert scale) (same scale as Q42_1) |
| `Q9.1` | text | categorical | Additional race/ethnicity choice (secondary selection) (similar categories as Q9) |
| `Q9_9_TEXT` | text | | Additional self-described ethnicity |
| `Q10` | text | categorical | "Have you used dating apps in the last 12 months?" ("Yes", "No") |
| `Q10_6_TEXT` | text | | Self-described response for Q10 "Other". |
| `Q11` | text | categorical (multi-select) | Dating apps used ("Tinder", "Hinge", "Bumble", "OkCupid", "Grindr", "HER", "Coffee Meets Bagel", "Other") |
| `Q12` | text | categorical | Frequency of app usage ("Daily", "Weekly", "Monthly", "Rarely", "Never") |
| `Q13` | text | ordinal | Matches in the past 12 months ("0", "1–5", "6–10", "11–20", "20+") |
| `Q14_1` | number | ordinal | How much respondents value attractiveness when swiping (Likert). |
| `Q14_2` | number | ordinal | How much respondents value personality/bio when swiping (Likert). |
| `Q14_3` | number | ordinal | How much respondents value shared interests when swiping (Likert). |
| `Q15_1` | number | ordinal | Importance of finding a long-term relationship (Likert). |
| `Q33` | text | ordinal | Frequency of going on dates ("Never", "Rarely", "Sometimes", "Often", "Very often") |
| `Q11.1` | text | categorical | Overall experience with dating apps ("Very positive", "Somewhat positive", "Neutral", "Somewhat negative", "Very negative") |
| `Q37` | text| categorical (multi-select) | respondent negative experiences while online dating ("Ghosted", "Unwanted sexual messages", "Catfished", "Scammer", "Harassment", "Offensive language") |
| `Q38` | text | categorical | How respondents initiate conversation ("A simple greeting", "A pickup line", "A question about their profile", "A joke", "I don't usually initiate") |
| `Q38_5_TEXT` | text | | Self-described initiation method. |
| `Q17` | text | categorical | How respondents met their partner ("Online/dating app", "Mutual friends", "At school/work", "Other") |
| `Q17_8_TEXT` | text | Self-described meeting method. |
| `Q18` | number | ordinal | Year respondents met their partner (e.g., 2019, 2020, 2021). |
| `Q19` | text | categorical | "Does your partner / most recent partner go or did they go to Harvard?" ("Yes", "No") |
| `Q20.1` | categorical | | Where partner is based (open text categories). |
| `Q21` | text | categorical | Type of relationship ("Different gender relationship", "Same-gender relationship", "I don't currently have a partner") |
| `Q41` | text | | Open-ended free-response about online dating or survey feedback. |

**Source:** Data collected via a Qualtrics survey designed and publicized by all members of the group from current students and affiliates at Harvard. Questions in our survey were designed to mirror questions used in other surveys (n=96).

---

## 4. `hcmst_cleaned.csv`
**Description:** Data on the length and quality of relationships of respondents from across the US. Used in: Meaningful connections continue to happen and be maintained after couples meet online (`project-root/viz/relationshipquality.html`)
| Field | Format | Type | Description |
|-------|------|------|-------------|
| either_internet | text | categorical | Whether couples met online ("Yes", "No") |
| how_long_ago_first_met | number | continuous | How long ago respondents first met their partner (in years) |
| how_long_ago_first_romantic | number | continous | How long ago respondents began their romantic relationship with their partner (in years) |
| how_long_relationship | number | continuous | How long respondents' relationship has been (in years) |
| married | text | categorical | Whether respondents are married ("not married", "married") |
| relationship_quality | text | ordinal | The quality of respondents' relationships ("fair", "good", "excellent") |
| relationship_quality_num | number | ordinal | The quality of respondents' relationships (Likert) |

**Source:** Data derived from Stanford's How Couples Meet and Stay Together 2017 Dataset (n=99). Data were cleaned to include variables on the length and quality of respondent relationships.

---

## 5. `rankedmeetingmethods.csv`
**Description:** Historical data on how couples met by decade. Used in: How people met their partners across the decades (`project-root/viz/rankedmeetingmethods.html`)

| Field | Format | Type | Description |
|-------|------|------|-------------|
| decade_met | text | ordinal | Decade ("1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2020s") |
| meeting_method | text | categorical | How the couple met ("Online", "Friends", "Work", "Bars/Social Venues", "Dating Services (Offline)", "Family", "Religious", "School/College") |
| frequency | number | continuous | Count of couples reporting this method. |

**Source:** Data derived from Stanford's How Couples Meet and Stay Together 2017 Dataset (n=99). 

---

## 6. `rankedmeetingmethodsharvard.csv`
**Description:** Harvard-specific meeting method responses Used in: How people met their partners across the decades (`project-root/viz/rankedmeetingmethods.html`).

| Field | Format | Type | Description |
|-------|------|------|-------------|
| method | text | categorical | How respondents met their partner ("Online/dating app", "Mutual friends", "At school/work", "Other") |

**Source:** Data are derived from `HarvardData.csv`.

---

## 7. `swipedata.csv`
**Description:** Swipe success rates. Used in: How men and women swipe (and match) (`project-root/viz/swipesuccessbygender.html`)

| Field | Format | Type | Description |
|-------|------|------|-------------|
| gender | text | categorical | "male" or "female". |
| right_swipes | number | continuous | Right-swipes per day (median). |
| matches | number | continuous | Number of matches (median). |
| success_rate | number | continuous | Match-per-like ratio (based on median values). |

**Source:** Data are derived from Swipestats The Truth Behind Dating Apps (including data generated and shared by other users via this platform/tool).
---
## 8. `adjectives.csv`
**Description:** Top 50 mentioned adjectives in essays.csv. Used in: People still value connection: (`project-root/viz/connection_word_map_combined.html)

| Field | Format | Type | Description |
|-------|------|------|-------------|
| pos | text | categorical | Part of speech |
| keyword | text | categorical | Top 50 mentioned adjective that the essay response contains. |
| frequency | number | discrete | Number of times keyword shows up in dataset. |
| essay_index | number | categorical | Unique index given to essay for randomizing purposes. |
| essay | text | categorical | Unique essay response given by OkCupid user. |

**Source:** Data derived from OKCupid Dating Site Dataset, hosted on Kaggle (by user Subham Yadav). Adjectives were extracted from essay answers, and dataset was then cleaned.
---
## 9. `verbs.csv`
**Description:** Top 50 mentioned verbs in essays.csv. Used in: People still value connection: (`project-root/viz/connection_word_map_combined.html)

| Field | Format | Type | Description |
|-------|------|------|-------------|
| pos | text | categorical | Part of speech |
| keyword | text | categorical | Top 50 mentioned verb that the essay response contains. |
| frequency | number | discrete | Number of times keyword shows up in dataset. |
| essay_index | number | categorical | Unique index given to essay for randomizing purposes. |
| essay | text | categorical | Unique essay response given by OkCupid user. |

**Source:** Data derived from OKCupid Dating Site Dataset, hosted on Kaggle (by user Subham Yadav). Verbs were extracted from essay answers, and dataset was then cleaned.
---
## 10. `nouns.csv`
**Description:** Top 50 mentioned nouns in essays.csv. People still value connection: (`project-root/viz/connection_word_map_combined.html)

| Field | Format | Type | Description |
|-------|------|------|-------------|
| pos | text | categorical | Part of speech |
| keyword | text | categorical | Top 50 mentioned noun that the essay response contains. |
| frequency | number | discrete | Number of times keyword shows up in dataset. |
| essay_index | number | categorical | Unique index given to essay for randomizing purposes. |
| essay | text | categorical | Unique essay response given by OkCupid user. |

**Source:** Data derived from OKCupid Dating Site Dataset, hosted on Kaggle (by user Subham Yadav). Nouns were extracted from essay answers, and dataset was then cleaned.
---
## 11. `hcmst_percentage.csv`
**Description:** Self-reported relationship quality. Used in: Meaningful connections continue to happen and be maintained after couples meet online: (`project-root/viz/relationshipquality.html`).

| Field | Format | Type | Description |
|-------|------|------|-------------|
| either_internet | text | categorical | Whether or not the couple met online. |
| relationship_quality_num | number | ordinal | Self-reported relationship quality from 0-4. |
| n | number | discrete | Number of cases in that category |
| pct | number | continuous| Percentage of (yes or no in the 'either_internet) in each category|

**Source:** Data derived from Stanford's How Couples Meet and Stay Together 2017 Dataset (n=99). Data was analyzed categories of relationship quality were assigned percentages of sample population.



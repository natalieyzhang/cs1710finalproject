# Visualizationship

## A Data-Driven Look at How We Match: Dating App Usage at Harvard and Beyond

### A Scrollytelling Data Visualization Website Built using D3.js

**VisualizationShip** is an interactive data-driven scrollytelling website exploring modern dating behavior and online dating among Harvard students and beyond. Find out what relationships look like today, and how you compare.

## How to Run the Project
The project can be accessed via our website or on a local server.

### Option 1 --- VS Code Live Server (Recommended)
Navigate to `project-root/index.html` in VS Code, right-click on the file, and select **Open with Live Server**. Refer to the folder structure below to ensure that all required files are present.

### Option 2 --- Website
Our project site is hosted on GitHub. Open the following link in a browser: (https://natalieyzhang.github.io/cs1710finalproject/). 

Note: Unfortunately because 'adjectives.csv','verbs.csv', and 'nouns.csv' are over 25 MB, sometimes GitHub returns an error when retrieving these files, and the 'wordmap.html' may not be able to run.

## Folder Structure

    project-root/
    │
    ├── index.html
    |
    ├── scrolly/
    │   ├── scrolly.css
    │   └── scrolly.js
    │
    ├── viz/
    │   ├── rankedmeetingmethods.html
    │   ├── datingapps.html
    │   ├── datingeasierorharder.html
    │   ├── swipesuccessbygender.html
    │   ├── balance.html
    │   ├── relationshipquality.html
    │   ├── negativeexperiences.html
    │   ├── wordmap.html
    │   └── endingsurvey.html
    |
    ├── data/
    |   ├── DATA_OVERVIEW.md
    |   ├── datingapps.csv
    |   ├── adjectives.csv
    |   ├── verbs.csv
    |   ├── nouns.csv
    |   ├── HarvardData.csv
    |   ├── hcmst_cleaned.csv
    |   ├── hcmst_percentage.csv
    |   ├── rankedmeetingmethods.csv
    |   ├── rankedmeetingmethodsharvard.csv
    |   └── swipedata.csv
    |
    ├── README.md
    |
    ├── Valentine Cute.ttf
    |
    └── images/
        ├── 1980sdatingapp.jpg
        ├── Bow.png
        ├── femalehand.png
        ├── harvardlogo.png
        ├── Heart.png
        ├── image1.jpg
        ├── malehand.png
        ├── paperdude.png
        └── stamp.png

## Libraries Used

**Core**
- D3.js v7
- D3-Cloud (word cloud layout)
- Chart.js (interactive survey charts)
- Google Fonts: Inter
- Custom Font: Valentine Cute (`project-root/Valentine Cute.ttf`)

**Browser APIs**
- IntersectionObserver (scroll-trigger logic)
- ResizeObserver (responsive SVG scaling)
- postMessage (communication between scrolly and iframe visualizations)
- `<foreignObject>` for HTML inside SVG
- CSS Animations / Keyframes

**D3 Submodules**
- d3-scale (linear, band, ordinal)
- d3-shape
- d3-axis
- d3-selection
- d3-transition
- d3-force (for clustering/jitter in datingapps visualization)

## Project Overview

The scrollytelling website takes the viewer on a journey through:
 - How people met their partners across the decades: `project-root/viz/rankedmeetingmethods.html`
 - What dating apps people are using: `project-root/viz/datingapps.html`
 - Meeting long-term partners through online dating: `project-root/viz/datingeasierorharder.html`
 - The gamification of online dating: directly in `project-root/index.html`
 - How men and women swipe (and match): `project-root/viz/swipesuccessbygender.html`
 - Is online dating overwhelming and causing insecurities?: `project-root/viz/balance.html`
 - People still value connection: `project-root/viz/wordmap.html`
 - Meaningful connections continue to happen and be maintained after couples meet online: `project-root/viz/online_hcmst.html`
 - Negative experiences on dating apps: `project-root/viz/negativeexperiences.html`
 - How do your online dating habits compare with those of Harvard students?: `project-root/viz/endingsurvey.html`

Each file in `/viz` is a self-contained HTML file embedded as an iframe in the final `project-root/index.html` file.

## Communication Between Scrolly + Viz Files

-   Direct iframe calls: `iframe.contentWindow.someFunction()`
-   `postMessage` fallback when needed

## Credits

-   Visualization design & narrative: Ida Chen, Catherine Feng, Ellen Pan, Natalie Zhang
-   Libraries: D3.js, Chart.js
-   Data sources: Stanford How Couples Meet and Stay Together 2017 (`project-root/data/rankedmeetingmethods.csv`; `project-root/data/hcmst_cleaned.csv`), 2022 Pew Research Center's American Trends Panel (Wave 111 July 2022) (`project-root/data/datingapps.csv`), Swipestats The Truth Behind Dating Apps (`project-root/data/swipedata.csv`), and Kaggle OKCupid Dating Site Dataset (`project-root/data/essays.csv`). Harvard-specific data was collected via a Qualtrics survey designed and publicized by all group members as well (`project-root/data/HarvardData.csv`; `project-root/data/rankedmeetingmethodsHarvard.csv`).

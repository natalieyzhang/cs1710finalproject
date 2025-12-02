document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".screen.hero");
  const heroCta = heroSection ? heroSection.querySelector(".hero-cta") : null;
  const sections = Array.from(document.querySelectorAll(".screen"));
  const progressList = document.querySelector(".progress-list");
  const progress = document.querySelector(".progress");

  if (!progressList || sections.length === 0 || !heroSection) {
    return;
  }

  // Lock scrolling initially
  let scrollEnabled = false;
  document.body.classList.add("scroll-locked");

  // Listen for messages from iframes (like endingsurvey.html) to scroll to top
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'scrollToTop') {
      // Scroll to the first section (hero section)
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });

  // Prevent all scroll events until button is clicked
  const preventScroll = (e) => {
    if (!scrollEnabled) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Prevent scrolling via various methods
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
  window.addEventListener("scroll", preventScroll, { passive: false });
  document.addEventListener("keydown", (e) => {
    if (!scrollEnabled && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "PageDown" || e.key === "PageUp" || e.key === " " || e.key === "Home" || e.key === "End")) {
      e.preventDefault();
    }
  });


  const progressItems = sections.map((section, index) => {
    const title = section.dataset.title || `Section ${index + 1}`;
    const listItem = document.createElement("li");
    listItem.className = "progress-item";

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Scroll to ${title}`);

    const dot = document.createElement("span");
    dot.className = "progress-dot";
    dot.setAttribute("aria-hidden", "true");

    button.append(dot);
    button.addEventListener("click", () => {
      if (scrollEnabled) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    listItem.appendChild(button);
    progressList.appendChild(listItem);

    return { listItem, button, section };
  });

  // Function to calculate and apply spacing between progress items
  function updateProgressSpacing() {
    if (!progressList || progressItems.length === 0) return;
    
    const buttonHeight = 28; // Height of each button (from CSS)
    const minSpacing = 4; // Minimum spacing between items (reduced to ensure all fit)
    const listPadding = 20; // Minimal top and bottom padding on progress-list (10px each)
    
    // Calculate available height (viewport height minus minimal padding)
    const availableHeight = window.innerHeight - listPadding;
    
    // Calculate total height needed for all buttons
    const totalButtonHeight = progressItems.length * buttonHeight;
    
    // Calculate available space for gaps
    const availableGapSpace = availableHeight - totalButtonHeight;
    
    // Calculate spacing between items - ensure all items fit
    let spacing = minSpacing;
    if (progressItems.length > 1) {
      // Calculate spacing needed to fit all items
      const requiredSpacing = availableGapSpace / (progressItems.length - 1);
      
      // If required spacing is less than minimum, use minimum (items will be slightly compressed)
      // Otherwise use the calculated spacing to center and fit all items
      if (requiredSpacing >= minSpacing) {
        spacing = requiredSpacing;
      } else {
        // If we can't fit with minimum spacing, reduce padding to make room
        spacing = minSpacing;
      }
    }
    
    // Apply spacing to each item (except the last one)
    progressItems.forEach(({ listItem }, index) => {
      if (index < progressItems.length - 1) {
        listItem.style.marginBottom = `${spacing}px`;
      } else {
        listItem.style.marginBottom = '0';
      }
    });
    
    // Update list padding to ensure vertical centering
    progressList.style.padding = `${listPadding / 2}px 0`;
  }

  // Update spacing on load and resize
  updateProgressSpacing();
  window.addEventListener('resize', updateProgressSpacing);
  
  // Also update when progress becomes visible
  const progressObserver = new MutationObserver(() => {
    if (!progress.classList.contains('is-hidden')) {
      updateProgressSpacing();
    }
  });
  if (progress) {
    progressObserver.observe(progress, { attributes: true, attributeFilter: ['class'] });
  }

  const setActive = (activeIndex) => {
    progressItems.forEach(({ listItem, button }, index) => {
      const isActive = index === activeIndex;
      listItem.classList.toggle("active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  };

  // Harvard data buttons - separate for each visualization
  const harvardButtonMeetingMethods = document.getElementById("harvard-button-meeting-methods");
  const harvardButtonPopularApps = document.getElementById("harvard-button-popular-apps");
  const harvardButtonNegativeExperiences = document.getElementById("harvard-button-negative-experiences");
  
  // Setup Meeting Methods button (rankedmeetingmethods.html)
  if (harvardButtonMeetingMethods) {
    const buttonTextMM = harvardButtonMeetingMethods.querySelector("span");
    
    harvardButtonMeetingMethods.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Harvard button clicked (Meeting Methods)");
      
      const meetingMethodsSection = sections.find(s => s.dataset.title === "Meeting Methods");
      if (!meetingMethodsSection) {
        console.log("Meeting Methods section not found");
        return;
      }
      
      const iframe = meetingMethodsSection.querySelector("iframe");
      if (!iframe) {
        console.log("No iframe found");
        return;
      }
      
      // Wait for iframe to load if needed
      if (!iframe.contentWindow) {
        console.log("Iframe contentWindow not available, waiting...");
        iframe.addEventListener("load", () => {
          handleMeetingMethodsToggle(iframe, buttonTextMM);
        });
        return;
      }
      
      handleMeetingMethodsToggle(iframe, buttonTextMM);
    });
    
    function handleMeetingMethodsToggle(iframe, buttonText) {
      if (!iframe || !iframe.contentWindow) {
        console.log("Iframe or contentWindow not available");
        return;
      }
      
      try {
        // Handle rankedmeetingmethods.html - uses getHarvardState, showHarvardData, hideHarvardData
        console.log("Handling rankedmeetingmethods.html");
        
        if (typeof iframe.contentWindow.getHarvardState === "function") {
          const isHarvardVisible = iframe.contentWindow.getHarvardState();
          console.log("Current Harvard state:", isHarvardVisible);
          
          if (isHarvardVisible) {
            // Hide Harvard data
            if (typeof iframe.contentWindow.hideHarvardData === "function") {
              iframe.contentWindow.hideHarvardData();
            }
            if (buttonText) buttonText.textContent = "Compare with Harvard Student Data";
          } else {
            // Show Harvard data
            if (typeof iframe.contentWindow.showHarvardData === "function") {
              iframe.contentWindow.showHarvardData();
            }
            if (buttonText) buttonText.textContent = "Hide Harvard Student Data";
          }
        } else {
          console.log("getHarvardState not available, trying postMessage");
          // Fallback to postMessage for rankedmeetingmethods
          iframe.contentWindow.postMessage({ type: "toggleHarvard" }, "*");
          if (buttonText) buttonText.textContent = "Hide Harvard Student Data";
        }
      } catch (e) {
        console.error("Error toggling Harvard data for Meeting Methods:", e);
      }
    }
  }
  
  // Setup Popular Apps button (datingapps.html)
  if (harvardButtonPopularApps) {
    const buttonTextPA = harvardButtonPopularApps.querySelector("span");
    
    harvardButtonPopularApps.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Harvard button clicked (Popular Apps)");
      
      const popularAppsSection = sections.find(s => s.dataset.title === "Popular Apps");
      if (!popularAppsSection) {
        console.log("Popular Apps section not found");
        return;
      }
      
      const iframe = popularAppsSection.querySelector("iframe");
      if (!iframe) {
        console.log("No iframe found");
        return;
      }
      
      // Wait for iframe to load if needed
      if (!iframe.contentWindow) {
        console.log("Iframe contentWindow not available, waiting...");
        iframe.addEventListener("load", () => {
          handlePopularAppsToggle(iframe, buttonTextPA);
        });
        return;
      }
      
      handlePopularAppsToggle(iframe, buttonTextPA);
    });
    
    function handlePopularAppsToggle(iframe, buttonText) {
      if (!iframe || !iframe.contentWindow) {
        console.log("Iframe or contentWindow not available");
        return;
      }
      
      // Try direct function call first (more reliable)
      try {
        // Check if functions are available
        if (!iframe.contentWindow.getCurrentGroup) {
          console.log("getCurrentGroup not available, trying postMessage");
          // Fallback to postMessage
          iframe.contentWindow.postMessage({ type: "selectGroup", group: "Harvard" }, "*");
          if (buttonText) buttonText.textContent = "Hide Harvard Student Data";
          return;
        }
        
        const currentGroup = iframe.contentWindow.getCurrentGroup();
        console.log("Current group:", currentGroup);
        const isHarvard = currentGroup === "Harvard";
        
        if (isHarvard) {
          // Currently showing Harvard, switch back to "All"
          console.log("Switching to All");
          if (iframe.contentWindow.updateVisualization) {
            iframe.contentWindow.updateVisualization("All");
          } else {
            iframe.contentWindow.postMessage({ type: "selectGroup", group: "All" }, "*");
          }
          if (buttonText) buttonText.textContent = "Compare with Harvard Student Data";
        } else {
          // Show Harvard (deselect all other toggles)
          console.log("Switching to Harvard");
          if (iframe.contentWindow.updateVisualization) {
            iframe.contentWindow.updateVisualization("Harvard");
          } else {
            iframe.contentWindow.postMessage({ type: "selectGroup", group: "Harvard" }, "*");
          }
          if (buttonText) buttonText.textContent = "Hide Harvard Student Data";
        }
      } catch (e) {
        console.error("Error toggling Harvard data:", e);
        // Fallback: try postMessage
        try {
          iframe.contentWindow.postMessage({ type: "selectGroup", group: "Harvard" }, "*");
          if (buttonText) buttonText.textContent = "Hide Harvard Student Data";
        } catch (err) {
          console.error("Error with postMessage fallback:", err);
        }
      }
    }
  }
  
  // Setup Negative Experiences button (negativeexperiences.html)
  if (harvardButtonNegativeExperiences) {
    const buttonTextNE = harvardButtonNegativeExperiences.querySelector("span");
    
    harvardButtonNegativeExperiences.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Harvard button clicked (Negative Experiences)");
      
      const negativeExperiencesSection = sections.find(s => s.dataset.title === "Harvard Sentiment");
      if (!negativeExperiencesSection) {
        console.log("Harvard Sentiment section not found");
        return;
      }
      
      const iframe = negativeExperiencesSection.querySelector("iframe");
      if (!iframe) {
        console.log("No iframe found");
        return;
      }
      
      // Wait for iframe to load if needed
      if (!iframe.contentWindow) {
        console.log("Iframe contentWindow not available, waiting...");
        iframe.addEventListener("load", () => {
          handleNegativeExperiencesToggle(iframe, buttonTextNE);
        });
        return;
      }
      
      handleNegativeExperiencesToggle(iframe, buttonTextNE);
    });
    
    function handleNegativeExperiencesToggle(iframe, buttonText) {
      if (!iframe || !iframe.contentWindow) {
        console.log("Iframe or contentWindow not available");
        return;
      }
      
      // Try postMessage to toggle
      try {
        iframe.contentWindow.postMessage({ type: "toggleHarvard" }, "*");
        // Toggle button text
        if (buttonText) {
          const currentText = buttonText.textContent;
          if (currentText === "Compare with Harvard Student Data") {
            buttonText.textContent = "Show General Users' Data";
          } else {
            buttonText.textContent = "Compare with Harvard Student Data";
          }
        }
      } catch (e) {
        console.error("Error toggling Negative Experiences data:", e);
      }
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = progressItems.findIndex(({ section }) => section === entry.target);
          if (index >= 0) {
            setActive(index);
          }
          
          // Show/hide Harvard buttons for Meeting Methods and Popular Apps sections
          if (harvardButtonMeetingMethods) {
            if (entry.target.dataset.title === "Meeting Methods") {
              harvardButtonMeetingMethods.classList.add("show");
              
              // Update button text based on current state
              const buttonText = harvardButtonMeetingMethods.querySelector("span");
              if (buttonText) {
                const iframe = entry.target.querySelector("iframe");
                if (iframe && iframe.contentWindow) {
                  try {
                    // Check rankedmeetingmethods state
                    if (typeof iframe.contentWindow.getHarvardState === "function") {
                      const isHarvardVisible = iframe.contentWindow.getHarvardState();
                      buttonText.textContent = isHarvardVisible ? "Hide Harvard Student Data" : "Compare with Harvard Student Data";
                    }
                  } catch (e) {
                    console.error("Error checking Meeting Methods state:", e);
                  }
                }
              }
            } else {
              harvardButtonMeetingMethods.classList.remove("show");
            }
          }
          
          if (harvardButtonPopularApps) {
            if (entry.target.dataset.title === "Popular Apps") {
              harvardButtonPopularApps.classList.add("show");
              
              // Update button text based on current state
              const buttonText = harvardButtonPopularApps.querySelector("span");
              if (buttonText) {
                const iframe = entry.target.querySelector("iframe");
                if (iframe && iframe.contentWindow) {
                  try {
                    // Check datingapps state
                    if (typeof iframe.contentWindow.getCurrentGroup === "function") {
                      const currentGroup = iframe.contentWindow.getCurrentGroup();
                      buttonText.textContent = currentGroup === "Harvard" ? "Hide Harvard Student Data" : "Compare with Harvard Student Data";
                    }
                  } catch (e) {
                    console.error("Error checking Popular Apps state:", e);
                  }
                }
              }
            } else {
              harvardButtonPopularApps.classList.remove("show");
            }
          }
          
          if (harvardButtonNegativeExperiences) {
            if (entry.target.dataset.title === "Harvard Sentiment") {
              harvardButtonNegativeExperiences.classList.add("show");
              
              // Update button text based on current state
              const buttonText = harvardButtonNegativeExperiences.querySelector("span");
              if (buttonText) {
                const iframe = entry.target.querySelector("iframe");
                if (iframe && iframe.contentWindow) {
                  try {
                    // Check negativeexperiences state
                    if (typeof iframe.contentWindow.getHarvardState === "function") {
                      const isHarvardVisible = iframe.contentWindow.getHarvardState();
                      buttonText.textContent = isHarvardVisible ? "Show General Users' Data" : "Compare with Harvard Student Data";
                    }
                  } catch (e) {
                    console.error("Error checking Negative Experiences state:", e);
                  }
                }
              }
            } else {
              harvardButtonNegativeExperiences.classList.remove("show");
            }
          }
          
          // Trigger typing animation for Gamification section
          if (entry.target.dataset.title === "Gamification") {
            const quoteTexts = Array.from(entry.target.querySelectorAll(".quote-text"));
            if (quoteTexts.length > 0 && !entry.target.dataset.animated) {
              entry.target.dataset.animated = "true";
              
              // Pre-calculate and reserve space for all quotes to prevent layout shift
              quoteTexts.forEach(quoteElement => {
                const fullQuote = quoteElement.dataset.quote || "";
                if (fullQuote) {
                  // Temporarily set full text to measure
                  quoteElement.textContent = fullQuote;
                  const finalHeight = quoteElement.offsetHeight;
                  
                  // Measure bubble container
                  const bubbleContainer = quoteElement.closest(".speech-bubble-container");
                  const bubble = quoteElement.closest(".speech-bubble");
                  if (bubbleContainer && bubble) {
                    bubbleContainer.style.minHeight = `${bubble.offsetHeight}px`;
                  }
                  
                  // Set min-height on quote text
                  quoteElement.style.minHeight = `${finalHeight}px`;
                  
                  // Clear for typing animation
                  quoteElement.textContent = "";
                }
              });
              
              typeQuotesSequentially(quoteTexts, 0);
            }
          }
          
          // Trigger typing animation for Origins, Dating Apps Popularity, Match Inequality, and Gamification Impact sections
          if (entry.target.dataset.title === "Origins" || entry.target.dataset.title === "Dating Apps Popularity" || entry.target.dataset.title === "Match Inequality" || entry.target.dataset.title === "Gamification Impact" || entry.target.dataset.title === "Main Message" || entry.target.dataset.title === "Connection Language" || entry.target.dataset.title === "Negative Transition" || entry.target.dataset.title === "Survey Intro") {
            const typeTextElements = Array.from(entry.target.querySelectorAll(".type-text"));
            if (typeTextElements.length > 0 && !entry.target.dataset.animated) {
              // Check if text is already complete (user scrolled back)
              const allComplete = typeTextElements.every(element => {
                const highlightElement = element.querySelector(".deck-highlight");
                const fullText = element.dataset.text || "";
                const currentText = highlightElement ? highlightElement.textContent : element.textContent;
                return currentText === fullText;
              });
              
              if (!allComplete) {
                entry.target.dataset.animated = "true";
                typeTextSequentially(typeTextElements, 0, entry.target);
              } else {
                // Text is already complete, mark as animated to prevent future attempts
                entry.target.dataset.animated = "true";
              }
            }
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  const nonHeroSections = sections.filter(section => !section.classList.contains("hero"));

  progressItems.forEach(({ section }) => observer.observe(section));
  setActive(0);

  if (heroCta && progress && sections.length > 1) {
    heroCta.addEventListener("click", () => {
      // Enable scrolling
      scrollEnabled = true;
      document.body.classList.remove("scroll-locked");
      
      // Remove scroll prevention listeners
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("scroll", preventScroll);
      
      progress.classList.remove("is-hidden");
      if (nonHeroSections.length) {
        nonHeroSections[0].scrollIntoView({ behavior: "smooth", block: "start" });
      }
      launchHearts();
      
      // Reset typing animations for Origins, Dating Apps Popularity, Match Inequality, and Gamification Impact sections
      const originsSection = sections.find(s => s.dataset.title === "Origins");
      const datingAppsSection = sections.find(s => s.dataset.title === "Dating Apps Popularity");
      const matchInequalitySection = sections.find(s => s.dataset.title === "Match Inequality");
      const gamificationImpactSection = sections.find(s => s.dataset.title === "Gamification Impact");
      const connectionLanguageSection = sections.find(s => s.dataset.title === "Connection Language");
      const mainMessageSection = sections.find(s => s.dataset.title === "Main Message");
      const negativeTransitionSection = sections.find(s => s.dataset.title === "Negative Transition");
      const surveyIntroSection = sections.find(s => s.dataset.title === "Survey Intro");
      
      [originsSection, datingAppsSection, matchInequalitySection, gamificationImpactSection, mainMessageSection, connectionLanguageSection, negativeTransitionSection, surveyIntroSection].forEach(section => {
        if (section) {
          // Reset the animated flag
          section.removeAttribute("data-animated");
          
          // Clear all typed text
          const typeTextElements = section.querySelectorAll(".type-text");
          typeTextElements.forEach(element => {
            const highlightElement = element.querySelector(".deck-highlight");
            if (highlightElement) {
              highlightElement.textContent = "";
            } else {
              element.textContent = "";
            }
          });
          
          // Reset overlay for Origins section
          if (section.dataset.title === "Origins") {
            const overlayImage = section.querySelector(".overlay-image");
            const storyFigure = section.querySelector(".story-figure");
            if (overlayImage && storyFigure) {
              overlayImage.classList.remove("show");
              overlayImage.style.display = "none";
              storyFigure.classList.remove("has-overlay");
            }
          }
        }
      });
      
      // Reset Gamification quote animation
      const gamificationSection = sections.find(s => s.dataset.title === "Gamification");
      if (gamificationSection) {
        gamificationSection.removeAttribute("data-animated");
        const quoteTexts = gamificationSection.querySelectorAll(".quote-text");
        const blockquotes = gamificationSection.querySelectorAll("blockquote");
        const bubbleContainers = gamificationSection.querySelectorAll(".speech-bubble-container");
        quoteTexts.forEach(quoteText => {
          quoteText.removeAttribute("data-animated");
          quoteText.textContent = "";
          quoteText.style.minHeight = "";
        });
        // Reset visibility - first quote visible, others hidden
        blockquotes.forEach((blockquote, index) => {
          if (index === 0) {
            blockquote.classList.add("quote-visible");
          } else {
            blockquote.classList.remove("quote-visible");
          }
        });
        // Reset bubble container visibility
        bubbleContainers.forEach(container => {
          container.classList.remove("visible");
        });
      }
    });
  }
});

function typeQuotesSequentially(quoteElements, index) {
  if (index >= quoteElements.length) {
    return;
  }
  
  const quoteElement = quoteElements[index];
  const fullQuote = quoteElement.dataset.quote || "";
  
  if (!fullQuote) {
    // Move to next quote if no text
    setTimeout(() => {
      typeQuotesSequentially(quoteElements, index + 1);
    }, 100);
    return;
  }
  
  // Get the parent blockquote to fade it in
  const blockquote = quoteElement.closest("blockquote");
  if (blockquote) {
    blockquote.classList.add("quote-visible");
  }
  
  // Get the speech bubble container and make it visible when typing starts
  const bubbleContainer = quoteElement.closest(".speech-bubble-container");
  const bubble = quoteElement.closest(".speech-bubble");
  
  // Calculate final height before typing starts to prevent vertical shifting
  // Temporarily set the full text to measure its height
  quoteElement.textContent = fullQuote;
  const finalHeight = quoteElement.offsetHeight;
  
  // Also measure and set bubble container height to prevent shifting
  if (bubbleContainer && bubble) {
    const bubbleHeight = bubble.offsetHeight;
    bubbleContainer.style.minHeight = `${bubbleHeight}px`;
  }
  
  // Set min-height to prevent vertical shifting during typing
  quoteElement.style.minHeight = `${finalHeight}px`;
  
  // Make bubble container visible after setting height
  if (bubbleContainer) {
    bubbleContainer.classList.add("visible");
  }
  
  // Clear existing content to start typing
  quoteElement.textContent = "";
  let currentIndex = 0;
  
  const typeChar = () => {
    if (currentIndex < fullQuote.length) {
      const char = fullQuote[currentIndex];
      quoteElement.textContent += char;
      currentIndex++;
      
      // Variable typing speed - faster overall, slower for punctuation
      const delay = (char === "." || char === "," || char === "?" || char === "!") ? 80 : 
                    (char === " ") ? 25 : 15;
      
      setTimeout(typeChar, delay);
    } else {
      // Move to next quote after a delay
      setTimeout(() => {
        typeQuotesSequentially(quoteElements, index + 1);
      }, 300);
    }
  };
  
  // Start typing after a short delay (shorter delay for subsequent quotes)
  setTimeout(typeChar, index === 0 ? 200 : 300);
}

function typeQuote(quoteElement) {
  const fullQuote = quoteElement.dataset.quote || "";
  if (!fullQuote) {
    console.warn("No quote found in data-quote attribute");
    return;
  }
  
  // Calculate final height before typing starts to prevent vertical shifting
  // Temporarily set the full text to measure its height
  quoteElement.textContent = fullQuote;
  const finalHeight = quoteElement.offsetHeight;
  
  // Set min-height to prevent vertical shifting during typing
  quoteElement.style.minHeight = `${finalHeight}px`;
  
  // Clear existing content to start typing
  quoteElement.textContent = "";
  let currentIndex = 0;
  
  const typeChar = () => {
    if (currentIndex < fullQuote.length) {
      const char = fullQuote[currentIndex];
      quoteElement.textContent += char;
      currentIndex++;
      
      // Variable typing speed - slower for punctuation, faster for regular chars
      const delay = (char === "." || char === "," || char === "?" || char === "!") ? 150 : 
                    (char === " ") ? 50 : 30;
      
      setTimeout(typeChar, delay);
    }
  };
  
  // Start typing after a short delay
  setTimeout(typeChar, 300);
}

function typeTextSequentially(elements, index, section = null) {
  if (index >= elements.length) {
    // All typing is complete - trigger overlay for Origins section (if not already triggered)
    if (section && section.dataset.title === "Origins") {
      const overlayImage = section.querySelector(".overlay-image");
      const storyFigure = section.querySelector(".story-figure");
      if (overlayImage && storyFigure && !overlayImage.classList.contains("show")) {
        overlayImage.style.display = "block";
        storyFigure.classList.add("has-overlay");
        setTimeout(() => {
          overlayImage.classList.add("show");
        }, 100);
      }
    }
    return;
  }
  
  const element = elements[index];
  const highlightElement = element.querySelector(".deck-highlight");
  const fullText = element.dataset.text || "";
  
  if (!fullText) {
    // Move to next element if no text
    typeTextSequentially(elements, index + 1, section);
    return;
  }
  
  // Check if this element is already complete
  const currentText = highlightElement ? highlightElement.textContent : element.textContent;
  if (currentText === fullText) {
    // Already complete, move to next
    setTimeout(() => {
      typeTextSequentially(elements, index + 1, section);
    }, 100);
    return;
  }
  
  // Calculate final height before typing starts to prevent vertical shifting
  // Temporarily set the full text to measure its height
  const originalContent = highlightElement ? highlightElement.textContent : element.textContent;
  if (highlightElement) {
    highlightElement.textContent = fullText;
  } else {
    element.textContent = fullText;
  }
  
  // Get the computed height
  const finalHeight = element.offsetHeight;
  
  // Set min-height to prevent vertical shifting during typing
  element.style.minHeight = `${finalHeight}px`;
  
  // Clear existing content to start typing
  if (highlightElement) {
    highlightElement.textContent = "";
  } else {
    element.textContent = "";
  }
  
  let currentIndex = 0;
  const totalChars = fullText.length;
  const triggerOverlayAt = totalChars - Math.floor(totalChars * 0.15); // Trigger when 85% done (roughly 0.5s earlier)
  let overlayTriggered = false;
  
  const typeChar = () => {
    if (currentIndex < fullText.length) {
      const char = fullText[currentIndex];
      
      if (highlightElement) {
        highlightElement.textContent += char;
      } else {
        element.textContent += char;
      }
      
      currentIndex++;
      
      // Trigger overlay early if this is the last element
      if (index === elements.length - 1 && currentIndex >= triggerOverlayAt && !overlayTriggered && section && section.dataset.title === "Origins") {
        overlayTriggered = true;
        const overlayImage = section.querySelector(".overlay-image");
        const storyFigure = section.querySelector(".story-figure");
        if (overlayImage && storyFigure) {
          overlayImage.style.display = "block";
          storyFigure.classList.add("has-overlay");
          setTimeout(() => {
         
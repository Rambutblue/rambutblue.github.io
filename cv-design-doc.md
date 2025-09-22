# **Design Document: The Elemental Sandbox (Final)**

### **1\. Core Concept: Content First, Interaction Second**

This design prioritizes immediate access to your CV information. All your key details are presented upfront in a layout that tells a story about your skills and journey.

The "Elemental Sandbox" is a full-screen, interactive background that runs *behind* your content. It provides a visually stunning, dynamic backdrop that the user can optionally play with, without ever hiding your qualifications.

* **Why it works:** It's the best of both worlds. It's practical and recruiter-friendly, providing information instantly. It's also deeply impressive, showcasing your technical creativity through the interactive background, which serves as a living tech demo.

### **2\. Visual Style & Vibe**

The visual style focuses on the layering of clean "glassmorphism" panels over the dynamic sandbox.

* **Background Layer:** The full-screen "falling sand" physics simulation.  
* **Foreground Layer:** Your CV content, structured more like a creative portfolio.  
* **Palette & Typography:** Modern dark mode, vibrant pixel colors, and the clean "Inter" font for all text.  
* **Element Properties:**  
  * **Java:** *Solid* (Rock). Deep blue pixels that stack firmly.  
  * **React/JS:** *Liquid* (Water). Cyan pixels that flow and spread horizontally.  
  * **C\#:** *Powder* (Sand). Purple pixels that fall and form piles.  
  * **PostgreSQL:** *Heavy Powder*. Indigo pixels that behave like sand but sink through lighter elements like water.  
  * **Static:** *Wall*. A neutral gray, immovable element used for initial structures on the canvas.

### **3\. Page Structure & User Experience**

The website is a clean, single-page, scrollable layout designed for exploration. A key feature is the ability to toggle the visibility of the CV content to allow for unobstructed play in the sandbox.

#### **Section 1: The Main Content (Foreground)**

* **Initial View:** The page loads with a bold header and the full CV content visible. The layout uses a mix of single and multi-column grids to create visual interest.  
* **Layout \- A Developer's Journey:**  
  1. **Hero Header:** Large title (**VIKTOR KUČERA**), subtitle (**SOFTWARE ENGINEER**), and an engaging tagline (*Crafting interactive worlds and robust solutions.*).  
  2. **The Mission (Profile):** A single, wide "glassmorphism" panel with a short, first-person mission statement.  
  3. **The Forge (Experience & Projects):** A 2-column grid of "glassmorphism" cards combining work experience and projects under a "**Featured Work**" heading.  
  4. **The Toolkit (Skills):** A two-column layout with "**Core Stack**" (Proficient) and "**Explorations**" (Familiar) skills.  
  5. **Start a New Quest? (Contact):** A final, playful call to action with clear contact info and a "Download PDF" button.

#### **Section 2: The Sandbox (Background)**

* **Passive Mode:** By default, the sandbox runs as an ambient animation behind the content.  
* **Active Mode:** The user's mouse interacts with the sandbox. A minimal **Element Palette** allows them to select different elements to "pour" onto the canvas.  
* **Element Physics & Interactions:**  
  * **Rock (Solid):** Particles fall straight down and stack perfectly on top of each other, forming solid columns or structures. They do not slide.  
  * **Sand (Powder):** Particles fall straight down. If the space below is occupied, they will attempt to slide down diagonally to the left or right, creating natural-looking piles.  
  * **Water (Liquid):** Particles fall down. If the space below is occupied, they will attempt to move sideways horizontally, spreading out to fill any available space at their level before falling further.

### **4\. Polished & Playful Elements**

* **Sandbox Mode Toggle:** A dedicated button, likely with an "eye" or "game controller" icon, will be fixed on the screen. Clicking it will smoothly fade out or animate the CV content panels, leaving only the full-screen sandbox and the element palette for an immersive play experience. Clicking it again brings the content back.  
* **Sound Design:** Subtle, granular sounds for falling elements and a mute button.  
* **Performance:** The physics simulation will be optimized to run smoothly.  
* **Reset Simulation Button:** A button to clear the canvas and start the simulation fresh.
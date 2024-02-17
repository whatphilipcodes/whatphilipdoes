---
# data
title: entity
description: Abstract examination of everyday objects revealing an aesthetic derivative subject to inexorable decay.
segments:
  - page: what philip
    name: did
landing: true

# content
header:
  src: /vid/header-entity.mp4
  poster: /projects/entity/header-entity.jpg
projectTags:
  - real-time
  - differential growth
  - digital morphogenesis
  - unity
  - csharp

footer:
  buttons:
    - label: repo
      to: https://github.com/whatphilipcodes/entity
    - label: 'inspiring essay'
      to: https://inconvergent.net/generative/
---

::project-header{:header=header :title=title :projectTags=projectTags}
Existence as a constant process of transformation and evolution is reflected in the attempt to visually capture this metamorphosis through aesthetic derivatives of everyday objects.
::

::image-display
---
imageArray:
    - src: /projects/entity/exterior/side-closed.jpg
      alt: sideview of the installation
      cols: 3 / 5
      smnarrow: true
    - src: /projects/entity/exterior/side-open.jpg
      alt: sideview of the installation with an opened lid
      cols: 5 / 7
---
::

::text-block
Although most lighters built today will certainly not be able to light a candle in a thousand years, they will not truly vanish either. They have been transformed from something and will eventually transform into something else. However, because our observation period is so drastically limited instead of a process rather one static object is perceived. This work attempts to form an opposing perspective by generating abstract entities and imagining their visual decay.
::

::image-display
---
imageArray:
  - src: /projects/entity/story/01-lighter-input.jpg
    alt: a hand putting a lighter into the scanning bed
    cols: 5 / 7
  - src: /projects/entity/story/02-lighter-scan.jpg
    alt: a scanned image of a lighter
    startRow: 2 / 2
    startCol: 3 / 3
    cols: 3 / 5
    smnarrow: true
  - src: /projects/entity/story/03-lighter-output.jpg
    alt: the decayed entity which was generated from the scanned image
    startRow: 2 / 2
    cols:  3 / 5
    smnarrow: true
---
A light strip illuminating the scanning bed indicates that the installation is ready for new input. When an object is placed on the surface, the lights fade out while the scanning process is starting. Once the input has been analyzed, a new entity is projected onto the ceiling.
::

::text-block
::text-highlight{class=pb-4}
Establishing recognition from color and contour.
::
The primary goal is to achieve some form of emotional response with observers. From an early stage forward, research focused on discovering ways to entangle personal items into the interaction to mediate a sense of familiarity in the visual output produced. For this to work, the system has to be able to recognize certain properties of the input. Color and contour were chosen because both provide recognizability, even in isolation. For color determination, relying on the amount of pixels per color value can prove unpredictable, since most natural colors are made up of a number of adjacent hues and not just one singular value. While sampling the average of multiple pixels can decrease the severity of this issue, not all colors are perceived equally. To identify dominant colors, a :inline-link{href=https://michaeldavidson.me/2015/10/06/finding-dominant-colours-in-images/ label="k-means clustering algorithm"} is used. As a result, the chosen colors for the representations are more in line with expectations set by the actual visual impression. Because the projection relies on a dark environment, scanning with an open lid produces images with dark backgrounds. For a rough estimation of the contour, this aspect can be utilized: First, a luminance threshold is calculated from the average of all pixels. Then any pixel brighter than the threshold will most likely be part of the scanned object. These can eventually be used to set the positions for the initial shape of the entities.
::

::text-block
::text-highlight{class=pb-4}
Growing entities in real-time.
::
Stumbling across Conway's Game of Life sparked a strong interest into :inline-link{href=https://github.com/jasonwebb/morphogenesis-resources label="digital morphogenesis."} Using simple rules to enable complex behavior opens up a mesmerizing variety of opportunities for visual experimentation. Ultimately, differential growth proved to be the best fit due to its balanced responsiveness towards an initial shape. As research went deeper, the :inline-link{href=https://inconvergent.net/2016/shepherding-random-growth/ label="conceptual explanations"} by Anders Hoff became an indispensable resource. The implementation in Unity as the core of this installation relies on iterative displacement vector calculation for a collection of nodes. Each node is assigned a color value, which is drawn to a shader buffer in every frame. The shader then blurs the drawn pixels over time, resulting in a captivating and dynamic display of evolving patterns and shapes.
::

::image-display
---
imageArray:
  - src: /projects/entity/screens/pen-scan.jpg
    alt: scanned image of an orange pen
    cols: 4 / 4
    startRow: 1 / 2
    smnarrow: true
  - src: /projects/entity/screens/pen-output.jpg
    alt: generated entity from the pen
    cols: 4 / 4
    startRow: 1 / 1
    smnarrow: true
  - src: /projects/entity/screens/banana-scan.jpg
    alt: scanned image of a yellow banana
    cols: 4 / 4
    startRow: 2 / 2
    smnarrow: true
  - src: /projects/entity/screens/banana-output.jpg
    alt: entity generated from the banana
    cols: 4 / 4
    smnarrow: true
  - src: /projects/entity/screens/becher-scan.jpg
    alt: scanned image of a teal plastic cup
    cols: 4 / 4
    startRow: 3 / 2
    smnarrow: true
  - src: /projects/entity/screens/becher-output.jpg
    alt: generated entity from the cup
    cols: 4 / 4
    smnarrow: true
---
The rough silhouette around inputs gradually dissolves as the entity expands from its initial state. Along an evolving contour, the colors slowly dissipate, suggesting the vague presence of a dynamic organism.
::

::image-display
---
imageArray:
  - src: /projects/entity/exterior/projection-square.jpg
    alt: a view of the projection lens
    cols: 3 / 5
    smnarrow: true
  - src: /projects/entity/story/04-display-situation.jpg
    alt: the display situation of the installation
    startCol: 4 / 6
    cols: 5 / 7
---
::


::meta-table
---
content:
  - title: Team
    rows:
      - cols: 
        - Moritz Schell
        - Supervision
      - cols: 
        - [Lara Ketzenberg, Philip Gerdes]
        - Concept
      - cols: 
        - Lara Ketzenberg
        - Construction
      - cols: 
        - Philip Gerdes
        - Programming
---
::

::external-resources{:segment=footer}
::

::next-work
---
to: /projects/inter
---
::
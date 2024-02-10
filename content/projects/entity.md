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
  src: /projects/entity/header-entity.jpg
  alt: header
projectTags:
  - realtime differential-line-growth
  - external hardware communication
  - unity

footer:
  buttons:
    - label: repo
      to: https://github.com/whatphilipcodes/entity
---
<!-- 
Existence is a constant process of transformation and evolution. An attempt to visualize this metamorphosis on aesthetic derivatives of everyday objects. -->

::project-header{:header=header :title=title :projectTags=projectTags}
Existence as a constant process of transformation and evolution is reflected in the attempt to visually capture this metamorphosis through the aesthetic derivatives of everyday objects.
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
Although most lighters built today will certainly not be able to light a candle in a thousand years, they will not truly vanish either. They have been transformed from something and will eventually transform into something else. However, because our observation period is so drastically limited we do not perceive a process but rather one static object. This work attempts to form an opposing perspective by generating abstract entities and imagining their visual decay.
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
A lightstrip illuminating the scanning bed indicates that the installation is ready for new input. When an object is placed on the surface, the lights fade out while the scanning process is starting. Once the input has been analyzed, a new entity is projected onto the ceiling.
::

::text-block
::text-highlight{class=pb-4}
Establishing recognition from color and contour.
::
One of the hardest but ultimately most important aspect of any work is to achieve some form of emotional response with observers. From an early stage forward we searched for ways to entangle personal items into the interaction to achieve a sense of familiarity that could be recognized in the visual output produced.
- technical challenge to interpret input properties
- settled on color and contour
- contour from luminance thresholding
- color from k means clustering :inline-link{href=https://michaeldavidson.me/2015/10/06/finding-dominant-colours-in-images/ label="by Michael Davidson"}
::

::text-block
::text-highlight{class=pb-4}
Growing entities in realtime.
::
- research into growth algorithms -> cellular automata, 
- settled on differential line growhth as described :inline-link{href=https://inconvergent.net/generative/differential-line/ label="by Anders Hoff"}
- node based approach with iterative displacement vector calulation
- drawing all nodes as pixels into a shader buffer for tracing 
::

::image-display
---
imageArray:
  - src: /projects/entity/screens/pen-scan.jpg
    alt: the scanned image of a pen
    cols: 4 / 4
    startRow: 1 / 2
    smnarrow: true
  - src: /projects/entity/screens/pen-output.jpg
    alt: the generated entity from the scanned image
    cols: 4 / 4
    startRow: 1 / 1
    smnarrow: true
  - src: /projects/entity/screens/banana-scan.jpg
    alt: a scanned image of a banana
    cols: 4 / 4
    startRow: 2 / 2
    smnarrow: true
  - src: /projects/entity/screens/banana-output.jpg
    alt: the generated entity from the scanned banana
    cols: 4 / 4
    smnarrow: true
  - src: /projects/entity/screens/becher-scan.jpg
    alt: a scanned image of a cup
    cols: 4 / 4
    startRow: 3 / 2
    smnarrow: true
  - src: /projects/entity/screens/becher-output.jpg
    alt: the generated entity from the scanned cut
    cols: 4 / 4
    smnarrow: true
---
The rough silhouette around the inputs gradually dissolves as the entity expands from its initial state. Along an evolving contour the colors slowly dissipate, suggesting the vague presence of a dynamic organism. 
::

::image-display
---
imageArray:
  - src: /projects/entity/story/04-display-situation.jpg
    alt: the display situation of the installation
    startCol: 1 / 5
    cols: 8 / 8
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
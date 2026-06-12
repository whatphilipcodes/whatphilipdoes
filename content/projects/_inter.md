---
title: inter
description: Abstract installation engaging with the objectivity and subjectiveness of truth.
landing: true

segments:
  - page: what philip
    name: did

header:
  src: ''
  poster: /projects/inter/header-inter.jpg
projectTags:
  - ba thesis
  - ars electronica
  - hf transformers
  - electron.js
  - interactive machine learning
  

footer:
  buttons:
    - label: repository
      to: https://github.com/whatphilipcodes/inter
    - label: campus exhibit
      to: https://ars.electronica.art/who-owns-the-truth/de/inter/
---

::project-header{:header=header :title=title :projectTags=projectTags :abstract="Truth often implies a sense of objectiveness despite its subjective aspects. This installation explores artificial decision-making as a device to shape truth."}
::

::image-display
---
imageArray:
  - src: /projects/inter/keys/key-dark.jpg
    alt: An abstract key visual displaying black and white geometric shapes in a very dark setting
    cols: 3 / 5
    smnarrow: true
  - src: /projects/inter/exterior/front.jpg
    alt: A front view of the installation showing a keyboard and a screen on a standing desk
    cols: 5 / 7
---
::

::text-block
With any information given, a decision has to be made whether to accept it as truth or to face it with doubt. This distinction takes place subconsciously in the conversations we have and towards the media we consume. These judgements are made individually based on societal context and personal experience or beliefs. Despite this intrinsic subjectiveness, the word truth is predominantly used to describe information deemed as factual. This work engages visitors in a dialog driven by artificial decision-making that is transformed by its own bias. Ultimately simulating the idea of truth as an ongoing fluid concept continuously reshaping itself.
::

::image-display
---
imageArray:
  - src: /projects/inter/exterior/keyboard-detail.jpg
    alt: Detail shot of the keyboard used for the installation
    startCol: 1 / 1
    cols: 5 / 7
  - src: /projects/inter/keys/key-mid.jpg
    alt: An abstract key visual displaying black and white geometric shapes in a medium light setting
    startRow: 2 / 2
    startCol: 1 / 1
    cols: 3 / 5
    smnarrow: true
  - src: /projects/inter/exterior/machine.jpg
    alt: A view of the computer beneath the standing desk
    cols: full / 7
    startRow: 2 / 2
    startCol: 4 / 6
---
Inputs are created from a mechanical keyboard, adding acoustic character to the interaction. All necessary computation for both training and inference is executed locally on the machine present. Due to this limitation in performance, some outputs might seem nonsensical.
::

::text-block
::text-highlight{class=pb-4}
Gaining trust or spreading skepticism
::
As visitors approach the installation, an endless stream of previous conversations cascades down the screen. Upon pressing any key, the text vanishes, and the installation addresses the new participant. During the unfolding conversation between human and machine, every input is analyzed to decide whether it is truthful or not. Depending on the outcome, replies from the algorithm are placed closer or further away from the user input. After no more inputs are received for a while, the machine starts scrolling back through the dialogue history again until the next participant presses another key.
::

::image-display
---
imageArray:
  - src: /projects/inter/screens/hello-world.jpg
    alt: 'A screenshot from the installation showing the machine saying: "Hello, what is your name?" and a blinking cursor in the input field'
    cols: 5 / 7
    startCol: auto / 6
  - src: /projects/inter/screens/photography.jpg
    alt: 'A longer conversation with the machine: "Hey! I`m just a guy with a camera, but I have a lot of other hobbies as well.", "So what else do you do? Have you ever shot a movie?", "Yeah, I did, and it`s still one of my favorite things to do.", "Cool. So how did that happen? Did someone just asked you or did you apply somewhere?", "I`ve been shooting since I was in high school, so I applied to be a student at the School of Visual Arts (SVA) New York", "Damn, that`s impressive! So what degree did you get?". Throughout the conversation, the answers from the machine approach the inputs by the user.'
    cols: 5 / 7
    startCol: 1 / auto
  - src: /projects/inter/keys/key-light.jpg
    alt: An abstract key visual displaying black and white geometric shapes in a light setting
    cols: 3 / 5
    startRow: 1 / 1
    startCol: 1 / auto
    smnarrow: true
---
An excerpt of conversations with the installation. Trust is signaled by the response \[right\] approaching the input \[left\] doubt is expressed through increased distance.
::

::text-block
::text-highlight{class=pb-4}
A truth-shaping conversation
::
All inputs are passed to a classification algorithm that is responsible for decision-making. It is based on a custom version of :inline-link{href=https://huggingface.co/microsoft/deberta-v3-base label="DeBERTa V3"}. To train for classification, data was sourced from the :inline-link{href=https://github.com/easonnie/combine-FEVER-NSMN/blob/master/other_resources/nli_fever.md#what-is-the-format label="NLI Style FEVER"} dataset. It consists of English statements already categorized as »supports«, »refutes« and »not enough information«. These labels were then remapped to »truth«, »lie« and »doubt«. An additional »forlang« label was introduced to account for uninterpretable inputs. Data for this label amounts to a balanced mixture of strings containing random characters and an excerpt of the :inline-link{href=https://www.statmt.org/europarl/ label="Europarl"} dataset. Upon completing the classification process, the labeled inputs are added to the dataset, and the instruction for the generator is derived from the associated label. :inline-link{href=https://huggingface.co/EleutherAI/pythia-1b-deduped label="Pythia"}, a model built on the generative pre-trained transformer architecture, is used to compute responses. During times in which no conversation takes place, the installation enters an idle state, which allows the classifier to resume training. Since interactions modify the underlying dataset, this system can be considered as an implementation of interactive machine learning.
::

::image-display
---
imageArray:
  - src: i-interflow.svg
    alt: a flowchart visualizing the interaction between the software components of the installation
    cols: 5 / 7
    startCol: 4 / 6
---
::

::text-block
In September 2023, this work was featured at the :inline-link{href=https://ars.electronica.art/who-owns-the-truth/de/inter/ label="Ars Electronica Campus Exhibition"}  in Linz. Photos by Rosi Pernthaller \[left\] and Andreas Ingerl \[right\].
::

::image-display
---
imageArray:
  - src: /projects/inter/ars/rosi.jpg
    alt: People at the Ars Electronica exhibition in front of the installation
    cols: 5 / 7
  - src: /projects/inter/ars/andreas.jpg
    alt: Black and white picture of the entrance to the Artificalism exhibiton with strong neon-yellow outlines and writing
    cols: 3 / 5
    smnarrow: true
---
::


::meta-table
---
content:
  - title: Team
    rows:
      - cols:
        - Prof. Andreas Ingerl
        - First Mentor
      - cols:
        - Prof. Dr. Erik Rodner
        - Second Mentor
      - cols:
        - Philip Gerdes
        - Graduate
  - title: Exhibited
    rows:
      - cols:
        - [Ars Electronica, Campus Exhibition]
        - ['2023']
---
::

::external-resources{:segment=footer}
::

::next-work
---
label: back home
to: /
---
::


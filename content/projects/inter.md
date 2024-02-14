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
    - label: repo
      to: https://github.com/whatphilipcodes/inter
    - label: campus exhibit
      to: https://ars.electronica.art/who-owns-the-truth/de/inter/
---

::project-header{:header=header :title=title :projectTags=projectTags}
---
badge:
  icon: i-arselectro
  info: ars electronica campus exhibition 2023
  link: https://ars.electronica.art/who-owns-the-truth/de/inter/
---
Truth often implies a sense of objectiveness despite its subjective aspects. This installation explores artifical decision making as a device to shape truth.
::

::image-display
---
imageArray:
  - src: /projects/inter/keys/key-dark.jpg
    alt: an abstract key visual showing black and white geometric shapes
    cols: 3 / 5
    smnarrow: true
  - src: /projects/inter/exterior/front.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
    cols: 5 / 7
---
::

::text-block
With any information given, a decision has to be made whether to accept it as truth or to face it with doubt. This distinction takes place subconsciously in the conversations we have and towards the media we consume. These judgements are made individually based on societal context and personal experience or beliefs. Despite this intrinsic objectiveness, the word truth is predominantly used to describe information deemed as factual. This work engages visitors in a dialog driven by artificial decision-making that is transformed by its own bias. Ultimately simulating the idea of truth as an ongoing fluid process constantly reshaping itself.
::

::image-display
---
imageArray:
  - src: /projects/inter/exterior/keyboard-detail.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
    startCol: 1 / 1
    cols: 5 / 7
  - src: /projects/inter/keys/key-mid.jpg
    alt: an abstract key visual showing black and white geometric shapes
    startRow: 1 / 2
    startCol: 6 / 1
    cols: 3 / 5
    smnarrow: true
  - src: /projects/inter/exterior/machine.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
    cols: full / 7
    startRow: 2 / 2
    startCol: 1 / 6
---
Inputs are created from a mechanical keyboard, adding acoustic character to the interaction. All necessary computation for both training and inference is executed locally on the machine present. Due to this limitation in performance, some outputs might seem nonsensical.
::

::text-block
::text-highlight{class=pb-4}
Esse voluptate anim amet eu ad ullamco. Non ea est eu Lorem veniam exercitation tempor do duis ipsum.
::
Est et proident et est ad laborum sint id. Sunt tempor consectetur esse excepteur laboris et amet. Velit dolor est velit in sunt pariatur deserunt irure esse est cillum consequat. Officia elit dolore id exercitation aute sunt dolore qui. Duis velit amet aliquip culpa et. Elit commodo ipsum elit deserunt ad enim est voluptate dolor ut laborum dolore aliquip. Magna aliquip in non proident aliquip commodo culpa. Aliqua officia dolore enim laboris dolore adipisicing ea quis fugiat consequat. Nostrud proident sint labore veniam veniam labore nulla duis cillum excepteur sint exercitation nostrud amet. Ullamco pariatur veniam aute esse pariatur nisi reprehenderit. Commodo est non aliquip aliqua voluptate. Fugiat enim excepteur in Lorem nisi Lorem dolore consequat.
::

::image-display
---
imageArray:
  - src: /projects/inter/screens/hello-world.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
    cols: 5 / 7
    startCol: auto / 6
  - src: /projects/inter/screens/photography.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
    cols: full / 7
    startCol: 1 / auto
  - src: /projects/inter/keys/key-light.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
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
As users approach the installation, an endless conversation cascades down the screen. Upon pressing any key, the text vanishes and a generative model addresses the new participant. In the unfolding conversation between human and machine every input is analyzed by a classification algorithm that decides whether or not it is true. Besides as truth or lie inputs can also be classified as neutral or uninterpretable. Subsequently, a generative model is instructed to compose a reply. If the machine gains trust the answer will be placed closer to the user input. If a lie has been detected the distance between both is increased. When no more messages are received for a while the machine starts to scroll down through past conversations. During this idle state the classifier resumes finetuning its comprehension of truth by using all past classifications including the last conversation alongside the base dataset as training examples. With the next key press this process halts and a new exchange can take place.
::

::image-display
---
imageArray:
  - src: i-interflow.svg
    cols: 5 / 7
    startCol: 4 / 6
---
::

::text-block
In 2023, this work was featured at the :inline-link{href=https://ars.electronica.art/who-owns-the-truth/de/inter/ label="Ars Electronica Campus Exhibition"}  in Linz. Photos by Rosi Pernthaller \[left\] and Andreas Ingerl \[right\].
::

::image-display
---
imageArray:
  - src: /projects/inter/ars/rosi.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
    cols: 5 / 7
  - src: /projects/inter/ars/andreas.jpg
    alt: a front view of the installation showing a keyboard and a screen on a table
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


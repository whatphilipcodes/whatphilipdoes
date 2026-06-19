---
title: inter
description: Abstract installation engaging with the objectivity and subjectiveness of truth.
tags: [machine learning, installation]
---

With any information given, a decision has to be made whether to accept it as truth or to face it with doubt. This distinction takes place subconsciously in the conversations we have and towards the media we consume. These judgements are made individually based on societal context and personal experience or beliefs. Despite this intrinsic subjectiveness, the word truth is predominantly used to describe information deemed as factual. This work engages visitors in a dialog driven by artificial decision-making that is transformed by its own bias. Ultimately simulating the idea of truth as an ongoing fluid concept continuously reshaping itself.

Inputs are created from a mechanical keyboard, adding acoustic character to the interaction. All necessary computation for both training and inference is executed locally on the machine present. Due to this limitation in performance, some outputs might seem nonsensical.

As visitors approach the installation, an endless stream of previous conversations cascades down the screen. Upon pressing any key, the text vanishes, and the installation addresses the new participant. During the unfolding conversation between human and machine, every input is analyzed to decide whether it is truthful or not. Depending on the outcome, replies from the algorithm are placed closer or further away from the user input. After no more inputs are received for a while, the machine starts scrolling back through the dialogue history again until the next participant presses another key.

An excerpt of conversations with the installation. Trust is signaled by the response \[right\] approaching the input \[left\] doubt is expressed through increased distance.

All inputs are passed to a classification algorithm that is responsible for decision-making. It is based on a custom version of :inline-link{href=https://huggingface.co/microsoft/deberta-v3-base label="DeBERTa V3"}. To train for classification, data was sourced from the :inline-link{href=https://github.com/easonnie/combine-FEVER-NSMN/blob/master/other_resources/nli_fever.md#what-is-the-format label="NLI Style FEVER"} dataset. It consists of English statements already categorized as »supports«, »refutes« and »not enough information«. These labels were then remapped to »truth«, »lie« and »doubt«. An additional »forlang« label was introduced to account for uninterpretable inputs. Data for this label amounts to a balanced mixture of strings containing random characters and an excerpt of the :inline-link{href=https://www.statmt.org/europarl/ label="Europarl"} dataset. Upon completing the classification process, the labeled inputs are added to the dataset, and the instruction for the generator is derived from the associated label. :inline-link{href=https://huggingface.co/EleutherAI/pythia-1b-deduped label="Pythia"}, a model built on the generative pre-trained transformer architecture, is used to compute responses. During times in which no conversation takes place, the installation enters an idle state, which allows the classifier to resume training. Since interactions modify the underlying dataset, this system can be considered as an implementation of interactive machine learning.


In September 2023, this work was featured at the :inline-link{href=https://ars.electronica.art/who-owns-the-truth/de/inter/ label="Ars Electronica Campus Exhibition"}  in Linz. Photos by Rosi Pernthaller \[left\] and Andreas Ingerl \[right\].


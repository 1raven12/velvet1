# VELVET

State-driven interactive romance fiction engine. Procedural narrative generation within module-defined worlds.

## Architecture

The player builds themselves and a love interest through a multiple-choice question flow specific to the chosen setting, archetype, and trope modules. The engine then generates scenes (beats) using those profiles and a live relationship state object. Choices mutate state variables. Endings are gated by state thresholds, not branching choice trees.

## Species and powers

Both the player and the love interest can be human or supernatural (vampire, fairy, fae, werewolf, witch, shifter, demon, angel, merperson, ghost, or other). Available species are controlled by the setting module. Powers are an open list drawn from setting-permitted options.

## Module system

Setting modules define era, social rules, vocabulary, technology level, and which species are valid. Archetype modules define the love interest's role, stakes, and power baseline. Trope modules define the relational entry point, conflict source, and emotional rhythm.

## Current scope

Vertical slice on rockstar + childhood bully + modern. One playthrough end to end. Additional modules slot in without engine changes.

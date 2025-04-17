---
title: "Articulated Soft Robots: A Feasibility Driven Control Approach"
auth: "Davide De Benedittis, Saroj Prasad Chhatoi, Michele Pierallini, Franco Angelini, Carlos Mastalli, and Manolo Garabini"
journal: "Italian Conference on Robotics and Intelligent Machines "
description: "Efficient DDP-based trajectory optimization of articulated soft robots."
pubDate: "24 Oct 2024"
heroImage: "/publications/art_soft_rob.webp"
paperUrl: "https://doi.org/10.5281/zenodo.14731033"
bibtex: "@article{de_benedittis2024articulated,\n
  author={De Benedittis, Davide and Chhatoi, Saroj Prasad and Pierallini, Michele and Angelini, Franco and Mastalli, Carlos and Garabini, Manolo},\n
  journal={Sixth Italian Conference on Robotics and Intelligent Machines}, \n
  title={Articulated Soft Robots: A Feasibility Driven Control Approach},\n
  month=oct,\n
  year=2024,\n
  publisher={Zenodo},\n
  doi={10.5281/zenodo.14731033},\n
  url={https://doi.org/10.5281/zenodo.14731033}}"
badge: ""
tags: ["Soft Robots"]
---

Soft robots offer safer interaction during tasks, but suitable controllers that leverage their uniqueness are still under development.
Differential Dynamic Programming (DDP) is an effective technique for handling highly dynamic tasks with high-dimensional robots.
However, the research community has focused on applying DDP to fully articulated robots while also using numerical differentiation.
We present an efficient DDP-based algorithm for trajectory optimization of articulated soft robots, fully actuated or not, that jointly optimizes the states, the inputs, and the stiffness profile.
We experimentally validate the approach using a fully actuated 2-DoFs compliant arm.
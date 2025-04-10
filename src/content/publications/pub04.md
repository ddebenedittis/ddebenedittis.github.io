---
title: "Managing Conflicting Tasks in Heterogeneous Multi-Robot Systems Through Hierarchical Optimization"
auth: "Davide De Benedittis, Manolo Garabini, Lucia Pallottino"
journal: "IEEE Robotics and Automation Letters"
description: "Leverage hierarchical optimization for robust multi-robot coordination and guaranteed prioritized task execution."
pubDate: "Apr 2025"
heroImage: "https://raw.githubusercontent.com/ddebenedittis/media/main/hierarchical_optimization_mpc/obs_form_comvel_640_360.webp"
tags: ["Multi-Robots", "Hierarchical Optimization"]
paperUrl: "https://doi.org/10.1109/LRA.2025.3559843"
githubUrl: "https://github.com/ddebenedittis/hierarchical_optimization_mpc"
bibtex: "@article{debenedittis2025managing,\n
  author={De Benedittis, Davide and Garabini, Manolo and Pallottino, Lucia},\n
  journal={IEEE Robotics and Automation Letters},\n
  title={Managing Conflicting Tasks in Heterogeneous Multi-Robot Systems Through Hierarchical Optimization}, \n
  year={2025},\n
  volume={},\n
  number={},\n
  pages={},\n
  doi={10.1109/LRA.2025.3559843}}"
---

The robotics research community has explored several model-based techniques for multi-robot and multi-task control.
Through constrained optimization, robot-specific characteristics can be taken into account when controlling robots and accomplishing tasks.
However, in scenarios with multiple conflicting tasks, existing methods struggle to enforce strict prioritization among them, allowing less important tasks to interfere with more important ones.
In this paper, we propose a novel control framework that enables robots to execute multiple prioritized tasks concurrently while maintaining a strict task priority order.
The framework exploits hierarchical optimization within a model predictive control structure.
It formulates a convex minimization problem in which all the tasks are encoded as linear equality and inequality constraints.
The proposed approach is validated through simulations using a team of heterogeneous robots performing multiple tasks.
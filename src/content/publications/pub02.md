---
title: "Soft Bilinear Inverted Pendulum: a Model to Enable Locomotion with Soft Contacts"
auth: "Davide De Benedittis, Franco Angelini, and Manolo Garabini"
journal: "IEEE Transactions on Systems, Man, and Cybernetics: Systems"
description: "Model-based two-control-blocks architecture (motion planner and tracking controller) for quadrupedal locomotion in the presence of soft contacts."
pubDate: "4 Dec 2024"
heroImage: "https://raw.githubusercontent.com/ddebenedittis/soft_bilinear_inverted_pendulum_astro/refs/heads/main/public/cover_pic.png"
tags: ["Hierarchical Optimization", "Quadrupeds"]
url: "https://ddebenedittis.github.io/soft_bilinear_inverted_pendulum_astro/"
paperUrl: "https://ieeexplore.ieee.org/document/10777856"
githubUrl: "https://github.com/ddebenedittis/control_quadrupeds_soft_contacts"
bibtex: "@ARTICLE{debenedittis2025soft,\n
  author={De Benedittis, Davide and Angelini, Franco and Garabini, Manolo},\n
  journal={IEEE Transactions on Systems, Man, and Cybernetics: Systems}, \n
  title={Soft Bilinear Inverted Pendulum: A Model to Enable Locomotion With Soft Contacts}, \n
  year={2025},\n
  volume={55},\n
  number={2},\n
  pages={1478-1491},\n
  doi={10.1109/TSMC.2024.3504342}}"
---

The robotics research community has developed several effective techniques for quadrupedal locomotion. Most of these methods ease the modeling and control problem by assuming a rigid contact between the feet and the terrain. However, in the case of compliant terrain or robots equipped with soft feet, this assumption no longer holds, as the contact point moves and the reaction forces experience a delay. This paper presents a novel approach for quadrupedal locomotion in the presence of soft contacts. The control architecture consists of two blocks: upstream, the Motion Planner (MP) computes a feasible trajectory using Model Predictive Control (MPC); downstream, the Tracking Controller (TC) employs Hierarchical Optimization (HO) to achieve motion tracking. This choice allows the control architecture to employ a large time horizon without heavily compromising the model’s accuracy. For the first time, both blocks consider the contact compliance: in the MP, the classic Linear Inverted Pendulum model is extended by proposing the Soft Bilinear Inverted Pendulum (SBIP) model; conversely, the Tracking Controller (TC) is a Whole-Body Controller (WBC) that considers the full dynamics model, including the soft contacts. Simulations with multiple quadrupedal robots demonstrate that the proposed approach enables traversing soft terrains with improved stability and efficiency. Furthermore, the performance benefits of including the compliance in the MP and TC are evaluated. Finally, experiments on the SOLO12 robot walking on soft terrain validate the proposed approach’s effectiveness.
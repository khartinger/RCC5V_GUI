<table><tr><td><img src="./images/RCC5V_Logo_96.png"></img></td><td>
Last modified: 2026-01-22 <a name="up"></a><br>   
<h1>RCC5V_GUI: Track control panels for controlling RCC5V model railway components</h1>
<a href="LIESMICH.md">==> Deutsche Version</a>&nbsp; &nbsp; &nbsp; 
</td></tr></table>    

# Introduction
This repository contains VUE components for creating track control panels for [RCC5V model railway control components](https://github.com/khartinger/RCC5V). This makes it easy to control modules using a browser (via MQTT commands and Wi-Fi).   
The following image shows the control panel for the “Block Tester” module, the construction and function of which is described in detail at [https://github.com/khartinger/RCC5V/blob/main/examples/blocktester](https://github.com/khartinger/RCC5V/blob/main/examples/blocktester/README.md).   

![GUI Block Tester](./images/300_GUI_Blocktester1.png "GUI Block Tester")   
_Figure 1: Graphical interface for controlling the RCC5V block tester_   

The repository is structured as follows:   
The __`examples`__ directory contains various VUE programs that demonstrate the possible applications of a __symbol type__, such as   
* `RCC5V_GUI_Demo_Track`: Display of track symbols   
* `RCC5V_GUI_Demo_Turnout`: Display of (two-way) turnout symbols   
* `RCC5V_GUI_Demo_Turnout3Way`: Display of three-way turnout symbols   
* `RCC5V_GUI_Demo_Uncoupler`: Display of uncoupler symbols   

The directory `images` contains images and odg graphics.

The directory `modules` contains track control panels for various model railway modules.
* `RCC5V_GUI_Blocktester`: Track control panel for the block tester   
* `RCC5V_GUI_Layout1`: Track control panel for a model railway layout consisting of six modules 
* Track control panels for individual modules 

[Back to top](#up)

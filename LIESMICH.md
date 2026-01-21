<table><tr><td><img src="./images/RCC5V_Logo_96.png"></img></td><td>
Letzte &Auml;nderung: 21.1.2026 <a name="up"></a><br>   
<h1>RCC5V_GUI: GUI zur Steuerung von RCC5V  Modelleisenbahnkomponenten</h1>
<a href="README.md">==> English version</a>&nbsp; &nbsp; &nbsp; 
</td></tr></table>   

# Einleitung
Dieses Repository enthält VUE-Anwendungen zur visuellen Darstellung von [RCC5V-Modelleisenbahn-Steuerkomponenten](https://github.com/khartinger/RCC5V) (GUI = Graphical User Interface). Damit kann man auf einfache Weise Module mit dem Browser steuern (mittels MQTT-Befehlen und WLAN).   
Das folgende Bild zeigt eine VUE-Steuerung für das unter [https://github.com/khartinger/RCC5V/blob/main/examples/blocktester](https://github.com/khartinger/RCC5V/blob/main/examples/blocktester/LIESMICH.md)  beschriebene Modul "Blocktester":   

![GUI Blocktester](./images/300_GUI_Blocktester1.png "GUI Blocktester")   
_Bild 1: Grafisches Interface zur Steuerung des RCC5V-Blocktesters_   

Das Repository ist folgendermaßen gegliedert:   
Das Verzeichnis `examples` enthält verschiedene VUE-Programme, die die Anwendungsmöglichkeiten einer Symbolart zeigen wie   
* `RCC5V_GUI_Demo_Track`: Darstellung von Gleissymbolen   
* `RCC5V_GUI_Demo_Turnout`: Darstellung von (Zweiweg-)Weichensymbolen   
* `RCC5V_GUI_Demo_Turnout3Way`: Darstellung von Dreiwegweichensymbolen   
* `RCC5V_GUI_Demo_Uncoupler`: Darstellung von Entkopplersymbolen   

Das Verzeichnis `modules` enthält Modulsteuerungen für einzelne Modelleisenbahn-Module.   



[Zum Seitenanfang](#up)
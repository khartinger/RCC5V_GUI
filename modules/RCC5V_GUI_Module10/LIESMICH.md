<table><tr><td><img src="../images/RCC5V_Logo_96.png"></img></td><td>
Letzte &Auml;nderung: 2.1.2026 <a name="up"></a><br>   
<h1>RCC5V_GUI_Demo_Uncoupler: Entkupplergleissymbole für die RCC5V-GUI</h1>
<a href="README.md">==> English version</a>&nbsp; &nbsp; &nbsp; 
</td></tr></table>   

# Einleitung
## Voraussetzung
Diese VUE-Anwendung zeigt, welche Symbole es zum Zeichnen von Entkupplergleisen gibt und wie diese angewendet werden. Da die Steuerung über MQTT-Befehle erfolgt, ist folgende Hardware erforderlich:   
* (Mindestens) ein Entkuppler mit Ansteuerung über einen RCC-Mikrocontroller und RCC-Block
  Beispiel: Verwendung des RCC-Blocktesters, der auf [https://github.com/khartinger/RCC5V/tree/main/examples/blocktester](https://github.com/khartinger/RCC5V/tree/main/examples/blocktester) beschrieben wird   
* Ein laufender MQTT-Server (zB `mosquitto`), der über die IP `10.1.1.1` erreichbar ist   
* Ein PC, Laptop oder Tablet, das mit dem MQTT-Server verbunden ist (zB über WLAN)   

# ...ToDo...

## Verfügbare Symbole
![Weichensymbole](./images/300_symbol_uncoupler1.png "Weichensymbole")   
_Bild 1: Weichensymbole_   

## Anzeige und Test der Symbole

Visual Studio Code (VSC) starten, Projekt `RCC5V_GUI_Demo_Turnout` laden, Terminalfenster `npm run serve` eingeben
PC mit WLAN verbinden (zB `Raspi11`)


MQTT Server starten,
Voraussetzungen: IP `10.1.1.1`, Basis-Topic `rcc/demo1`
1. Terminalfenster: `mosquitto_sub -h 10.1.1.1 -t rcc/# -v`   
2. Terminalfenster: `mosquitto_pub -h 10.1.1.1 -t rcc/module10/get -m bydcc`   


# Aufruf eines Symbols
## Syntax   
Gleissymbole werden mit dem Tag `<RccTurnout ...>` aufgerufen, wobei folgende Parameter erforderlich bzw. möglich sind:   
* `x` (erforderlich): x-Koordinate des Zentrums des Symbols   
* `y` (erforderlich): y-Koordinate des Zentrums des Symbols   
* `dir` (erforderlich): Art (und damit Richtung) des Weichensymbols   
* `sid` (optional): ID des Symbols, mit dem die Weiche über MQTT angesprochen werden.   
* `border` (optional): Gibt an, ob ein Rahmen um ein Weichensymbol gezeichnet werden soll   
* `label` (optional): Gibt an, ob und welche Beschriftung des Weichensymbols angezeigt werden soll   
* `color` (optional): Setzen einer Farbe für das Weichensymbol    

## Beispiele

# ...ToDo...



[Zum Seitenanfang](#up)
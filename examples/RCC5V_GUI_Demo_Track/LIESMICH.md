<table><tr><td><img src="./images/RCC5V_Logo_96.png"></img></td><td>
Letzte &Auml;nderung: 21.1.2026 <a name="up"></a><br>   
<h1>Gleissymbole f&uuml;r RCC5V-GUIs</h1><h3>RCC5V_GUI_Demo_Track</h3>
<a href="README.md">==> English version</a>&nbsp; &nbsp; &nbsp; 
</td></tr></table>   

<a name="x10"></a>   

# 1. Einleitung
Dieses Dokument beschreibt die Verwendung von Gleissymbolen zur Erzeugung eines Gleisstellbildes f&uuml;r RCC5V-GUI-Anwendungen.   
_Bild 1_ zeigt verschiedene Symbole:   
![Gleissymbole](./images/300_symbol_track1.png 
"Gleissymbole")   
_Bild 1: Gleissymbole_   

## Inhaltsverzeichnis
1. [Einleitung](#x10)   
2. [Erforderliche Hardware und Software](#x20)
3. [Anzeige und Test der Symbole](#x30)   
4. [Gliederung der Software `RCC5V_GUI_Demo_Track`](#x40)   
5. [Verwendung des `<RccTrack1>`-Tags](#x50)   
6. [Weitere Symbole](#x60)   
7. [Anmerkungen zur Programmierung](#x70)   

<a name="x20"></a>   

# 2. Erforderliche Hardware und Software
Jedes Gleissymbol besitzt die F&auml;higkeit, MQTT-Nachrichten zu senden und zu empfangen, um so den Fahrstrom ein- und auszuschalten. Um diese M&ouml;glichkeit zu testen, ist folgende __Hardware__ erforderlich:   
* Ein Gleis, dessen Stromzuf&uuml;hrung mit einem RCC-Block ein- und ausgeschaltet werden kann.   
  _Empfehlung_: Verwendung des abschaltbaren Gleises des RCC-Blocktesters mit der DCC-Adresse 41.   
  Der Blocktester wird auf [https://github.com/khartinger/RCC5V/tree/main/examples/blocktester](https://github.com/khartinger/RCC5V/tree/main/examples/blocktester)   
  beschrieben.   
* Ein laufender MQTT-Server (zB `mosquitto`), der &uuml;ber die IP `10.1.1.1` erreichbar ist.   
* Ein PC, Laptop oder Tablet, das mit dem MQTT-Server verbunden ist (zB &uuml;ber WLAN).   

Weiters wird zum Testen aller M&ouml;glichkeiten dieses Projektes diese __Software__ ben&ouml;tigt:   
1. Visual Studio Code   
2. die Dateien aus diesem Verzeichnis (Projekt `RCC5V_GUI_Demo_Track`)   
3. ein Browser   
4. ein installierter MQTT-Client   
  _Beispiel_: `mosquitto` mit 
`mosquitto_sub` und `mosquitto_pub`   
5. ein (oder zwei) Windows Eingabe-Fenster (cmd)   
6. `WinSCP` oder ein anderes FTP/SFTP-Client-Programm   

[Zum Seitenanfang](#up)   
<a name="x30"></a>   

# 3. Anzeige und Test der Symbole
Zum Anzeigen der Symbole in einem Browser-Fenster sind folgende Schritte erforderlich:   
1. Visual Studio Code (VSC) starten   
2. Projekt `RCC5V_GUI_Demo_Track` laden   
3. Im VSC-Terminalfenster `npm run serve` eingeben   
4. Browser starten und folgende Adresse eingeben:   
`http://localhost:8080/#/`   

Es werden die Gleissymbole angezeigt, 
allerdings haben sie noch keine Funktionalit&auml;t, weil die Verbindung zum MQTT-Server fehlt.   

Damit die Gleissymbole funktionieren (d.h. MQTT Nachrichten senden und empfangen), sind weitere Schritte notwendig:   

5. Access-Point mit MQTT-Server starten.   
   Die IP-Adresse des MQTT-Servers sollte `10.1.1.1` sein   
6. PC oder Laptop mit dem WLAN des Access-Points verbinden.   
   (zB `Raspi11`, Passwort `12345678`)   
7. Die Hardware RCC-Blocktester einschalten und kontrollieren, ob sie sich mit dem MQTT-Server verbunden hat.   

Jetzt kann man im Browser kontrollieren, ob 
sich einige Gleise rot (oder gr&uuml;n) gef&auml;rbt haben.

![Gleissymbole3](./images/480_symbol_track3.png 
"Gleissymbole3")   
_Bild 2: Gleissymbole und ihre Verwendung (hier 
bereits mit Verbindung zur Hardware)_   

Ist auf dem PC/Laptop `mosquitto` installiert, so kann man in einem Terminal-Fenster (cmd) die MQTT-Daten&uuml;bertragung mitverfolgen. Dazu muss man zuerst ins mosquitto-Verzeichnis wechseln und den Subscriber starten:   
`cd C:/programme/mosquitto`   
`mosquitto_sub -h 10.1.1.1 -t rcc/# -v`   

Klickt man im Browser bei einem rot gef&auml;rbten Gleis in die obere H&auml;lfte des Feldes, so f&auml;rbt sich das Gleis gr&uuml;n und im RCC-Blocktester wird der Fahrstrom im Gleis eingeschaltet.   
Im Terminal-Fenster sieht man, dass folgende MQTT-Nachrichten gesendet wurden:   
```
rcc/demo1/set/41 1
rcc/demo1/ret/41 {"41":"1 received"}
rcc/demo1/ret/41 {"41":"1"}
```
Die erste Zeile ist der Schaltbefehl vom Browser, die zweite Zeile zeigt, dass der RCC-Blocktester die Nachricht erhalten hat, und die 3. Zeile zeigt, dass der Schaltvorgang erfolgreich ausgef&uuml;hrt wurde.   

Klickt man auf die untere H&auml;lfte eines Feldes, wird der Strom zum Gleis abgeschaltet und das Gleissymbol f&auml;rbt sich rot.   

[Zum Seitenanfang](#up)   
<a name="x40"></a>   

# 4. Gliederung der Software `RCC5V_GUI_Demo_Track`   
  Das VSC-Projekt liegt im Ordner `RCC5V_GUI_Demo_Track`. In diesem Verzeichnis befinden sich Dateien mit Informationen zum Projekt sowie die Unterverzeichnisse `.dist`, `images`, `node_modules` und `src`.   
Im Verzeichnis `src` befinden sich die eigentlichen Programmdateien:   
* Das Verzeichnis `classes` enth&auml;lt die Datei `Geo.ts`, in der viele Konstante und einfache Methoden definiert sind.   
* Das Verzeichnis `components` enth&auml;lt die Basis-Anzeigedatei `CiBase.vue` sowie die grafische Darstellung der Gleissymbole (`RccTrack1.vue`), der schr&auml;gen Verbindungselemente (`RccTrackCon1.vue`) und der Isolationssymbole (`RccTrackIso1.vue`).
* Das Verzeichnis `controller` enth&auml;lt einen Basis-Controller `CiBaseController.ts` sowie den Gleis-Controller `RccTrack1Controller.ts`.   
* Das Verzeichnis `router` enth&auml;lt die Datei `index.ts`, die f&uuml;r das Weiterleiten der Links in der Kopfzeile (`MainView` und `About`) verantwortlich ist.   
* Das Verzeichnis `services` enth&auml;lt die beiden Dateien `CiMqttClient.ts` und `CiMqttClientInstance.ts`. Diese enthalten alle Funktionen, die f&uuml;r die MQTT-Kommunikation ben&ouml;tigt werden.   
  Jeder Controller, der MQTT-Nachrichten empfangen will, muss in der Datei `CiMqttClientInstance.ts` registriert werden.   
* Das Verzeichnis `views` enth&auml;lt die Dateien `About.vue` und `MainView.vue`.   
  In `MainView.vue` werden die einzelnen Gleise angeordnet (mit `<RccTrack1>` Tags).   
* Die Datei `App.view` zeichnet die Gesamtansicht mit Kopfzeile und Grafik.   
* Die Datei `main.ts` startet schlie&szlig;lich die gesamte App.   

[Zum Seitenanfang](#up)   
<a name="x50"></a>   
<a name="x51"></a>   

# 5. Verwendung des `<RccTrack1>`-Tags
## 5.1 Syntax   
Gleissymbole werden in der Datei `MainView.vue` mit dem Tag `<RccTrack1 ...>` gezeichnet, wobei folgende Parameter erforderlich bzw. m&ouml;glich sind:   
* `x` (erforderlich): x-Koordinate des Mittelpunkts des Symbols in Pixel   
* `y` (erforderlich): y-Koordinate des Mittelpunkts des Symbols in Pixel   
* `dir` (erforderlich): Richtung des Gleissymbols (siehe [Kapitel 5.2](#x52))   
* `sid` (optional): ID des Symbols, mit dem Gleise gruppiert und &uuml;ber MQTT angesprochen werden.   
* `con` (optional): Verbindung eines schr&auml;gen Gleis-Endes mit dem Nachbargleis.   
   M&ouml;gliche Werte: '2', '4', '6' oder '8', je nach Richtung. Die Ziffer muss in `dir` enthalten sein.   
* `border` (optional): Gibt an, ob ein Rahmen um ein Gleissymbol gezeichnet werden soll. (M&ouml;gliche Werte 0 bis 3)   
* `label` (optional): Gibt an, ob und welche Beschriftung eines Gleissymbols angezeigt werden soll. (M&ouml;gliche Werte: "0" bis "3")   
* `color` (optional): Setzen einer Farbe f&uuml;r das Gleissymbol. (Keine Farbe "-")    
* `header` (optional): Text in der Kopfzeile   
* `headeralign` (optional): Ausrichtung der Kopfzeile ("L" f&uuml;r links, "C" f&uuml;r Mitte, "R" f&uuml;r rechte Ausrichtung)   
* `footer` (optional): Text in der Fu&szlig;zeile   
* `footeralign` (optional): Ausrichtung der Fu&szlig;zeile 
("L" f&uuml;r links, "C" f&uuml;r Mitte, "R" f&uuml;r rechte 
Ausrichtung)   

<a name="x52"></a>   

## 5.2 Richtung eines Gleissymbols
Die Richtung eines Gleissymbols wird als String &uuml;ber den Parameter `dir` festgelegt und besteht aus ein oder zwei Ziffern. Je eine Ziffer gibt die Richtung eines halben Gleises an (ausgehend vom Zentrum des Symbols):   
1 ... rechts (waagrecht, x+ Achse)   
2 ... rechts oben   
3 ... oben   
4 ... links oben   
5 ... links (waagrecht, x- Achse)   
6 ... links unten   
7 ... unten   
8 ... rechts unten   
0 ... Keine Richtung   
Einstellige Werte oder ganze Zehnerwerte ergeben einen Prellbock.   

![Gleisrichtungen](./images/300_track_directions1.png "Gleisrichtungen")   
_Bild 3: Gleisrichtungen_   

#### _Beispiele_
15 ... gerades, waagrechtes Gleis   
25 ... Gleis, das gerade (waagrecht) von links kommt (5) und nach rechts oben (2) abbiegt.   

Im _Bild 1_ oben sind alle M&ouml;glichkeiten mit ihren Zahlenwerten dargestellt.

<a name="x53"></a>   

## 5.3 MQTT-Funktionalit&auml;t
W&auml;hrend die Darstellung eines Gleissymbols in der Datei `RccTrack1.vue` festgelegt ist, wird die Funktionalit&auml;t durch die Datei `RccTrack1Controller` bestimmt.   
Die Eigenschaften einzelner Gleise werden im Array `tracks1` gespeichert. Ein Eintrag ist zB folgenderma&szlig;en aufgebaut:   
```
      {
        // ---test track 1--------------------------------------
        id: 'tk1',
        name: 'Track1',
        iTrack1State: -99,
        sDCC: '41',
        subTopic: 'rcc/demo1/ret/41 rcc/demo1/ret/status',
        pubTopic: 'rcc/demo1/set/41',
        payloadInvert: false,
      },
```
Bedeutung der einzelnen Parameter:   
* `id`: die ID stellt die Verbindung zum Anzeigeelement dar und muss mit dem Parameter `sid` &uuml;bereinstimmen.   
* `name`: Name des Gleises. Dieser wird derzeit nicht weiter verwendet.   
* `iTrack1State`: Status des Gleises. Ein Wert -99 bedeutet "unbestimmt", 0 bedeutet "Fahrstrom abgeschaltet" und 1 bedeutet "Fahrstrom eingeschaltet". Der Wert wird zB f&uuml;r die Anzeigefarbe des Symbols verwendet.   
* `sDCC`: DCC-Adresse des Gleises als String (zB '41').
* `subTopic`: Topics, auf die das Gleissymbol "h&ouml;rt". Dadurch kann z.B. der Schaltzustand des Gleises mit der richtigen Farbe dargestellt werden.   
   _Beispiel_: `'rcc/demo1/ret/41 rcc/demo1/ret/status'`.   
  Mehrere Topics werden durch ein Leerzeichen getrennt.   
* `pubTopic`: Topic unter dem das Gleissymbol MQTT-Nachrichten sendet.   
   _Beispiel_: `'rcc/demo1/set/41'`   
* `payloadInvert`: Damit kann die Bedeutung des Inhalts einer empfangenen Nachricht umgekehrt werden. Im Normalfall wird das nicht gemacht und der Wert ist `false`.

<a name="x54"></a>   

## 5.4 Vereinbarungen
### Positionsangabe
Die Angabe der Position des Mittelpunktes eines Symbols erfolgt in Pixel. Da Gleise auf einem Stellpult aneinandergereiht werden, muss man die Gr&ouml;&szlig;e der Symbole wissen. Diese ist in der Datei `classes/Geo.ts` festgelegt und wird folgenderma&szlig;en importiert:   
```
<script setup lang="ts">
import { Geof } from '../classes/Geo'
...
const geof = new Geof(0, 0, 1, 1)
const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
```
Damit ergibt sich f&uuml;r die Positionierung ein Raster mit den Schrittweiten dx und dy. Die Position eines Symbols erfolgt somit &uuml;blicherweise folgenderma&szlig;en:   
`:x="1*dx"  :y="0*dy"`   
Der Punkt vor dem x bzw, y bedeutet, dass der Wert dynamisch (zu berechnen) ist.   

### sid
Die `sid` stellt die Verbindung zur Funktionalit&auml;t dar (definiert in der Datei `RccTrack1Controller.ts`). Hat ein Gleis keine Funktionalit&auml;t (d.h. der Fahrstrom kann nicht beeinflusst werden), so wird `sid="tk0"` gesetzt.

### Rahmen
Die Angabe des Rahmens ist optional. Will man allerdings den Rahmen mehrerer Symbole gleich haben und gemeinsam &auml;ndern k&ouml;nnen, so definiert man im `<script>`-Bereich eine Variable daf&uuml;r:   
`const border = 1`   
Diese Variable verwendet man dann bei der `border`-Angabe:   
`:border="border"`   

<a name="x55"></a>   

## 5.5 Beispiele
1. An der Rasterposition 0/5: Gerades, waagrechtes Gleis ohne Rahmenangabe, Beschriftung und Funktion   
`<RccTrack1 :x="0*dx" :y="5*dy" sid="tk0" dir="15"></RccTrack1>`   

2. An der Rasterposition 1/5: Gleis waagrecht von links nach rechts unten. Kein Rahmen, keine Beschriftung und Funktion   
`<RccTrack1 :x="1*dx" :y="5*dy" sid="tk0" dir="58" :border="0"></RccTrack1>`   

3. An der Rasterposition 2/6: Gleis von links oben nach rechts (waagrecht) mit Funktion "tk1", Standardbeschriftung und Standardrahmen   
`<RccTrack1 :x="2*dx" :y="6*dy" sid="tk1" dir="14" label="3" :border="border"></RccTrack1>`   

4. An der Rasterposition 3/6: Gleis von links nach rechts oben mit Funktion "tk1" und Standardrahmen. Beschriftung: Unten Mitte "DCC 41", das Gleis-Ende rechts oben soll mitgezeichnet werden.   
`<RccTrack1 :x="3*dx" :y="6*dy" sid="tk1" dir="25" con="2" footer="DCC 41" footeralign="C" :border="border"></RccTrack1>`   

5. An der Rasterposition 4/5: Gleis von links unten nach rechts oben mit Funktion "tk1" und Standardrahmen. Beschriftung: Unten Rechts "[OFF]", Oben Links "[ON]"   
`<RccTrack1 :x="4*dx" :y="5*dy" sid="tk1" dir="26" header="[ON]" headeralign="L" footer="[OFF]" footeralign="R" :border="border"></RccTrack1>`   

6. An der Rasterposition 5/4: Gleis von links unten nach rechts unten, ohne Funktion und Beschriftung, mit Rahmen Nummer 3.   
`<RccTrack1 :x="5*dx" :y="4*dy" sid="tk0" dir="68" :border="3"></RccTrack1>`   

7. An der Rasterposition 6/5: Gleis von links oben nach rechts unten ohne Funktion und Beschriftung, mit Standardrahmen.   
`<RccTrack1 :x="6*dx" :y="5*dy" sid="tk0" dir="48" :border="border"></RccTrack1>`   

[Zum Seitenanfang](#up)   
<a name="x60"></a>   
<a name="x61"></a>   

# 6. Weitere Symbole
## 6.1 Gleistrennsymbol
Das Gleistrennsymbol besteht aus zwei parallelen Strichen und kennzeichnet Trennstellen bei der Fahrstromversorgung. Die Verwendung ist optional und hat keine Wirkung auf die Funktion des grafischen Gleisplans.   

Folgende Parameter sind m&ouml;glich:   
* `x` (erforderlich): x-Koordinate des Zentrums des Symbols in Pixel   
* `y` (erforderlich): y-Koordinate des Zentrums des Symbols in Pixel   
* `dir` (erforderlich): Richtung des Symbols (Werte "1", "2" oder "4". Siehe unten)   
* `sid` (optional): ID des Symbols. Diese hat keine besondere Bedeutung.   
* `color` (optional): Setzen einer Farbe f&uuml;r das 
Gleissymbol (Keine Farbe "-")    

F&uuml;r die Richtung des Symbols (`dir`) gibt es drei M&ouml;glichkeiten, wie das folgende Bild zeigt:   

![Isoliersymbol1](./images/300_symbol_iso1.png "Isoliersymbol1")   
_Bild 4: Isoliersymbole_   

Zus&auml;tzlich sieht man im Bild links unten ein gef&auml;rbtes Isoliersymbol.   
F&uuml;r senkrechte Gleise gibt es kein Isoliersymbol.   
Die Isoliersymbole werden &uuml;blicherweise nach den Gleissymbolen gezeichnet.   

### Beispiel
Isoliersymbol an der Stelle 4,5/4,5 in Richtung links oben.   
`<RccTrackIso1 :x="4.5*dx" :y="4.5*dy" sid="iso1" dir="2"></RccTrackIso1>`   

<a name="x62"></a>   

## 6.2 Schr&auml;ge Verbindungselemente
Schr&auml;ge Gleissymbole enden in der Ecke an den waagrechten und senkrechten Symbolgrenzen. Bei der Aneinanderreihung kommt es an den Ecken zu Fehlstellen, die durch Elemente des Typs `RccTrackCon1` ausgeglichen werden k&ouml;nnen.   
Es gibt zwei Arten f&uuml;r die beiden schr&auml;gen Richtungen "2" und "4".   
Soll das Verbindungselement seine Farbe __gemeinsam__ mit dem Gleis mit &auml;ndern, so muss man die Option "`con`" des `RccTrack1`-Tags verwenden!   


F&uuml;r die Parameter gilt das gleiche wie f&uuml;r `RccTrack1Iso`:   
* `x` (erforderlich): x-Koordinate des Zentrums des 
Symbols in Pixel   
* `y` (erforderlich): y-Koordinate des Zentrums des 
Symbols in Pixel   
* `dir` (erforderlich): Richtung des Symbols (Werte 
"2" oder "4").   
* `sid` (optional): ID des Symbols. Diese hat keine 
besondere Bedeutung.   
* `color` (optional): Setzen einer Farbe f&uuml;r das 
Gleissymbol (Keine Farbe "-").   

### Beispiele
1. Verbindungselement an der Position 1,5/5,5 in Richtung rechts unten (4) mit der Farbe `geof.colorTrackOff`.   
` <RccTrackCon1 :x="1.5*dx" :y="5.5*dy" sid="con0" dir="4" :color="geof.colorTrackOff"></RccTrackCon1>`   
Hier ist die Farbe des Verbindungselements fest vorgegeben (rot). &Auml;ndert sich der Fahrstrom-Zustand des Gleises auf "ein", werden die Gleise gr&uuml;n gef&auml;rbt, aber das Verbindungselement bleibt rot.   

2. Verbindungselement an der Position 5,5/4,5 in Richtung rechts unten (4).   
` <RccTrackCon1 :x="5.5*dx" :y="4.5*dy" sid="con0" dir="4"></RccTrackCon1>`   

[Zum Seitenanfang](#up)   
<a name="x70"></a>   
<a name="x71"></a>   

# 7. Anmerkungen zur Programmierung   
## 7.1 Klickbereiche f&uuml;r Gleissymbole
Zu Beginn der Entwicklung wurden die beiden rechteckigen Klickbereiche "Ein" = obere H&auml;lfte des Symbol-Rechtecks und "Aus" = untere H&auml;lfte definiert:   
![Rechteckige Klickbereiche](./images/150_clickarea_rect1.png "Rechteckige Klickbereiche")   
_Bild 5: Rechteckige Klickbereiche_   
In Versuchen zeigt sich, dass es praktischer ist, wenn die Klickbereiche besser an den Gleisverlauf angepasst sind. Daher werden die rechteckigen Klickbereiche durch Pfade ersetzt (Funktionen `pathTop` und `pathBottom`).   

Insgesamt werden f&uuml;r den oberen Bereich neun Klickfl&auml;chen f&uuml;r folgende Gleisrichtungen definiert:   
14, 4 und 46 | 25, 2 und 28 | 16 und 6 | 58 und 8 | 26 | 48 | 24 | 68   

![Klickbereiche Top](./images/300_clickarea_top1.png "Klickbereiche Top")   
_Bild 6: Alle Klickbereiche Top_   

Wenn kein spezieller Klickbereich zugeordnet ist, werden - so wie bisher - die Rechtecke verwendet.   


[Zum Seitenanfang](#up)
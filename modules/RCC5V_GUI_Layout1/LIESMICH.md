<table><tr><td><img src="./images/RCC5V_Logo_96.png"></img></td><td>
Letzte &Auml;nderung: 27.1.2026 <a name="up"></a><br>   
<h1>GUI zum Steuern einer RCC5V-Modelleisenbahn-Modulanlage</h1><h3>RCC5V_GUI_Layout1</h3>
<a href="README.md">==> English version</a>&nbsp; &nbsp; &nbsp; 
</td></tr></table>   

# 1. Einleitung
Diese VUE-Anwendung dient zum Steuern einer Eisenbahnanlage, die aus mehreren Modulen zusammengestellt ist. Um eine Vorstellung zu bekommen, worum es geht, dient das folgende Bild der GUI ("Graphical User Interface", deutsch "Grafische Benutzeroberfläche") der Anlage 1:   

![GUI_Layout1](./images/600_GUI_layout1.png "GUI_Layout1")   
_Bild 1: GUI der Modelleisenbahnanlage "Layout1"_   
Die Anlage besteht aus insgesamt sechs Modulen. Mit Hilfe dieser Oberfläche ist es möglich, einzelne Weichen und Gleise zu schalten oder ganze Fahrstraßen einzurichten.   

Die Erstellung dieser VUE-Anwendung wird in folgenden Kapiteln beschrieben.   
1. [Erforderliche Hardware](#x20)   
2. [Vu3-Tipps](#x30)   
3. [Grafisches Zusammenfügen mehrerer RCC5V-Modelleisenbahn-Module zu einer Gesamtanlage](#x40)   
4. [Gemeinsames Ansteuern von RCC5V-Komponenten auf den Modulen](#x50)   
5. [Erstellen von Fahrstraßen (routes) über mehrere Module hinweg.](#x60)   

Bildet man eine Release-Ausgabe von GUI-Layout1 und kopiert diese auf ein Raspberry Pi, so kann die Anlage zB mit einem Tablett oder Smartphone gesteuert werden. Wie man das macht wird im [Kapitel 3: Vue-Tipps](#x30) beschrieben.   

[Zum Seitenanfang](#up)   
<a name="x20"></a>   
<a name="x21"></a>   

# 2. Hardware
## 2.1 Eisenbahn-Module
Als Hardware werden für die Anlage 1 (layout1) folgende Module zusammengesteckt und verdrahtet (von West nach Ost):   
1. [Modul 13: Kehrschleife West](https://github.com/khartinger/RCC5V/blob/main/examples/module13/LIESMICH.md)   
2. [Modul 12: Ausweichstelle und Abstellgleis](https://github.com/khartinger/RCC5V/blob/main/examples/module12/LIESMICH.md)   
3. Modul 11: Tanklager   
4. [Modul 01: Gleis 1 auf 2 mit Güterschuppen](https://github.com/khartinger/RCC5V/blob/main/examples/module01/LIESMICH.md)   
5. [Modul 14: Zwei Gleise auf ein Gleis](https://github.com/khartinger/RCC5V/blob/main/examples/module14/LIESMICH.md)   
6. Modul 10: Kehrschleife Ost   

<a name="x22"></a>   

## 2.2 Access-Point
Die Kommunikation mit den Modulen bzw. Komponenten erfolgt über WLAN und MQTT-Nachrichten, daher ist ein Access-Point erforderlich. Wie bereits in anderen Teilen des Projektes verwendet, kann der Access-Point z.B. ein Raspberry Pi mit folgenden Daten sein:   
* WLAN-Name: Raspi11   
* WLAN-Passwort: 12345678   
* IP-Adresse des MQTT-Servers: 10.1.1.1   

<a name="x23"></a>   

## 2.3 Hardware zur Steuerung der Komponenten
Die Steuerung der Komponenten kann mittels PC, Laptop oder Tablet erfolgen. Die Geräte müssen mit dem WLAN des Access-Points verbunden werden.   
Nach Starten des Browsers und Eingabe der Adresse   
`http://10.1.1.1/mqtt/layout1/#/`   
wird `GUI_Layout1` angezeigt.   

<a name="x24"></a>   

## 2.4 Programmierhardware
Zum Programmieren wird ein PC oder Laptop mit folgender Software benötigt:   
1. Visual Studio Code (VSC)   
2. Browser   
3. WinSCP oder ein anderes FTP/SFTP-Client-Programm   

[Zum Seitenanfang](#up)   
<a name="x30"></a>   
<a name="x31"></a>   

# 3. Vue3-Tipps
## 3.1 VSC-Terminal-Fenster öffnen
Falls das Terminal-Fenster am unteren Rand von Visual Studio Code nicht sichtbar ist, kann es über das Menü `Terminal - Neues Terminal` geöffnet werden.   

<a name="x32"></a>   

## 3.2 Internen Server starten
Wenn man den internen Server von VSC startet, werden das erzeugte Bild sowie die Änderungen direkt/live im Browser angezeigt.   

Eingabe im VSC-Terminal, Reiter TERMINAL:   
`npm run serve`   

Eingabe im Browser:   
`http://localhost:8080/#/`   

<a name="x33"></a>   

## 3.3 Verwenden einer fertigen Version
Die mit VSC erstellte VUE-Anwendung kann auch ohne den internen Server angezeigt werden. Dazu muss man eine "Build"-Version erzeugen und diese auf einen Server hochladen. Im Detail sind folgende Schritte erforderlich:   

### Erzeugen der Build-Version
Eingabe im VSC-Terminal, Reiter TERMINAL:   
* Falls der interne Server (noch) läuft: Mit [Strg]C abbrechen, danach   
* `npm run build` eingeben.   

Dadurch wird ein produktionsfähiger Build der Anwendung im Verzeichnis `./dist` des Projekts erstellt.   

### HTTP-Server installieren/starten
HTTP-Anfragen eines Browsers müssen von einem Server(programm) bearbeitet werden. Verwendet man ein Raspberry PI (RasPi) als Access-Point ("WLAN-Erzeuger"), so kann man auf diesem auch den Apache-Server installieren. Anleitungen dazu findet man im Internet wie zB auf   
[https://tutorials-raspberrypi.de/webserver-installation-apache2/](https://tutorials-raspberrypi.de/webserver-installation-apache2/).

Standardmäßig wird das RasPi-Verzeichnis `/var/www/html` als "Startpunkt" für HTTP-Anfragen eingerichtet.   

### Hochladen der Build-Version
Dazu verbindet man sich mit dem Programm `WinSCP` mit dem RasPi. Dazu muss man die IP-Adresse (10.1.1.1), den Benutzernamen und das Passwort des Benutzern wissen.   

Nachdem man mit dem RasPi verbunden ist, wechselt man im Remote-Fenster (meist rechts) ins Verzeichnis `/var/www/html`. Dort legt man ein Verzeichnis `mqtt` an, wechselt in dieses hinein und legt dort ein Verzeichnis `layout1` an.   
Im lokalen Fenster (links) wechselt man ins Projektverzeichnis und dort ins Unterverzeichnis `.dist`. Dann kopiert man den Inhalt des Verzeichnisses `./dist` (Ordner `assets` und `index.html`) ins Verzeichnis
`/var/www/html/mqtt/layout1`.

### Anzeige der GUI
Ruft man im Brower die Adresse   
`http://10.1.1.1/mqtt/layout1/#/`   
auf, wird `GUI_layout1` angezeigt.   

[Zum Seitenanfang](#up)   
<a name="x40"></a>   
<a name="x41"></a>   

# 4. Zusammenfügen mehrerer RCC5V-Modelleisenbahn-Module
## 4.1 Grafik (GUI)
Das Zusammenfügen der GUIs der einzelnen Module erfolgt im `<template>`-Bereich der Datei `MainView.vue`.   
```html   
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccModule13 :x0="0*dx" :y0="0*dy" sid="m13" :border="border" :color="color" :route="routeXmcr['m13']"/>
    <RccModule12 :x0="(m13.nx)*dx" :y0="0*dy" sid="m12" :border="border" :color="color" :route="routeXmcr['m12']"/>
    <RccModule11 :x0="(m13.nx+m12.nx)*dx" :y0="0*dy" sid="m11" :border="border" :color="color" :route="routeXmcr['m11']"/>
    
    <RccModule01 :x0="1*dx" :y0="(1+m13.ny)*dy" sid="m01" :border="border" :color="color" :route="routeXmcr['m01']"/>
    <RccModule14 :x0="(1+m01.nx)*dx" :y0="(1+m13.ny)*dy" sid="m14" :border="border" :color="color" :route="routeXmcr['m14']" />
    <RccModule10 :x0="(1+m01.nx+m14.nx)*dx" :y0="(1+m13.ny)*dy" sid="m10" :border="border" :color="color" :route="routeXmcr['m10']" />
   </svg>
```   
Zum Positioneren der Module benötigt man deren Größe. Dazu ist in jedem Modul eine Konstante `mXX` definiert (`XX` = Modul Nummer), die mittels `mXX.nx` und `mXX.ny` die Größe des Moduls in Symboleinheiten zurückgibt.   
* _Beispiel Modul 12_: `m12.nx=4` und `m12.ny=3`   
  (Im _Bild 1_ ist die Größe des Moduls "in Kästchen" ersichtlich)   

Damit kann die Position `:x0` und `:y0` jedes Moduls festgelegt werden.   
* _Beispiel Modul 10_: `:x0="(1+m01.nx+m14.nx)*dx" :y0="(1+m13.ny)*dy"`   
  Mit `m01.nx=2` und `m14.nx=2` ergibt sich `:x0=5*dx`, mit `m13.ny=3` wird `:y0=4*dx`. Eine Kontrolle ist wieder mit _Bild 1_ möglich.   

<a name="x42"></a>   

## 4.2 Komponenten-Daten
Die Daten der einzelnen Komponenenten (Gleise, Weichen, Entkuppler) sind in jedem Modul in den Controller-Dateien in den Arrays `tracks`, `turnouts`, `to3ways1` und `uncouplers1` gespeichert.   
Derzeit müssen die Daten aus diesen Dateien in die Controller-Dateien von `RCC5V_GUI_Layout1` kopiert werden.   


# ..ToDo..

[Zum Seitenanfang](#up)   
<a name="x50"></a>   
<a name="x51"></a>   

# 5. Fahrwege (Routen) erstellen
## 5.1 Grafische Anzeige

## 5.2 Schalten der Weichen und Gleise

## 5.3 Schaltflächen für die Fahrwege

# 6. Gemeinsames Schalten von Gleisen

# 7. Weitere Tipps
## Beobachtung der MQTT-Kommunikation

Im Eingabe-Fenster kann man die gesendeten MQTT-Nachrichten mitverfolgen:   
`mosquitto_sub -h 10.1.1.1 -t rcc/# -v`   

Öffnet man ein zweites Terminalfenster, so kann man in diesem MQTT-Befehle senden, z.B.   
`mosquitto_pub -h 10.1.1.1 -t rcc/module12/get -m status`   

[Zum Seitenanfang](#up)
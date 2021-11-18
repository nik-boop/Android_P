﻿## Second_window

layout - activity_main.xml, activity_main2.xml

![](git-img/img.png)
![](git-img/img_2.png)

Код программы:
* MainActivity
* MainActivity2

![](git-img/img_1.png)
![](git-img/img_3.png)

При нажатии на кнопку нового окна создается и запускается новая активность
добавляемая в стек активностей и поверх основной 
для этой активности были инициализированы функции вызываемые во время цикла жизни активности отражающие этот процесс в логах

![](git-img\img_4.png)
![](git-img/img_5.png)
![](git-img/img_6.png)


### Контрольные вопросы: 
1. Несколько окон упрощает написание программы, позволяет выделить отдельные активности, а также создание цикла жизни самих активностей как внутри так и отдельно от основной программы
2. Intent(намерение) - это абстрактное описание выполняемой операции, пассивная структура данных, содержащая действия, которое необходимо выполнить.
3. Необходимо создать Intent запроса на вызов новой активности после его запустить ее
4. Task — это набор Activity. Каждый таск содержит свой стек этих Activity. В стандартной ситуации, каждое приложение имеет свой таск и свой стек. При сворачивании приложения, таск уходит в background, но не умирает. Он хранит весь свой стек и при очередном открытии приложения через менеджер или через launcher, существующий таск восстановится и продолжит свою работу.

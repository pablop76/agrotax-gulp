# strona biura rachunkowego AgroTax

![Agrotax](./agrotax-project.jpg)

## użyte technologie.

1. html,css,js,php
2. program tworzący pakiety [gulp.js](https://gulpjs.com/)

3. platforma front-end do tworzenia szybkich i wydajnych interfejsów internetowych [uikit](https://getuikit.com/)

## niezbędne oprogramowanie.

1. środowisko wykonawcze [node.js](https://nodejs.org/en/)
2. IDE (zintegrowane środowisko programistyczne) np: [Visual Studio Code](https://code.visualstudio.com/)

## knfiguracja projektu.

1. pobranie paczkę z projektem [github](https://github.com/pablop76/agrotax-gulp)
2. wypakować
3. otworzyc folder za pomoca IDE
4. otworzyć terminal w katalogu projektu
5. zainstalowac zależności za pomocą komendy:

- npm install

## praca z projektem

1. uruchomienie

- gulp

## bug
- w plikach html json np.
```json
        <!-- formularz kontaktowy -->
          @@include('./inc/_contact-form.html', {
          "title":"INFORMACJE I ZAPYTANIA",
          "name": "imie i nazwisko",
          "email":"email",
          "phone":"Telefon",
          "message":"Wiadomość",
          "privacy-policy-start":"Przesyłajac ten formularz, akceptujesz naszą",
          "privacy-policy-link":"Politykę prywatności",
          "privacy-policy-end":"oraz wyrażasz zgodę na przetwarzanie Twoich danych osobowych.",
          "send":"Wyślij"
          })
```
klucz i wartość musi być w jednej linijce

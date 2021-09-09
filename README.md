## Структура папок и файлов

```
├── app/                          # Исходники
│   ├── js                        # Скрипты
│   │   └── main.js               # Главный скрипт
│   │   ├── global.js             # файл с базовыми данными проекта - переменные, вспомогательные функции и т.д.
│   │   ├── components            # js-компоненты
│   │   ├── modules               # папка для загрузки локальных версий библиотек
│   ├── scss                      # Стили сайта (препроцессор sass в scss-синтаксисе)
│   │   └── style.scss            # Главный файл стилей
│   │   └── modules.scss          # Файл для подключения стилей библиотек из папки vendor
│   │   └── _fonts.scss           # Файл для подключения шрифтов (можно использовать миксин)
│   │   └── _mixins.scss          # Файл для подключения миксинов из папки mixins
│   │   └── _vars.scss            # Файл для написания css- или scss-переменных
│   │   └── _global.scss          # Файл для написания глобальных стилей
│   │   ├── mixins                # папка для сохранения готовых scss-компонентов
│   │   ├── modules               # папка для хранения локальных css-стилей библиотек
│   ├── parts                     # папка для хранения html-частей страницы
│   ├── fonts                     # папка для хранения шрифтов
│   ├── img                       # папка для хранения картинок
│   └── index.html                # Главный html-файл
└── gulpfile.js                   # файл с настройками Gulp
└── package.json                  # файл с настройками сборки и установленными пакетами
└── README.md                     # документация сборки
```

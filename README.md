
# file-manager

`file-manager` - это инструмент командной строки, написанный на Node.js, который предоставляет удобный способ управления файлами и директориями прямо из командной строки.

## Команды

- `ls`: Выводит список директорий и файлов в текущей директории.
- `cp`: Копирует файл из одного места в другое. Первым параметром указывается путь к файлу, а вторым параметром - целевой путь.
- `up`: Переходит на уровень выше в директории.
- `cat`: Выводит содержимое файла. Вторым параметром необходимо указать путь к файлу.
- `add`: Создает новый файл в текущей директории.
- `rm`: Удаляет файл.
- `os`: Выводит информацию о операционной системе.
- `compress` и `decompress`: Сжимает и распаковывает файлы с использованием алгоритма Brotli. Первым параметром указывается файл, а вторым параметром - целевой путь.
- `hash`: Выводит хэш прочитанного файла.

## Описание

`file-manager` предоставляет простой и удобный интерфейс для выполнения операций с файлами и директориями из командной строки. Вы можете легко просматривать содержимое текущей директории, копировать файлы, перемещаться по директориям, просматривать содержимое файлов, создавать новые файлы, удалять файлы и многое другое.

Также `file-manager` предоставляет дополнительные функции, такие как сжатие и распаковка файлов с использованием алгоритма Brotli, а также вычисление хэша прочитанного файла.

## Установка и использование

1. Склонируйте репозиторий на свою локальную машину.
2. Установите зависимости с помощью команды `npm install`.
3. Запустите `file-manager` с помощью команды `npm run start -- --username=your_name`.
4. Используйте доступные команды для управления файлами и директориями.

`file-manager` предоставляет удобный способ управления файлами и директориями прямо из командной строки, делая вашу работу с файлами более эффективной и удобной.

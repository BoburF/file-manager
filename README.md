
# file-manager

Чтобы запустить проект, выполните команду:
```
npm run start -- --username=ваше_имя_пользователя
```
Вы можете выполнять операции без указания полного пути, если находитесь в директории и вам нужно выполнить операцию над файлами в этой директории. Просто введите имя файла, и текущая директория будет автоматически добавлена к нему.

Например, вместо:
```
cp c:\Users\User\Desktop\read.txt c:\Users\User\Desktop\file-manager
```
вы можете просто, если находитесь в позиции Desktop:
```
cp read.txt file-manager
# in compress you must type exactly path to file with file name
# in decompress you must type exactly destination path with file name

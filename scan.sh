#!/bin/bash

# Путь к директории проекта и файлу, в который будут записаны результаты
project_dir="$1"
output_file="$2"

# Проверка наличия аргументов
if [ -z "$project_dir" ] || [ -z "$output_file" ]; then
    echo "Использование: $0 /path/to/project /path/to/output.txt"
    exit 1
fi

# Проверка наличия файла .gitignore в директории проекта
if [ ! -f "$project_dir/.gitignore" ]; then
    echo "Файл .gitignore не найден в $project_dir"
    exit 1
fi

# Функция для обхода файлов и папок
process_dir() {
    for item in "$1"/*; do
        # Проверка, не игнорируется ли элемент в .gitignore
        if ! git -C "$project_dir" check-ignore -q "$item"; then
            if [ -d "$item" ]; then
                # Если это директория, рекурсивно обрабатываем ее
                process_dir "$item"
            elif [ -f "$item" ]; then
                # Если это текстовый файл, добавляем его содержимое в output_file
                file_type=$(file --mime-type -b "$item")
                if [[ "$file_type" == text/* ]]; then
                    echo "Обработка $item"
                    echo "### FILE: $item ###" >> "$output_file"
                    cat "$item" >> "$output_file"
                    echo -e "\n" >> "$output_file"
                fi
            fi
        fi
    done
}

# Очистка файла вывода
> "$output_file"

# Обход директории проекта
process_dir "$project_dir"

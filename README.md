# @datavac/ui-kit

Библиотека компонентов для проекта DataVac.

## Установка

```bash
npm install @datavac/ui-kit
```

## Подключение стилей

В корневом CSS файле приложения:

```css
@import "@datavac/ui-kit/style.css";
```

## Требования

- React 19+
- Tailwind CSS v4

## Компоненты

| Компонент | Описание |
|---|---|
| `Button` | Кнопка (primary/dark) |
| `Heading`, `Text`, `Label`, `Caption` | Типографика |
| `Input`, `SearchBar` | Поля ввода |
| `Badge`, `Chip`, `Counter` | Метки и счётчики |
| `Tooltip` | Всплывающая подсказка |
| `Drawer` | Боковая панель (slide-from-right) |
| `Accordion`, `AccordionItem` | Аккордеон |
| `Spinner`, `Skeleton` | Индикаторы загрузки |
| `EmptyState`, `ErrorState` | Состояния UI |
| `ThemeToggle` | Переключатель День/Ночь |

## Разработка

```bash
npm install
npm run dev       # watch mode
npm run storybook  # компонент-документация на :6006
npm test           # тесты
npm run lint       # линтер
```

## Публикация

Публикация автоматическая через semantic-release при пуше в main.
Формат коммитов: conventional commits (feat/fix/chore).

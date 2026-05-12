# Участие в разработке @datavac/ui-kit

## Именование веток

Все ветки должны начинаться с одного из префиксов:

| Префикс | Когда использовать |
|---|---|
| `feat/` | Новая функциональность |
| `fix/` | Исправление багов |
| `chore/` | Тех. задачи / обслуживание |
| `docs/` | Документация |
| `refactor/` | Рефакторинг без изменения логики |

**Примеры:** `feat/tag-filter`, `fix/button-focus`, `refactor/icon-system`

## Начало работы

Перед созданием ветки всегда синхронизируемся с `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-task-name
```

## Сообщения коммитов

Репозиторий использует [Conventional Commits](https://www.conventionalcommits.org/). Commitlint проверяет формат при каждом коммите.

```
feat(button): добавить вариант размера
fix(input): исправить цвет кольца фокуса
chore: обновить storybook до v10
```

Типы: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

## Перед открытием PR

Синхронизируемся с последним `main` через rebase (не merge):

```bash
git fetch origin
git rebase origin/main
```

Если возникли конфликты — разбираемся в каждом файле отдельно. Если код непонятен — сначала уточняем у автора. После разрешения:

```bash
git add .
git rebase --continue
```

## Пуш ветки

```bash
git push origin feat/your-task-name

# Если история ветки была переписана через rebase:
git push origin feat/your-task-name --force-with-lease
```

## Правила Pull Request

- PR — **единственный** способ попасть в `main`, прямой пуш заблокирован
- PR должен пройти CI (линтер + тесты + сборка)
- Заголовок PR должен соответствовать формату Conventional Commits
- Базовая ветка всегда `main`

## Prerelease-пакеты из feature-веток

При каждом пуше в ветку `feat/*` CI автоматически публикует prerelease-версию в npm.

| Ветка | Версия npm | Установка |
|---|---|---|
| `feat/tag-filter` | `1.2.0-tag-filter.1` | `npm i @datavac/ui-kit@tag-filter` |
| `feat/infection-card` | `1.2.0-infection-card.1` | `npm i @datavac/ui-kit@infection-card` |

Это позволяет протестировать компонент в приложении-потребителе до слияния в `main`.

## Структура Pull Request

**Заголовок** — в формате Conventional Commits:
```
feat(tag-filter): добавить компонент фильтрации по категориям
```

**Описание:**

```markdown
## Что сделано

- Реализован компонент `TagFilter` с тремя визуальными состояниями
- Добавлены Storybook-истории: Default, WithActive, WithPinkSelected
- Экспортирован из `ui-kit/index`

## Тест-план

- [ ] Все состояния компонента работают корректно
- [ ] `npm run test` — все тесты зелёные
- [ ] Storybook — все stories рендерятся без ошибок
- [ ] Prerelease-версия проверена в приложении: `npm i @datavac/ui-kit@tag-filter`

Closes DataVac-masterskaya/data-vac-frontend#22
```

> `Closes owner/repo#N` автоматически закроет issue в `data-vac-frontend` при мёрже PR.

**Чеклист перед отправкой на ревью:**
- [ ] Ветка синхронизирована с `main` через `rebase`
- [ ] CI проходит (линтер, тесты, сборка)
- [ ] Prerelease-версия опубликована и проверена в приложении
- [ ] Storybook-истории покрывают все состояния компонента

---

## Стратегия слияния

- **Squash merge** — предпочтительный вариант (история `main` остаётся чистой)
- **Rebase merge** — если важна линейная история отдельных коммитов

## Релизы

Релизы выполняются автоматически через CI с помощью `semantic-release`:

| Ветка | Формат версии | Пример |
|---|---|---|
| `main` | `MAJOR.MINOR.PATCH` | `1.2.0` |
| `feat/*` | `MAJOR.MINOR.PATCH-branch-name.N` | `1.2.0-tag-filter.1` |

Релиз запускается при каждом пуше в `main` или `feat/*`. Версия определяется по коммитам: `feat:` → minor, `fix:` → patch, `BREAKING CHANGE` → major.

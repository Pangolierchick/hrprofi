# Database

sqlite

# Усложнения

1. Добавлена валидация URL с проверкой корректности ссылки.
2. Добавлена возможность задавать кастомные ссылки, чтобы пользователь мог сделать их человекочитаемыми.

# uuid

Используется так как он уникален, что является основным требованием для pk.

# hrprofi

To install dependencies:

```bash
yarn install
```

To run:

```bash
yarn start
```

Add url with user's short url name

```curl
curl --location 'localhost:8080/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=http://google.com' \
--data-urlencode 'userurl=test6'
```

add url with generated short url

```curl
curl --location 'localhost:8080/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=http://google.com'
```

redirect using short url

```curl
curl --location 'localhost:8080/1f5ae32a'
```

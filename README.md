# svg-to-png

Projeto mínimo: servidor Node + Express com endpoint POST /api/convert que transforma SVG em PNG usando sharp. Inclui página dev (HTML/CSS/JS) e configuração de nodemon.

Como usar

1. Instalar dependências:

```bash
npm install
```

2. Rodar em dev (com nodemon):

```bash
npm run dev
```

3. Abrir http://localhost:3000 e testar.

API

- POST /api/convert
- body JSON: { svg: string, width?: number, height?: number }
- resposta: image/png

Checklist de requirements

- Node + nodemon para dev: Done
- Converter SVG -> PNG: Done (sharp)
- Página HTML/CSS/JS de exemplo: Done

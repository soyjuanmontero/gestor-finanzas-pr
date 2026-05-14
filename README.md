# Gestor de Finanzas 💰

Aplicación web para registrar ingresos y gastos con visualización
de balance en tiempo real.

🔗 **[Ver demo en vivo](https://soyjuanmontero.github.io/gestor-finanzas-pr/)**

---

## ¿Qué hace?

- Registrá ingresos y gastos con descripción y monto
- Visualizá tu balance actualizado en tiempo real
- Diferencia visualmente entre ingresos (verde) y gastos (rojo)
- Los datos persisten aunque cierres el navegador (LocalStorage)

## Stack

- TypeScript
- JavaScript (ES6+)
- HTML5 semántico
- CSS3 / BEM
- LocalStorage API

## Decisiones técnicas

- Arquitectura orientada a objetos con TypeScript
- UI completamente desacoplada de la capa de datos
- Sin librerías externas — lógica de cálculo implementada desde cero
- Tipado estricto con interfaces TypeScript para modelar transacciones

## Correr localmente

```bash
git clone https://github.com/soyjuanmontero/gestor-finanzas-pr
cd gestor-finanzas-pr
npm install

# Compilar TypeScript
npx tsc

# Abrir index.html con Live Server desde VS Code
# O ejecutar en paralelo para watch mode:
npx tsc --watch
```

## Autor

Juan Manuel Montero — [LinkedIn](https://www.linkedin.com/in/juan-manuel-montero-cedeño)
· [GitHub](https://github.com/soyjuanmontero)
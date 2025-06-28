# HexaNumerology

A comprehensive JavaScript library for calculating numerology, zodiac, Chinese zodiac (Shio), and Javanese Weton profiles.

## Features

- **Numerology**
  - Life Path (including Master Numbers 11, 22, 33)
  - Expression Number
  - Soul Urge
  - Maturity
  - Personal Year, Month, and Day
- **Zodiac**
  - Western astrology sign and description
- **Shio (Chinese Zodiac)**
  - Chinese zodiac sign and description
- **Javanese Weton**
  - Day and Pasaran market cycle
  - Neptu score and description
  - Good days for marriage, business, moving house, aqiqah, new position

## Installation

```bash
git clone https://github.com/NeaByteLab/HexaNumerology.git
cd HexaNumerology
```

## Usage

See `example.js` for a complete demonstration of all features:

```bash
node example.js
```

## API Reference

### `new HexaNumerology(fullName, birthDateString, languageCode = 'id')`
- **fullName**: `string` – Full name of the person.
- **birthDateString**: `string` – Birth date in `DD-MM-YYYY` format.
- **languageCode**: `string` – `'id'` for Indonesian, `'en'` for English (default `'id'`).

## License

MIT License © 2025 [NeaByteLab](https://github.com/NeaByteLab)
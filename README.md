# AOS AI Weather Advisory Agent

AI-powered agricultural weather advisory system for AOS Farmr.

## Features

- Weather forecast integration
- AI-generated farming advice
- Crop-specific recommendations
- REST API endpoint
- Ready for mobile app integration

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create .env file

Copy `.env.example` into `.env`

```bash
cp .env.example .env
```

### 3. Add API keys

Get API keys from:

- OpenWeatherMap
- OpenAI

## Run Server

```bash
npm start
```

Server runs on:

```bash
http://localhost:3000
```

## API Endpoint

```bash
GET /generate-advice
```

Example:

```bash
http://localhost:3000/generate-advice?city=Kaduna&crop=Maize&stage=Flowering
```

## Example Response

```json
{
  "success": true,
  "city": "Kaduna",
  "crop": "Maize",
  "advice": "Heavy rainfall expected. Delay fertilizer application."
}
```

## Recommended Next Features

- Push notifications
- Disease prediction
- Farmer database
- Voice assistant
- Satellite integration

#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000/events"

# Token de autorización (reemplazar con un token válido)
AUTH_TOKEN="Bearer ${sessionStorage.getItem("token")}"

# Crear un evento
curl -X POST "$BASE_URL/users/" \
  -H "Authorization: $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "Consulta psicológica",
    "startDateTime": "2025-01-21T10:00:00Z",
    "duration": 60,
    "color": "#FF5733",
    "category": "Ansiedad"
  }'

echo -e "\n--- Evento creado ---\n"

# Obtener todos los eventos
curl -X GET "$BASE_URL" \
  -H "Authorization: $AUTH_TOKEN"

echo -e "\n--- Lista de eventos ---\n"

# Obtener un evento por ID (reemplazar <event_id> con un ID válido)
EVENT_ID="<event_id>"
curl -X GET "$BASE_URL/$EVENT_ID" \
  -H "Authorization: $AUTH_TOKEN"

echo -e "\n--- Evento obtenido ---\n"

# Obtener eventos de un usuario (reemplazar <user_id> con un ID válido)
USER_ID="<user_id>"
curl -X GET "$BASE_URL/users/user" \
  -H "Authorization: $AUTH_TOKEN"

echo -e "\n--- Eventos del usuario ---\n"

# Actualizar un evento (reemplazar <event_id> con un ID válido)
curl -X PUT "$BASE_URL/$EVENT_ID" \
  -H "Authorization: $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "Terapia grupal",
    "startDateTime": "2025-01-22T15:00:00Z",
    "duration": 90,
    "color": "#33FF57",
    "category": "Otro"
  }'

echo -e "\n--- Evento actualizado ---\n"

# Eliminar un evento (reemplazar <event_id> con un ID válido)
curl -X DELETE "$BASE_URL/$EVENT_ID" \
  -H "Authorization: $AUTH_TOKEN"

echo -e "\n--- Evento eliminado ---\n"

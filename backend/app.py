from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

# Cargar variables de entorno (API Key)
load_dotenv()

app = Flask(__name__)
# Habilitar CORS para permitir peticiones desde el frontend en React
CORS(app)

# Configurar la API de Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# =================================================================
# MAGIA DE SENIOR: Autodetectar el modelo correcto para tu API Key
# =================================================================
print("🔍 Verificando modelos habilitados en tu cuenta de Google...")
AVAILABLE_MODEL = "gemini-1.5-flash" # Fallback por defecto

try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            # Guardamos el primer modelo válido que encontremos (ej: gemini-2.0-flash, gemini-pro, etc)
            AVAILABLE_MODEL = m.name.replace('models/', '')
            print(f"✅ ¡Modelo detectado exitosamente!: {AVAILABLE_MODEL}")
            break
except Exception as e:
    print(f"⚠️ No se pudo listar modelos, intentando fallback... Error: {e}")

# Inicializar modelo
model = genai.GenerativeModel(AVAILABLE_MODEL)


# Cerebro
SYSTEM_PROMPT = """
Eres 'Zen', un terapeuta financiero empático y experto en Web3 (red Rootstock).
El usuario te compartirá un gasto que acaba de realizar.
Tu objetivo es analizar el gasto, hacerlo reflexionar sobre si fue impulsivo, y proponerle un 'Reto de Ahorro' (DCA - Dollar Cost Averaging).
El reto siempre debe consistir en bloquear un monto pequeño en DoC (Dollar on Chain) para comprar RBTC (Rootstock Bitcoin) semanalmente.

DEBES responder ÚNICAMENTE con un objeto JSON válido con la siguiente estructura exacta, sin texto adicional ni formato markdown (sin ```json):
{
    "emotionText": "Texto empático analizando el gasto y haciendo la pregunta reflexiva (máx 2 líneas).",
    "proposalText": "Texto del reto proponiendo bloquear X cantidad en DoC para comprar RBTC.",
    "monto_dca": 10,
    "token": "DoC"
}
"""

@app.route('/api/analyze', methods=['POST'])
def analyze_expense():
    try:
        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({"error": "No se proporcionó ningún mensaje"}), 400

        print(f"Analizando gasto: {user_message}")

        
        response = model.generate_content(f"{SYSTEM_PROMPT}\n\nGasto del usuario: {user_message}")
        
        
        clean_text = response.text.strip()
        if clean_text.startswith('```json'):
            clean_text = clean_text[7:-3].strip()

        ai_data = json.loads(clean_text)

        return jsonify(ai_data), 200

    except Exception as e:
        print(f"Error en el servidor: {e}")
        return jsonify({"error": "Hubo un problema procesando tu gasto con la IA."}), 500

# Endpoint de prueba para verificar que el servidor corre
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "Zen-Save Backend Online 🌿"}), 200

if __name__ == '__main__':
    # Correr en puerto 5000
    app.run(debug=True, port=5000)
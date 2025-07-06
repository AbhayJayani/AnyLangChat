import requests
import os
from dotenv import load_dotenv

load_dotenv()

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
api_key = os.getenv("API_KEY")  # Make sure your .env file has API_KEY=your_key

headers = {
    "Content-Type": "application/json",
    "X-goog-api-key": api_key
}

def ask_gemini(query):
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": query
                    }
                ]
            }
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    try:
        answer = result['candidates'][0]['content']['parts'][0]['text']
        return answer.strip()
    except (KeyError, IndexError):
        return f"Failed to parse the response: {result}"

if __name__ == "__main__":
    while True:
        user_query = input("Enter your query (or type 'exit' to quit): ")
        if user_query.lower() == "exit":
            break
        response = ask_gemini(user_query)
        print("AI response:", response)
        with open("response.txt", "a", encoding="utf-8") as f:
            f.write(f"Query: {user_query}\nResponse: {response}\n\n")
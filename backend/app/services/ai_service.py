import os,json
from groq import Groq
from dotenv import load_dotenv
from prompts.prompts import generate_itinerary_prompt
load_dotenv()



client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)

def generate_itinerary(destination, days, budget, interests):

    prompt = generate_itinerary_prompt.format(
        destination=destination,
        days=days,
        budget=budget,
        interests=", ".join(interests) if isinstance(interests, list) else interests
    )
    try:

        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",

            # IMPORTANT
            response_format={"type": "json_object"},

            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert travel planner. "
                        "You ONLY return valid JSON."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3,
            max_tokens=4096
        )

        content = response.choices[0].message.content.strip()

        # DEBUGGING
        print("\n=========== RAW LLM RESPONSE ===========\n")
        print(content)
        print("\n========================================\n")

        # Remove markdown if model accidentally adds it
        if content.startswith("```json"):
            content = (
                content
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        elif content.startswith("```"):
            content = (
                content
                .replace("```", "")
                .strip()
            )

        parsed_json = json.loads(content)

        return parsed_json

    except json.JSONDecodeError as e:

        print("JSON PARSE ERROR:", str(e))

        return {
            "trip_title": "JSON Parsing Error",
            "destination": destination,
            "duration": f"{days} days",
            "emoji": "⚠️",
            "total_budget": f"${budget}",

            "budget_breakdown": {
                "accommodation": "$0",
                "food": "$0",
                "transport": "$0",
                "activities": "$0"
            },

            "days": [],

            "recommendations": [
                {
                    "type": "error",
                    "icon": "⚠️",
                    "title": "AI Response Parsing Failed",
                    "description": str(e)
                }
            ]
        }

    except Exception as e:

        print("GENERAL ERROR:", str(e))

        return {
            "trip_title": "Server Error",
            "destination": destination,
            "duration": f"{days} days",
            "emoji": "⚠️",
            "total_budget": f"${budget}",

            "budget_breakdown": {
                "accommodation": "$0",
                "food": "$0",
                "transport": "$0",
                "activities": "$0"
            },

            "days": [],

            "recommendations": [
                {
                    "type": "error",
                    "icon": "⚠️",
                    "title": "Server Error",
                    "description": str(e)
                }
            ]
        }

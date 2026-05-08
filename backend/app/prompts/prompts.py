
# # prompts/prompts.py

# generate_itinerary_prompt = f"""
# You are an expert travel planner.

# Generate a detailed and realistic travel itinerary.

# IMPORTANT:
# - Return ONLY valid JSON
# - Do NOT include markdown
# - Do NOT include explanations
# - Do NOT include code fences

# Trip Details:
# - Destination: {destination}
# - Duration: {days} days
# - Total Budget: ${budget} INR
# - Interests: {', '.join(interests) if interests else 'general'}


# Return JSON in this EXACT structure:

# {{
#   "trip_title": "string",
#   "destination": "string",
#   "duration": "X days",
#   "emoji": "single emoji representing destination",
#   "total_budget": "$X,XXX",
#   "budget_breakdown": {{
#     "accommodation": "$XXX",
#     "food": "$XXX",
#     "transport": "$XXX",
#     "activities": "$XXX"
#   }},
#   "days": [
#     {{
#       "day": 1,
#       "title": "string",
#       "theme": "short theme label",
#       "activities": [
#         {{
#           "time": "HH:MM",
#           "name": "string",
#           "description": "2-3 sentence description",
#           "cost": "$XX or Free",
#           "duration": "Xh or Xm",
#           "category": "Culture | Food | Nature | Art | Adventure | Shopping | Sightseeing | Wellness | History"
#         }}
#       ]
#     }}
#   ],
#   "recommendations": [
#     {{
#       "type": "string",
#       "icon": "emoji",
#       "title": "string",
#       "description": "2-3 sentence tip"
#     }}
#   ]
# }}

# Generate:
# - {days} full days
# - 4 to 5 activities per day
# - realistic timings
# - realistic costs
# - practical travel flow
# - real attractions and venues
# """


# prompts/prompts.py

generate_itinerary_prompt = """
You are an expert travel planner.

Generate a detailed and realistic travel itinerary.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations
- Do NOT include code fences

Trip Details:
- Destination: {destination}
- Duration: {days} days
- Total Budget: ₹{budget} INR
- Interests: {interests}

Return JSON in this EXACT structure:

{{
  "trip_title": "string",
  "destination": "string",
  "duration": "X days",
  "emoji": "single emoji representing destination",
  "total_budget": "₹X,XXX",
  "budget_breakdown": {{
    "accommodation": "₹XXX",
    "food": "₹XXX",
    "transport": "₹XXX",
    "activities": "₹XXX"
  }},
  "days": [
    {{
      "day": 1,
      "title": "string",
      "theme": "short theme label",
      "activities": [
        {{
          "time": "HH:MM",
          "name": "string",
          "description": "2-3 sentence description",
          "cost": "₹XX or Free",
          "duration": "Xh or Xm",
          "category": "Culture | Food | Nature | Art | Adventure | Shopping | Sightseeing | Wellness | History"
        }}
      ]
    }}
  ],
  "recommendations": [
    {{
      "type": "string",
      "icon": "emoji",
      "title": "string",
      "description": "2-3 sentence tip"
    }}
  ]
}}

Generate:
- {days} full days
- 4 to 5 activities per day
- realistic timings
- realistic costs
- practical travel flow
- real attractions and venues
"""

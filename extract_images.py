import json
import base64
import os

with open('./migrated_prompt_history/prompt_2026-02-04T11:27:47.565Z.json', 'r') as f:
    data = json.load(f)

# The data seems to be a list of messages, and some might contain the files in a stringified JSON format within the text or as attachments.
# Based on the grep output, it looks like it's inside a string.

def find_files(obj):
    if isinstance(obj, str):
        if '"name":"screenshot_' in obj:
            try:
                # Try to find the JSON-like structure for the file
                start = obj.find('{"name":"screenshot_')
                if start != -1:
                    # Find the end of this specific JSON object
                    # This is a bit hacky but might work if it's a simple structure
                    end = obj.find('}', start) + 1
                    file_data_str = obj[start:end]
                    # Wait, the base64 data is long, so find might be tricky if there are multiple.
                    # Let's try to parse the whole string if it's valid JSON
                    try:
                        file_info = json.loads(file_data_str)
                        save_file(file_info)
                    except:
                        # If it failed, maybe it's escaped?
                        file_data_str = file_data_str.replace('\\"', '"')
                        file_info = json.loads(file_data_str)
                        save_file(file_info)
            except Exception as e:
                print(f"Error parsing string: {e}")
    elif isinstance(obj, dict):
        for v in obj.values():
            find_files(v)
    elif isinstance(obj, list):
        for item in obj:
            find_files(item)

def save_file(file_info):
    name = file_info.get('name')
    b64_data = file_info.get('data')
    if name and b64_data:
        print(f"Saving {name}...")
        with open(name, 'wb') as f:
            f.write(base64.b64decode(b64_data))

find_files(data)

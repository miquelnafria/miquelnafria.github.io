import json
import re
import os

def parse_lyrics(lyrics):
    data = []
    paragraphs = re.split(r'\n\s*\n', lyrics.strip())  # Split paragraphs by empty lines
    for paragraph_text in paragraphs:
        paragraph = {'paragraph': []}
        lines = paragraph_text.strip().split('\n')  # Split into lines
        for line in lines:
            line_data = []
            # Regex to capture chords and text without altering spaces
            pattern = re.compile(r'(\[([^\]]+)\])?([^\[\]]+)')
            matches = pattern.findall(line)
            previous_chord = ''
            for match in matches:
                chord = match[1] or ''
                text = match[2]

                if chord or text:
                    line_data.append({
                        'text': text.replace('...', '   '),
                        'chord': chord or previous_chord or ''
                    })
                    if chord:
                        previous_chord = chord

            if line_data:
                paragraph['paragraph'].append(line_data)
        if paragraph['paragraph']:
            data.append(paragraph)
    return data

# Get all .txt files in the current directory
txt_files = [f for f in os.listdir('.') if f.endswith('.txt')]

for txt_file in txt_files:
    # Read the lyrics from the .txt file
    with open(txt_file, 'r', encoding='utf-8') as f:
        lyrics_with_chords = f.read()

    # Process the lyrics to generate the data structure
    data = parse_lyrics(lyrics_with_chords)

    # Generate the corresponding .json filename
    json_file = os.path.splitext(txt_file)[0] + '.json'

    # Save the processed data to a .json file in the same directory
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'Processed {txt_file} -> {json_file}')
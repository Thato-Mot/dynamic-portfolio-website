from flask import Flask, render_template, request
import requests
import random
import os

app = Flask(__name__)  # everything you need to run the website is in the current directory

def get_pixabay_image(query="south africa"):
    API_KEY = os.getenv("API_KEY")  # Replace with your actual Pixabay API key
    url = f"https://pixabay.com/api/?key={API_KEY}&q={query}&image_type=photo&image_type=photo"
    response = requests.get(url)
    
    if API_KEY:
        if response.status_code == 200:
            data = response.json()
            if data['hits']:
                random_number = random.randint(0, len(data['hits'])-1)
                image_url = data['hits'][random_number]['largeImageURL']
                tags = data['hits'][random_number]['tags']
                return image_url, tags
            else:
                return None, "No images found for this query."
    else:
        return None, f"Error: {response.status_code}"

# Main route with dynamic Pixabay image query
@app.route('/', methods=['GET', 'POST'])
def index():
    query = request.form.get('search_query', 'south africa')  # Default query is "mountains"
    image_url, tags = get_pixabay_image(query)
    return render_template('index.html', image_url=image_url, tags=tags, query=query)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/random_image')
def random_image():
    query = request.args.get('query', 'south africa')  # Default query
    image_url, tags = get_pixabay_image(query)
    return {'image_url': image_url, 'tags': tags}

if __name__ == '__main__':
    app.run(debug=True)

from flask import (
    Flask,
    redirect,
    render_template,
    request,
    session,
    url_for
)

app = Flask(__name__)

class User:
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __repr__(self):
        return f'<User: {self.username}>'

# Create a list to store user objects
users = []
users.append(User(id=1, username='xyz', password='password'))
users.append(User(id=2, username='abc', password='secret'))

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        session.pop('user_id', None)
        username = request.form.get('username')
        password = request.form.get('password')

        # Use next() to get the first user with the specified username
        user = next((x for x in users if x.username == username), None)

        if user and user.password == password:
            session['user_id'] = user.id
            return redirect(url_for('quiz'))
        
        return redirect(url_for('index'))

    return render_template("index.html")

@app.route("/quiz")
def quiz():
    # Check if the user is logged in
    if 'user_id' not in session:
        return redirect(url_for('index'))

    return render_template("quiz.html")

if __name__ == "__main__":
    app.secret_key = 'your_secret_key'
    app.run(debug=True)

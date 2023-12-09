# from flask import Flask, render_template, request, redirect, url_for

# app = Flask(__name__)

# Dummy user credentials for demonstration purposes
# dummy_username = "user"
# dummy_password = "password"

# @app.route('/', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']

#         if username == dummy_username and password == dummy_password:
            # Redirect to midpage.html on successful login
        #     return redirect(url_for('midpage'))
        # else:
            # Add your logic for invalid credentials (e.g., display an error message)
#             pass

#     return render_template('index.html')

# @app.route('/midpage')
# def midpage():
#     return render_template('midpage.html')

# if __name__ == '__main__':
#     app.run(debug=True)

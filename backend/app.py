from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from blueprints.notes.notes import notes_blueprint
from blueprints.users.users import auth_blueprint
from blueprints.tasks.tasks import tasks_blueprint
from models import Transaction
from extensions import db
from flask_supabase import Supabase
from mainapp import app
from flask_jwt_extended import JWTManager


supabase_extension = Supabase(app)
app.register_blueprint(notes_blueprint, url_prefix='/notes')
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(tasks_blueprint, url_prefix='/tasks')
app.config["JWT_SECRET_KEY"] = 'asdasddasdasd'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
CORS(app)
jwt = JWTManager(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finances.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    transactions = supabase_extension.client.from_('finances').select('*').execute()
    print(transactions)
    return transactions.data

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    new_transaction = Transaction(
        description=data['description'],
        amount=float(data['amount']),
        type=data['type'],
        category=data['category']
    )
    
    db.session.add(new_transaction)
    db.session.commit()
    
    return jsonify(new_transaction.to_dict()), 201

@app.route('/api/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    transaction = Transaction.query.get_or_404(id)
    db.session.delete(transaction)
    db.session.commit()
    return '', 204

@app.route('/api/summary', methods=['GET'])
def get_summary():
    transactions = Transaction.query.all()
    
    total_income = sum(t.amount for t in transactions if t.type == 'income')
    total_expenses = sum(t.amount for t in transactions if t.type == 'expense')
    
    return jsonify({
        'total_income': total_income,
        'total_expenses': total_expenses,
        'balance': total_income - total_expenses
    })




if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.run(debug=True)
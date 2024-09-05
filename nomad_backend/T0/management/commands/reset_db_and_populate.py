from django.core.management.base import BaseCommand
from django.db import connection
from django.core.management import call_command
import os

class Command(BaseCommand):
    help = 'Drops the database, runs migrations, and populates the database.'

    def handle(self, *args, **kwargs):
        db_path = os.path.join(os.path.dirname(__file__), '../../../db.sqlite3')
    
        if os.path.exists(db_path):
            os.remove(db_path)
            self.stdout.write(self.style.SUCCESS('Database file removed.'))
        
        call_command('migrate')
        self.stdout.write(self.style.SUCCESS('Migrations completed.'))

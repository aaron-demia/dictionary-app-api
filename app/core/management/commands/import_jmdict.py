import xml.etree.ElementTree as ET
from django.core.management.base import BaseCommand
from core.models import Word, ExSentence

class Command(BaseCommand):
    help = "Import words and example sentences from JMdict XML file"

    def add_arguments(self, parser):
        parser.add_argument('filename', type=str, help="Path to JMdict XML file")

    def handle(self, *args, **options):
        # DELETE ALL EXISTING OBJECTS
        self.stdout.write(self.style.WARNING('Deleting all Word and ExSentence objects...'))
        ExSentence.objects.all().delete()
        Word.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('All previous data deleted. Starting import...'))
        
        filename = options['filename']
        count = 0
        example_count = 0

        tree = ET.parse(filename)
        root = tree.getroot()
        MAX_WORDS = 10000
        for entry in root.findall('./entry'):
            if count >= MAX_WORDS:
                break
            # Get word: prefer first <keb>, else first <reb>
            keb_el = entry.find('k_ele/keb')
            if keb_el is not None:
                word = keb_el.text
            else:
                reb_el = entry.find('r_ele/reb')
                word = reb_el.text if reb_el is not None else None

            if not word:
                continue

            # Get all <gloss> text for this entry
            glosses = []
            for sense in entry.findall('sense'):
                for gloss in sense.findall('gloss'):
                    if gloss.text:
                        glosses.append(gloss.text)
            definitions = "; ".join(glosses)

            word_obj, _ = Word.objects.get_or_create(
                title=word,
                defaults={'definition': definitions, 'frequency': 0}
            )
            count += 1

            # Example sentences (from <example> under <sense>)
            for sense in entry.findall('sense'):
                for example in sense.findall('example'):
                    jp_sent = None
                    en_sent = None
                    for ex_sent in example.findall('ex_sent'):
                        lang = ex_sent.attrib.get('{http://www.w3.org/XML/1998/namespace}lang')
                        if lang == 'jpn':
                            jp_sent = ex_sent
                        elif lang == 'eng':
                            en_sent = ex_sent
                    if jp_sent is not None and jp_sent.text:
                        ExSentence.objects.create(word=word_obj, sentence=jp_sent.text)
                        example_count += 1
                    if en_sent is not None and en_sent.text:
                        ExSentence.objects.create(word=word_obj, sentence=en_sent.text)
                        example_count += 1


            if count % 1000 == 0:
                self.stdout.write(f"Imported {count} words...")

        self.stdout.write(self.style.SUCCESS(
            f'Import complete! {count} words, {example_count} example sentences imported.'
        ))
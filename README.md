# DieFehlendenWoerter
A German language learning tool for intermediate to advanced students.

## What It Does
Die Fehlenden Wörter (DFW, English "Missing Words") processes German text uploaded by the user and creates exercises by taking out different parts of speech and asking the user to fill in the blanks. This allows the user to practice their knowledge of article, adjective, and verb forms in German with the text that they choose.

## How It Works
DFW uses a microservice architecture made easy with OpenAPI/Swagger. Here's a list of services DFW uses:
- [`de_exercise`](https://github.com/steve-nekoliczak/de_exercise): Takes the contents of uploaded text files to create and store exercises. Uses [`nlp_json`](https://github.com/steve-nekoliczak/nlp_json) and by extension [`StanfordNLP`](https://stanfordnlp.github.io/stanfordnlp/) to process input sentences.
- [`dfw_grader`](https://github.com/steve-nekoliczak/dfw_grader): Grades and aggregates data from users' exercise attempts.
- [`user_auth`](https://github.com/steve-nekoliczak/user_auth): Handles user data.

## How To Use
DFW is currently hosted at: http://steve-nekoliczak.mooo.com

DFW currently is only verified to work in Chrome and Chrome-like browsers.

You can login with the credentials `steve.nekoliczak@protonmail.com / abc` or create your own login. See the how to page once logged in to get a quick rundown of how things work.

## Dev Install

Note these steps are assuming you will be setting everything up in `$HOME/projects/dfw/`.

```
sudo apt install npm
mkdir -p $HOME/projects/dfw
cd $HOME/projects/dfw
git clone https://github.com/steve-nekoliczak/dfw_frontend.git
cd dfw_frontend
python3.7 -m venv env
source env/bin/activate
pip3.7 install -r requirements.txt
```

## To-Do List
DFW is a work in progress. Here is a list of features, functionality, and bug fixes planned for implementation:
### Frontend
- Add charts for verb exercises.
- Add charts for totals for adjective and article exercises.
- Rework charts so different fields of the same exercise type are added together in one chart rather than displaying multiple charts. For example, selecting nominative and dative for articles should show one chart adding the totals together rather than displaying two charts.
- Add an option to iterate consecutively through a document's exercises (i.e. start with paragraph 1 then continue on). Currently random paragraphs are selected.
- Change exercise dropdown to be a searchable dropdown.
- Add checks for user to finish unfinished exercises.
- Implement Flask's `flash()` to give users more information about what's happening.
### Backend
- Run exercise upload in a background process. Currently the page looks like it's hanging when uploading documents. Look into using Celery/RabbitMQ.
- Clean up API call response codes.
- Add exhaustive error handling and be verbose where appropriate.
- Rework how aggregated data for stats page is organized/sent through REST API. Send with a multi-tier JSON format rather than flat.
- Force UTF-8 encoding on incoming files rather than have the uploader manually ensure the file is UTF-8 encoded. If not possible, come up with a more user friendly way to upload text files.
- The natural language processing (NLP) library (`nlp_json`) sometimes includes an open quote character and the first word together as the first indexed entity. The NLP library should separate the two consistently (e.g. `„Der Hund ist klein.“` should __always__ give `sentence[0] = '„'`, `sentence[1] = 'Der'`, rather than sometimes giving `sentence[0] = '„Der'`.
### Other
- Write documentation.
- Run Apache with SSL.
- Ensure full functionality with popular browsers.



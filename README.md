# DieFehlendenWoerter
A German language learning tool for intermediate to advanced students.

## What It Does
Die Fehlenden Wörter (DFW, English "Missing Words") processes German text uploaded by the user and creates exercises by taking out different parts of speech and asking the user to fill in the blanks. This allows the user to practice their knowledge of article, adjective, and verb forms in German with the text that they choose.

## How To Use
DFW is currently hosted at: http://steve-nekoliczak.mooo.com

You can login with the credentials steve.nekoliczak@protonmail.com / abc or create your own login. See the how to page once logged in to get a quick rundown of how things work.

## To-Do List
DFW is a work in progress. Here is a list of features and functionality planned for implementation:
### Frontend
- Add charts for verb exercises.
- Add charts for totals for adjective and article exercises.
- Rework charts so different fields of the same exercise type are added together in one chart rather than displaying multiple charts. For example, selecting nominative and dative for articles should show one chart adding the totals together rather than displaying two charts.
- Add an option to iterate consecutively through a document's exercises (i.e. start with paragraph 1 then continue on). Currently random paragraphs are selected.
- Change exercise dropdown to be a searchable dropdown.
- Add checks for user to finish unfinished exercises.
### Backend
- Run exercise upload in a background process. Currently the page looks like it's hanging when uploading documents. Look into using Celery/RabbitMQ.
- Clean up API call response codes.
- Add exhaustive error handling and be verbose where appropriate.
- Rework how aggregated data for stats page is organized/sent through REST API. Send with a multi-tier JSON format rather than flat.
- Force UTF-8 encoding on incoming files rather than have the uploader manually ensure the file is UTF-8 encoded.
### Other
- Write documentation.



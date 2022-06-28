# IBM-test-book-tracker

Para subir a aplicação, utilize o:

docker-compose up

É possivel importar o insomnia na pasta "insomnia" para seu Postgree ou Insomnia para testar os endpoints.

Vou deixar esse leia-me mais bonito em breve, por hora, esses são os endpoints

Crie um usuario antes, copie o id, e adicione um header chamado 'user_id' quando for utilizar um dos outros endpoints.

POST New User:
http://localhost:3000/user

Body:
{"name": "Jose"}

GET All Books:

http://localhost:3000/books/

GET Unique Book

http://localhost:3000/books/

POST A book

http://localhost:3000/books

body:
{
"title": "Pequeno Principe",
"author": "Nao lembro"
}

PUT Mude somente um status:
http://localhost:3000/books/setstatus/:id
{ "status": "LIDO" }

PUT Mude alguma informação do livro
http://localhost:3000/books/:id

DELETE um livro
http://localhost:3000/books/:id

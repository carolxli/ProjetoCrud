<h1> Sistema CRUD genérico </h1>

<p>Meu primeiro projeto backend utilizando MVC (REST-API), trata-se de uma atividade da disciplina de Programação I, onde o professor propôs que fosse feito uma tela de manifestação de interesse de imóvel num "Feirão da moradia".</p>   

<h4>IDE utilizada: Visual Studio Code</4>   

<h5>Instalar: npm install express, npm install mysql2 e npm install nodemon</5>   

<h4>Banco de dados utilizado: mysql do Xampp</h4>   

<h5>CREATE TABLE interessado   
  
  (   
  
     cpf VARCHAR(15) NOT NULL PRIMARY KEY,   
  
     rg VARCHAR(15) NOT NULL,   
  
     nome VARCHAR(100) NOT NULL,   
  
     dataNasc VARCHAR(10) NOT NULL,   
  
     interesse VARCHAR(10) NOT NULL   
  
  );</h5>   


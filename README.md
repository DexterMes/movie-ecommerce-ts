# Movie Ecommerce in Typscript

Browse and order movies online

### Install PostgreSQL
-> Install PostgreSQL (latest version) from https://www.postgresql.org/download/

-> Create a new database in your Postgres server and name it imdb.

### Add a ```.env``` file the following
```
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/imdb"
JWT_SECRET= "asdawasdbcvnn,kl;fhmnb,k;iol[iop-967ueherh4twcfse4y51y854906568-9894;65';we;f\34p]6[;rh][;hbs-d67"
SERVER_PORT=7000
CLIENT_PORT=5000
```

### Setup server

```npm install```

```npx prisma migrate dev```


### Seed Data
-> Download and extract datasets from https://datasets.imdbws.com/

-> Use the ```populate.ts``` to populate title.crew, name.basic and title.principal

-> Use and update ```\COPY "Movie" FROM 'path_to_movie/movies.tsv' DELIMITER E'\t' NULL '\N' ENCODING 'utf8' HEADER;``` to seed the rest

### Run Server
-> Use ```npm run dev``` to start server

-> USe ```npm run test``` to test ser if needed

-> Use the Postman documentation as reference to send request https://documenter.getpostman.com/view/22847033/2s93K1ozUX

-> Use the link to use admin page http://localhost:5000/admin

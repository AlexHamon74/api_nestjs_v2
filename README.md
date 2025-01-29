# Développement d'une Api REST en Nestjs 💻
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

--- 

## Introduction 🎬
Reprise du projet api_nestjs et ajout de quelques améliorations :
 - Ajout des migrations
 - Ajout des relations OneToMany et ManyToMaany

---

## Configuration du projet ⚙️

### 1. Installation des dépendances du projet
```bash
npm install
```

### 2. Connexion à la base de données
  - Installation de la config
```bash
npm install @nestjs/config dotenv
```
  - Installation de l'ORM de NestJs : TypeORM
```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

  - Création d'un fichier `.env.local`
```typescript
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=dbName
```

  - Modification des imports dans votre ficher `app.module.ts`
```typescript
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [],
        migrations: ['dist/migrations/*.js'],
        dataSource: AppDataSource,
      }),
    }),
  ],
```

### 3. Mise en place des migrations
Comme vu juste au dessus on initialize `migrations` comme dossier contenant toutes les migrations et `dataSource`, un fichier qui donne la source des données à migrer

  - Création d'un dossier `/src/migrations/`
  - Création d'un fichier `/src/datasource.migration.ts` :

  ```typescript
  import { DataSource } from 'typeorm';
  import * as dotenv from 'dotenv';

  dotenv.config({ path: '.env.local' });

  export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    migrations: ['src/migrations/*.ts'],
  });

  ```

  - Modification du fichier `package.json` pour mettre en place les commandes CLI, 
  on ajoute dans les scripts :
  ```typescript
    "typeorm": "typeorm-ts-node-commonjs -d src/datasource.migration.ts",
    "migration:generate": "npm run typeorm migration:generate -n src/migrations/Migration",
    "migration:run": "npm run typeorm migration:run"
  ```
 Les commandes possibles seront :
 - `npm run migration:generate`
 - `npm run migration:run`

---

## Création d'une Entité 🧑🏼‍💼

### 1. Génération de mon entité via CLI
```bash
nest g resource --no-spec
```  
**A savoir** : L'attribut --no-spec nous permet de ne pas générer les fichiers de test.

Cette commande nous créée un dossier `/src/monEntité`  
On retrouve un **module**, un **controller** et un **service** pour notre entité  
On retouve aussi un fichier `monEntité/entities/monEntité.entity.ts`  
C'est dans ce fichier que l'on va créer la structure de notre entité
```ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("entities")
export class Entity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string;
}
```

Dernière étape avant de migrer notre entité :
  - Ajout de notre entité dans le ficher `app.module.ts` et `datasource.migration.ts`

Enfin nous pouvons migrer notre entité avec les commandes initializer dans le fichier `package.json`

### 2. Modification du ficher `monEntité.module.ts`
Ajouter cette ligne dans votre @Module afin de pouvoir utiliser TypeORM dans notre entité
```ts
  imports: [TypeOrmModule.forFeature([Entité])]
```

### 3. Modification des méthodes dans le fichier `monEntité.service.ts`
Le fichier `monEntité.controller.ts` contient toutes nos routes pour notre API REST  
Le fichier `monEntité.service.ts` contient nos méthodes utilisés dans le fichier `monEntité.controller.ts` mais ces méthodes ne sont pas encore fonctionnelles.  
  
  - Tout d'abord il faut ajouter notre repository dans un constructor à l'intérieur de notre classe
```typescript
  constructor(
  @InjectRepository(User) private userRepository: Repository<User>,
) {}
```

  - Ensuite on va utiliser ce repo et ses méthodes dans notre fichier  
  Exemple pour créer un user :  
```typescript
    return this.userRepository.save(createUserDto);
``` 
  > [!WARNING]
  > Pour notre méthode findOne nous devons ajouter l'id de cette façon :  
  > `this.userRepository.findOne({where: {id}})`  

### 4. Modification de nos fichiers `dto` pour les méthodes `create` `update`
  - Ajouter les propriétés de votre table et leurs types

  - Installation du bundle [class-validator](https://github.com/typestack/class-validator)  
```bash
npm install class-validator --save
```

  - On ajoute le ValidationPipe dans le `main.ts` pour le réutiliser dans tous les fichiers
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

  - Ajout des contraintes sur nos champs
```typescript
import { IsNotEmpty } from 'class-validator';  

export class CreateUserDto {
@IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
firstName: string;
}
```

---

## Conclusion 📌
TODO

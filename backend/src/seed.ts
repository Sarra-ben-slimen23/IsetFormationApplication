import {PrismaClient} from '@prisma/client';
import { create } from 'node:domain';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'] // Optionnel
});

async function main() {
   console.log('🌱 Démarrage du seed...');
   await prisma.candidat.deleteMany();
   await prisma.session.deleteMany();
   await prisma.formation.deleteMany();
   await prisma.formateur.deleteMany();
   //await prisma.admin.deleteMany();
   console.log('✅ Base nettoyée. Création des données...');
  // Formations
  const angular = await prisma.formation.create({
    data: {
      titre: 'Angular avancé pou les prochains développeurs',
      description: 'Formation accélérée sur Angular, alliant théorie et pratique : de la structure modulaire aux bonnes pratiques de développement, pour produire des applications robustes et maintenables.',
      chargeHoraire: 40,
      programmePdf: 'assets/programmes/angular.pdf',
      niveau: 'avancé',
      tags: 'Angular,TypeScript',
      categories: "1"
    }
  });

  const java = await prisma.formation.create({
    data: {
      titre: 'Java pour la POO',
      description: 'Apprenez les concepts avancés de java pour devenez opérationnel en Java et POO : modélisation, encapsulation, polymorphisme et tests unitaires — à travers des exercices progressifs et un mini-projet final.',
      chargeHoraire: 35,
      programmePdf: 'assets/programmes/java.pdf',
      niveau: 'intermédiaire',
      tags: 'Java,POO',
      categories: "2" 
    }
    
  });
  const python = await prisma.formation.create({
    data: {
      titre: 'python dans le mode POO',
      description: 'Apprenez les concepts fondamentaux de python et découvrez le en mode POO ! Une initiation progressive pour débutants et intermédiaires : de la syntaxe de base à la modélisation objet, avec des exemples concrets et un mini-projet ludique',
      chargeHoraire: 35,
      programmePdf: 'assets/programmes/python.pdf',
      niveau: 'débutant',
      tags: 'python,POO',
      categories: "2"
    }
  });
  const dataScience = await prisma.formation.create({
    data: {
      titre: ' formation data science pour les débutants',
      description: 'Apprenez les concepts fondamentaux de data science dans une Une formation 100% débutante pour découvrir ce métier passionnant, apprendre à parler le langage des données et réaliser vos premières analyses. Aucun prérequis en programmation nécessaire',
      chargeHoraire: 35,
      programmePdf: 'assets/programmes/python.pdf',
      niveau: 'débutant',
      tags: 'data science,information',
      categories: "3"
    }
  });

  // Formateurs
  const jamil = await prisma.formateur.create({
    data: { nom: 'Jomaa', prenom: 'Jamil', email:"jamiljom3@gmail.com",telephone:"22785665",cin:"12345678",photo:'assets/photos/jamil.jpg', cv: 'assets/cv/jamil.pdf',specialites:"angular,node js" }
  });
  const sarra = await prisma.formateur.create({
    data: { nom: 'Ben Slimen', prenom: 'Sarra', email:"sarrabs3@gmail.com",telephone:"227265505",cin:"12345678",photo:'assets/photos/sarra.jpg', cv: 'assets/cv/sarra.pdf',specialites:"java,poo,spring Boot"  }
  });
  const souha = await prisma.formateur.create({
    data: { nom: 'Dellai', prenom: 'Souha', email:"souhadellai@gmail.com",telephone:"22146305",cin:"14718820", photo:'assets/photos/souha.jpg', cv: 'assets/cv/souha.pdf',specialites:"python,php"  }
  });

  // Sessions
  const session1 = await prisma.session.create({
    data: {
      dateDebut: '2025-12-01',
      dateFin: '2026-01-07',
      description: 'Formation accélérée sur Angular, alliant théorie et pratique : de la structure modulaire aux bonnes pratiques de développement, pour produire des applications robustes et maintenables.',
      formationId: angular.id,
      formateurs: { connect: [{ id: jamil.id }, { id: souha.id }] }
    }
  });

  const session2 = await prisma.session.create({
    data: {
      dateDebut: '2026-01-01',
      dateFin: '2026-02-07',
      description:'Devenez opérationnel en Java et POO : modélisation, encapsulation, polymorphisme et tests unitaires — à travers des exercices progressifs et un mini-projet final.',
      formationId: java.id,
      formateurs: { connect: [{ id: sarra.id }] }
    }
  });
  const session3 = await prisma.session.create({
    data: {
      dateDebut: '2025-12-08',
      dateFin: '2026-01-15',
      description: 'Découvrez Python en mode POO ! Une initiation progressive pour débutants et intermédiaires et un récap pour les avancés: de la syntaxe de base à la modélisation objet, avec des exemples concrets et un mini-projet ludique.',
      formationId: python.id,
      formateurs: { connect: [{ id: jamil.id }] }
    }
  });
  const session4 = await prisma.session.create({
    data: {
      dateDebut: '2026-01-08',
      dateFin: '2026-02-15',
      description: 'Vos premiers pas en Data Science. Une formation 100% débutante pour découvrir ce métier passionnant, apprendre à parler le langage des données et réaliser vos premières analyses. Aucun prérequis en programmation nécessaire',
      formationId: dataScience.id,
      formateurs: { connect: [{ id: sarra.id }] }
    }
  });

  
   //admin
   const passwordHash=await bcrypt.hash('password123',10);//hachage
   const admin=await prisma.admin.upsert({
  where:{email:'admin@iset.tn'},
  update:{password: passwordHash},
  create:{
     email: 'admin@iset.tn',
    password: passwordHash //password haché
  }
});

   console.log('✅ Données initiales insérées avec succès !');

}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  
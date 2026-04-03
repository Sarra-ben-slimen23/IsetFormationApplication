import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  try {
    const candidats = await prisma.candidat.findMany({
      include: {
        inscriptions: {
          include: {
            session :{
              include :{
                formation:true
              }

            }
          }
        }
      }
    });
    // Transformer pour garder une structure lisible (optionnel)
    const candidatsWithSessions = candidats.map(candidat => ({
      ...candidat,
      sessions: candidat.inscriptions.map(insc => ({
        id: insc.session.id,
        dateDebut: insc.session.dateDebut,
        dateFin: insc.session.dateFin,
        description: insc.session.description,
        formation: insc.session.formation
      }))
    }));

    res.json(candidats);
  } catch (error) {
    console.error('Erreur chargement candidats:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
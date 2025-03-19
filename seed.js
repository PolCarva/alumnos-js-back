const mongoose = require('mongoose');
const UserProgress = require('./models/UserProgress');
require('dotenv').config();

// Datos de usuarios tomados de front/lib/auth.ts (dummyUsers)
const users = [
  {
    id: 1,
    name: "Estudiante Demo",
    username: "demo",
    password: "password",
  },
  {
    id: 2,
    name: "Anaclara Acosta",
    username: "328063",
    password: "55585968",
  },
  {
    id: 3,
    name: "Sofía Brito",
    username: "314948",
    password: "56392922",
  },
  {
    id: 4,
    name: "Diego Cabot",
    username: "325297",
    password: "53436082",
  },
  {
    id: 5,
    name: "Augusto Camejo",
    username: "270426",
    password: "52383690",
  },
  {
    id: 6,
    name: "Rodrigo Ciganda",
    username: "232922",
    password: "51978535",
  },
  {
    id: 7,
    name: "Josefina Colinet",
    username: "309422",
    password: "54569183",
  },
  {
    id: 8,
    name: "Martina Correa",
    username: "327600",
    password: "56334665",
  },
  {
    id: 9,
    name: "Valentina Cutiño",
    username: "262962",
    password: "49556345",
  },
  {
    id: 10,
    name: "Franco Fernandez",
    username: "282833",
    password: "55536268",
  },
  {
    id: 11,
    name: "Lucía Fuentes",
    username: "282000",
    password: "53413426",
  },
  {
    id: 12,
    name: "Joaquina Garcia",
    username: "328874",
    password: "55727542",
  },
  {
    id: 13,
    name: "Lucía García",
    username: "272988",
    password: "59058012",
  },
  {
    id: 14,
    name: "Carmen Gomensoro",
    username: "322657",
    password: "54926256",
  },
  {
    id: 15,
    name: "Rafaela Koci",
    username: "302814",
    password: "55557616",
  },
  {
    id: 16,
    name: "Dafna Laufer",
    username: "282325",
    password: "54903151",
  },
  {
    id: 17,
    name: "Micaela Levy",
    username: "281737",
    password: "55000469",
  },
  {
    id: 18,
    name: "Sofía Martusciello",
    username: "330535",
    password: "55945588",
  },
  {
    id: 19,
    name: "Facundo Mendoza",
    username: "311505",
    password: "53627667",
  },
  {
    id: 20,
    name: "Facundo Oton",
    username: "303861",
    password: "53520918",
  },
  {
    id: 21,
    name: "Geraldine Pintos",
    username: "329866",
    password: "55954684",
  },
  {
    id: 22,
    name: "Sol Puente",
    username: "282312",
    password: "57384229",
  },
  {
    id: 23,
    name: "Paula Rasero",
    username: "328389",
    password: "55629300",
  },
  {
    id: 24,
    name: "Lara Rodriguez",
    username: "335547",
    password: "54859001",
  },
  {
    id: 25,
    name: "Ezequiel Rodriguez",
    username: "263265",
    password: "53583344",
  },
  {
    id: 26,
    name: "Valentino Sapone",
    username: "322519",
    password: "53397082",
  },
  {
    id: 27,
    name: "María Victoria Suárez",
    username: "270965",
    password: "50030413",
  },
  {
    id: 28,
    name: "María José Valiño",
    username: "302559",
    password: "55662912",
  },
  {
    id: 29,
    name: "Franco Zaffaroni",
    username: "256866",
    password: "52334887",
  },
];

// Convertir los datos de usuarios al formato de UserProgress
const initialData = users.map(user => ({
  userId: user.id,
  userName: user.name,
  totalPoints: 0,
  completedQuestions: 0,
  completedWeeks: 0,
  completedWeekIds: [],
  questionProgress: []
}));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB conectado');
    
    try {
      // Eliminar datos existentes
      await UserProgress.deleteMany({});
      console.log('Datos anteriores eliminados');
      
      // Insertar nuevos datos
      const result = await UserProgress.insertMany(initialData);
      console.log(`Datos de prueba insertados correctamente (${result.length} registros)`);
      
      // Cerrar conexión
      mongoose.connection.close();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  }); 
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Leer .env.local sin depender de paquetes externos
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const envVars = {};
for (const line of envContent.split(/\r?\n/)) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const guests = [
  // --- LISTADO DE LA NOVIA (31 invitaciones / 50 cupos) ---
  { name: "Familia Castellanos Gonzalez", phone: "573006494725 - 573142810209", observation: "Cupos: 3", status: "pending" },
  { name: "Maria Astrid Vargas y Nelson Martinez", phone: "573156482276 - 573133922542", observation: "Cupos: 2", status: "pending" },
  { name: "Erlin y Alfonso Reyes", phone: "573176366019", observation: "Cupos: 2", status: "pending" },
  { name: "Maria Isabel y Rafael Ramirez", phone: "573174712390", observation: "Cupos: 2", status: "pending" },
  { name: "Janfrank Contreras", phone: "573206300501", observation: "Cupos: 1", status: "pending" },
  { name: "Benjamín Gonzalez", phone: "573138173378", observation: "Cupos: 1", status: "pending" },
  { name: "Carlos y Karime Castellanos", phone: "573002677402 - 573175853899", observation: "Cupos: 2", status: "pending" },
  { name: "Rosa Castellanos", phone: "573115710214", observation: "Cupos: 1", status: "pending" },
  { name: "Eliecer y Mireya Castellanos", phone: "573134733763 - 573118814835", observation: "Cupos: 2", status: "pending" },
  { name: "Angela Castellanos", phone: "573150564309", observation: "Cupos: 1", status: "pending" },
  { name: "Ligia Castellanos", phone: "573138551050", observation: "Cupos: 1", status: "pending" },
  { name: "Javier y Ana Lucia Garcia", phone: "573184814557 - 573507924902", observation: "Cupos: 2", status: "pending" },
  { name: "Braulio y Flavia Godoy", phone: "573152517297 - 573137156813", observation: "Cupos: 2", status: "pending" },
  { name: "Rosmel y Cristina Torres", phone: "573124863871 - 573124842027", observation: "Cupos: 2", status: "pending" },
  { name: "Luis y Deisy Pabón", phone: "573138031564 - 573142455450", observation: "Cupos: 2", status: "pending" },
  { name: "Franklin y Diana Muñoz", phone: "573183478843 - 573178097846", observation: "Cupos: 2", status: "pending" },
  { name: "Marino y Diana Cardona", phone: "573132198288 - 573504018602", observation: "Cupos: 2", status: "pending" },
  { name: "Jose y Leidy Berbesi", phone: "573016016332 - 573045370347", observation: "Cupos: 2", status: "pending" },
  { name: "Luis y Karen Bernal", phone: "573012317442 - 573138985336", observation: "Cupos: 2", status: "pending" },
  { name: "Maritza Figueroa", phone: "573132702160", observation: "Cupos: 1", status: "pending" },
  { name: "Felipe Torres", phone: "573215173608", observation: "Cupos: 1", status: "pending" },
  { name: "Jesus Duarte", phone: "573156807309", observation: "Cupos: 1", status: "pending" },
  { name: "Daniela Soto", phone: "573044073308", observation: "Cupos: 1", status: "pending" },
  { name: "Kamila Godoy", phone: "573188288425", observation: "Cupos: 1", status: "pending" },
  { name: "Maria Jose Cardona", phone: "573227815086", observation: "Cupos: 1", status: "pending" },
  { name: "Isabela Cardona", phone: "573138670235", observation: "Cupos: 1", status: "pending" },
  { name: "Sara Linay Pabón", phone: "573142455450", observation: "Cupos: 1", status: "pending" },
  { name: "Sharidc Cadavid", phone: "573027068559", observation: "Cupos: 1", status: "pending" },
  { name: "Edwin y Andrea Arias", phone: "573154345358 - 573177334789", observation: "Cupos: 3", status: "pending" },
  { name: "Luis Orlando y Yanire Rodriguez", phone: "573133390872 - 573202700766", observation: "Cupos: 2", status: "pending" },
  { name: "Isabela Garcia y Daniela", phone: null, observation: "Cupos: 2", status: "pending" },

  // --- LISTADO DEL NOVIO (44 invitaciones / 75 cupos) ---
  { name: "Familia Galindo Barrera", phone: "573334002279", observation: "Cupos: 2", status: "pending" },
  { name: "Ricardo y Natalia Vargas", phone: "573183272510 - 573013637942", observation: "Cupos: 2", status: "pending" },
  { name: "Familia Contreras", phone: "573232805396 - 573134151414", observation: "Cupos: 3", status: "pending" },
  { name: "Sebas y Stefany Contreras", phone: "573122799168 - 573164469813", observation: "Cupos: 2", status: "pending" },
  { name: "Uber y Keyla", phone: "573133845336 - 573167372342", observation: "Cupos: 2", status: "pending" },
  { name: "Ever y Marisabel Barrera", phone: "573112453417 - 573222459800", observation: "Cupos: 2", status: "pending" },
  { name: "Don Lucio y Doña Lucila", phone: "573212304211", observation: "Cupos: 2", status: "pending" },
  { name: "Naida", phone: "573164645138", observation: "Cupos: 1", status: "pending" },
  { name: "Johana", phone: "573112378236", observation: "Cupos: 1", status: "pending" },
  { name: "Jean y Esposa", phone: "573115104666", observation: "Cupos: 2", status: "pending" },
  { name: "Juan Pablo Niño", phone: "573017976872", observation: "Cupos: 1", status: "pending" },
  { name: "Maria Jose", phone: "573108131609", observation: "Cupos: 1", status: "pending" },
  { name: "Juan David Figueroa", phone: "573144899142", observation: "Cupos: 1", status: "pending" },
  { name: "Leonardo Escobar", phone: "573222130465", observation: "Cupos: 1", status: "pending" },
  { name: "Nikol Villamizar", phone: "573027234478", observation: "Cupos: 1", status: "pending" },
  { name: "Andres", phone: "573219731826", observation: "Cupos: 1", status: "pending" },
  { name: "Kevin y Kelly Montagut", phone: "573114533858 - 573142604903", observation: "Cupos: 2", status: "pending" },
  { name: "Johan y Johana Quintero", phone: "573006612817 - 573143176482", observation: "Cupos: 2", status: "pending" },
  { name: "Hugo y Jansleidy Salazar", phone: "573005103460 - 573177256327", observation: "Cupos: 2", status: "pending" },
  { name: "Pablo y Linda", phone: "573193685909 - 573156940204", observation: "Cupos: 2", status: "pending" },
  { name: "Don Luis y Señora Hilda", phone: "573204607745 - 573208317842", observation: "Cupos: 2", status: "pending" },
  { name: "Darwin e Isabella Pabon", phone: "573041142038 - 573023410150", observation: "Cupos: 2", status: "pending" },
  { name: "Jony y Zoraida Montagut", phone: "573132251644", observation: "Cupos: 2", status: "pending" },
  { name: "Zemprum y Yenys", phone: "573046790474", observation: "Cupos: 2", status: "pending" },
  { name: "David y Monica Rodriguez", phone: null, observation: "Cupos: 2", status: "pending" },
  { name: "Janifer", phone: "573150003955", observation: "Cupos: 1", status: "pending" },
  { name: "Giovanny y Erika", phone: "573208380397 - 573114915665", observation: "Cupos: 2", status: "pending" },
  { name: "Jorge y Marta", phone: "573165340341 - 573168698892", observation: "Cupos: 2", status: "pending" },
  { name: "Shamir y Dayana", phone: "573008567087 - 573113120598", observation: "Cupos: 2", status: "pending" },
  { name: "Francisco y Osmary Chirino", phone: "573046232608 - 573209761795", observation: "Cupos: 2", status: "pending" },
  { name: "Maye Galvis", phone: "573016311300", observation: "Cupos: 1", status: "pending" },
  { name: "Adrian y Angie", phone: "573202114430 - 573132800178", observation: "Cupos: 2", status: "pending" },
  { name: "Joel Miranda", phone: "573234373750", observation: "Cupos: 1", status: "pending" },
  { name: "Ps Jorge y Patricia", phone: "573125887237 - 573173594374", observation: "Cupos: 2", status: "pending" },
  { name: "Ps Mateo y Manu Leiva", phone: "573002211101 - 573127313068", observation: "Cupos: 2", status: "pending" },
  { name: "Pipe Rojas", phone: "573233676011", observation: "Cupos: 1", status: "pending" },
  { name: "Jeny Duarte", phone: "573156775880", observation: "Cupos: 1", status: "pending" },
  { name: "Juanes", phone: "573107786661", observation: "Cupos: 1", status: "pending" },
  { name: "Miguel y Esposa", phone: null, observation: "Cupos: 2", status: "pending" },
  { name: "Alejandro y Julieth Cobilla", phone: null, observation: "Cupos: 2", status: "pending" },
  { name: "Ps Jose y Tania", phone: null, observation: "Cupos: 2", status: "pending" },
  { name: "Claudia Torres y Esposo", phone: null, observation: "Cupos: 2", status: "pending" },
  { name: "Liliana Pabon y Esposo", phone: null, observation: "Cupos: 2", status: "pending" },
  { name: "Manuel y Esposa", phone: null, observation: "Cupos: 2", status: "pending" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function seedGuests() {
  for (let attempt = 1; attempt <= 24; attempt++) {
    console.log(`[Intento ${attempt}/24] Verificando si Supabase ya está en línea...`);
    const { data: existing, error: fetchErr } = await supabase.from('guests').select('id');

    if (fetchErr) {
      console.log(`Aún iniciando servicios (${fetchErr.code || 'esperando PostgREST'})... Reintentando en 10s.`);
      await sleep(10000);
      continue;
    }

    console.log("¡Supabase está en línea!");

    if (existing && existing.length > 0) {
      const ids = existing.map((g) => g.id);
      console.log(`Eliminando ${ids.length} invitados anteriores...`);
      const { error: delErr } = await supabase.from('guests').delete().in('id', ids);
      if (delErr) {
        console.error("Error eliminando invitados anteriores:", delErr);
        process.exit(1);
      }
    }

    console.log(`Insertando los ${guests.length} invitados de David & Thalia...`);
    const { data, error } = await supabase.from('guests').insert(guests).select();
    if (error) {
      console.error("Error insertando invitados:", error);
      process.exit(1);
    } else {
      console.log(`¡ÉXITO! Se insertaron ${data.length} invitados en Supabase.`);
      return;
    }
  }

  console.error("Tiempo de espera agotado mientras Supabase terminaba de restaurarse.");
  process.exit(1);
}

seedGuests();

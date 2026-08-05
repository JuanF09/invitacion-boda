$supabaseUrl = "https://fhmsehgnpjayookogbck.supabase.co"
$supabaseKey = "sb_publishable_Ky_ZQuFcGmm2T5_X9t4BTQ_VWZGaOxa"

$headers = @{
    "apikey" = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=minimal"
}

$guests = @(
  @{name="ABUELITOS LUCIO Y LUCILA"; phone="573212304211"; observation="Cupos: 2"}
  @{name="ADRIAN Y ANGIE"; phone="573132800178"; observation="Cupos: 2"}
  @{name="ALEJO Y JULIETH"; phone="573023613474"; observation="Cupos: 2"}
  @{name="ALONSO Y KEILA"; phone="573156189297"; observation="Cupos: 2"}
  @{name="ANDRES ARCHILA"; phone="573219731826"; observation="Cupos: 1"}
  @{name="ANDRES VARGAS"; phone="573102157700"; observation="Cupos: 2"}
  @{name="ANDRES Y NOVIA"; phone="573114996468"; observation="Cupos: 2"}
  @{name="ANGELIK MEZA Y ESPOSO"; phone="573212141413"; observation="Cupos: 1"}
  @{name="AURA MEZA"; phone="573143003633"; observation="Cupos: 1"}
  @{name="BRAYAN CORREA"; phone="573143737324"; observation="Cupos: 1"}
  @{name="CAMILA"; phone="573206219948"; observation="Cupos: 1"}
  @{name="CAMILO CACERES"; phone="573227316859"; observation="Cupos: 1"}
  @{name="CECILIA"; phone="573202043486"; observation="Cupos: 1"}
  @{name="CLAUDIA TORRES Y ESPOSO"; phone="573188375305"; observation="Cupos: 2"}
  @{name="COMPADRES"; phone="573117483656"; observation="Cupos: 2, 1 NIÑO"}
  @{name="DANIELA SOTO"; phone="573022631155"; observation="Cupos: 1"}
  @{name="DAVID Y MONICA"; phone="573154564762"; observation="Cupos: 2"}
  @{name="DAVID Y THALIA"; phone="573003757532"; observation="Cupos: 2"}
  @{name="DEIVY Y MINE"; phone="573208452694"; observation="Cupos: 2"}
  @{name="DOC CLUDIA"; phone="573176386322"; observation="Cupos: 1"}
  @{name="DUVAN CHONA"; phone="573102298915"; observation="Cupos: 1"}
  @{name="EDDIER Y ALEJA"; phone="573144221207"; observation="Cupos: 2"}
  @{name="EDINSON Y SARAY"; phone="573508992422"; observation="Cupos: 2"}
  @{name="ELIANA Y ESPOSO"; phone="573003207668"; observation="Cupos: 2"}
  @{name="EMILCE E ISA"; phone="573224099872"; observation="Cupos: 1, 1 NIÑO"}
  @{name="EMMANUEL Y CLAUDIA"; phone="573224658681"; observation="Cupos: 2"}
  @{name="ESPERANZA"; phone="573208859513"; observation="Cupos: 1"}
  @{name="FABIAN"; phone="573194921727"; observation="Cupos: 1"}
  @{name="FAMILIA ARCHILA SANDOVAL"; phone="573108808947"; observation="Cupos: 4"}
  @{name="FAMILIA BARRERA AGUIRRE"; phone="573112453417"; observation="Cupos: 2"}
  @{name="FAMILIA BARRERA GARCIA"; phone="573133845336"; observation="Cupos: 3, 1 NIÑO"}
  @{name="FAMILIA CAÑIZAREZ VARGAS"; phone="573138519476"; observation="Cupos: 2, 2 NIÑOS"}
  @{name="FAMILIA CASTELLANOS"; phone="573006494725"; observation="Cupos: 2, 2 NIÑOS"}
  @{name="FAMILIA CELIS MANCIPE"; phone="573202947214"; observation="Cupos: 2, 1 NIÑO"}
  @{name="FAMILIA CONTRERAS BARRERA"; phone="573115504937"; observation="Cupos: 2, 1 NIÑA"}
  @{name="FAMILIA CONTRERAS SANTOS"; phone="573122799168"; observation="Cupos: 2"}
  @{name="FAMILIA GALINDO BARRERA"; phone="573334001450"; observation="Cupos: 2"}
  @{name="FAMILIA GALLEGO MIRANDA"; phone="573103092195"; observation="Cupos: 4"}
  @{name="FAMILIA GARCIA BARRERA"; phone="573503924902"; observation="Cupos: 2, 2 NIÑOS"}
  @{name="FAMILIA NAVARRO"; phone="573166824699"; observation="Cupos: 3, 1 NIÑO"}
  @{name="FAMILIA SARAVIA E HIJAS"; phone="573234473087"; observation="Cupos: 3"}
  @{name="FAMILIA VARGAS SARAVIA"; phone="573153910051"; observation="Cupos: 2"}
  @{name="FAMILIA VILLEGAS"; phone="573174331599"; observation="Cupos: 2"}
  @{name="FRAN Y OSMARY"; phone="573209761795"; observation="Cupos: 2"}
  @{name="FREDDY Y ESPOSA"; phone="573007661051"; observation="Cupos: 2"}
  @{name="GABRIEL Y MARCELA"; phone="573116161969"; observation="Cupos: 2"}
  @{name="GENESIS RAMIREZ"; phone="573133713007"; observation="Cupos: 1"}
  @{name="GIO Y ERIKA"; phone="573208380397"; observation="Cupos: 2"}
  @{name="GLORIA JAIMES"; phone="573208075768"; observation="Cupos: 1"}
  @{name="GRIPSON"; phone="573008564465"; observation="Cupos: 1"}
  @{name="HUGO Y JHANS"; phone="573177256327"; observation="Cupos: 2"}
  @{name="INES"; phone="573115571548"; observation="Cupos: 1"}
  @{name="ISAIAS"; phone="573023820946"; observation="Cupos: 1"}
  @{name="JANNI E HIJOS"; phone="573150003955"; observation="Cupos: 1, 2 NIÑOS"}
  @{name="JENNY Y ESPOSO"; phone="573107983471"; observation="Cupos: 2"}
  @{name="JHOEL MIRANDA"; phone="573234373750"; observation="Cupos: 1"}
  @{name="JHONNY Y ZORAIDA"; phone="573132251644"; observation="Cupos: 2"}
  @{name="JOHAN Y JENNIFER"; phone="573223719415"; observation="Cupos: 2"}
  @{name="JOHAN Y JOHANA"; phone="573143176482"; observation="Cupos: 2"}
  @{name="JORGE Y MARTHA"; phone="573165340341"; observation="Cupos: 2"}
  @{name="JOSSEPH MANCIPE"; phone="573202947214"; observation="Cupos: 1"}
  @{name="JUAN CABALLERO"; phone="573228671491"; observation="Cupos: 1"}
  @{name="JUANCHO"; phone="573144899142"; observation="Cupos: 1"}
  @{name="JUANES"; phone="573107786661"; observation="Cupos: 1"}
  @{name="JULIAN Y MAYLIN"; phone="573212710581"; observation="Cupos: 2"}
  @{name="KAREN DANIELA"; phone="573044073308"; observation="Cupos: 1"}
  @{name="KEVIN CAÑIZALEZ"; phone="573025101253"; observation="Cupos: 1"}
  @{name="KEVIN Y KELLY"; phone="573114533858"; observation="Cupos: 2"}
  @{name="LEO"; phone="573222130465"; observation="Cupos: 1"}
  @{name="LILI PEREZ"; phone="573123109601"; observation="Cupos: 1"}
  @{name="LILIANA Y ESPOSO"; phone="573142899968"; observation="Cupos: 2"}
  @{name="LORENA (ALCALDIA)"; phone="573007120477"; observation="Cupos: 1"}
  @{name="LORENA GARCIA"; phone="573205156813"; observation="Cupos: 1"}
  @{name="LUIS CARLOS Y ESPOSA"; phone="573003719310"; observation="Cupos: 2"}
  @{name="LUIS E HILDA"; phone="573208317842"; observation="Cupos: 2"}
  @{name="MARCELA DUARTE"; phone="573132052247"; observation="Cupos: 3"}
  @{name="MARCOS MENESES"; phone="573507488598"; observation="Cupos: 1"}
  @{name="MARGARITA Y MAFER"; phone="573103658516"; observation="Cupos: 2"}
  @{name="MARIA BLANCO"; phone="573159251007"; observation="Cupos: 1"}
  @{name="MARIAM"; phone="573012583508"; observation="Cupos: 1"}
  @{name="MAYE VARGAS"; phone="573016311300"; observation="Cupos: 1"}
  @{name="MELANY CERON"; phone="573102033368"; observation="Cupos: 1"}
  @{name="MI ROUES"; phone="573214091092"; observation="Cupos: 1"}
  @{name="NATHA ORTIZ"; phone="573156778940"; observation="Cupos: 1"}
  @{name="NELLY"; phone="573114999313"; observation="Cupos: 1"}
  @{name="NIKOL VILLAMIZAR"; phone="573027234478"; observation="Cupos: 1"}
  @{name="OLGUITA Y ESPOSO"; phone="573167680613"; observation="Cupos: 2"}
  @{name="PABLO SHADAI"; phone="573154480906"; observation="Cupos: 1"}
  @{name="PABLO Y LINDA"; phone="573156940204"; observation="Cupos: 2"}
  @{name="PAOLA MORA"; phone="573173989994"; observation="Cupos: 1"}
  @{name="PAOLA YAÑEZ"; phone="573153613962"; observation="Cupos: 1, 1 NIÑA"}
  @{name="PASTORES JORGE Y PATRICIA"; phone="573125887237"; observation="Cupos: 2"}
  @{name="PASTORES LEIVAS ROJAS"; phone="573127313068"; observation="Cupos: 2"}
  @{name="PASTORES RIVERA"; phone="573016216210"; observation="Cupos: 2"}
  @{name="PIPE ROJAS"; phone="573233676011"; observation="Cupos: 1"}
  @{name="PROFE LUZ"; phone="573144612466"; observation="Cupos: 1"}
  @{name="RASHID Y MARIA"; phone="573144674775"; observation="Cupos: 2"}
  @{name="RUTH Y ESPOSO"; phone="573105470857"; observation="Cupos: 2"}
  @{name="SAMIR Y MAJO"; phone="573108155734"; observation="Cupos: 2"}
  @{name="SEBAS E IVET"; phone="573012379978"; observation="Cupos: 2, 1 NIÑO"}
  @{name="SHAMIR Y DAYANA"; phone="573008567087"; observation="Cupos: 2"}
  @{name="TATIANA MACHUCA"; phone="573227357471"; observation="Cupos: 1"}
  @{name="TAYLOR"; phone="573125648548"; observation="Cupos: 1"}
  @{name="YENNY DUARTE"; phone="573156775880"; observation="Cupos: 1"}
  @{name="YESSICA"; phone="573122697671"; observation="Cupos: 1"}
  @{name="YISUS Y NATIS"; phone="573232907473"; observation="Cupos: 2"}
  @{name="ZEMPRUM Y ESPOSA"; phone="573244663254"; observation="Cupos: 2"}
  @{name="ZENAIDA Y LAURA"; phone="573229224027"; observation="Cupos: 2"}
)

$jsonBody = $guests | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/guests" -Method Post -Headers $headers -Body $jsonBody -ErrorAction Stop

Write-Host "Successfully inserted $($guests.Length) guests!"

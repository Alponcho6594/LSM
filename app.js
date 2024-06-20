var fs = require('fs');
var isWord = require('is-word');
var spanishWords = isWord('spanish');
const say = require('say');

var groserias = [
    'pendejo', 'chinga', 'pinche', 'puto', 'cabron', 'verga', 'joto', 'culero', 'puta',
    'mamon', 'chingada', 'joder', 'coger', 'pedo', 'madrazo', 'chupar', 'pito', 'putazo', 'perra',
    'putear', 'mamada', 'jotos', 'maricon', 'culera', 'putas', 'culear', 'marica', 'mierda',
    'cagar', 'follar', 'cojones', 'cabrona', 'puton', 'estupido', 'idiota', 'gilipollas', 'zorra',
    'pendejada'
];

// Lista personalizada de nombres, apellidos, ciudades y palabras comunes
var customDictionary = [
    // 1000 nombres más comunes en México
    'sofia', 'valentina', 'santiago', 'mateo', 'regina', 'victoria', 'camila', 'emilia', 'lucia',
    'daniela', 'mariana', 'ximena', 'maria', 'alejandra', 'andrea', 'fernanda', 'paula', 'karla', 'valeria',
    'isabella', 'ana', 'elena', 'carolina', 'lorena', 'angela', 'monica', 'rosario', 'adriana', 'ines',
    'jesus', 'miguel', 'angel', 'pablo', 'luis', 'juan', 'carlos', 'alejandro', 'roberto', 'ramon',
    'ricardo', 'hector', 'jorge', 'francisco', 'felipe', 'manuel', 'sergio', 'gonzalo', 'eduardo', 'antonio',
    'victor', 'marcos', 'alfonso', 'gustavo', 'javier', 'oscar', 'ernesto', 'ignacio', 'julio', 'jose',
    'gabriel', 'raul', 'adrian', 'samuel', 'arturo', 'nicolas', 'rafael', 'enrique', 'benjamin', 'tomas',
    'hugo', 'emiliano', 'christian', 'armando', 'martin', 'jaime', 'guillermo', 'cesar', 'isaac', 'andres',
    'ivan', 'alberto', 'mario', 'german', 'daniel', 'vicente', 'edgar', 'genaro', 'esteban', 'marco',
    'alan', 'brandon', 'aaron', 'brenda', 'camilo', 'celia', 'cynthia', 'damian', 'darwin', 'david',
    'diana', 'diego', 'elias', 'elisa', 'emilio', 'eugenio', 'eva', 'fabian', 'fausto', 'felix',
    'fidel', 'fiona', 'flavio', 'franco', 'fredy', 'gabriela', 'gaston', 'genesis', 'gerardo', 'gilberto',
    'gilda', 'gloria', 'graciela', 'guadalupe', 'hernan', 'hortensia', 'humberto', 'iliana', 'ismael', 'jana',
    'jasmin', 'jeronimo', 'joaquin', 'josue', 'juanita', 'julian', 'karina', 'kenia', 'laura', 'leandro',
    'leo', 'leonardo', 'liliana', 'lorenzo', 'lucero', 'marcelo', 'margarita', 'marisol', 'martina', 'mauricio',
    'maximo', 'melina', 'mercedes', 'micaela', 'mireya', 'moises', 'natalia', 'nestor', 'nicole', 'norma',
    'olga', 'orlando', 'pamela', 'patricia', 'pedro', 'pilar', 'ramiro', 'raquel', 'rebeca', 'rocio',
    'rodolfo', 'rosa', 'ruben', 'salvador', 'sandra', 'silvia', 'susana', 'tania', 'tatiana', 'teodoro',
    'teresa', 'ursula', 'vanesa', 'veronica', 'viviana', 'wilson', 'yadira', 'yanet', 'yasmin', 'yazmin',
    'yolanda', 'yuridia', 'zaira', 'zulema', 'zulma', 'aldo', 'alicia', 'alma', 'alonso', 'amanda',
    'america', 'anahi', 'anastasia', 'angelica', 'antonella', 'aurelia', 'beatriz', 'belen', 'benito', 'berenice',
    'blanca', 'borja', 'brayan', 'briana', 'brisa', 'bryan', 'celeste', 'cecilia', 'cielo', 'cinthia',
    'claudia', 'clemencia', 'cristina', 'cristobal', 'damaris', 'danny', 'delia', 'demian', 'denisse', 'dina',
    'dora', 'eduarda', 'eileen', 'eira', 'ela', 'eladia', 'eladio', 'electra', 'eleonor', 'elian',
    'eliseo', 'emma', 'erick', 'erik', 'esperanza', 'estefania', 'eugenia', 'eulogio', 'eusebio', 'evangelina',
    'fabiana', 'fabiola', 'facundo', 'felicia', 'fidelia', 'fidelio', 'filadelfia', 'flor', 'florencio', 'fresia',
    'gabina', 'gabino', 'gael', 'galo', 'gema', 'genoveva', 'georgina', 'gladys', 'gregorio', 'guido',
    'hernando', 'hilaria', 'hilarion', 'hipolito', 'homero', 'horacio', 'imanol', 'ingrid', 'iris', 'irma',
    'isabel', 'isaias', 'isidro', 'israel', 'ivana', 'ivo', 'jacinto', 'jacobo', 'jairo', 'jamal',
    'janet', 'jessica', 'jimena', 'joselito', 'judith', 'julia', 'justo', 'kassandra', 'katerin', 'katerina',
    'katia', 'katiuska', 'kevin', 'kimberly', 'kristel', 'leonel', 'leonor', 'leopoldo', 'lesly', 'liam',
    'liz', 'lola', 'luciano', 'lucila', 'lucrecia', 'luz', 'macarena', 'macario', 'madeleine', 'magali',
    'magda', 'magdalena', 'malena', 'manuela', 'mar', 'marciana', 'margarito', 'maricarmen', 'marie', 'mariela',
    'marina', 'marino', 'marron', 'maya', 'mayra', 'melanie', 'melany', 'melchor', 'melisa', 'melitona',
    'melquiades', 'mikaela', 'miranda', 'misael', 'miriam', 'monserrat', 'nahuel', 'natalie', 'natividad', 'nazareth',
    'nerea', 'nieves', 'noe', 'noelia', 'octavio', 'odalis', 'oliver', 'osmar', 'osvaldo', 'otilia',
    'ovidio', 'paciencia', 'paloma', 'paola', 'patricio', 'paulina', 'petra', 'reina', 'remedios', 'renata',
    'renato', 'rigoberto', 'romina', 'rosalia', 'salome', 'sebastian', 'simona', 'sol', 'soraya', 'teofilo',
    'teofila', 'timoteo', 'tobias', 'tomis', 'trinidad', 'valentin', 'valerio', 'vianey', 'vladimir', 'yenifer',
    'yesenia', 'yoel', 'yonathan', 'yuliana', 'yulissa', 'yuri', 'zaida', 'zaid', 'zarina', 'agustin',
    'rogelio', 'nelson', 'reynaldo', 'ursulo', 'gumersindo', 'augusto', 'lucas', 'ezequiel', 'evelyn', 'santos',
    'augusta', 'federico', 'melinda', 'barbara', 'bernardo', 'candida', 'encarnacion', 'serafina', 'roman', 'abraham',
    'faustino', 'faustina', 'carina', 'reyna', 'sabrina', 'alfredo', 'julieta', 'ricarda', 'constanza', 'genovevo',
    'feliciana', 'noemi', 'cleotilde', 'regino', 'carmelo', 'augustina', 'anacleto', 'mirna', 'norberto', 'damaso',
    'baldomero', 'helena', 'alba', 'fatima', 'macrina', 'eulalia', 'dionisio', 'dolores', 'feliciano', 'benita',
    'celso', 'ceferino', 'rosaura', 'vicenta', 'ignacia', 'anastacio', 'rosendo', 'estrella', 'gertrudis', 'mirella',
    'juventino', 'belisario', 'teodora', 'claudio', 'elisea', 'lourdes', 'romualdo', 'azucena', 'josefina', 'griselda',
    'rodrigo', 'odilon', 'berta', 'modesto', 'florentino', 'desiree', 'araceli', 'obdulia', 'ariel', 'mireya',
    'hilarion', 'mirna', 'axel', 'guillermina', 'stephanie',
    

    // 1000 apellidos más comunes en México
    'garcia', 'martinez', 'lopez', 'hernandez', 'gonzalez', 'perez', 'rodriguez', 'sanchez', 'ramirez', 'cruz',
    'flores', 'gomez', 'jimenez', 'mendoza', 'diaz', 'reyes', 'ortega', 'gutierrez', 'morales', 'ramos',
    'torres', 'ruiz', 'soto', 'vargas', 'romero', 'mora', 'aguilar', 'montes', 'chavez', 'avila',
    'castillo', 'mendez', 'pineda', 'guzman', 'martin', 'orozco', 'rios', 'valdez', 'camacho', 'velazquez',
    'escobar', 'pena', 'silva', 'arias', 'ferreira', 'navarro', 'ibarra', 'munoz', 'rojas', 'cuevas',
    'valencia', 'serrano', 'acosta', 'hidalgo', 'miranda', 'padilla', 'medina', 'salazar', 'lucero', 'uribe',
    'vera', 'maldonado', 'tapia', 'barrios', 'cordova', 'duran', 'solis', 'campos', 'cortez', 'benitez',
    'franco', 'garza', 'montoya', 'santana', 'meza', 'palacios', 'cabrera', 'dominguez', 'sosa', 'carrillo',
    'velasco', 'guerrero', 'molina', 'guerra', 'sepulveda', 'rivero', 'aguirre', 'alvarez', 'arce', 'ayala',
    'bautista', 'beltran', 'bonilla', 'bravo', 'calderon', 'cardenas', 'carranza', 'castro', 'cerda', 'ceron',
    'chacon', 'colin', 'corona', 'delgado', 'enriquez', 'escamilla', 'espinoza', 'figueroa', 'fuentes', 'gallardo',
    'gallegos', 'galvan', 'granados', 'herrera', 'juarez', 'leon', 'limon', 'luna', 'macias', 'manzano',
    'marin', 'mercado', 'monroy', 'nieto', 'nunez', 'ojeda', 'olivares', 'olivera', 'olmos', 'ortiz',
    'oviedo', 'pacheco', 'palomino', 'parra', 'pedroza', 'prieto', 'quintero', 'rangel', 'romo', 'rubio',
    'salinas', 'soriano', 'trejo', 'vega', 'vicente', 'villarreal', 'yanez', 'zamora', 'zapata', 'zarate',
    'zuniga', 'aguilera', 'alonso', 'altamirano', 'amaral', 'amaro', 'angulo', 'aparicio', 'aragon', 'aranda',
    'araujo', 'baez', 'barron', 'barros', 'bartolome', 'batista', 'bermudez', 'botello', 'brambila', 'briseño',
    'buendia', 'bustamante', 'caballero', 'cabanillas', 'camarillo', 'canales', 'carreon', 'castaneda', 'castrillon', 'cervantes',
    'chaparro', 'chavarria', 'chavira', 'clavel', 'colunga', 'coronado', 'cortes', 'cortez', 'cuevas',
    'cuen', 'cuenca', 'cuesta', 'delgadillo', 'dorado', 'duarte', 'escalante', 'escalera', 'escobedo', 'estrada',
    'fajardo', 'farfan', 'formento', 'fortis', 'gaitan', 'gamboa', 'gama', 'garcia', 'garrido', 'gastelum',
    'gil', 'giron', 'guajardo', 'heredia', 'herrera', 'higareda', 'hinojosa', 'holguin', 'huerta', 'ignacio',
    'iraheta', 'iturbide', 'jasso', 'jurado', 'lazcano', 'lemus', 'leyva', 'lora', 'lugo', 'mayo',
    'medel', 'mejia', 'mena', 'menendez', 'merino', 'miranda', 'moctezuma', 'montiel', 'morenilla', 'mosqueda',
    'murillo', 'narvaez', 'navarrete', 'nez', 'noriega', 'norwood', 'ocampo', 'osorio', 'patino', 'perales',
    'picazo', 'plaza', 'ponce', 'ramon', 'reynoso', 'rico', 'roa', 'rocha', 'rogel', 'rosales',
    'rosas', 'salcedo', 'saldaña', 'saldivar', 'salomon', 'samaniego', 'santos', 'segovia', 'silva', 'simon',
    'sotelo', 'tamez', 'tejada', 'tenorio', 'teran', 'tinoco', 'tobias', 'toledo', 'torre', 'torrez',
    'trejo', 'trujillo', 'urbano', 'urieta', 'valdivia', 'valentin', 'valero', 'vallejo', 'valverde', 'verdugo',
    'vergara', 'vergarin', 'vilchez', 'villafane', 'villalobos', 'villanueva', 'villegas', 'villasenor', 'yepez', 'zabala',
    'zamorano', 'zarza', 'zepeda', 'zorrilla', 'arnold', 'arredondo', 'arturo', 'avelar', 'azuela', 'barraza',
    'barriga', 'belmonte', 'benavidez', 'bernal', 'berrocal', 'blanco', 'bojorquez', 'bribiesca', 'briones', 'bueno',
    'cabral', 'calero', 'calvillo', 'carballo', 'castilla', 'concepcion', 'conde', 'cuellar', 'davila', 'durazo',
    'emiliano', 'estevez', 'estrella', 'ferrer', 'formento', 'galindo', 'gallo', 'galvez', 'granados', 'humberto',
    'hurtado', 'jaramillo', 'justo', 'lazaro', 'leal', 'lira', 'llamas', 'madera', 'mata', 'melgar',
    'morales', 'morelia', 'narvaez', 'olvera', 'ordonez', 'padilla', 'paez', 'quesada', 'quintero', 'rangel',
    'reyes', 'rivas', 'rojas', 'romero', 'rubio', 'ruiz', 'segovia', 'serrano', 'simpson', 'solano',
    'sosa', 'toledo', 'trejo', 'urbina', 'villa', 'villanueva', 'villegas', 'zorrilla', 'zurita',
    

    // 1000 ciudades más comunes en México
    'cdmx', 'guadalajara', 'monterrey', 'tijuana', 'puebla', 'cancun', 'paris', 'londres', 'tokio',
    'nueva', 'york', 'berlin', 'madrid', 'barcelona', 'sydney', 'roma', 'angeles', 'toronto', 'buenos',
    'aires', 'santiago', 'bogota', 'lisboa', 'moscu', 'dublin', 'viena', 'venecia', 'dubai', 'shanghai',
    'hong', 'kong', 'beijing', 'mumbai', 'delhi', 'singapur', 'rio', 'seul', 'bangkok', 'istanbul',
    'amsterdam', 'vancouver', 'chicago', 'miami', 'boston', 'houston', 'dallas', 'atlanta', 'philadelphia', 'francisco',
    'orlando', 'detroit', 'las', 'vegas', 'phoenix', 'baltimore', 'antonio', 'diego', 'denver', 'seattle',
    'minneapolis', 'tampa', 'cleveland', 'cincinnati', 'kansas', 'milwaukee', 'indianapolis', 'charlotte', 'austin', 'pittsburgh',
    'columbus', 'memphis', 'nashville', 'richmond', 'sacramento', 'salt', 'lake', 'city', 'portland', 'oklahoma',
    'birmingham', 'newark', 'buffalo', 'el', 'paso', 'fort', 'worth', 'jacksonville', 'oakland', 'jose',
    'washington', 'athens', 'budapest', 'brussels', 'bucharest', 'copenhagen', 'helsinki', 'oslo', 'stockholm', 'zurich',
    'warsaw', 'prague', 'sofia', 'belgrade', 'zagreb', 'ljubljana', 'sarajevo', 'skopje', 'tirana', 'podgorica',
    'pristina', 'kyiv', 'minsk', 'saint', 'petersburg', 'kazan', 'samara', 'omsk', 'novosibirsk', 'ekaterinburg',
    'rostov', 'volgograd', 'vladivostok', 'astrakhan', 'krasnodar', 'chelyabinsk', 'ufa', 'perm', 'novokuznetsk', 'yakutsk',
    'irkutsk', 'yuzhno-sakhalinsk', 'kaliningrad', 'chisinau', 'krakow', 'poznan', 'gdansk', 'szczecin', 'lodz', 'bialystok',
    'lublin', 'vilnius', 'tallinn', 'tampere', 'turku', 'oulu', 'jyvaskyla', 'kuopio', 'kaunas', 'klaipeda',
    'siauliai', 'panevezys', 'mazeikiai', 'vilkaviskis', 'utena', 'daugavpils', 'liepaja', 'ventspils', 'jurmala', 'jelgava',
    'jekabpils', 'rezekne', 'valmiera', 'narva', 'parnu', 'viljandi', 'rakvere', 'kuressaare', 'valga', 'polva',
    'johvi', 'keila', 'rapla', 'saue', 'vohma', 'aachen', 'aalborg', 'aarhus', 'aberdeen', 'abilene',
    'abu', 'dhabi', 'abuja', 'acapulco', 'accra', 'adana', 'addis', 'abeba', 'adelaide', 'aguascalientes',
    'ahmedabad', 'ahvaz', 'ajaccio', 'akron', 'al', 'ain', 'albuquerque', 'alessandria', 'alexandria', 'alicante',
    'aligarh', 'almaty', 'almeria', 'altamira', 'amarillo', 'ambato', 'amersfoort', 'amritsar', 'anaheim', 'anchorage',
    'andorra', 'vella', 'anqing', 'antalya', 'antofagasta', 'antwerpen', 'arad', 'araguaina', 'arequipa', 'argel',
    'arica', 'arlington', 'armenia', 'asahikawa', 'asansol', 'ashgabat', 'asma', 'asuncion', 'atyrau', 'auckland',
    'augsburg', 'aurora', 'avellaneda', 'bagdad', 'bahia', 'blanca', 'bakersfield', 'baku', 'balikesir', 'banda',
    'aceh', 'bandung', 'bangalore', 'banjul', 'bara', 'barein', 'barquisimeto', 'basel', 'bashkent', 'batam',
    'beira', 'beirut', 'belfast', 'belo', 'horizonte', 'bergen', 'bhavnagar', 'bhopal', 'bilbao', 'binh',
    'duong', 'bissau', 'bloemfontein', 'bogor', 'boise', 'bokaro', 'bologna', 'bonn', 'bordeaux', 'bosaso',
    'brasilia', 'bratislava', 'bremen', 'breslavia', 'bristol', 'brno', 'bucaramanga', 'burbank', 'busan', 'bushehr',
    'busto', 'arsizio', 'caba', 'cagliari', 'cagua', 'cali', 'campeche', 'campos', 'dos', 'goitacazes', 'canberra',
    'cangzhou', 'cape', 'town', 'caracas', 'caruaru', 'casablanca', 'caserta', 'castellon', 'cebu', 'cedar',
    'rapids', 'celaya', 'cesena', 'chengdu', 'chennai', 'cherepovets', 'cherkasy', 'chihuahua', 'chile', 'chittagong',
    'cholet', 'chongqing', 'bolivar', 'cabo', 'guayana', 'juarez', 'obregon', 'real', 'clermont',
    'ferrand', 'cocle', 'cochin', 'colima', 'colombo', 'conakry', 'constantine', 'coquimbo', 'coral', 'cordoba',
    'corinto', 'corlu', 'corum', 'corvallis', 'cosenza', 'cotonou', 'courbevoie', 'coventry', 'craiova', 'cucuta',
    'cuiaba', 'cupertino', 'curitiba', 'cuzco', 'dacca', 'dakar', 'dalian', 'den', 'haag', 'denpasar',
    'depok', 'derby', 'des', 'moines', 'dires', 'divinopolis', 'diyarbakir', 'djerba', 'dniepropetrovsk', 'doha',
    'donetsk', 'dorchester', 'dortmund', 'douala', 'dubl', 'duisburg', 'dunedin', 'durango', 'durban', 'dusseldorf',
    'eastbourne', 'edimburgo', 'edmonton', 'efeso', 'egorevsk', 'emden', 'eindhoven', 'esparta', 'eureka', 'evansville',
    'fargo', 'fayetteville', 'flagstaff', 'flint', 'florencia', 'fortaleza', 'fresno', 'ft', 'funchal', 'fuzhou',
    'gainesville', 'gandia', 'gante', 'gaza', 'geneve', 'genova', 'ghaziabad', 'girona', 'glendale', 'gold', 'gothenburg',
    'granada', 'greenville', 'guanajuato', 'guangzhou', 'guatemala', 'guayaquil', 'guimaraes', 'guilin', 'gurgaon', 'habo',
    'hamburgo', 'hamilton', 'hanoi', 'harare', 'harrisburg', 'hartford', 'havana', 'helsingborg', 'hermosillo', 'hobart',
    'homs', 'hyderabad', 'ibadan', 'iguala', 'iloilo', 'imphal', 'indore', 'inirida', 'ipiales', 'iqaluit',
    'irving', 'izmir', 'jaen', 'jakarta', 'jalapa', 'jalisco', 'jambi', 'jamestown', 'jerez', 'jerico',
    'jerusalem', 'joao', 'johannesburgo', 'johor', 'juchitan', 'jujuy', 'juliaca', 'kabul', 'kampala', 'kampot',
    'kananga', 'kandy', 'kanpur', 'karachi', 'karbala', 'kathmandu', 'kedah', 'khabarovsk', 'kharkiv', 'kigali',
    'kingston', 'kinshasa', 'kobe', 'kolkata', 'kota', 'kinabalu', 'koulikoro', 'kyoto', 'lagos', 'paz',
    'las', 'lausana', 'leeds', 'leipzig', 'leon', 'libreville', 'limon', 'liverpool', 'lome', 'long',
    'beach', 'louangphabang', 'luanda', 'ludwigsburg', 'lusaka', 'luton', 'luxemburgo', 'lyon', 'macao', 'makati',
    'malabo', 'malaga', 'malmo', 'managua', 'manama', 'manaus', 'mandalay', 'mangalore', 'manila', 'maputo',
    'maracaibo', 'maracay', 'mar', 'maringa', 'marseille', 'mataro', 'matamoros', 'matsuyama', 'mazatlan', 'mcallen',
    'mendoza', 'mexicali', 'milan', 'miri', 'mogadiscio', 'mombasa', 'monaco', 'montevideo', 'montpellier', 'morales',
    'munich', 'murcia', 'nairobi', 'nanchang', 'nanjing', 'nantes', 'naples', 'nazareth', 'neiva', 'netanya',
    'delhi', 'nicosia', 'niigata', 'ningbo', 'nonthaburi', 'norfolk', 'odessa', 'oita', 'okinawa', 'olomouc',
    'omaha', 'osaka', 'oslo', 'otawa', 'oviedo', 'palencia', 'palermo', 'panama', 'patna', 'pattaya',
    'pekin', 'penang', 'perth', 'pisa', 'porto', 'praga', 'puebla', 'vallarta', 'punta', 'arenas',
    'punta', 'del', 'este', 'quito', 'rabat', 'rajkot', 'ramadi', 'ramallah', 'recife', 'reims',
    'rennes', 'reykjavik', 'riyadh', 'rosario', 'salvador', 'santiago', 'domingo', 'sarajevo', 'sevilla', 'sharjah',
    'siem', 'sofia', 'stuttgart', 'suez', 'surabaya', 'tacoma', 'taipei', 'tallin', 'tampere', 'tanger',
    'tashkent', 'teheran', 'tel', 'aviv', 'tianjin', 'toledo', 'tokyo', 'toronto', 'trondheim', 'tucson',
    'tula', 'tulsa', 'tunis', 'turin', 'ubeda', 'ulaanbaatar', 'utrecht', 'valencia', 'varsovia', 'veracruz',
    'verona', 'viena', 'vilnius', 'visby', 'wellington', 'windhoek', 'wroclaw', 'yamoussoukro', 'yaroslavl', 'yekaterinburg',
    'yerevan', 'zanzibar', 'zapopan', 'zurich',
    

    // 1000 palabras comunes con acento
    'accion', 'alcancia', 'album', 'alcazar', 'alegria', 'algodon', 'alergico', 'analisis', 'animo', 'antiguedad',
    'apendice', 'arbol', 'arcangel', 'ardio', 'armonica', 'articulo', 'aspero', 'astigmatismo', 'atomo', 'audifono',
    'autentico', 'avion', 'azucar', 'angel', 'anfora', 'area', 'aspero', 'atomo', 'avido', 'arido',
    'balsamo', 'bambu', 'banalizacion', 'barbaro', 'bebe', 'bibliografia', 'biceps', 'biografia', 'biologia', 'biblico',
    'boveda', 'boer', 'boton', 'brujula', 'bufalo', 'buho', 'busqueda', 'bulgaro', 'bufalo', 'bumera',
    'brujula', 'busqueda', 'basico', 'borax', 'boveda', 'biceps', 'biografo', 'biologia', 'bascula', 'boveda',
    'beisbol', 'bipedo', 'bunker', 'boveda', 'boveda', 'boer', 'botin', 'botanica', 'borax', 'boer',
    'algebra', 'algido', 'angulo', 'animo', 'antilope', 'apocrifo', 'arquidico', 'aspera', 'aurea', 'aver',
    'acaro', 'africano', 'ambar', 'apice', 'avido', 'abaco', 'atico', 'aspero', 'atomo', 'abaco',
    'barbaro', 'batido', 'basico', 'barbara', 'biblico', 'bavaro', 'balsamo', 'balano', 'buho', 'bufalo',
    'bambu', 'boer', 'boveda', 'borax', 'bumera', 'bufalo', 'boer', 'borax', 'bumera', 'bunker',
    'cancion', 'camion', 'camiones', 'canciones', 'cartel', 'catalogo', 'cesped', 'celula', 'comodo', 'codigo',
    'comun', 'condor', 'confesion', 'construccion', 'continua', 'cosmico', 'crater', 'creacion', 'critico', 'cronica',
    'cristalizacion', 'cuando', 'cuantos', 'cuantas', 'cuando', 'cupula', 'cartel', 'camara', 'cascara', 'centrico',
    'condor', 'cancer', 'cedula', 'centimetro', 'colera', 'caido', 'corazon', 'creo', 'cumulo', 'curo',
    'celebre', 'cuspide', 'comic', 'comision', 'consul', 'cotizacion', 'cupula', 'cantico', 'comica', 'cascara',
    'dolar', 'debil', 'decada', 'decimo', 'deficit', 'dejame', 'delincuencia', 'democracia', 'derogame', 'desanimo',
    'digame', 'docil', 'docilmente', 'domino', 'drastico', 'duo', 'domino', 'ductil', 'dolar', 'dolares',
    'deficit', 'debito', 'domino', 'docilmente', 'duo', 'dolar', 'deficit', 'dejame', 'dejenme', 'dejeme',
    'dejate', 'dejeme', 'dias', 'donde', 'dadiva', 'danamelo', 'dandome', 'dandoselo', 'decada', 'debil',
    'deficit', 'docilmente', 'dolares', 'debil', 'ductil', 'dolar', 'dejame', 'dadiva', 'ductil', 'dejenme',
    'debilmente', 'duo', 'dejeme', 'duo', 'debilmente', 'donde', 'dejate', 'dandome', 'dandole', 'dandole',
    'docilmente', 'dolar', 'deficit', 'dandoselo', 'dejame', 'debilmente', 'ductil', 'dejenme', 'dejeme', 'donde',
    'electrico', 'elite', 'emulo', 'enfasis', 'epoca', 'exito', 'exodo', 'extasis', 'etnico', 'eter',
    'embolo', 'extasis', 'esquelito', 'esfinter', 'esofago', 'etereo', 'eramos', 'enfasis', 'esto', 'embolo',
    'epico', 'exito', 'eramos', 'epoca', 'esdrujula', 'etnico', 'extasis', 'estereo', 'ecos', 'excepcion',
    'exito', 'eramos', 'este', 'extasis', 'etico', 'ebano', 'exito', 'etnica', 'exito', 'enfasis',
    'fabula', 'facil', 'futbol', 'focil', 'fosil', 'fertil', 'feretro', 'formula', 'farmaco', 'forceps',
    'fasico', 'fisica', 'facilmente', 'farandula', 'fonico', 'factico', 'fetido', 'fobico', 'fisica', 'ferreo',
    'fosforo', 'factica', 'fertil', 'feretro', 'fabrica', 'ferrea', 'femur', 'futil', 'fertil', 'formulas',
    'fijate', 'formula', 'farandula', 'fisica', 'fasico', 'fosil', 'facilmente', 'fabrica', 'fosiles', 'facilmente',
    'forceps', 'fertil', 'folicamente', 'fosforo', 'ferreo', 'facil', 'fabula', 'ferrea', 'fabrica', 'facil',
    'farrago', 'femina', 'fenix', 'fotil', 'focil', 'fosil', 'fertil', 'formula', 'fisico', 'fisica',
    'gondola', 'gotico', 'guia', 'geografia', 'gemia', 'germen', 'gomez', 'guero', 'gustame', 'genero',
    'ganster', 'gas', 'glandula', 'gloria', 'golf', 'gonada', 'geiser', 'genesis', 'gelido', 'grua',
    'gastrico', 'geologo', 'guey', 'gestion', 'gigantico', 'gospel', 'goticos', 'gansteres', 'geiseres', 'gorgona',
    'globulos', 'gramatica', 'gondolas', 'geminis', 'gondolas', 'gondolas', 'geiser', 'generos', 'ganglios', 'gargola',
    'gusto', 'goticas', 'geminas', 'gonadas', 'gondola', 'gorgolas', 'geiseres', 'gondolas', 'goticos', 'gargolas',
    'habito', 'heroe', 'humedo', 'humero', 'higado', 'humeda', 'hidrico', 'habil', 'helice', 'heroes',
    'horrido', 'helices', 'humedos', 'hamster', 'humedas', 'habiles', 'handicap', 'hungaro', 'hungara', 'habiles',
    'habilmente', 'hidrica', 'habitat', 'horrida', 'horridos', 'habitos', 'habitat', 'habilmente', 'heroico', 'hidrico',
    'habitats', 'humedamente', 'handicaps', 'helices', 'higado', 'hibrido', 'hibrida', 'hector', 'habil', 'heroina',
    'helice', 'horrido', 'humedamente', 'heroe', 'hidrico', 'habitat', 'hamsteres', 'horrido', 'habitos', 'horrida',
    'habitos', 'habitats', 'hibridos', 'heroes', 'horridas', 'horrido', 'hidrica', 'habitat', 'heroica', 'habitos',
    'icono', 'idolo', 'intimo', 'indice', 'ingenieria', 'intensificacion', 'iman', 'imbecil', 'imperdible', 'importacion',
    'incision', 'incognito', 'indicacion', 'intimamente', 'increible', 'indomito', 'ingles', 'inmovil', 'interprete', 'investigacion',
    'invalido', 'ionico', 'ira', 'ironico', 'isocrono', 'item', 'identico', 'indices', 'impuber', 'imbatible',
    'impenetrable', 'importara', 'impresion', 'incendio', 'incomodo', 'indocil', 'indomita', 'informatico', 'iniciacion', 'incolume',
    'intimidacion', 'intensificacion', 'incomprension', 'incredulo', 'inedita', 'impio', 'irrito', 'infimo', 'integra', 'irrita',
    'incognita', 'ingeniosisimo', 'invencion', 'implicito', 'intrinseco', 'inclito', 'ion', 'inteligible', 'inmovil', 'insipido',
    'jamas', 'jardin', 'japones', 'joyeria', 'judio', 'juraisico', 'jupiter', 'jovenes', 'justificacion', 'juridico',
    'jacto', 'jala', 'jalon', 'juguete', 'juzgo', 'jalapeno', 'jarron', 'jovencita', 'joya', 'jornal',
    'jubon', 'jabon', 'jugueteria', 'justifico', 'jalara', 'jalo', 'jubilacion', 'juez', 'juridicamente', 'juntara',
    'jalo', 'jacinto', 'jaque', 'jaula', 'jamone', 'jaripeo', 'jaque', 'jalone', 'jerarquia', 'jicama',
    'jolgorico', 'jubilo', 'jurame', 'jovencita', 'jugue', 'justifico', 'jalapeno', 'jalon', 'jala', 'jovenes',
    'jardines', 'jamas', 'jeringa', 'jugue', 'jactancio', 'jaloneo', 'jubilate', 'judia', 'jugara', 'justificaria',
    'kaiser', 'karate', 'karstico', 'kefir', 'kilometro', 'kirguis', 'koala', 'kosovo', 'kinder', 'karateka',
    'lapiz', 'lagrima', 'latigo', 'logico', 'lugubre', 'lider', 'libelula', 'lucido', 'lamina', 'lampara',
    'limite', 'lexico', 'leon', 'logralo', 'lobrego', 'liquido', 'leeme', 'ludico', 'latex', 'linea',
    'lineas', 'logica', 'lagrimas', 'lobulos', 'lirica', 'ludica', 'lamparas', 'laminas', 'lucidos', 'liquida',
    'logralos', 'ludicas', 'lexicos', 'lexica', 'logica', 'lugubres', 'liquidas', 'lobrega', 'logica', 'lideres',
    'lexicos', 'lagrimas', 'liquidos', 'lobulos', 'ludicas', 'limites', 'lineas', 'lamparas', 'lampara', 'lapices',
    'latex', 'lobulos', 'lineas', 'laminas', 'lugubre', 'liquidos', 'lineas', 'lexico', 'lider', 'leeme',
    'liquido', 'linea', 'logica', 'lexico', 'ludico', 'ludicos', 'lineas', 'lirica', 'liquido', 'lobrego',
    'logica', 'linea', 'lideres', 'lagrimas', 'lineas', 'lexico', 'lineas', 'lobulos', 'liquido', 'lider',
    'lexico', 'linea', 'laminas', 'liquido', 'linea', 'latex', 'liquidos', 'lineas', 'lider', 'logica',
    'maquina', 'medico', 'musica', 'movil', 'martir', 'modulo', 'musculo', 'maxima', 'merito', 'mistica',
    'marmol', 'metodo', 'murcielago', 'misero', 'molido', 'maximas', 'multiple', 'mistico', 'musculos', 'maximo',
    'modulos', 'medicos', 'marmoles', 'moviles', 'meritos', 'murmura', 'magico', 'medula', 'moribido', 'minimo',
    'mecenas', 'minimos', 'maximo', 'metodos', 'magicos', 'minima', 'mistico', 'musica', 'maxima', 'merito',
    'numero', 'nacar', 'nautico', 'nausea', 'nodulo', 'nordico', 'nahuatl', 'nomada', 'nucleo', 'nitido',
    'nomine', 'nectar', 'numeros', 'nautica', 'naufrago', 'nitida', 'nordicos', 'nectares', 'nubile', 'nayade',
    'nomina', 'nauticas', 'nauseas', 'nordica', 'nitidos', 'nodulos', 'naufragos', 'nahuatl', 'nucleos', 'nitidas',
    'nautica', 'nubiles', 'nomadas', 'nautica', 'nomina', 'nordico', 'nacida', 'nocturno', 'nomina', 'nucleos',
    'nordica', 'naufragio', 'nautica', 'nubiles', 'nausea', 'necesario', 'nubile', 'nordica', 'nucleo', 'nominacion',
    'optimo', 'organo', 'ordenes', 'oxido', 'opera', 'oleo', 'ovalo', 'optica', 'omnibus', 'oseo',
    'ovulo', 'opticos', 'organos', 'osmosis', 'orbitas', 'oleos', 'opticos', 'opticas', 'orbita', 'ovalos',
    'osmotico', 'osteopata', 'ortografico', 'odontologo', 'ortopedico', 'ovnis', 'opaco', 'osteoporosis', 'orquidea', 'onirico',
    'ofensivo', 'olfativo', 'optimismo', 'omnipotente', 'oncoloco', 'ortocentro', 'opinion', 'oratorio', 'ovario', 'ornamental',
    'oriente', 'ostensible', 'obstaculo', 'oportuno', 'obstetra', 'ornitorrinco', 'oido', 'oracion', 'optico', 'ocurrencia',
    'pajaro', 'publico', 'pagina', 'pendulo', 'parrafo', 'palido', 'pesimo', 'principe', 'perdida', 'practica',
    'panico', 'plastico', 'parpado', 'polvora', 'picaro', 'pildora', 'publicos', 'paginas', 'pendulos', 'purpura',
    'practicas', 'perdidas', 'palida', 'pinto', 'palidos', 'pesimos', 'principes', 'polvoras', 'perdida', 'practico',
    'palidas', 'parrafo', 'pinaculo', 'poetico', 'plausible', 'prehistorico', 'parabolico', 'patetico', 'pirata', 'prestamo',
    'planeta', 'practico', 'publicidad', 'periferico', 'primario', 'potencia', 'periodico', 'proposito', 'polemico', 'patron',
    'portico', 'premura', 'pacifico', 'plastico', 'paradojico', 'prision', 'proxima', 'proximo', 'patente', 'poderoso',
    'que', 'quien', 'quimica', 'quintuple', 'quedate', 'quienes', 'quebecois', 'quimico', 'quimica', 'quorum',
    'quitame', 'quitate', 'quimicas', 'quimicos', 'quitense', 'quebecoise', 'quebecoises', 'quimicamente', 'quitenos', 'quimico',
    'quimica', 'quintuple', 'quimico', 'quimicos', 'quebecois', 'quintuple', 'quimico', 'quimica', 'quimico', 'quimico',
    'rapido', 'rafaga', 'rio', 'record', 'razon', 'regimen', 'replica', 'requiem', 'rubrica', 'rapidos',
    'rafagas', 'replicas', 'ritmico', 'rapidamente', 'rustico', 'regimen', 'rapidamente', 'rusticos', 'ritmica', 'replicas',
    'rapido', 'rustica', 'ritmicas', 'rapidos', 'rusticas', 'requiem', 'records', 'ritmicos', 'rapida', 'ritmico',
    'rapidamente', 'rustico', 'ritmicamente', 'rafaga', 'rapidos', 'rapidamente', 'ritmicas', 'rapido', 'replica', 'rapidos',
    'reglamentacion', 'raquitico', 'radiacion', 'rambla', 'radiografia', 'relampago', 'recamara', 'rotulo', 'regimen', 'radiacion',
    'racional', 'rebeldia', 'recidiva', 'rescate', 'rotacion', 'remision', 'reposicion', 'reciente', 'redencion', 'republica',
    'sandwich', 'sotano', 'sintoma', 'solido', 'subito', 'septimo', 'sequito', 'simil', 'silaba', 'subdito',
    'sabana', 'sazon', 'septima', 'simbolo', 'sustentame', 'sufri', 'suplica', 'sintesis', 'sistole', 'sesamo',
    'subitamente', 'sincope', 'sequito', 'solida', 'sintomas', 'solo', 'sirvanse', 'sacrificio', 'sociologico', 'sancion',
    'solidos', 'sismico', 'sismica', 'solidas', 'sandwiches', 'simbolos', 'siquica', 'siquico', 'solo', 'sintesis',
    'solido', 'septimos', 'sintomas', 'sismicos', 'sismicas', 'sincopa', 'sanscrito', 'siquicos', 'siquicas', 'sintomas',
    'tecnico', 'timido', 'toxico', 'tunel', 'tactil', 'tragico', 'termino', 'tibia', 'tunica', 'titulo',
    'tonico', 'tortola', 'tarantula', 'termica', 'tempano', 'telefono', 'teoria', 'torax', 'turistico', 'transito',
    'topico', 'toxico', 'tension', 'tuneles', 'tetrico', 'tumulo', 'toxicos', 'timidamente', 'titeres', 'torrido',
    'terminos', 'tecnica', 'tecnicos', 'terminos', 'tenue', 'torridos', 'tuneles', 'toxicas', 'tonicas', 'timidos',
    'titulos', 'tecnicas', 'totem', 'totems', 'toxica', 'tonicas', 'torrida', 'tipica', 'tildes', 'tisico',
    'tantrico', 'talamo', 'talamos', 'tartaro', 'tartaros', 'tempanos', 'temprana', 'terminos', 'timida', 'tuneles',
    'ultimo', 'unico', 'util', 'ulcera', 'unicamente', 'urgencia', 'ultimos', 'utiles', 'ultima', 'unica',
    'unicamente', 'ulceras', 'unico', 'ultima', 'unicas', 'util', 'ulceras', 'ultimas', 'utiles', 'unico',
    'unicamente', 'util', 'ulcera', 'ultimo', 'util', 'ultima', 'unico', 'utiles', 'util', 'unico',
    'unicamente', 'util', 'ultimos', 'ultima', 'ultimo', 'utiles', 'unica', 'util', 'unico', 'unicamente',
    'vater', 'vomito', 'vivido', 'vertigo', 'vertebra', 'valido', 'vispera', 'volatil', 'vandalo', 'vinculo',
    'vortice', 'valvula', 'veridico', 'valida', 'veliz', 'velez', 'via', 'vibora', 'vinculos', 'visperas',
    'vomitos', 'vortices', 'vateres', 'vendelo', 'vencelo', 'virgenes', 'via', 'vomito', 'velez', 'veliz',
    'vertigos', 'validas', 'vinculos', 'vandalos', 'vinculo', 'vendenos', 'virgen', 'vertices', 'viveres', 'validos',
    'vendemelo', 'viveres', 'vertigos', 'veliz', 'vencela', 'vandala', 'vispera', 'vomitos', 'visperas', 'vertebras',
    'vencela', 'via', 'vastago', 'valido', 'vertice', 'vibora', 'virgenes', 'vivido', 'visteme', 'via',
    'water', 'wateres', 'watman', 'wagner', 'wasabi', 'western', 'westfalia', 'watido', 'warter', 'walter',
    'wandulo', 'westfalo', 'wandulos', 'wagneriana', 'wagneriano', 'watide', 'watides', 'waltzes', 'wandala', 'wasabina',
    'xenon', 'xerxes', 'xilofono', 'xilografia', 'xilitol', 'xenofobo', 'xenofoba', 'xenon', 'xenofobico', 'xenofobica',
    'xenofobos', 'xilofonos', 'xenofilo', 'xenofila', 'xenofobicos', 'xilograficas', 'xilofonas', 'xenons', 'xenofobas', 'xenonico',
    'xenons', 'xenofilos', 'xilitoles', 'xenofobes', 'xilograficas', 'xilofonas', 'xenons', 'xenofilas', 'xenofobicos', 'xilitolico',
    'xilografo', 'xilographa', 'xenofobics', 'xilitole', 'xenons', 'xenofila', 'xilograficas', 'xilofonos', 'xenons', 'xilografico',
    'xenons', 'xenofilos', 'xenofobicas', 'xilofonos', 'xenons', 'xenofila', 'xenofobes', 'xilitolico', 'xilografos', 'xilografas',
    'xenons', 'xenofobas', 'xilitolico', 'xenofilo', 'xenofobics', 'xilografo', 'xenons', 'xilitolicos', 'xenofobos', 'xenofobicas',
    'xenons', 'xenofilos', 'xilograficos', 'xenofobicas', 'xilografos', 'xilitoles', 'xenons', 'xenofobo', 'xilografico', 'xenons',
    'yerguete', 'yogur', 'yoquey', 'yergase', 'yendome', 'yendonos', 'yendote', 'yendose', 'yendolo', 'yendola',
    'yendolos', 'yendolas', 'yendome', 'yendose', 'yerguete', 'yergase', 'yerganse', 'yergase', 'yerguete', 'yendose',
    'zangano', 'zocalo', 'zocalos', 'zoon', 'zoonosis', 'zoonotico', 'zoonoticos', 'zoonotica', 'zoonoticas', 'zurich',
    'zanganas', 'zanganas', 'zanganos', 'zanganas', 'zocalo', 'zurich', 'zocalos', 'zocalo', 'zocalos', 'zangano',
    'zoonotico', 'zocalo', 'zoonosis', 'zoonoticos', 'zoonoticas', 'zoonoticas', 'zocalo', 'zoonotico', 'zocalo', 'zocalos',
    'zoon', 'zocalo', 'zocalos', 'zocalo', 'zoonosis', 'zoonotico', 'zocalo', 'zocalos', 'zoonotico', 'zoonosis',
    'zocalo', 'zocalos', 'zocalo', 'zocalos', 'zoonotico', 'zoonosis', 'zocalo', 'zocalos', 'zocalo', 'zocalos',
    'zangano', 'zocalo', 'zoonosis', 'zoonotico', 'zocalo', 'zoonotica', 'zoon', 'zoonotico', 'zocalo', 'zocalos',
    'zangano', 'zoonosis', 'zoonoticos', 'zoon', 'zoonotico', 'zoonotica', 'zocalo', 'zoonosis', 'zocalo', 'zoon',
];

// Función para verificar si una palabra está en el diccionario
function checkWord(word) {
    // Primero, verificamos si la palabra está en nuestro diccionario personalizado
    if (customDictionary.includes(word)) {
        return true;
    }
    // Si no está en el diccionario personalizado, usamos la verificación del módulo is-word
    return spanishWords.check(word);
}

function checkGroseria(word) {
    if (groserias.includes(word)){
        return true;
    }
}

    
    let processing = false;

    fs.watch('detected_letters.txt', (eventType, filename) => {
        if (eventType === 'change') {
            if (processing) {
                return; // Si ya estamos procesando, salimos
            }
    
            processing = true; // Marcamos como en proceso
    
            fs.readFile('detected_letters.txt', 'utf8', (err, data) => {
                if (err) throw err;
    
                let palabra = data.trim().toLowerCase();
                let groseriaDetectada = checkGroseria(palabra);
                if (groseriaDetectada){       
                    // Mostrar la palabra con la mitad de letras reemplazadas por '*'
                    var palabraCensurada = '';
                    for (var i = 0; i < palabra.length; i++) {
                        if (i < palabra.length / 2) {
                            palabraCensurada += palabra[i];
                        } else {
                            palabraCensurada += '*';
                        }
                    }
                    console.log(`Palabra censurada: ${palabraCensurada}`);
                    // Decir la palabra censurada en voz alta
                    say.speak(palabraCensurada, 'Microsoft Helena Desktop', 1.0); // Ejemplo con voz de Microsoft David
                } else {
                    let esValida = checkWord(palabra);
                    console.log(`La palabra "${palabra}" ${esValida ? 'sí' : 'no'} existe en el diccionario.`);
                    // Decir la palabra válida en voz alta
                    say.speak(palabra, 'Microsoft Helena Desktop', 1.0); // Ejemplo con voz de Microsoft David
                }
        
                processing = false; // Terminamos el procesamiento
            });
        }
    });

console.log('Esperando cambios en el archivo palabra.txt...');

import urllib, urllib2
from bs4 import BeautifulSoup, Comment, NavigableString
import csv
content='<a href=\'javascript:gbp(544520)\' class=\'ex\' elements=\'a1531236034896\'>3M <span class=\'bn\'>211</span> </a> <a href=\'javascript:gbp(544521)\' class=\'ex\' elements=\'a1531235964360\'>Accenture <span class=\'bn\'>523</span> </a> <a href=\'javascript:gbp(585702)\' class=\'ex\' elements=\'a1531236229926\'>ActionIQ <span class=\'bn\'>1251</span> </a> <a href=\'javascript:gbp(544736)\' class=\'ex\' elements=\'a1531236074814\'>Aerotek <span class=\'bn\'>711</span> </a> <a href=\'javascript:gbp(588923)\' class=\'ex\' elements=\'a1531236111810\'>Air Force Reserve <span class=\'bn\'>1549</span> </a> <a href=\'javascript:gbp(544522)\' class=\'ex\' elements=\'a1531235719443\'>Air Force STEM <span class=\'bn\'>331</span> </a> <a href=\'javascript:gbp(544523)\' class=\'ex\' elements=\'a1531235092056\'>Air Products <span class=\'bn\'>1137</span> </a> <a href=\'javascript:gbp(588316)\' class=\'ex\' elements=\'a1531236063713\'>Albemarle Corporation <span class=\'bn\'>110</span> </a> <a href=\'javascript:gbp(600809)\' class=\'ex\' elements=\'a1531236138604\'>Alcon <span class=\'bn\'>248</span> </a> <a href=\'javascript:gbp(544703)\' class=\'ex\' elements=\'a1531235973478\'>Allstate Insurance Company <span class=\'bn\'>511</span> </a> <a href=\'javascript:gbp(591396)\' class=\'ex\' elements=\'a1537466652065\'>Amazon <span class=\'bn\'>140</span> </a> <a href=\'javascript:gbp(546271)\' class=\'ex\' elements=\'a1532997461028\'>Ameren <span class=\'bn\'>210</span> </a> <a href=\'javascript:gbp(544524)\' class=\'ex\' elements=\'a1531235757436\'>America\'s Navy <span class=\'bn\'>1323</span> </a> <a href=\'javascript:gbp(546609)\' class=\'ex\' elements=\'a1531236091365\'>American Airlines <span class=\'bn\'>1310</span> </a> <a href=\'javascript:gbp(546409)\' class=\'ex\' elements=\'a1531236134011\'>American Express <span class=\'bn\'>130</span> </a> <a href=\'javascript:gbp(581730)\' class=\'ex\' elements=\'a1531236158295\'>American Society of Civil Engineers <span class=\'bn\'>548</span> </a> <a href=\'javascript:gbp(587883)\' class=\'ex\' elements=\'a1531236111812\'>Ames Laboratory-Iowa State University <span class=\'bn\'>1545</span> </a> <a href=\'javascript:gbp(546780)\' class=\'ex\' elements=\'a1531236234967\'>ANSYS, Inc <span class=\'bn\'>1542</span> </a> <a href=\'javascript:gbp(552821)\' class=\'ex\' elements=\'a1531236190800\'>Arizona State University Fulton Schools of Engineering <span class=\'bn\'>1048</span> </a> <a href=\'javascript:gbp(546595)\' class=\'ex\' elements=\'a1531236233219\'>Arup <span class=\'bn\'>1444</span> </a> <a href=\'javascript:gbp(546456)\' class=\'ex\' elements=\'a1531236185089\'>Auburn University - Samuel Ginn College of Engineering <span class=\'bn\'>739</span> </a> <a href=\'javascript:gbp(544525)\' class=\'ex\' elements=\'a1531235861210\'>BAE Systems <span class=\'bn\'>1117</span> </a> <a href=\'javascript:gbp(544526)\' class=\'ex\' elements=\'a1531235902224\'>BASF Corporation <span class=\'bn\'>823</span> </a> <a href=\'javascript:gbp(546378)\' class=\'ex\' elements=\'a1531236174562\'>Battelle <span class=\'bn\'>545</span> </a> <a href=\'javascript:gbp(546368)\' class=\'ex\' elements=\'a1531236229930\'>BMC Software, Inc. <span class=\'bn\'>1247</span> </a> <a href=\'javascript:gbp(544534)\' class=\'ex\' elements=\'a1531235780231\'>Boeing Company, The <span class=\'bn\'>1221</span> </a> <a href=\'javascript:gbp(593048)\' class=\'ex\' elements=\'a1538754053591\'>Boise State University <span class=\'bn\'>1154</span> </a> <a href=\'javascript:gbp(545710)\' class=\'ex\' elements=\'a1531236160531\'>BorgWarner Inc. <span class=\'bn\'>531</span> </a> <a href=\'javascript:gbp(546312)\' class=\'ex\' elements=\'a1531236094659\'>Boston Scientific <span class=\'bn\'>1523</span> </a> <a href=\'javascript:gbp(544528)\' class=\'ex\' elements=\'a1531235931225\'>BP <span class=\'bn\'>623</span> </a> <a href=\'javascript:gbp(560578)\' class=\'ex\' elements=\'a1531236140053\'>Bristol-Myers Squibb <span class=\'bn\'>251</span> </a> <a href=\'javascript:gbp(561125)\' class=\'ex\' elements=\'a1531236134004\'>Burns &amp; McDonnell <span class=\'bn\'>144</span> </a> <a href=\'javascript:gbp(574536)\' class=\'ex\' elements=\'a1531236234963\'>BWX Technologies, Inc <span class=\'bn\'>1546</span> </a> <a href=\'javascript:gbp(546310)\' class=\'ex\' elements=\'a1531236091359\'>Capital One <span class=\'bn\'>1316</span> </a> <a href=\'javascript:gbp(546631)\' class=\'ex\' elements=\'a1531236143323\'>Cargill <span class=\'bn\'>440</span> </a> <a href=\'javascript:gbp(546448)\' class=\'ex\' elements=\'a1531236162405\'>Carnegie Mellon University <span class=\'bn\'>830</span> </a> <a href=\'javascript:gbp(585767)\' class=\'ex\' elements=\'a1531236176469\'>Case Western Reserve University School of Engineering <span class=\'bn\'>651</span> </a> <a href=\'javascript:gbp(544535)\' class=\'ex\' elements=\'a1531236040500\'>Caterpillar Inc. <span class=\'bn\'>123</span> </a> <a href=\'javascript:gbp(544536)\' class=\'ex\' elements=\'a1531235116835\'>Central Intelligence Agency (CIA) <span class=\'bn\'>1331</span> </a> <a href=\'javascript:gbp(544537)\' class=\'ex\' elements=\'a1531235870691\'>Chevron <span class=\'bn\'>1023</span> </a> <a href=\'javascript:gbp(545029)\' class=\'ex\' elements=\'a1531235943787\'>Cisco <span class=\'bn\'>805</span> </a> <a href=\'javascript:gbp(572914)\' class=\'ex\' elements=\'a1531236176472\'>Clemson University College of Engineering, Computing &amp; Applied Sciences <span class=\'bn\'>748</span> </a> <a href=\'javascript:gbp(584634)\' class=\'ex\' elements=\'a1531236176470\'>Cleveland State University - Washkewicz College of Engineering <span class=\'bn\'>750</span> </a> <a href=\'javascript:gbp(575984)\' class=\'ex\' elements=\'a1531236169924\'>Colorado School of Mines - Graduate School <span class=\'bn\'>1148</span> </a> <a href=\'javascript:gbp(546459)\' class=\'ex\' elements=\'a1531236190809\'>Columbia University <span class=\'bn\'>939</span> </a> <a href=\'javascript:gbp(569762)\' class=\'ex\' elements=\'a1531236174556\'>Congressional Hispanic Caucus Institute <span class=\'bn\'>551</span> </a> <a href=\'javascript:gbp(546676)\' class=\'ex\' elements=\'a1531236188876\'>Cornell Tech, Cornell University <span class=\'bn\'>944</span> </a> <a href=\'javascript:gbp(546484)\' class=\'ex\' elements=\'a1531236188880\'>Cornell Univ.: Engineering &amp; Graduate School <span class=\'bn\'>940</span> </a> <a href=\'javascript:gbp(546489)\' class=\'ex\' elements=\'a1531236188878\'>Cornell\'s Systems Engineering <span class=\'bn\'>942</span> </a> <a href=\'javascript:gbp(582144)\' class=\'ex\' elements=\'a1531236143314\'>Corning Incorporated <span class=\'bn\'>349</span> </a> <a href=\'javascript:gbp(546360)\' class=\'ex\' elements=\'a1532998069416\'>Corteva Agriscience <span class=\'bn\'>1244</span> </a> <a href=\'javascript:gbp(544529)\' class=\'ex\' elements=\'a1531235123127\'>Cummins Inc. <span class=\'bn\'>1231</span> </a> <a href=\'javascript:gbp(588153)\' class=\'ex\' elements=\'a1531236169922\'>Dartmouth College, Thayer School of Engineering <span class=\'bn\'>1150</span> </a> <a href=\'javascript:gbp(569764)\' class=\'ex\' elements=\'a1531236158293\'>Defense Contract Management Agency (DCMA) <span class=\'bn\'>550</span> </a> <a href=\'javascript:gbp(546333)\' class=\'ex\' elements=\'a1531236233215\'>Dell <span class=\'bn\'>1448</span> </a> <a href=\'javascript:gbp(544543)\' class=\'ex\' elements=\'a1531235769785\'>Delta Air Lines <span class=\'bn\'>1317</span> </a> <a href=\'javascript:gbp(574350)\' class=\'ex\' elements=\'a1531236233214\'>Dematic Corp. <span class=\'bn\'>1349</span> </a> <a href=\'javascript:gbp(546527)\' class=\'ex\' elements=\'a1531236233218\'>Deutsche Bank <span class=\'bn\'>1345</span> </a> <a href=\'javascript:gbp(546334)\' class=\'ex\' elements=\'a1531236091362\'>Discover Financial Services <span class=\'bn\'>1217</span> </a> <a href=\'javascript:gbp(583968)\' class=\'ex\' elements=\'a1531236234962\'>DiversityComm, Inc. <span class=\'bn\'>1447</span> </a> <a href=\'javascript:gbp(547236)\' class=\'ex\' elements=\'a1531236174560\'>DoD SMART <span class=\'bn\'>547</span> </a> <a href=\'javascript:gbp(609748)\' class=\'ex\' elements=\'a1531236220764\'>Dominion Energy <span class=\'bn\'>1250</span> </a> <a href=\'javascript:gbp(544544)\' class=\'ex\' elements=\'a1531235137593\'>Dow Chemical Company, The <span class=\'bn\'>1031</span> </a> <a href=\'javascript:gbp(544545)\' class=\'ex\' elements=\'a1531236026816\'>DuPont <span class=\'bn\'>223</span> </a> <a href=\'javascript:gbp(544551)\' class=\'ex\' elements=\'a1531235912114\'>Eaton <span class=\'bn\'>811</span> </a> <a href=\'javascript:gbp(546540)\' class=\'ex\' elements=\'a1531236063711\'>Ecolab <span class=\'bn\'>114</span> </a> <a href=\'javascript:gbp(590923)\' class=\'ex\' elements=\'a1531236143324\'>Elanco <span class=\'bn\'>339</span> </a> <a href=\'javascript:gbp(562243)\' class=\'ex\' elements=\'a1531236174558\'>Electric Power Research Institute <span class=\'bn\'>549</span> </a> <a href=\'javascript:gbp(546293)\' class=\'ex\' elements=\'a1531236085807\'>Eli Lilly and Company <span class=\'bn\'>1017</span> </a> <a href=\'javascript:gbp(547372)\' class=\'ex\' elements=\'a1531236174559\'>Emma Bowen Foundation (EBF) <span class=\'bn\'>648</span> </a> <a href=\'javascript:gbp(544552)\' class=\'ex\' elements=\'a1531235939038\'>Exelon <span class=\'bn\'>611</span> </a> <a href=\'javascript:gbp(544530)\' class=\'ex\' elements=\'a1531236013801\'>Exxon Mobil Corporation <span class=\'bn\'>323</span> </a> <a href=\'javascript:gbp(546240)\' class=\'ex\' elements=\'a1531236074817\'>Facebook, Inc. <span class=\'bn\'>810</span> </a> <a href=\'javascript:gbp(574559)\' class=\'ex\' elements=\'a1531236188872\'>FAMU-FSU College of Engineering <span class=\'bn\'>948</span> </a> <a href=\'javascript:gbp(546382)\' class=\'ex\' elements=\'a1531236111818\'>Fermilab <span class=\'bn\'>1533</span> </a> <a href=\'javascript:gbp(546331)\' class=\'ex\' elements=\'a1531234655092\'>Fiat Chrysler Automobiles (FCA) <span class=\'bn\'>637</span> </a> <a href=\'javascript:gbp(588328)\' class=\'ex\' elements=\'a1531236134003\'>FirstEnergy <span class=\'bn\'>146</span> </a> <a href=\'javascript:gbp(546550)\' class=\'ex\' elements=\'a1531236138606\'>Fish &amp; Richardson P.C. <span class=\'bn\'>246</span> </a> <a href=\'javascript:gbp(546458)\' class=\'ex\' elements=\'a1531236190804\'>Florida International University - College of Engineering and Computing <span class=\'bn\'>1044</span> </a> <a href=\'javascript:gbp(544553)\' class=\'ex\' elements=\'a1531234759834\'>Ford Motor Company <span class=\'bn\'>1039</span> </a> <a href=\'javascript:gbp(596480)\' class=\'ex\' elements=\'a1533147792533\'>GAF <span class=\'bn\'>243</span> </a> <a href=\'javascript:gbp(544554)\' class=\'ex\' elements=\'a1531235109642\'>GE <span class=\'bn\'>1431</span> </a> <a href=\'javascript:gbp(559677)\' class=\'ex\' elements=\'a1531236134007\'>General Atomics <span class=\'bn\'>138</span> </a> <a href=\'javascript:gbp(544531)\' class=\'ex\' elements=\'a1531235893705\'>General Dynamics <span class=\'bn\'>911</span> </a> <a href=\'javascript:gbp(544555)\' class=\'ex\' elements=\'a1531235761461\'>General Motors <span class=\'bn\'>1415</span> </a> <a href=\'javascript:gbp(546411)\' class=\'ex\' elements=\'a1531236162404\'>Georgia Institute of Technology <span class=\'bn\'>731</span> </a> <a href=\'javascript:gbp(593497)\' class=\'ex\' elements=\'a1539270971422\'>Georgia Tech Research Institute <span class=\'bn\'>654</span> </a> <a href=\'javascript:gbp(596058)\' class=\'ex\' elements=\'a1539381523359\'>Georgia Tech Scheller College of Business <span class=\'bn\'>1053</span> </a> <a href=\'javascript:gbp(544532)\' class=\'ex\' elements=\'a1531235968263\'>Goldman Sachs <span class=\'bn\'>517</span> </a> <a href=\'javascript:gbp(546328)\' class=\'ex\' elements=\'a1531236063707\'>Goodyear Tire &amp; Rubber Company <span class=\'bn\'>122</span> </a> <a href=\'javascript:gbp(544583)\' class=\'ex\' elements=\'a1531235773407\'>Google <span class=\'bn\'>1311</span> </a> <a href=\'javascript:gbp(598165)\' class=\'ex\' elements=\'a1531236234959\'>Great Minds in STEM <span class=\'bn\'>1550</span> </a> <a href=\'javascript:gbp(569767)\' class=\'ex\' elements=\'a1531236111814\'>HACU National Internship Program <span class=\'bn\'>1541</span> </a> <a href=\'javascript:gbp(588393)\' class=\'ex\' elements=\'a1531236169921\'>Harvard Business School (HBS) <span class=\'bn\'>1051</span> </a> <a href=\'javascript:gbp(552200)\' class=\'ex\' elements=\'a1531236143319\'>HDR <span class=\'bn\'>444</span> </a> <a href=\'javascript:gbp(546618)\' class=\'ex\' elements=\'a1531236140054\'>Hensel Phelps <span class=\'bn\'>350</span> </a> <a href=\'javascript:gbp(570155)\' class=\'ex\' elements=\'a1531235959808\'>Honda R&amp;D Americas, Inc. <span class=\'bn\'>505</span> </a> <a href=\'javascript:gbp(544533)\' class=\'ex\' elements=\'a1531235978484\'>Honeywell <span class=\'bn\'>411</span> </a> <a href=\'javascript:gbp(546610)\' class=\'ex\' elements=\'a1532998069845\'>Hormel Foods <span class=\'bn\'>1147</span> </a> <a href=\'javascript:gbp(546244)\' class=\'ex\' elements=\'a1531236091364\'>Huntington Ingalls Industries <span class=\'bn\'>1211</span> </a> <a href=\'javascript:gbp(544538)\' class=\'ex\' elements=\'a1531235752368\'>IBM Corporation <span class=\'bn\'>1423</span> </a> <a href=\'javascript:gbp(591391)\' class=\'ex\' elements=\'a1539116303770\'>Illinois Department of Transportation <span class=\'bn\'>455</span> </a> <a href=\'javascript:gbp(563779)\' class=\'ex\' elements=\'a1533147771161\'>Indeed <span class=\'bn\'>239</span> </a> <a href=\'javascript:gbp(546385)\' class=\'ex\' elements=\'a1531236111817\'>INROADS <span class=\'bn\'>1535</span> </a> <a href=\'javascript:gbp(544560)\' class=\'ex\' elements=\'a1531235703388\'>Intel Corporation <span class=\'bn\'>131</span> </a> <a href=\'javascript:gbp(593184)\' class=\'ex\' elements=\'a1538754048217\'>International Technological University (ITU) <span class=\'bn\'>1054</span> </a> <a href=\'javascript:gbp(546474)\' class=\'ex\' elements=\'a1531236190805\'>Iowa State University-College of Engineering <span class=\'bn\'>943</span> </a> <a href=\'javascript:gbp(546364)\' class=\'ex\' elements=\'a1531236229932\'>Jacobs <span class=\'bn\'>1245</span> </a> <a href=\'javascript:gbp(546307)\' class=\'ex\' elements=\'a1531236074811\'>Jet Propulsion Laboratory <span class=\'bn\'>816</span> </a> <a href=\'javascript:gbp(544539)\' class=\'ex\' elements=\'a1531235879675\'>John Deere <span class=\'bn\'>1011</span> </a> <a href=\'javascript:gbp(546807)\' class=\'ex\' elements=\'a1539718035894\'>Johns Hopkins University Applied Physics Laboratory <span class=\'bn\'>653</span> </a> <a href=\'javascript:gbp(548135)\' class=\'ex\' elements=\'a1531236169926\'>Johns Hopkins University, Whiting School of Engineering <span class=\'bn\'>1146</span> </a> <a href=\'javascript:gbp(544561)\' class=\'ex\' elements=\'a1531235907045\'>Johnson &amp; Johnson <span class=\'bn\'>817</span> </a> <a href=\'javascript:gbp(583276)\' class=\'ex\' elements=\'a1531236220766\'>Johnson Controls <span class=\'bn\'>1248</span> </a> <a href=\'javascript:gbp(591397)\' class=\'ex\' elements=\'a1531234591104\'>Jopwell <span class=\'bn\'>439</span> </a> <a href=\'javascript:gbp(546338)\' class=\'ex\' elements=\'a1531236023382\'>JPMorgan Chase &amp; Co. <span class=\'bn\'>311</span> </a> <a href=\'javascript:gbp(546481)\' class=\'ex\' elements=\'a1531236188879\'>Keck Graduate Institute <span class=\'bn\'>841</span> </a> <a href=\'javascript:gbp(546278)\' class=\'ex\' elements=\'a1531236068189\'>Kimberly Clark Corporation <span class=\'bn\'>423</span> </a> <a href=\'javascript:gbp(546320)\' class=\'ex\' elements=\'a1532998069060\'>L\'Oreal <span class=\'bn\'>1242</span> </a> <a href=\'javascript:gbp(546319)\' class=\'ex\' elements=\'a1531236234966\'>Lawrence Livermore National Laboratory <span class=\'bn\'>1443</span> </a> <a href=\'javascript:gbp(544559)\' class=\'ex\' elements=\'a1531236019681\'>Lincoln Electric <span class=\'bn\'>317</span> </a> <a href=\'javascript:gbp(544562)\' class=\'ex\' elements=\'a1531236000641\'>Lockheed Martin <span class=\'bn\'>405</span> </a> <a href=\'javascript:gbp(546707)\' class=\'ex\' elements=\'a1531236158297\'>Los Angeles Department of Water and Power <span class=\'bn\'>546</span> </a> <a href=\'javascript:gbp(562798)\' class=\'ex\' elements=\'a1531236134009\'>Macy\'s Technology <span class=\'bn\'>134</span> </a> <a href=\'javascript:gbp(546350)\' class=\'ex\' elements=\'a1532998070020\'>McKinsey &amp; Company <span class=\'bn\'>1143</span> </a> <a href=\'javascript:gbp(583299)\' class=\'ex\' elements=\'a1531236143320\'>Medtronic <span class=\'bn\'>343</span> </a> <a href=\'javascript:gbp(546432)\' class=\'ex\' elements=\'a1531236140057\'>Merck &amp; Co., Inc. <span class=\'bn\'>247</span> </a> <a href=\'javascript:gbp(546362)\' class=\'ex\' elements=\'a1532997421545\'>Microsoft <span class=\'bn\'>216</span> </a> <a href=\'javascript:gbp(548295)\' class=\'ex\' elements=\'a1531236158292\'>MIT Lincoln Laboratory <span class=\'bn\'>451</span> </a> <a href=\'javascript:gbp(546509)\' class=\'ex\' elements=\'a1531236188875\'>MIT Office of Graduate Education <span class=\'bn\'>845</span> </a> <a href=\'javascript:gbp(546530)\' class=\'ex\' elements=\'a1531236188877\'>MIT Sloan School of Management <span class=\'bn\'>843</span> </a> <a href=\'javascript:gbp(546455)\' class=\'ex\' elements=\'a1531236111819\'>MITRE <span class=\'bn\'>1531</span> </a> <a href=\'javascript:gbp(546386)\' class=\'ex\' elements=\'a1531236174561\'>NABEF Technology Apprenticeship Program <span class=\'bn\'>646</span> </a> <a href=\'javascript:gbp(586961)\' class=\'ex\' elements=\'a1531236111809\'>NASA <span class=\'bn\'>1551</span> </a> <a href=\'javascript:gbp(591687)\' class=\'ex\' elements=\'a1531236188874\'>NASA Postdoctoral Program USRA-AAMU-RISE <span class=\'bn\'>946</span> </a> <a href=\'javascript:gbp(590919)\' class=\'ex\' elements=\'a1539011128353\'>National GEM Consortium <span class=\'bn\'>1553</span> </a> <a href=\'javascript:gbp(578974)\' class=\'ex\' elements=\'a1531236111813\'>National Renewable Energy Laboratory <span class=\'bn\'>1543</span> </a> <a href=\'javascript:gbp(604883)\' class=\'ex\' elements=\'a1531236229927\'>National Science Foundation <span class=\'bn\'>1350</span> </a> <a href=\'javascript:gbp(552292)\' class=\'ex\' elements=\'a1531236234964\'>National Security Agency <span class=\'bn\'>1445</span> </a> <a href=\'javascript:gbp(592161)\' class=\'ex\' elements=\'a1539183587474\'>Naval Nuclear Laboratory <span class=\'bn\'>553</span> </a> <a href=\'javascript:gbp(544563)\' class=\'ex\' elements=\'a1531235886635\'>Navy Civilian Careers <span class=\'bn\'>919</span> </a> <a href=\'javascript:gbp(590918)\' class=\'ex\' elements=\'a1538753633976\'>NC State College of Engineering <span class=\'bn\'>754</span> </a> <a href=\'javascript:gbp(588374)\' class=\'ex\' elements=\'a1531234563438\'>Nike, Inc. <span class=\'bn\'>338</span> </a> <a href=\'javascript:gbp(546629)\' class=\'ex\' elements=\'a1531236143321\'>NiSource <span class=\'bn\'>442</span> </a> <a href=\'javascript:gbp(593496)\' class=\'ex\' elements=\'a1538754052908\'>NJIT/EOP <span class=\'bn\'>1055</span> </a> <a href=\'javascript:gbp(590922)\' class=\'ex\' elements=\'a1538753613242\'>NOAA Crest Center @ City College of NY <span class=\'bn\'>855</span> </a> <a href=\'javascript:gbp(598932)\' class=\'ex\' elements=\'a1531236229929\'>Nordson Corporation <span class=\'bn\'>1348</span> </a> <a href=\'javascript:gbp(563549)\' class=\'ex\' elements=\'a1531236233217\'>Norfolk Southern Corp. <span class=\'bn\'>1446</span> </a> <a href=\'javascript:gbp(596295)\' class=\'ex\' elements=\'a1539720391102\'>Northeast Ohio Regional Sewer District <span class=\'bn\'>453</span> </a> <a href=\'javascript:gbp(590921)\' class=\'ex\' elements=\'a1538753616032\'>Northeastern Univeristy <span class=\'bn\'>853</span> </a> <a href=\'javascript:gbp(544542)\' class=\'ex\' elements=\'a1531235935943\'>Northrop Grumman Corporation <span class=\'bn\'>617</span> </a> <a href=\'javascript:gbp(562825)\' class=\'ex\' elements=\'a1533075710264\'>Northwestern Pritzker School of Law\'s Master of Science in Law Program <span class=\'bn\'>833</span> </a> <a href=\'javascript:gbp(545731)\' class=\'ex\' elements=\'a1531236164143\'>Northwestern University <span class=\'bn\'>831</span> </a> <a href=\'javascript:gbp(546418)\' class=\'ex\' elements=\'a1532997422683\'>NXP Semiconductors <span class=\'bn\'>214</span> </a> <a href=\'javascript:gbp(569600)\' class=\'ex\' elements=\'a1531236188870\'>NYU Tandon School of Engineering <span class=\'bn\'>950</span> </a> <a href=\'javascript:gbp(563752)\' class=\'ex\' elements=\'a1531235103939\'>Olin Corporation <span class=\'bn\'>1437</span> </a> <a href=\'javascript:gbp(548324)\' class=\'ex\' elements=\'a1533003679259\'>ON Semiconductor <span class=\'bn\'>143</span> </a> <a href=\'javascript:gbp(548112)\' class=\'ex\' elements=\'a1533003659350\'>Oracle <span class=\'bn\'>238</span> </a> <a href=\'javascript:gbp(559659)\' class=\'ex\' elements=\'a1531236220765\'>Oscar Health <span class=\'bn\'>1149</span> </a> <a href=\'javascript:gbp(599707)\' class=\'ex\' elements=\'a1531236234958\'>oSTEM <span class=\'bn\'>1451</span> </a> <a href=\'javascript:gbp(544546)\' class=\'ex\' elements=\'a1531235865861\'>P&amp;G <span class=\'bn\'>1111</span> </a> <a href=\'javascript:gbp(546262)\' class=\'ex\' elements=\'a1531236068196\'>Pacific Gas and Electric Company <span class=\'bn\'>518</span> </a> <a href=\'javascript:gbp(591080)\' class=\'ex\' elements=\'a1539116302166\'>Pacific Northwest National Laboratory <span class=\'bn\'>554</span> </a> <a href=\'javascript:gbp(584261)\' class=\'ex\' elements=\'a1531236185078\'>Penn State Applied Research Laboratory <span class=\'bn\'>850</span> </a> <a href=\'javascript:gbp(553685)\' class=\'ex\' elements=\'a1531236138605\'>PJM Interconnection <span class=\'bn\'>147</span> </a> <a href=\'javascript:gbp(546498)\' class=\'ex\' elements=\'a1531236185083\'>Pratt School of Engineering, Duke University <span class=\'bn\'>745</span> </a> <a href=\'javascript:gbp(559673)\' class=\'ex\' elements=\'a1531236176473\'>Precise Advanced Technologies and Health Systems for Underserved Populations (PATHS-UP) <span class=\'bn\'>647</span> </a> <a href=\'javascript:gbp(584238)\' class=\'ex\' elements=\'a1531236185077\'>Princeton University School of Engineering and Applied Science <span class=\'bn\'>751</span> </a> <a href=\'javascript:gbp(599505)\' class=\'ex\' elements=\'a1531236234961\'>Prospanica <span class=\'bn\'>1548</span> </a> <a href=\'javascript:gbp(546471)\' class=\'ex\' elements=\'a1532997460572\'>Prudential <span class=\'bn\'>113</span> </a> <a href=\'javascript:gbp(545728)\' class=\'ex\' elements=\'a1531236164139\'>Purdue University, College of Engineering <span class=\'bn\'>835</span> </a> <a href=\'javascript:gbp(544690)\' class=\'ex\' elements=\'a1531235953900\'>Qualcomm <span class=\'bn\'>605</span> </a> <a href=\'javascript:gbp(544547)\' class=\'ex\' elements=\'a1531235949113\'>Raytheon Company <span class=\'bn\'>705</span> </a> <a href=\'javascript:gbp(564020)\' class=\'ex\' elements=\'a1531236188869\'>Rensselaer Polytechnic Institute <span class=\'bn\'>851</span> </a> <a href=\'javascript:gbp(546502)\' class=\'ex\' elements=\'a1533144026912\'>Research in Germany <span class=\'bn\'>445</span> </a> <a href=\'javascript:gbp(546488)\' class=\'ex\' elements=\'a1531236185087\'>Rochester Institute of Technology <span class=\'bn\'>741</span> </a> <a href=\'javascript:gbp(546280)\' class=\'ex\' elements=\'a1531236068195\'>Rockwell Automation <span class=\'bn\'>419</span> </a> <a href=\'javascript:gbp(546492)\' class=\'ex\' elements=\'a1531236143322\'>Saint-Gobain <span class=\'bn\'>341</span> </a> <a href=\'javascript:gbp(570634)\' class=\'ex\' elements=\'a1531236158296\'>Sandia National Laboratories <span class=\'bn\'>447</span> </a> <a href=\'javascript:gbp(548870)\' class=\'ex\' elements=\'a1531236185090\'>School of Information Sciences, University of Illinois, Urbana-Champaign <span class=\'bn\'>838</span> </a> <a href=\'javascript:gbp(544567)\' class=\'ex\' elements=\'a1531235711889\'>SHPE <span class=\'bn\'>231</span> </a> <a href=\'javascript:gbp(598166)\' class=\'ex\' elements=\'a1531236234960\'>Society of Women Engineers (SWE) <span class=\'bn\'>1449</span> </a> <a href=\'javascript:gbp(548088)\' class=\'ex\' elements=\'a1532998069623\'>Solenis <span class=\'bn\'>1246</span> </a> <a href=\'javascript:gbp(599711)\' class=\'ex\' elements=\'a1535043950446\'>Southern Company <span class=\'bn\'>1536</span> </a> <a href=\'javascript:gbp(546698)\' class=\'ex\' elements=\'a1533003678882\'>SpaceX <span class=\'bn\'>242</span> </a> <a href=\'javascript:gbp(546336)\' class=\'ex\' elements=\'a1531236068190\'>Spectrum (Charter Communications) <span class=\'bn\'>524</span> </a> <a href=\'javascript:gbp(546566)\' class=\'ex\' elements=\'a1531236140058\'>Square <span class=\'bn\'>346</span> </a> <a href=\'javascript:gbp(548215)\' class=\'ex\' elements=\'a1531236169923\'>Stanford University School of Engineering <span class=\'bn\'>1049</span> </a> <a href=\'javascript:gbp(569776)\' class=\'ex\' elements=\'a1531236188871\'>State University of New York at Binghamton <span class=\'bn\'>849</span> </a> <a href=\'javascript:gbp(546466)\' class=\'ex\' elements=\'a1531236165954\'>Stevens Institute of Technology <span class=\'bn\'>935</span> </a> <a href=\'javascript:gbp(598053)\' class=\'ex\' elements=\'a1531236233212\'>SurveyMonkey <span class=\'bn\'>1351</span> </a> <a href=\'javascript:gbp(590915)\' class=\'ex\' elements=\'a1531236190798\'>Syracuse Univeristy <span class=\'bn\'>1050</span> </a> <a href=\'javascript:gbp(546270)\' class=\'ex\' elements=\'a1533003487761\'>T-Mobile <span class=\'bn\'>1338</span> </a> <a href=\'javascript:gbp(546335)\' class=\'ex\' elements=\'a1531236143325\'>Target <span class=\'bn\'>438</span> </a> <a href=\'javascript:gbp(544557)\' class=\'ex\' elements=\'a1531236004995\'>Tech Theater <span class=\'bn\'>201</span> </a> <a href=\'javascript:gbp(603399)\' class=\'ex\' elements=\'a1531236220763\'>Tennessee Tech University <span class=\'bn\'>1151</span> </a> <a href=\'javascript:gbp(557251)\' class=\'ex\' elements=\'a1531236174557\'>Texas Department of Transportation <span class=\'bn\'>650</span> </a> <a href=\'javascript:gbp(544548)\' class=\'ex\' elements=\'a1531235857232\'>Texas Instruments <span class=\'bn\'>1123</span> </a> <a href=\'javascript:gbp(546343)\' class=\'ex\' elements=\'a1532995341085\'>The Aerospace Corporation <span class=\'bn\'>118</span> </a> <a href=\'javascript:gbp(592987)\' class=\'ex\' elements=\'a1531236158294\'>The Consortium for Graduate Study in Management <span class=\'bn\'>449</span> </a> <a href=\'javascript:gbp(546503)\' class=\'ex\' elements=\'a1531236190807\'>The George Washington University School of Engineering and Applied Sciences <span class=\'bn\'>941</span> </a> <a href=\'javascript:gbp(545726)\' class=\'ex\' elements=\'a1531236164140\'>The Ohio State University, College of Engineering <span class=\'bn\'>934</span> </a> <a href=\'javascript:gbp(569627)\' class=\'ex\' elements=\'a1531236190797\'>The University of Iowa College of Engineering <span class=\'bn\'>951</span> </a> <a href=\'javascript:gbp(546470)\' class=\'ex\' elements=\'a1531236165959\'>The University of Pittsburgh Swanson School of Engineering <span class=\'bn\'>1030</span> </a> <a href=\'javascript:gbp(546705)\' class=\'ex\' elements=\'a1531236185085\'>The University of Texas at Arlington <span class=\'bn\'>743</span> </a> <a href=\'javascript:gbp(591398)\' class=\'ex\' elements=\'a1538754054260\'>The University of Texas at Austin <span class=\'bn\'>954</span> </a> <a href=\'javascript:gbp(544549)\' class=\'ex\' elements=\'a1531235097232\'>Toyota <span class=\'bn\'>1337</span> </a> <a href=\'javascript:gbp(546573)\' class=\'ex\' elements=\'a1531236190803\'>Tufts University School of Engineering and Graduate School of Arts &amp; Sciences <span class=\'bn\'>945</span> </a> <a href=\'javascript:gbp(546266)\' class=\'ex\' elements=\'a1531236074812\'>Turner <span class=\'bn\'>715</span> </a> <a href=\'javascript:gbp(546447)\' class=\'ex\' elements=\'a1532997420745\'>Twitter <span class=\'bn\'>117</span> </a> <a href=\'javascript:gbp(546283)\' class=\'ex\' elements=\'a1531236085808\'>Two Sigma Investments <span class=\'bn\'>1116</span> </a> <a href=\'javascript:gbp(544550)\' class=\'ex\' elements=\'a1531235916806\'>U. S. Army <span class=\'bn\'>721</span> </a> <a href=\'javascript:gbp(545709)\' class=\'ex\' elements=\'a1531236030365\'>U.S Marines <span class=\'bn\'>217</span> </a> <a href=\'javascript:gbp(545565)\' class=\'ex\' elements=\'a1531234648443\'>U.S. Army Test &amp; Evaluation Command <span class=\'bn\'>539</span> </a> <a href=\'javascript:gbp(592420)\' class=\'ex\' elements=\'a1539183586382\'>U.S. Coast Guard <span class=\'bn\'>555</span> </a> <a href=\'javascript:gbp(546387)\' class=\'ex\' elements=\'a1531236174563\'>U.S. Department of Energy <span class=\'bn\'>644</span> </a> <a href=\'javascript:gbp(561149)\' class=\'ex\' elements=\'a1531236111815\'>U.S. Department of State, Bureau of Diplomatic Security <span class=\'bn\'>1539</span> </a> <a href=\'javascript:gbp(551368)\' class=\'ex\' elements=\'a1531236111816\'>U.S. Intelligence Community <span class=\'bn\'>1537</span> </a> <a href=\'javascript:gbp(569778)\' class=\'ex\' elements=\'a1531236229928\'>Uber <span class=\'bn\'>1249</span> </a> <a href=\'javascript:gbp(546457)\' class=\'ex\' elements=\'a1531236185088\'>UC San Diego Jacobs School of Engineering <span class=\'bn\'>840</span> </a> <a href=\'javascript:gbp(546436)\' class=\'ex\' elements=\'a1531236162400\'>UCLA Center for Engineering and Diversity <span class=\'bn\'>735</span> </a> <a href=\'javascript:gbp(546401)\' class=\'ex\' elements=\'a1531236190810\'>UCLA Engineering Online Master\'s Program <span class=\'bn\'>1038</span> </a> <a href=\'javascript:gbp(546359)\' class=\'ex\' elements=\'a1531234772882\'>Unilever <span class=\'bn\'>1145</span> </a> <a href=\'javascript:gbp(544566)\' class=\'ex\' elements=\'a1531235131289\'>United Technologies Corporation <span class=\'bn\'>1131</span> </a> <a href=\'javascript:gbp(592486)\' class=\'ex\' elements=\'a1538754052242\'>Univ of Cincinnati College of Engineering &amp; Applied Science <span class=\'bn\'>953</span> </a> <a href=\'javascript:gbp(546664)\' class=\'ex\' elements=\'a1531236176476\'>University at Buffalo, School of Engineering and Applied Sciences <span class=\'bn\'>744</span> </a> <a href=\'javascript:gbp(546406)\' class=\'ex\' elements=\'a1531236165955\'>University of Akron <span class=\'bn\'>1034</span> </a> <a href=\'javascript:gbp(546450)\' class=\'ex\' elements=\'a1531236190806\'>University of Arkansas College of Engineering <span class=\'bn\'>1042</span> </a> <a href=\'javascript:gbp(546475)\' class=\'ex\' elements=\'a1531236188882\'>University of California, Berkeley - College of Engineering <span class=\'bn\'>938</span> </a> <a href=\'javascript:gbp(546805)\' class=\'ex\' elements=\'a1531236185082\'>University of California, Irvine <span class=\'bn\'>846</span> </a> <a href=\'javascript:gbp(546403)\' class=\'ex\' elements=\'a1531236162401\'>University of Illinois-College of Engineering <span class=\'bn\'>834</span> </a> <a href=\'javascript:gbp(546477)\' class=\'ex\' elements=\'a1531236176475\'>University of Kansas School of Engineering <span class=\'bn\'>645</span> </a> <a href=\'javascript:gbp(598060)\' class=\'ex\' elements=\'a1531236190802\'>University of Kentucky <span class=\'bn\'>1046</span> </a> <a href=\'javascript:gbp(546408)\' class=\'ex\' elements=\'a1531236165958\'>University of Maryland- A. James Clark School of Engineering <span class=\'bn\'>931</span> </a> <a href=\'javascript:gbp(545724)\' class=\'ex\' elements=\'a1531236164144\'>University of Michigan College of Engineering <span class=\'bn\'>930</span> </a> <a href=\'javascript:gbp(599703)\' class=\'ex\' elements=\'a1539892557296\'>University of Michigan School of Information <span class=\'bn\'>1153</span> </a> <a href=\'javascript:gbp(575857)\' class=\'ex\' elements=\'a1531236190801\'>University of Michigan-Dearborn <span class=\'bn\'>947</span> </a> <a href=\'javascript:gbp(562817)\' class=\'ex\' elements=\'a1531236176474\'>University of Missouri- College of Engineering <span class=\'bn\'>746</span> </a> <a href=\'javascript:gbp(575448)\' class=\'ex\' elements=\'a1531236185080\'>University of New Mexico Engineering <span class=\'bn\'>848</span> </a> <a href=\'javascript:gbp(590920)\' class=\'ex\' elements=\'a1538753616932\'>University of Notre Dame, Graduate Business Programs <span class=\'bn\'>854</span> </a> <a href=\'javascript:gbp(582058)\' class=\'ex\' elements=\'a1531236190799\'>University of Pittsburgh-Katz Graduate School of Business <span class=\'bn\'>949</span> </a> <a href=\'javascript:gbp(592494)\' class=\'ex\' elements=\'a1538754106718\'>University of South Carolina College of Engineering &amp; Computing <span class=\'bn\'>955</span> </a> <a href=\'javascript:gbp(590916)\' class=\'ex\' elements=\'a1538753660588\'>University of Tennessee, Tickle College of Engineering <span class=\'bn\'>655</span> </a> <a href=\'javascript:gbp(546491)\' class=\'ex\' elements=\'a1531236169925\'>University of Virginia <span class=\'bn\'>1047</span> </a> <a href=\'javascript:gbp(562799)\' class=\'ex\' elements=\'a1531234554308\'>USAA <span class=\'bn\'>139</span> </a> <a href=\'javascript:gbp(546597)\' class=\'ex\' elements=\'a1531236185086\'>USC Viterbi School of Engineering <span class=\'bn\'>842</span> </a> <a href=\'javascript:gbp(569990)\' class=\'ex\' elements=\'a1531236185079\'>Vanderbilt University <span class=\'bn\'>749</span> </a> <a href=\'javascript:gbp(559674)\' class=\'ex\' elements=\'a1531236185081\'>Vanderbilt University Owen Graduate School of Management <span class=\'bn\'>747</span> </a> <a href=\'javascript:gbp(598058)\' class=\'ex\' elements=\'a1540232195369\'>Vectrus <span class=\'bn\'>452</span> </a> <a href=\'javascript:gbp(544556)\' class=\'ex\' elements=\'a1531235178107\'>Verizon Communications, Inc. <span class=\'bn\'>631</span> </a> <a href=\'javascript:gbp(546464)\' class=\'ex\' elements=\'a1531236188881\'>Virginia Tech College of Engineering <span class=\'bn\'>839</span> </a> <a href=\'javascript:gbp(546323)\' class=\'ex\' elements=\'a1531235083397\'>Visa Inc. <span class=\'bn\'>1239</span> </a> <a href=\'javascript:gbp(548201)\' class=\'ex\' elements=\'a1531236176471\'>Washington University in St. Louis, School of Engineering &amp; Applied Science <span class=\'bn\'>649</span> </a> <a href=\'javascript:gbp(546452)\' class=\'ex\' elements=\'a1531236190808\'>WE@UCLA <span class=\'bn\'>1040</span> </a> <a href=\'javascript:gbp(546638)\' class=\'ex\' elements=\'a1531236188873\'>Worcester Polytechnic Institute <span class=\'bn\'>847</span> </a> <a href=\'javascript:gbp(583802)\' class=\'ex\' elements=\'a1531236143316\'>WSP USA Inc. <span class=\'bn\'>347</span> </a> <a href=\'javascript:gbp(546363)\' class=\'ex\' elements=\'a1531236229931\'>Yello <span class=\'bn\'>1346</span> </a> <a href=\'javascript:gbp(547383)\' class=\'ex\' elements=\'a1531236233216\'>Zillow Group <span class=\'bn\'>1347</span> </a> </li>';
soup = BeautifulSoup(content, 'html.parser')
# rows =soup.find_all(\'a\')
# print soup;
companies=[];
booths=[];
for a in soup :
    if isinstance(a, NavigableString):
        continue
    company=a.get_text();
    booth = a.find("span").get_text();
    company = company.replace(booth,"");
    booths.append(booth);
    companies.append(company);
# print companies;
wtr = csv.writer(open ('shpe_floorplan.csv', 'a'), delimiter=',', lineterminator='\n')
for c,b in zip(companies,booths):
    wtr.writerow ([c,b])
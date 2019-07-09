import { config } from 'dotenv';
import { info, error } from 'fancy-log';
import bcryptjs from 'bcryptjs';
import DB from '../../dbconnection';
import createTables from '../createTables';
import dropTables from '../dropTables';
import 'regenerator-runtime';

config();

const adminpass = bcryptjs.hashSync('Adminadmin', bcryptjs.genSaltSync(10));
const pass1 = bcryptjs.hashSync('PABLOANTONIDES12', bcryptjs.genSaltSync(10));
const pass2 = bcryptjs.hashSync('MAGDOMENDES12', bcryptjs.genSaltSync(10));
const pass3 = bcryptjs.hashSync('MATEUSZNORDGARD12', bcryptjs.genSaltSync(10));
const date = new Date().toISOString();

const usersData = `INSERT INTO users(firstname, lastname, email, password, address, is_admin)
                VALUES  ('Mads', 'Olsen', 'mads.olsen@example.com', '${adminpass}', '2787 Savværksvej, Snertinge Hovedstaden', true),
                ('Pablo', 'Antonides', 'pablo.antonides@example.com', '${pass1}', '7 van asch van wijckskade, zuidplas Flevoland', false),
                ('Magdo', 'mendes', 'magdo.mendes@example.com', '${pass2}', '4852 rua espirito santo', false),
                ('Mateusz', 'Nordgaard', 'mateusz.nordgaard@example.com', '${pass3}', '4852 rua espirito santo', false); `;

const carAds = `INSERT INTO cars(owner, email, "createdOn", manufacturer, model, body_type, price, state, year, images)
                VALUES (1132675462, 'pablo.antonides@example.com', '${date}', 'Toyota', 'Corolla', 'Hatchback', 3854440, 'new', 2013,
                  '{"https://res.cloudinary.com/pa15la4ta/image/upload/v1562159213/2013_toyota_corolla_sedan_s_fq_oem_2_815.jpg",
                  "https: //res.cloudinary.com/pa15la4ta/image/upload/v1562159213/2013_toyota_corolla_sedan_s_rq_oem_1_815.jpg",
                  "https: //res.cloudinary.com/pa15la4ta/image/upload/v1562159212/2013_toyota_corolla_sedan_s_rbdg_oem_1_815.jpg",
                  "https: //res.cloudinary.com/pa15la4ta/image/upload/v1562159212/2013_toyota_corolla_sedan_s_r_oem_1_815.jpg",
                  "https: //res.cloudinary.com/pa15la4ta/image/upload/v1562159211/2013_toyota_corolla_sedan_s_edetail_oem_1_815.jpg",
                  "https: //res.cloudinary.com/pa15la4ta/image/upload/v1562159211/2013_toyota_corolla_sedan_s_fq_oem_1_815.jpg"}'),
                (1132675462, 'pablo.antonides@example.com', '${date}', 'Maserati', 'Levante', 'SUV', 27057000, 'new', 2019,
                  '{"https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2019_maserati_levante_4dr-suv_gts_s_oem_2_815.jpg",
                    "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2019_maserati_levante_4dr-suv_gts_s_oem_1_815.jpg",
                    "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2019_maserati_levante_4dr-suv_gts_s_oem_1_815.jpg",
                    "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159203/2019_maserati_levante_4dr-suv_gts_fq_oem_3_815.jpg"}'),
                (1132675464, 'pablo.antonides@example.com', '${date}', 'Ford', 'Escape', 'SUV', 10101280, 'new', 2020, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159219/2020_ford_escape_4dr-suv_titanium_fq_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159215/2020_ford_escape_4dr-suv_se_edetail_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159210/2020_ford_escape_4dr-suv_titanium_i_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2020_ford_escape_4dr-suv_titanium_detail_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2020_ford_escape_4dr-suv_se_rq_oem_1_815.jpg"}'),
                (1132675466, 'pablo.antonides@example.com', '${date}', 'Nissan', 'Sentra', 'Saloon', 6453996, 'new', 2019, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159210/2019_nissan_sentra_sedan_sr_tds_evox_5_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2019_nissan_sentra_sedan_sr-turbo_r_oem_2_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159204/2019_nissan_sentra_sedan_sr-turbo_rbdg_oem_1_815.jpg"}'),
                (1132675466, 'pablo.antonides@example.com', '${date}', 'Toyota', 'Corolla', 'Hatchback', 6493680, 'new', 2018, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159201/2018_toyota_corolla_sedan_le-eco-wpremium-package_w_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159200/2018_toyota_corolla_sedan_le-eco-wpremium-package_fq_oem_2_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159202/2018_toyota_corolla_sedan_le-eco-wpremium-package_fq_oem_5_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159199/2018_toyota_corolla_sedan_le-eco-wpremium-package_fbdg_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159202/2018_toyota_corolla_sedan_le-eco-wpremium-package_fq_oem_4_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159200/2018_toyota_corolla_sedan_le-eco-wpremium-package_fq_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159199/2018_toyota_corolla_sedan_le-eco-wpremium-package_edetail_oem_1_815.jpg"}'),
                (1132675468, 'pablo.antonides@example.com', '${date}', 'Chrysler', ' Town And Country', ' Minivan', 6132920, 'new', 2016, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159192/2016_chrysler_town-and-country_passenger-minivan_s_f_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159192/2016_chrysler_town-and-country_passenger-minivan_s_r_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159191/2016_chrysler_town-and-country_passenger-minivan_s_fq_oem_1_815.jpg"}'),
                (1132675462, 'pablo.antonides@example.com', '${date}', 'Ford', 'Edge', 'SUV', 10820996, 'new', 2019, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159203/2019_ford_edge_4dr-suv_st_fq_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159201/2019_ford_edge_4dr-suv_st_cc_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159202/2019_ford_edge_4dr-suv_st_w_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159202/2019_ford_edge_4dr-suv_st_fq_oem_2_815.jpg"}'),
                (1132675468, 'pablo.antonides@example.com', '${date}', 'Toyota', 'Camry', 'Saloon', 12265840, 'new', '2019', '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159199/2018_toyota_camry_sedan_xse_f_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159198/2018_toyota_camry_sedan_xle_rq_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159195/2018_toyota_camry_sedan_xle_fq_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159199/2018_toyota_camry_sedan_xle_s_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159194/2018_toyota_camry_sedan_se_edetail_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159196/2018_toyota_camry_sedan_xle_fq_oem_2_815.jpg"}'),
                (1132675464, 'pablo.antonides@example.com', '${date}', 'Honda', 'Accord', 'Saloon', 9019000, 'new', 2017, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159192/2017_honda_accord-hybrid_sedan_touring_fq_oem_2_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159194/2017_honda_accord-hybrid_sedan_touring_rq_oem_10_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159199/2017_honda_accord-hybrid_sedan_touring_fq_oem_8_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159201/2017_honda_accord-hybrid_sedan_touring_fq_oem_7_815.jpg"}'),
                (1132675462, 'pablo.antonides@example.com', '${date}', 'Volkswagen', 'Golf', 'Saloon', 5732476, 'new', 2017, '{
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159196/2017_volkswagen_golf_4dr-hatchback_tsi-sel_fq_oem_3_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159199/2017_volkswagen_golf_4dr-hatchback_tsi-sel_fq_oem_1_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159194/2017_volkswagen_golf_4dr-hatchback_tsi-sel_fq_oem_4_815.jpg",
                  "https://res.cloudinary.com/pa15la4ta/image/upload/v1562159194/2017_volkswagen_golf_4dr-hatchback_tsi-sel_cargo_oem_1_815.jpg"}'); `;

const create = async () => {
  try {
    const result = await DB.query(`${dropTables} ${createTables} ${usersData} ${carAds}`);
    info(result);
  } catch (err) {
    error(err.stack);
  }
};
create();
